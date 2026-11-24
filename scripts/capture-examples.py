"""Re-capture the `robolang` outputs quoted in src/data/examples.ts and report which changed.

Usage (from the website repository):

    python3 -m venv /tmp/rl && /tmp/rl/bin/pip install robolang==X.Y.Z
    git -C ../RoboLang worktree add /tmp/core vX.Y.Z
    python3 scripts/capture-examples.py --robolang /tmp/rl/bin/robolang --core /tmp/core [--write]

It runs every command shown on the site in the core checkout, with the site-only files
(written from examples.ts) in a temporary directory, and compares each output with the
export in examples.ts. Plain outputs are compared as text; JSON excerpts are compared as
data, field by field, after the same cut-down the page labels describe. With --write, plain
outputs that changed are replaced in examples.ts; a changed JSON excerpt is only reported,
because its cut-down needs a person to look at it.
"""

import argparse
import json
import re
import subprocess
import sys
import tempfile
from pathlib import Path

EXAMPLES = Path(__file__).resolve().parent.parent / "src" / "data" / "examples.ts"

# Site-only files: export name -> file name in the temporary directory.
INLINE = {
    "inspectPartSource": "inspect_part.rob",
    "goalMissSource": "deliver_and_return.rob",
    "undeclaredSource": "undeclared.rob",
    "missingSemicolonSource": "missing_semicolon.rob",
    "retryWorld": "retry_world.json",
    "fillWorld": "fill_world.json",
    "shiftWorld": "shift_world.json",
}

# Unchanged files from the core repository: export name -> path.
SOURCES = {
    "pickAndPlaceSource": "examples/pick_and_place.rob",
    "handoverSource": "examples/handover.rob",
    "preOrSource": "tests/fixtures/v1.2/simulation/sources/pre_or.rob",
    "routeSource": "tests/fixtures/v1.4/valid/branch_route.rob",
}

ROUTE = "tests/fixtures/v1.4/valid/branch_route.rob --world examples/world.json --bind r=arm1 box=box1 src=shelf a=table b=handoff"
ARCH = "arch02 --scenario tests/fixtures/arch02/scenario.json --cases tests/fixtures/arch02/cases.json --case"

# Plain outputs: export name -> (arguments, stream). Stream "all" is both streams through one
# pipe, as `2>&1` shows them; "err" is standard error only.
PLAIN = {
    "versionOutput": ("--version", "all"),
    "pickAndPlaceValidate": ("validate examples/pick_and_place.rob", "all"),
    "pickAndPlaceInspect": ("inspect examples/pick_and_place.rob", "all"),
    "pickAndPlaceSimulate": ("simulate examples/pick_and_place.rob --world tests/fixtures/simulation/worlds/base.json", "err"),
    "pickAndPlaceNotReady": ("simulate examples/pick_and_place.rob --world tests/fixtures/simulation/worlds/not_ready.json", "err"),
    "arch02HappyPath": (f"{ARCH} happy_path", "err"),
    "arch02Partition": (f"{ARCH} v06_partition_before_release", "err"),
    "inspectPartValidate": ("validate {tmp}/inspect_part.rob", "all"),
    "inspectPartInspect": ("inspect {tmp}/inspect_part.rob", "all"),
    "preOrValidate": ("validate tests/fixtures/v1.2/simulation/sources/pre_or.rob", "all"),
    "preOrInspect": ("inspect tests/fixtures/v1.2/simulation/sources/pre_or.rob", "all"),
    "preOrSimulate": ("simulate tests/fixtures/v1.2/simulation/sources/pre_or.rob --world tests/fixtures/v1.2/simulation/worlds/base.json", "err"),
    "handoverValidate": ("validate examples/handover.rob", "all"),
    "handoverSimulate": ("simulate examples/handover.rob --world examples/world.json", "err"),
    "goalMissSimulate": ("simulate {tmp}/deliver_and_return.rob --world examples/world.json --bind r=arm1 box=box1 src=shelf dst=table", "err"),
    "routeInspect": ("inspect tests/fixtures/v1.4/valid/branch_route.rob", "all"),
    "routeClearSimulate": (f"simulate {ROUTE} cell=cell", "err"),
    "routeBlockedSimulate": (f"simulate {ROUTE} cell=handoff_zone", "err"),
    "handoverDelegate": ("delegate examples/handover.rob --world examples/world.json --from rl:agent:planner-1 --to rl:robot:arm1 --plans examples/plans", "err"),
    "undeclaredValidate": ("validate {tmp}/undeclared.rob", "all"),
    "missingSemicolonValidate": ("validate {tmp}/missing_semicolon.rob", "all"),
    "retrySimulate": ("simulate tests/fixtures/v1.5/valid/retry_grasp.rob --world {tmp}/retry_world.json", "err"),
    "shuttleSimulate": ("simulate tests/fixtures/v2.0/valid/shuttle_rounds.rob --mission shuttle --world examples/world.json --bind r=arm1 home=shelf far=table", "err"),
    "shiftSimulate": ("simulate tests/fixtures/v2.1/valid/mission_until_a_message.rob --mission shift --world {tmp}/shift_world.json --bind r=amr1 home=home far=far", "err"),
    "fillSimulate": ("simulate tests/fixtures/v2.2/valid/fill_below_a_quarter.rob --world {tmp}/fill_world.json --bind r=scanbot1 shelf=shelf_a aisle=aisle_3 cam=cam_scan1 tag=tag_scan1", "err"),
}

