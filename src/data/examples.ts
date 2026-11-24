// Example programs and the output of the real `robolang` command for each.
//
// Every output below was captured by running distribution 0.8.0 as published
// on PyPI, in a checkout of rokorobot/RoboLang at the commit pinned in facts.ts
// (tag v0.8.0). Do not edit an output
// by hand: re-run the command and paste the result. Two kinds of display
// change are allowed, and each is labelled where it is shown: JSON line breaks
// condensed (keys, values and their order unchanged), and a run record cut
// down to selected top-level fields (each field shown exactly as printed;
// where a field's entries are cut down too, the label says which keys stay).

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

export const versionOutput = `robolang 0.8.0 (language 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0 and 2.1, IR schema 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8 and 1.9, mission IR 1.0 and 1.1)`;

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
simulation only: run sim-78c53744434b0be82fc1836b772eab433cb1f0b1aafe2d8ff7f49a67eb7deabe: FAILED (S101): a pre condition is false`;

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

export const preOrInspect = `tests/fixtures/v1.2/simulation/sources/pre_or.rob
RoboLang 1.2 | IR schema 1.1 | 1 task

task pre_or
  parameters:
    robot r
    location dst
    region left
    region right
  safety: (none)
  preconditions:
    region_clear left or region_clear right
  plan:
    1. move r to dst

This is a description only. Nothing was executed.`;

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

/** examples/handover.rob in the core repository, unchanged. */
export const handoverSource = `// examples/handover.rob
// An arm places a box at a handoff point; a mobile robot picks it up once the zone is clear.
robolang 1.3;

task handover(robot arm, robot mobile, object box, location src, location handoff, location dst, region zone) {
    @safety max_speed 0.5 m/s;

    pre {
        robot_ready arm;
        robot_ready mobile;
        object_exists box;
    }

    goal {
        object_at box dst;
    }

    plan {
        move arm to src;
        grasp arm box;
        move arm to handoff;
        place arm box at handoff;
        communicate arm to "fleet" with "BOX_AT_HANDOFF";
        wait until region_clear zone timeout 30s;
        move mobile to handoff;
        grasp mobile box;
        move mobile to dst;
        place mobile box at dst;
    }
}`;

export const handoverValidate = `examples/handover.rob: valid RoboLang 1.3 (1 task)
Validation covers the text of the program only. It does not make a task safe to run on a robot.`;

/** Standard error of `robolang simulate examples/handover.rob --world examples/world.json`. */
export const handoverSimulate = `simulation only: run sim-70f08163c77bb0d98b645068d07b66f7c501d3d30d82ab2b7ba8b2ed059f4fd0: SUCCEEDED`;

/** Selected top-level fields of the run record printed by the same run. */
export const handoverSimulateRecord = `{
  "run_record_schema_version": "1.2",
  "state": "SUCCEEDED",
  "goal": [
    {
      "index": 1,
      "condition": {
        "kind": "object_at",
        "object": "box",
        "location": "dst"
      },
      "result": "true"
    }
  ]
}`;

/** The outcome part of core_outcome in the same run record; the evidence list beside it is omitted. */
export const handoverCoreOutcome = `{
  "core_outcome": {
    "outcome": {
      "kind": "outcome",
      "goal": "rl:goal:handover",
      "status": "succeeded",
      "verification": {
        "verified_by": "rl:sim:world",
        "method": "criteria_evaluated",
        "evaluated_at": "2000-01-01T00:00:05.000Z",
        "criteria_results": [
          {
            "criterion": 0,
            "met": true,
            "evidence": [
              "rl:obs:70f08163c77bb0d9-0"
            ]
          }
        ]
      },
      "reasons": [],
      "reported_by": "rl:sim:world",
      "reported_at": "2000-01-01T00:00:05.000Z"
    }
  }
}`;

/** Written for this site: every step succeeds, but the robot never returns. */
export const goalMissSource = `robolang 1.3;

