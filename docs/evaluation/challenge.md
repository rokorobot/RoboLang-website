# RoboLang developer evaluation challenge

Thank you for trying RoboLang. The challenge takes about **25 minutes**. You do
not need a robot, a simulator or ROS 2.

The 25 minutes cover Parts 1 to 4 only. Filling in the results template comes
afterwards and is not timed. During the challenge, jot down times and
diagnostic codes as you go; write up everything else at the end.

We are testing the tools and the documentation, not you. If something is
confusing, that is exactly what we want to learn. Please do not ask the
organisers for help during the challenge; if you get stuck on a part for more
than its time budget, write down where and move on.

RoboLang's tools only check and describe task files. Nothing in this challenge
executes a task or controls hardware.

## What you need

- Python 3.11 or newer, and Git.
- The website: `________` (the organiser fills in the address).
- A timer.
- The results template you were given.

Use only the website and the tool's own output. Please do not read the source
code or the specifications in the repository until you have finished; we want
to know whether the website and the diagnostics are enough.

## Part 1: Install and run (5 minutes)

1. Start your timer.
2. Follow the website's Get Started page to install RoboLang.
3. Run the version command and the two commands the page shows on the bundled
   example.

Record: the time when `robolang --version` first worked, whether your output
matched the page, and anything that did not go as the page said.

## Part 2: Write a task (10 minutes)

Create a file named `deliver_part.rob` that describes this task:

> A robot picks up a part from a shelf and delivers it to a bench. It moves to
> the shelf, grasps the part, moves to the bench and places the part there.
> Then it waits two seconds and sends the message `PART_DELIVERED` to the
> channel `line`.
>
> Before starting, the robot must be ready and the part must exist.
>
> The task declares a speed limit of 0.3 metres per second.

Your file is finished when `robolang validate deliver_part.rob` reports that it
is valid **with no warnings**.

Then run `robolang inspect deliver_part.rob` and check that what it prints
matches the description above.

Record: the time when the file first validated, how many times you ran
`validate`, each diagnostic code you saw, and which website pages you used.

## Part 3: Fix a broken task (7 minutes)

You were given `broken_task.rob`. It contains several mistakes. Fix it until
`robolang validate broken_task.rob` reports that it is valid with no warnings.

Keep the task's intent: the robot moves to the bin, grasps the part, waits
three seconds, then places the part at the bin and reports to the channel
`line`. Where a message is missing, choose a sensible one.

Record: the time when the file validated, each diagnostic code you saw in the
order you saw it, and any diagnostic you did not understand at first.

## Part 4: Three questions (3 minutes)

Answer from what you have seen. There are no trick questions.

1. If `robolang validate` says a file is valid, is the task safe to run on a
   robot? Why or why not?
2. The tool printed three version numbers. What does each one refer to?
3. What would you use the JSON output of `robolang inspect --json` for?

## Finish

Stop your timer and note the total. The challenge is over.

Now complete the results template in your own time and send it back privately,
the way the organiser asked. Please do not post it as a public issue. Thank
you.
