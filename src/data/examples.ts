// Example programs and the output of the real `robolang` command for each.
//
// Every output below was captured by running distribution 0.1.0a1 from
// rokorobot/RoboLang at the commit pinned in facts.ts. Do not edit an output
// by hand: re-run the command and paste the result. The one exception is
// pickAndPlaceJson, where line breaks are condensed for display; the keys,
// values and their order are unchanged.

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

export const versionOutput = `robolang 0.1.0a1 (language 1.1, IR schema 1.0)`;

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