task deliver_and_return(robot r, object box, location src, location dst) {
    goal {
        object_at box dst;
        robot_at r src;
    }

    plan {
        move r to src;
        grasp r box;
        move r to dst;
        place r box at dst;
    }
}`;

/** Standard error of the run with examples/world.json and --bind. */
export const goalMissSimulate = `simulation only: run sim-79d4afd717627f5e80666bd171fb0795211f59bf47b5dc6a0f021c9173839342: FAILED (S301): a goal condition is false after the last step`;

/** Selected fields of the run record; each step is cut down to its index and status. */
export const goalMissRecord = `{
  "state": "FAILED",
  "failure": {
    "code": "S301",
    "phase": "goal",
    "step": null,
    "precondition": null,
    "safety_limit": null,
    "robot": null
  },
  "steps": [
    {
      "index": 1,
      "status": "succeeded"
    },
    {
      "index": 2,
      "status": "succeeded"
    },
    {
      "index": 3,
      "status": "succeeded"
    },
    {
      "index": 4,
      "status": "succeeded"
    }
  ],
  "goal": [
    {
      "index": 1,
      "condition": {
        "kind": "object_at",
        "object": "box",
        "location": "dst"
      },
      "result": "true"
    },
    {
      "index": 2,
      "condition": {
        "kind": "robot_at",
        "robot": "r",
        "location": "src"
      },
      "result": "false"
    }
  ]
}`;

/** tests/fixtures/v1.4/valid/branch_route.rob in the core repository, unchanged. */
export const routeSource = `// RoboLang v1.4 fixture: valid
// expect: ok
// why: an if with branch goals, an else if, and a common task goal

robolang 1.4;

task route(robot r, object box, location src, location a, location b, region cell) {
    goal { not holding r box; }
    plan {
        move r to src;
        grasp r box;
        if region_clear cell {
            goal { object_at box a; }
            move r to a;
            place r box at a;
        } else if robot_ready r {
            goal { object_at box b; }
            move r to b;
            place r box at b;
        } else {
            communicate r to "ops" with "no route";
            fail "no route";
        }
    }
}`;

export const routeInspect = `tests/fixtures/v1.4/valid/branch_route.rob
RoboLang 1.4 | IR schema 1.3 | 1 task

task route
  parameters:
    robot r
    object box
    location src
    location a
    location b
    region cell
  safety: (none)
  preconditions: (none)
  goal:
    not holding r box
  plan:
    1. move r to src
    2. grasp r box
    3. if region_clear cell
      then:
        goal: object_at box a
        3.1. move r to a
        3.2. place r box at a
      else:
        3.1. if robot_ready r
          then:
            goal: object_at box b
            3.1.1. move r to b
            3.1.2. place r box at b
          else:
            3.1.1. communicate r to "ops" with "no route"
            3.1.2. fail "no route"

This is a description only. Nothing was executed.`;

/** Standard error with cell=cell. */
export const routeClearSimulate = `simulation only: run sim-6f87ff2ca0beb961a47c6de6dff6014299ed0825e9ddbe9b05155cd555a5d66a: SUCCEEDED`;

/** Selected top-level fields of the run record printed by the same run. */
export const routeClearRecord = `{
  "run_record_schema_version": "1.3",
  "state": "SUCCEEDED",
  "decisions": [
    {
      "step": "3",
      "condition_result": "true",
      "branch": "then",
      "t_ms": "0"
    }
  ],
  "goal": [
    {
      "index": 1,
      "from": "task",
      "condition": {
        "kind": "not",
        "condition": {
          "kind": "holding",
          "robot": "r",
          "object": "box"
        }
      },
      "result": "true"
    },
    {
      "index": 2,
      "from": "3.then",
      "condition": {
        "kind": "object_at",
        "object": "box",
        "location": "a"
      },
      "result": "true"
    }
  ]
}`;

/** Standard error with cell=handoff_zone. */
export const routeBlockedSimulate = `simulation only: run sim-fa2103f352cfdd010a6b7f27fda6b47c920e5cacaf5d98f5923394cf08bbda76: SUCCEEDED`;

/** Selected top-level fields of the run record printed by the same run. */
export const routeBlockedRecord = `{
  "run_record_schema_version": "1.3",
  "state": "SUCCEEDED",
  "decisions": [
    {
      "step": "3",
      "condition_result": "false",
      "branch": "else",
      "t_ms": "0"
    },
    {
      "step": "3.else.1",
      "condition_result": "true",
      "branch": "then",
      "t_ms": "0"
    }
  ],
  "goal": [
    {
      "index": 1,
      "from": "task",
      "condition": {
        "kind": "not",
        "condition": {
          "kind": "holding",
          "robot": "r",
          "object": "box"
        }
      },
      "result": "true"
    },
    {
      "index": 2,
      "from": "3.else.1.then",
      "condition": {
        "kind": "object_at",
        "object": "box",
        "location": "b"
      },
      "result": "true"
    }
  ]
}`;

/** Standard error of `robolang delegate` for examples/handover.rob. */
export const handoverDelegate = `simulation only: delegate rl:goal:handover → rl:robot:arm1: succeeded (verified)`;
/** Selected fields of the delegate record printed by the same run; each message is cut down to its time, type and sender. */
export const handoverDelegateRecord = `{
  "messages": [
    {
      "t_ms": 50,
      "document": {
        "type": "propose_goal",
        "sender": "rl:agent:planner-1"
      }
    },
    {
      "t_ms": 100,
      "document": {
        "type": "assessment",
        "sender": "rl:robot:arm1"
      }
    },
    {
      "t_ms": 150,
      "document": {
        "type": "accept",
        "sender": "rl:robot:arm1"
      }
    },
    {
      "t_ms": 200,
      "document": {
        "type": "outcome",
        "sender": "rl:robot:arm1"
      }
    }
  ],
  "planner_verdict": {
    "status": "succeeded",
    "criteria": [
      {
        "criterion": 0,
        "met": true,
        "evidence": [
          "rl:obs:a06897e6b4850f7a-0"
        ],
        "reason": null
      }
    ],
    "reasons": []
  }
}`;

/** tests/fixtures/v1.5/valid/retry_grasp.rob in the core repository, unchanged. */
export const retrySource = `// RoboLang v1.5 fixture: valid
// expect: ok
// why: a failed grasp is retried once by its handler (decision 0033 F5)

