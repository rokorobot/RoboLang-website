// Example programs and the output of the real `robolang` command for each.
//
// Every output below was captured by running distribution 0.1.0a1 from
// rokorobot/RoboLang at the commit pinned in facts.ts. Do not edit an output
// by hand: re-run the command and paste the result. Two kinds of display
// change are allowed, and each is labelled where it is shown: JSON line breaks
// condensed (keys, values and their order unchanged), and a run record cut
// down to selected top-level fields (each field shown exactly as printed).

/** examples/pick_and_place.rob in the core repository, unchanged. */
export const pickAndPlaceSource = `// examples/pick_and_place.rob
// Minimal example executed by the simple runtime.

task demo_pick_and_place(robot r, object box, location src, location dst, region cell) {
    @safety max_speed 0.5;

    pre {
        robot_ready r;
        region_clear cell;
    }

    plan {
        move r to src;
        grasp r box;
        move r to dst;
        place r box at dst;
        communicate r to "fleet" with "TASK_COMPLETE";
    }
}`;

export const pickAndPlaceValidate = `examples/pick_and_place.rob:5:23: warning[W401]: 'max_speed' has no unit; write 'm/s' or 'rad/s'. A unitless limit is deprecated and is never treated as an enforced limit
examples/pick_and_place.rob: valid RoboLang 1.1 (1 task, 1 warning)
Validation covers the text of the program only. It does not make a task safe to run on a robot.`;

export const pickAndPlaceInspect = `examples/pick_and_place.rob:5:23: warning[W401]: 'max_speed' has no unit; write 'm/s' or 'rad/s'. A unitless limit is deprecated and is never treated as an enforced limit
examples/pick_and_place.rob
RoboLang 1.1 | IR schema 1.0 | 1 task

task demo_pick_and_place
  parameters:
    robot r
    object box
    location src
    location dst
    region cell
  safety:
    max_speed 0.5  (no unit: deprecated; declared only, never treated as an enforced limit)
  preconditions:
    robot_ready r
    region_clear cell
  plan:
    1. move r to src
    2. grasp r box
    3. move r to dst
    4. place r box at dst
    5. communicate r to "fleet" with "TASK_COMPLETE"

This is a description only. Nothing was executed.`;

export const pickAndPlaceJson = `{
  "ir_schema": "robolang.task-ir",
  "ir_schema_version": "1.0",
  "language_version": "1.1",
  "tasks": [
    {
      "name": "demo_pick_and_place",
      "parameters": [
        { "name": "r", "type": "robot" },
        { "name": "box", "type": "object" },
        { "name": "src", "type": "location" },
        { "name": "dst", "type": "location" },
        { "name": "cell", "type": "region" }
      ],
      "safety": [
        { "kind": "max_speed", "limit": { "value": "0.5", "unit": null } }
      ],
      "preconditions": [
        { "kind": "robot_ready", "robot": "r" },
        { "kind": "region_clear", "region": "cell" }
      ],
      "steps": [
        { "kind": "move", "robot": "r", "target": "src" },
        { "kind": "grasp", "robot": "r", "object": "box" },
        { "kind": "move", "robot": "r", "target": "dst" },
        { "kind": "place", "robot": "r", "object": "box", "target": "dst" },
        { "kind": "communicate", "robot": "r", "channel": "fleet", "message": "TASK_COMPLETE" }
      ]
    }
  ]
}`;

export const versionOutput = `robolang 0.1.0a1 (language 1.1 and 1.2, IR schema 1.0 and 1.1)`;

/** Standard error of `robolang simulate` with tests/fixtures/simulation/worlds/base.json. */
export const pickAndPlaceSimulate = `examples/pick_and_place.rob:5:23: warning[W401]: 'max_speed' has no unit; write 'm/s' or 'rad/s'. A unitless limit is deprecated and is never treated as an enforced limit
simulation only: run sim-74e8880dc9812881e439341b29b04ee31e11ba6839023b4ac26431d42ed26b09: SUCCEEDED`;

/** Selected top-level fields of the run record printed by the same run. */
export const pickAndPlaceSimulateRecord = `{
  "run_record_schema": "robolang.sim.run",
  "run_record_schema_version": "1.0",
  "mode": "simulation",
  "run_id": "sim-74e8880dc9812881e439341b29b04ee31e11ba6839023b4ac26431d42ed26b09",
  "states": ["CREATED", "VALIDATED", "AUTHORIZED", "RUNNING", "SUCCEEDED"],
  "state": "SUCCEEDED",
  "failure": null,
  "safety_limits": [
    {
      "limit": {
        "kind": "max_speed",
        "limit": {
          "value": "0.5",
          "unit": null
        }
      },
      "status": "unit_unspecified_not_enforced"
    }
  ],
  "preconditions": [
    { "index": 1, "condition": { "kind": "robot_ready", "robot": "r" }, "result": "true" },
    { "index": 2, "condition": { "kind": "region_clear", "region": "cell" }, "result": "true" }
  ]
}`;

/** Standard error with tests/fixtures/simulation/worlds/not_ready.json, where arm1 is not ready. */
export const pickAndPlaceNotReady = `examples/pick_and_place.rob:5:23: warning[W401]: 'max_speed' has no unit; write 'm/s' or 'rad/s'. A unitless limit is deprecated and is never treated as an enforced limit
simulation only: run sim-78c53744434b0be82fc1836b772eab433cb1f0b1aafe2d8ff7f49a67eb7deabe: FAILED (S101)`;

