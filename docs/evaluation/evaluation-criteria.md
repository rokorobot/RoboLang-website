# Evaluation criteria

How a round of the [developer evaluation challenge](challenge.md) is run and
read. This file contains no answers. Facilitator reference answers are kept
privately and are not in this repository.

Status: **proposed**. The project owner finalizes these criteria before any
external tester is invited, and they are not changed after results are seen.

## Purpose

To find out whether a developer who has never seen RoboLang can install the
tools, write a valid task and repair an invalid one in about 25 minutes, using
only the website and the diagnostics. The findings are about the product and
its documentation, not about the participant.

## Preconditions

- The deployed site has passed the [manual QA checklist](../qa-checklist.md).
- An internal pilot has been run (see below).
- The criteria in this file have been finalized.

## The challenge variant

The challenge and the broken task file in this repository are a public sample.
Their answers have appeared in this repository's public history, so real
sessions use an equivalent private variant: the same four parts and time
budgets, with a different task to write and a different broken file. The
variant and its reference answers are held privately by the facilitator.

## Running a session

- Participants receive three files only: the challenge, the broken task file
  and the [results template](results-template.md).
- The facilitator does not help during the session. A participant who asks is
  told to note the question in their results and continue.
- The 25 minutes cover Parts 1 to 4. Completing the results template is done
  afterwards and is not timed.
- Aim for five to eight participants in a first round, with a mix of robotics
  and non-robotics backgrounds and of Windows, macOS and Linux.

## Results and privacy

- Completed results templates are collected privately by the facilitator. They
  are not posted as GitHub issues, because free-text answers may identify the
  participant.
- Record background categories only. Do not record names.
- Individual usability problems may be filed as public issues once they are
  reworded so that they contain no participant detail: website, onboarding and
  documentation problems in this repository, and language, validator or
  `robolang` command defects in the
  [core repository](https://github.com/rokorobot/RoboLang/issues).

## Measures

| Measure | Target | Source |
|---|---|---|
| Install completed unaided | Yes | Part 1 |
| Time to first working command | 5 minutes or less | Part 1 |
| Output matches the documentation | Yes | Part 1 |
| Task written, valid with no warnings | Yes | Part 2 |
| Time to valid task | 10 minutes or less | Part 2 |
| Broken task repaired, valid with no warnings | Yes | Part 3 |
| Time to repair | 7 minutes or less | Part 3 |
| Diagnostics understood | No more than one marked unclear | Parts 2 and 3 |
| Version numbers understood | All three correct | Part 4 |
| Safety understood | Correct | Part 4 |
| Time for Parts 1 to 4 | 25 minutes or less | Total |

## Readiness thresholds

There are two kinds of criterion, and they are read differently.

### Usability targets

- At least **80%** of participants complete all three practical parts
  (Parts 1, 2 and 3) unaided. This threshold is provisional for a first round
  of five to eight participants.
- The **median** time for Parts 1 to 4 is **25 minutes or less**.

These are targets for the product. The 25 minutes is not a pass or fail mark
for an individual: a participant who takes longer has shown where the
documentation or the diagnostics cost time. Missing a usability target means
finding and fixing the cause and, if the change is substantial, running
another round.

### Safety communication (blocking)

- **Every** participant correctly understands that a task which validates is
  not thereby safe to run on a robot.

RoboLang validates task descriptions. It does not establish whether executing
them on physical hardware would be safe. If any participant concludes that
successful validation guarantees safe operation, that is a blocking finding
about the documentation or the diagnostic wording, not about the participant.
Investigate where the impression came from, correct the wording on the website
or in the tool, and run another round before widening the audience.

## Internal pilot

Run the challenge with one or two people inside the project before any
external session, to check the time budgets.

A known concern to test: the validator reports one problem per run on the
sample broken file, so repairing its six problems takes up to six
edit-and-validate cycles. Six sequential diagnostics in seven minutes may be
too demanding. If the pilot shows that, shorten the broken file or lengthen
Part 3 before external testing, and record the one-problem-per-run behaviour
as a usability observation for the core repository.

## Reading the findings

- A step where two or more participants stalled is a documentation or
  diagnostic defect.
- A diagnostic that two or more participants marked unclear is a defect in the
  message. Report it with the participants' wording, anonymized.
- Do not publish free-text answers without checking them for identifying
  details.