robolang 1.5;

task pick(robot r, object box, location src, location dst) {
    goal { object_at box dst; }
    plan {
        move r to src;
        grasp r box else {
            grasp r box;
        }
        move r to dst;
        place r box at dst;
    }
}`;

/** Output of `robolang validate tests/fixtures/v1.5/valid/retry_grasp.rob` (exit status 0). */
export const retryValidate = `tests/fixtures/v1.5/valid/retry_grasp.rob: valid RoboLang 1.5 (1 task)
Validation covers the text of the program only. It does not make a task safe to run on a robot.`;

/** tests/fixtures/v1.6/valid/weigh_and_compare.rob in the core repository, unchanged. */
export const weighSource = `// RoboLang v1.6 fixture: valid
// expect: ok
// why: units convert within a kind; a binding is compared with a literal and with another binding (V5, V6, V7)

robolang 1.6;

task weigh_and_compare(robot r, object a, object b, sensor scale, location bench) {
    goal { robot_at r bench; }
    plan {
        move r to bench;
        measure r mass of a using scale as ma;
        measure r mass of b using scale as mb;
        if ma > 1.2 kg and ma < 2000 g and not mb >= ma {
            communicate r to "ops" with ma;
        } else {
            fail "unexpected weights";
        }
    }
}`;

/** Output of `robolang validate tests/fixtures/v1.6/valid/weigh_and_compare.rob` (exit status 0). */
export const weighValidate = `tests/fixtures/v1.6/valid/weigh_and_compare.rob: valid RoboLang 1.6 (1 task)
Validation covers the text of the program only. It does not make a task safe to run on a robot.`;

/** tests/fixtures/v1.7/valid/keep_out_of_wet_floor.rob in the core repository, unchanged. */
export const wetFloorSource = `// RoboLang v1.7 fixture: valid
// expect: ok
// why: a no_go_region on a region parameter, for the whole task (P1, P2)

robolang 1.7;

task to_lobby(robot r, location lobby, region wet) {
    @safety no_go_region wet;
    goal { robot_at r lobby; }
    plan { move r to lobby; }
}`;

/** Output of `robolang validate tests/fixtures/v1.7/valid/keep_out_of_wet_floor.rob` (exit status 0). */
export const wetFloorValidate = `tests/fixtures/v1.7/valid/keep_out_of_wet_floor.rob: valid RoboLang 1.7 (1 task)
Validation covers the text of the program only. It does not make a task safe to run on a robot.`;

/** tests/fixtures/v1.8/valid/open_then_fetch.rob in the core repository, unchanged. */
export const openClosetSource = `// RoboLang v1.8 fixture: valid
// expect: ok
// why: a do on an object, then plain steps; the goal verifies the state with in_state

