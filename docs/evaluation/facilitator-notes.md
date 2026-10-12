# Facilitator notes and evaluation criteria

For the person running the [developer evaluation challenge](challenge.md). Do
not give this file to participants: it contains the answers.

Do not invite external testers until the deployed site has passed the
[manual QA checklist](../qa-checklist.md).

## Purpose

To find out whether a developer who has never seen RoboLang can install the
tools, write a valid task and repair an invalid one in about 25 minutes, using
only the website and the diagnostics. The findings are about the product and
its documentation, not about the participant.

## Before a session

- Fill in the website address in the participant's copy of the challenge.
- Send the participant three files only: `challenge.md`, `broken_task.rob` and
  `results-template.md`.
- Check that the reference answers below still hold against the version of
  RoboLang participants will install. They were verified with distribution
  0.1.0a1 at core commit `b3ab75d`.
- Do not help during the session. If a participant asks, tell them to note the
  question in their results and continue.

## Participants

Aim for five to eight people for a first round. Useful spread: at least two
who work with ROS 2, at least two who do not work in robotics, and a mix of
Windows, macOS and Linux. Record only the background categories in the results
template; do not record names.

## Reference answers

### Part 2

One valid answer. Parameter names and order may differ.

```
robolang 1.1;

task deliver_part(robot r, object part, location shelf, location bench) {
    @safety max_speed 0.3 m/s;

    pre {
        robot_ready r;
        object_exists part;
    }

    plan {
        move r to shelf;
        grasp r part;
        move r to bench;
        place r part at bench;
        wait for 2 s;
        communicate r to "line" with "PART_DELIVERED";
    }
}
```

Expected output of `robolang validate deliver_part.rob`:

```
deliver_part.rob: valid RoboLang 1.1 (1 task)
Validation covers the text of the program only. It does not make a task safe to run on a robot.
```

The version marker on the first line is optional. A file that omits the unit
on `max_speed` validates with warning `W401` and does not meet the "no
warnings" goal.

### Part 3

`broken_task.rob` has six problems. With distribution 0.1.0a1 the tool reports
them one per run, in this order, as each is fixed:

| Run | Diagnostic | Fix |
|---|---|---|
| 1 | `9:26: error[E202]: missing ';' after the condition` | Add `;` after `region_clear cell` |
| 2 | `15:19: error[E206]: duration '3' has no unit; expected one of 'ms', 's', 'min'` | `wait for 3 s;` |
| 3 | `13:19: error[E304]: 'part' is an object, but 'move ... to' expects a location here` | `move r to bin;` |
| 4 | `17:25: error[E303]: undeclared name 'tray': it is not a parameter of this task` | `place r part at bin;` |
| 5 | `18:38: error[E307]: empty string: a message must not be empty` | Any non-empty message |
| 6 | `5:23: warning[W401]: 'max_speed' has no unit; ...` (file is now valid) | `max_speed 0.4 m/s;` |

A participant who fixes several problems at once will see fewer runs. That is
fine.

### Part 4

1. No. Validation covers the text of the program only. The tools do not
   execute tasks, and `@safety` limits and `pre` conditions are declared, not
   enforced. Full marks need the idea that valid means well formed, not safe.
2. Distribution 0.1.0a1 is the installable Python package; language 1.1 is the
   syntax and rules of `.rob` files; IR schema 1.0 is the shape of the JSON
   from `inspect --json`.
3. Any answer about handing a validated task to another program as structured
   data is correct.

## Evaluation criteria

Score each session from the returned results template.

| Measure | Target | How it is measured |
|---|---|---|
| Install success | Works without help | Part 1 completed: yes or no |
| Time to first command | 5 minutes or less | Time when `robolang --version` worked |
| Output matches documentation | Yes | Participant's answer in Part 1 |
| Task written | Valid with no warnings | Part 2 completed: yes or no |
| Time to valid task | 10 minutes or less | Part 2 time |
| Broken task repaired | Valid with no warnings | Part 3 completed: yes or no |
| Time to repair | 7 minutes or less | Part 3 time |
| Diagnostics understood | No more than one unclear | Count of diagnostics marked unclear |
| Safety understanding | Correct | Part 4 question 1 |
| Version understanding | All three correct | Part 4 question 2 |
| Whole challenge | 25 minutes or less | Total time |

### Reading a round of results

The developer preview is ready for a wider audience when, across a round:

- at least 80% of participants complete Parts 1, 2 and 3 without help;
- the median total time is 25 minutes or less;
- every participant answers the safety question correctly.

The safety question is the one with no tolerance. A single participant who
concludes that a valid task is safe to run is a blocking finding: fix the
wording on the website or in the tool and run another round.

These thresholds are a starting proposal. Agree them with the project owner
before the first round, and do not change them after seeing results.

### What to do with findings

- A step where two or more participants stalled is a documentation or
  diagnostic defect. File it in the right repository.
- A diagnostic two or more participants marked unclear is a defect in the
  message. File it in the core repository with the participants' wording.
- Record observations about the tool reporting one problem per run. Part 3
  needs up to six runs, and participants may comment on it.
- Keep the anonymous results files. Do not publish free-text answers without
  checking them for identifying details.