# Every `<name>Source` from tests/fixtures with a `<name>Validate` beside it.
FIXTURE = re.compile(r"/\*\* (tests/fixtures/\S+\.rob) in the core repository, unchanged\. \*/\nexport const (\w+)Source")


def keep(*keys):
    return lambda items: [{k: item[k] for k in keys} for item in items]


# JSON excerpts: export name -> (arguments, how the page cuts the record down).
RECORDS = {
    "pickAndPlaceJson": ("inspect examples/pick_and_place.rob --json", None),
    "preOrJson": ("inspect tests/fixtures/v1.2/simulation/sources/pre_or.rob --json", None),
    "pickAndPlaceSimulateRecord": (PLAIN["pickAndPlaceSimulate"][0], {}),
    "pickAndPlaceNotReadyRecord": (PLAIN["pickAndPlaceNotReady"][0], {}),
    "preOrSimulateRecord": (PLAIN["preOrSimulate"][0], {}),
    "handoverSimulateRecord": (PLAIN["handoverSimulate"][0], {}),
    "routeClearRecord": (PLAIN["routeClearSimulate"][0], {}),
    "routeBlockedRecord": (PLAIN["routeBlockedSimulate"][0], {}),
    "goalMissRecord": (PLAIN["goalMissSimulate"][0], {"steps": keep("index", "status")}),
    "handoverDelegateRecord": (PLAIN["handoverDelegate"][0], {"messages": lambda ms: [
        {"t_ms": m["t_ms"], "document": {"type": m["document"]["type"], "sender": m["document"]["sender"]}} for m in ms]}),
    "retryRecord": (PLAIN["retrySimulate"][0], {"steps": keep("index", "path", "status", "handled")}),
    "shuttleRecord": (PLAIN["shuttleSimulate"][0], {}),
    "shiftRecord": (PLAIN["shiftSimulate"][0], {"runs": keep("index", "t_start_ms", "t_end_ms", "state", "until")}),
    "fillRecord": (PLAIN["fillSimulate"][0], {"steps": keep("index", "path", "status", "reading", "message")}),
}


def exports(text):
    return {m.group(1): m.group(2) for m in re.finditer(r"export const (\w+) = `((?:[^`\\]|\\.)*)`;", text, re.S)}


def run(robolang, core, tmp, args, merged=False):
    argv = [robolang] + args.replace("{tmp}", tmp).split()
    if merged:
        return subprocess.run(argv, cwd=core, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
    return subprocess.run(argv, cwd=core, capture_output=True, text=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--robolang", required=True)
    ap.add_argument("--core", required=True)
    ap.add_argument("--write", action="store_true")
    a = ap.parse_args()
    text = EXAMPLES.read_text()
    ex = exports(text)
    changed, notes = {}, []
    with tempfile.TemporaryDirectory() as tmp:
        for name, file in INLINE.items():
            Path(tmp, file).write_text(ex[name].rstrip("\n") + "\n")
        for name, path in SOURCES.items():
            if Path(a.core, path).read_text().rstrip("\n") != ex[name].rstrip("\n"):
                notes.append(f"source changed in the core repository: {name} ({path})")
        plain = dict(PLAIN)
        for path, stem in FIXTURE.findall(text):
            if Path(a.core, path).read_text().rstrip("\n") != ex[stem + "Source"].rstrip("\n"):
                notes.append(f"source changed in the core repository: {stem}Source ({path})")
            if stem + "Validate" in ex:
                plain[stem + "Validate"] = (f"validate {path}", "all")
        for name, (args, stream) in plain.items():
            r = run(a.robolang, a.core, tmp, args, merged=stream == "all")
            out = (r.stdout if stream == "all" else r.stderr).rstrip("\n").replace(tmp + "/", "")
            if out != ex[name].rstrip("\n"):
                changed[name] = out
        for name, (args, cut) in RECORDS.items():
            new = json.loads(run(a.robolang, a.core, tmp, args).stdout)
            old = json.loads(ex[name])
            if cut is None:
                same = new == old
            else:
                same = all(k in new and (cut[k](new[k]) if k in cut else new[k]) == v for k, v in old.items())
            if not same:
                notes.append(f"JSON excerpt changed: {name} (re-cut by hand)")
    for name, out in changed.items():
        print(f"CHANGED {name}:\n  old: {ex[name][:200]!r}\n  new: {out[:200]!r}")
    for n in notes:
        print(n)
    print(f"{len(changed)} plain output(s) changed, {len(notes)} other note(s)")
    if a.write and changed:
        for name, out in changed.items():
            text = text.replace(f"export const {name} = `{ex[name]}`;", f"export const {name} = `{out}`;")
        EXAMPLES.write_text(text)
        print("examples.ts updated")
    return 0


if __name__ == "__main__":
    sys.exit(main())