robolang 1.8;

task restock(robot r, object closet, object kit, location ward) {
    goal { in_state closet "open"; object_at kit ward; }
    plan {
        do r open closet;
        grasp r kit;
        move r to ward;
        place r kit at ward;
    }
}`;

/** Output of `robolang validate tests/fixtures/v1.8/valid/open_then_fetch.rob` (exit status 0). */
export const openClosetValidate = `tests/fixtures/v1.8/valid/open_then_fetch.rob: valid RoboLang 1.8 (1 task)
Validation covers the text of the program only. It does not make a task safe to run on a robot.`;

/** tests/fixtures/v1.9/valid/shift_cutoff.rob in the core repository, unchanged. */
export const cutoffSource = `// RoboLang v1.9 fixture: valid
// expect: ok
// why: a cutoff with if: a time binding against a time literal (T3)

robolang 1.9;

task shift_cutoff(robot r, object tote, location inb, location outb) {
    plan {
        measure r time as now;
        if now < 21:30 {
            goal { object_at tote outb; }
            move r to inb;
            grasp r tote;
            move r to outb;
            place r tote at outb;
        } else {
            communicate r to "lead" with "after cutoff";
            fail "the shift has ended";
        }
    }
}`;

/** Output of `robolang validate tests/fixtures/v1.9/valid/shift_cutoff.rob` (exit status 0). */
export const cutoffValidate = `tests/fixtures/v1.9/valid/shift_cutoff.rob: valid RoboLang 1.9 (1 task)
Validation covers the text of the program only. It does not make a task safe to run on a robot.`;

/** tests/fixtures/v2.0/valid/shuttle_rounds.rob in the core repository, unchanged. */
export const shuttleSource = `// RoboLang v2.0 fixture: valid
// expect: ok
// why: a count bound, the default policy (stop)

robolang 2.0;

task round(robot r, location home, location far) {
    goal { robot_at r home; }
    plan { move r to far; wait for 5 s; move r to home; }
}

mission shuttle(robot r, location home, location far) {
    repeat at most 30 runs {
        run round(r, home, far);
    };
}`;

/** Output of `robolang validate tests/fixtures/v2.0/valid/shuttle_rounds.rob` (exit status 0). */
export const shuttleValidate = `tests/fixtures/v2.0/valid/shuttle_rounds.rob: valid RoboLang 2.0 (1 task, 1 mission)
Validation covers the text of the program only. It does not make a task safe to run on a robot.`;

/** tests/fixtures/v2.1/valid/mission_until_a_message.rob in the core repository, unchanged. */
export const shiftSource = `// RoboLang v2.1 fixture: valid
// expect: ok
// why: a mission's until takes a message condition (S1, S2)

robolang 2.1;

task round(robot r, location home, location far) {
    goal { robot_at r home; }
    plan { move r to far; wait for 5 s; move r to home; }
}

