# Outstanding manual checks

What still needs a person before external testers are invited. Status as of
2026-10-12. Automated results are in
[the deployed-site QA report](2026-10-12-deployed-site-qa.md) and
[its addendum](2026-10-12-addendum-d1-production.md).

Automated accessibility checks are not screen-reader testing. Nothing in this
file has been done yet unless it says so.

## 1. Confirm the published deployment in Netlify

Open: the tester had no access to the Netlify dashboard or API, so the
published deploy has never been matched to a commit.

Steps for the owner:

1. On GitHub, open the repository's commit list for `main` and copy the full
   SHA of the latest commit.
2. In Netlify, open the project **robolang** and go to **Deploys**.
3. Find the deploy labelled **Published**. Check that its branch is `main` and
   that it is a production deploy, not a deploy preview or branch deploy.
4. Open that deploy. Its summary shows the commit it was built from; follow
   the commit link to GitHub and compare the SHA with step 1.
5. Check that auto publishing is on, meaning no deploy is locked. A locked
   deploy would explain a published commit older than `main`.
6. In the deploy log, confirm that dependencies installed without errors,
   that Node 22 was used and that the build reported 7 pages.
7. Record the result here or in a new dated QA note: date, published deploy
   ID, commit SHA, and whether it matched.

If the published commit is older than `main`, look at the newest deploy in
the list. A failed build there is the usual cause. Do not change Netlify
settings as part of this check.

## 2. Screen reader

Checklist section 5. Use NVDA with Firefox or Chrome on Windows, or VoiceOver
with Safari on macOS or iOS. Check Home, Get Started and Examples.

- [ ] Page titles are announced and differ per page.
- [ ] Landmarks are present: project status, header, main navigation, main,
      footer navigation.
- [ ] One level-1 heading per page; the heading list reads as an outline.
- [ ] The brand link is announced as "RoboLang.dev home".
- [ ] The Menu button is announced as collapsed or expanded.
- [ ] The current page is announced in the navigation.
- [ ] Tables announce their column and row headers.
- [ ] Code panels are announced with their caption and are readable line by
      line.
- [ ] Decorative squares, rules and crop marks are not announced.
- [ ] Note how the CSS-generated section numbers ("01 /") and the brackets
      around status labels are spoken, and whether that is confusing.

## 3. Other browsers and devices

Checklist section 1. Only Chromium on Windows has been tested.

- [ ] Firefox (desktop)
- [ ] Edge (desktop)
- [ ] Safari on macOS
- [ ] Safari on iOS
- [ ] Chrome on Android

On each: Home and Examples load correctly, the Menu button opens and closes
by touch or click, code panels scroll sideways, and nothing overflows the
page. Fonts differ by platform; note what looks broken, not merely different.

## 4. Remaining manual items

- [ ] Code panels scroll sideways with the arrow keys when focused. The
      automated attempt was inconclusive.
- [ ] Tab order follows the visual order on every page, and nothing traps
      focus.
- [ ] Page zoom at 200% on desktop: content reflows and stays usable.
- [ ] Phone in landscape: header and menu usable.
- [ ] Print preview gives readable output. There is no print stylesheet.
- [ ] Rendered colour contrast inside code panels looks sufficient. axe left
      some of these undecided.
- [ ] A person using speech input can activate the brand link by its visible
      name.

## 5. Open observations needing a decision

These are recorded in the QA report and are not resolved.

- Plain HTTP on the `netlify.app` address returns 200 without redirecting to
  HTTPS.
- The status strip is three lines at a content width of 360 px or less.
- Table row headers are set as uppercase labels.
- There is no `robots.txt` or sitemap, and the temporary address is
  indexable.
- CI accessibility checks cannot evaluate rules that need rendering.

## 6. Internal pilot

Not run. It uses the private challenge variant and is prepared outside this
repository. It also covers following Get Started on a clean machine. The
criteria in [evaluation-criteria.md](../evaluation/evaluation-criteria.md) are
final.