/** Selected top-level fields of the run record printed by the same run. */
export const pickAndPlaceNotReadyRecord = `{
  "states": ["CREATED", "VALIDATED", "AUTHORIZED", "RUNNING", "FAILED"],
  "state": "FAILED",
  "failure": {
    "code": "S101",
    "phase": "precondition",
    "step": null,
    "precondition": 1,
    "safety_limit": null,
    "robot": null
  },
  "preconditions": [
    { "index": 1, "condition": { "kind": "robot_ready", "robot": "r" }, "result": "false" },
    { "index": 2, "condition": { "kind": "region_clear", "region": "cell" }, "result": "true" }
  ]
}`;

/** Standard error of `robolang arch02` for case happy_path. */
export const arch02HappyPath = `simulation only: run arch02-b15d8830279932950822877f5de7252f6f3aef2b2623f385369f736a9207cb82: planner-1 recorded succeeded`;

/** Standard error of `robolang arch02` for case v06_partition_before_release. */
export const arch02Partition = `simulation only: run arch02-0be8e15746df1ee215e2d51e3366accad768c5f4ffae61448d4efcaab063717e: planner-1 recorded unknown`;

/** Written for this site; uses the statement and condition forms not in pick_and_place. */
export const inspectPartSource = `robolang 1.1;

task inspect_part(robot r, object part, location station, region cell) {
    @safety max_speed 0.25 m/s;

    pre {
        robot_ready r;
        object_exists part;
        sensor_ok "wrist_camera";
    }

    plan {
        move r to station;
        wait until region_clear cell timeout 10 s;
        inspect r part using "wrist_camera";
        wait for 500 ms;
        communicate r to "fleet" with "INSPECTION_DONE";
    }
}`;

export const inspectPartValidate = `inspect_part.rob: valid RoboLang 1.1 (1 task)
Validation covers the text of the program only. It does not make a task safe to run on a robot.`;

export const inspectPartInspect = `inspect_part.rob
RoboLang 1.1 | IR schema 1.0 | 1 task

task inspect_part
  parameters:
    robot r
    object part
    location station
    region cell
  safety:
    max_speed 0.25 m/s  (declared only; not enforced by this tool)
  preconditions:
    robot_ready r
    object_exists part
    sensor_ok "wrist_camera"
  plan:
    1. move r to station
    2. wait until region_clear cell timeout 10 s
    3. inspect r part using "wrist_camera"
    4. wait for 500 ms
    5. communicate r to "fleet" with "INSPECTION_DONE"

This is a description only. Nothing was executed.`;

/** tests/fixtures/v1.2/simulation/sources/pre_or.rob in the core repository, unchanged. */
export const preOrSource = `// LANG-1 simulation fixture (spec/robolang-v1.2.md section 8)
robolang 1.2;

task pre_or(robot r, location dst, region left, region right) {
    pre {
        region_clear left or region_clear right;
    }
    plan {
        move r to dst;
    }
}`;

export const preOrValidate = `tests/fixtures/v1.2/simulation/sources/pre_or.rob: valid RoboLang 1.2 (1 task)
Validation covers the text of the program only. It does not make a task safe to run on a robot.`;

export const preOrJson = `{
  "ir_schema": "robolang.task-ir",
  "ir_schema_version": "1.1",
  "language_version": "1.2",
  "tasks": [
    {
      "name": "pre_or",
      "parameters": [
        { "name": "r", "type": "robot" },
        { "name": "dst", "type": "location" },
        { "name": "left", "type": "region" },
        { "name": "right", "type": "region" }
      ],
      "safety": [],
      "preconditions": [
        {
          "kind": "or",
          "conditions": [
            { "kind": "region_clear", "region": "left" },
            { "kind": "region_clear", "region": "right" }
          ]
        }
      ],
      "steps": [
        { "kind": "move", "robot": "r", "target": "dst" }
      ]
    }
  ]
}`;

/** Standard error of `robolang simulate` with tests/fixtures/v1.2/simulation/worlds/base.json. */
export const preOrSimulate = `simulation only: run sim-467161b758ec973f543a2289fd0cd8b9cd1d9ba55de29a7b8bb27616fd6fd227: SUCCEEDED`;

/** Selected top-level fields of the run record printed by the same run. */
export const preOrSimulateRecord = `{
  "run_record_schema_version": "1.1",
  "state": "SUCCEEDED",
  "preconditions": [
    {
      "index": 1,
      "condition": {
        "kind": "or",
        "conditions": [
          { "kind": "region_clear", "region": "left" },
          { "kind": "region_clear", "region": "right" }
        ]
      },
      "result": "true"
    }
  ]
}`;

export const undeclaredSource = `task fetch(robot r, object box, location shelf) {
    plan {
        move r to shelf;
        grasp r box;
        move r to bench;
    }
}`;

export const undeclaredValidate = `undeclared.rob:5:19: error[E303]: undeclared name 'bench': it is not a parameter of this task`;

export const missingSemicolonSource = `task fetch(robot r, location shelf) {
    plan {
        move r to shelf
    }
}`;

export const missingSemicolonValidate = `missing_semicolon.rob:3:24: error[E202]: missing ';' after the move statement`;