mission shift(robot r, location home, location far) {
    repeat at most 12 runs {
        run round(r, home, far);
    } until message_received "ops" with "SHIFT END";
}`;

/** Output of `robolang validate tests/fixtures/v2.1/valid/mission_until_a_message.rob` (exit status 0). */
export const shiftValidate = `tests/fixtures/v2.1/valid/mission_until_a_message.rob: valid RoboLang 2.1 (1 task, 1 mission)
Validation covers the text of the program only. It does not make a task safe to run on a robot.`;

/** Written for this site: grasp (step 2) fails once by a scripted fault, so its handler runs. */
export const retryWorld = `{
  "world_schema": "robolang.sim.world",
  "world_schema_version": "1.1",
  "locations": ["shelf", "table"],
  "robots": {
    "arm1": { "ready": true, "location": "shelf", "gripper": true, "max_speed": [{ "value": "1", "unit": "m/s" }] }
  },
  "objects": {
    "box1": { "present": true, "location": "shelf" }
  },
  "tasks": {
    "pick": {
      "bindings": { "r": "arm1", "box": "box1", "src": "shelf", "dst": "table" },
      "faults": [{ "step": 2 }]
    }
  }
}`;

/** Standard error of `robolang simulate` for retry_grasp.rob with retry_world.json. */
export const retrySimulate = `simulation only: run sim-391b3bf811058aaadc2058dd3744d8853e4da57005eb1e00e3af526eddb9ec81: SUCCEEDED`;

/** Selected fields of the run record; each step is cut down to its index, path, status and handled. */
export const retryRecord = `{
  "run_record_schema_version": "1.4",
  "state": "SUCCEEDED",
  "steps": [
    {
      "index": 1,
      "path": "1",
      "status": "succeeded",
      "handled": null
    },
    {
      "index": 2,
      "path": "2",
      "status": "failed",
      "handled": "S251"
    },
    {
      "index": 3,
      "path": "2.else.1",
      "status": "succeeded",
      "handled": null
    },
    {
      "index": 4,
      "path": "3",
      "status": "succeeded",
      "handled": null
    },
    {
      "index": 5,
      "path": "4",
      "status": "succeeded",
      "handled": null
    }
  ]
}`;

/** Standard error of `robolang simulate --mission shuttle` with examples/world.json and --bind. */
export const shuttleSimulate = `simulation only: mission run sim-49a3f4235401b3c35e03d314ad8be1e933f523bd97a240a019518d14d0c4ab51: bounded (run_bound; 30 task runs, 30 verified)`;

/** Selected top-level fields of the mission record printed by the same run. */
export const shuttleRecord = `{
  "mission_record_schema_version": "1.0",
  "outcome": "bounded",
  "ended_by": "run_bound",
  "failure": null,
  "runs_started": 30,
  "runs_verified": 30,
  "runs_failed": 0,
  "end_t_ms": "150000"
}`;

/** Written for this site: a world file 1.6 with one channel and one incoming message at 32 s. */
export const shiftWorld = `{
  "world_schema": "robolang.sim.world",
  "world_schema_version": "1.6",
  "locations": [
    "home",
    "far"
  ],
  "robots": {
    "amr1": {
      "ready": true,
      "location": "home",
      "gripper": false,
      "max_speed": [
        {
          "value": "1",
          "unit": "m/s"
        }
      ]
    }
  },
  "channels": {
    "ops": {
      "from": [
        "rl:agent:ops"
      ]
    }
  },
  "messages": [
    {
      "at": {
        "value": "32",
        "unit": "s"
      },
      "channel": "ops",
      "text": "SHIFT END",
      "from": "rl:agent:ops"
    }
  ],
  "tasks": {}
}`;

/** Standard error of `robolang simulate --mission shift` with shift_world.json and --bind. */
export const shiftSimulate = `simulation only: mission run sim-b5a6bd55c5797926d6eb582e98a1a300e7e20023d0d78b52bdc209056c0118bc: completed (until; 7 task runs, 7 verified)`;

/** Selected top-level fields of the mission record; each run is cut down to its index, times, state and until. */
export const shiftRecord = `{
  "mission_record_schema_version": "1.1",
  "outcome": "completed",
  "ended_by": "until",
  "failure": null,
  "runs_started": 7,
  "runs_verified": 7,
  "end_t_ms": "35000",
  "messages": [
    {
      "t_ms": "32000",
      "channel": "ops",
      "text": "SHIFT END",
      "from": "rl:agent:ops",
      "status": "accepted"
    }
  ],
  "runs": [
    {
      "index": 1,
      "t_start_ms": "0",
      "t_end_ms": "5000",
      "state": "SUCCEEDED",
      "until": "false"
    },
    {
      "index": 2,
      "t_start_ms": "5000",
      "t_end_ms": "10000",
      "state": "SUCCEEDED",
      "until": "false"
    },
    {
      "index": 3,
      "t_start_ms": "10000",
      "t_end_ms": "15000",
      "state": "SUCCEEDED",
      "until": "false"
    },
    {
      "index": 4,
      "t_start_ms": "15000",
      "t_end_ms": "20000",
      "state": "SUCCEEDED",
      "until": "false"
    },
    {
      "index": 5,
      "t_start_ms": "20000",
      "t_end_ms": "25000",
      "state": "SUCCEEDED",
      "until": "false"
    },
    {
      "index": 6,
      "t_start_ms": "25000",
      "t_end_ms": "30000",
      "state": "SUCCEEDED",
      "until": "false"
    },
    {
      "index": 7,
      "t_start_ms": "30000",
      "t_end_ms": "35000",
      "state": "SUCCEEDED",
      "until": "true"
    }
  ]
}`;
