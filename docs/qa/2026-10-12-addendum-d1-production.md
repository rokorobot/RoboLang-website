# QA addendum: D1 fix verified on production, 2026-10-12

Follow-up to [the deployed-site QA report](2026-10-12-deployed-site-qa.md).
That report is left as written; this file records what was verified after
defect D1 was merged and deployed.

Automated accessibility checks are not screen-reader testing.

## What changed

Pull request #3 was squash-merged into `main` at 01:26:25 UTC as commit
`ceb4166e4404fe86b08d5fc2756e9e282a4dad25`. Its only change to the website is
the D1 correction in `src/components/Header.astro`. Post-merge GitHub Actions
on `main` passed.

## Deployment provenance: content confirmed, commit identity NOT CONFIRMED

- NOT CONFIRMED: that Netlify's published deploy is commit `ceb4166`. The
  Netlify dashboard and API were not accessible to the tester, and Netlify
  posts no commit status on `main`.
- Observed directly: by 01:26:41 UTC, `https://robolang.netlify.app` served
  the corrected markup, which the previous deploy did not.
- Observed directly: all seven served HTML files are byte-identical (SHA-256)
  to a local build of `ceb4166`, and differ from the files served before the
  merge.

So the production site serves the output of the post-fix source. Which
Netlify deploy record that corresponds to is for the owner to confirm in
Netlify → robolang → Deploys → Published deploy.

## Verified directly on production

Target `https://robolang.netlify.app`, about 01:27 to 01:30 UTC.

| Item | Result | Evidence |
|---|---|---|
| `aria-label="RoboLang.dev home"` on all six public pages | PASS | one occurrence in the HTML of `/`, `/get-started/`, `/reference/`, `/examples/`, `/roadmap/`, `/contribute/`; also on the 404 page |
| Old `aria-label="RoboLang home"` absent | PASS | zero occurrences on all six pages |
| `.dev` span no longer hidden from assistive technology | PASS | no `aria-hidden` on `.tld` on any page |
| Decorative marker still hidden | PASS | `aria-hidden="true"` on the marker span on all six pages |
| Computed accessible name in a real browser | PASS | Chromium's accessibility tree reports `link "RoboLang.dev home"` on all six pages; no element named "RoboLang home" |
| Six public routes return 200, unknown path 404 | PASS | |
| Security headers and Content Security Policy unchanged | PASS | same policy string as in the original report |

## Verified on an equivalent local build, not on production

The production Content Security Policy does not allow a test library to be
loaded into the page, and the policy was not weakened to do so. The browser
axe run was therefore repeated on a local build of `ceb4166`, whose HTML is
byte-identical to what production serves.

| Item | Result | Evidence |
|---|---|---|
| axe-core 4.14.0 in Chromium, seven pages at 375 px (menu closed and open) and 1440 px, 21 runs, WCAG 2 A/AA, 2.1, 2.2 AA and best-practice rules | PASS | 0 violations in all 21 runs |
| `label-content-name-mismatch` | PASS | passes in all 21 runs |

## Status of D1

**Resolved on production**, by direct inspection of the served markup and the
browser's accessibility tree. Not yet confirmed by a human using speech input
or a screen reader.

## Unchanged from the original report

- **F1 remains unresolved.** `http://robolang.netlify.app/` still returns 200
  over plain HTTP without redirecting. This is an open observation, not a
  pass.
- Follow-ups F2 to F6 are unchanged.
- Outstanding gates are unchanged: confirmation of the published deploy
  commit, the human screen-reader pass, Safari, iOS, Android, Firefox and
  Edge, the manual items marked NOT TESTED, and the internal Variant B pilot.

External testers are not to be invited until those gates are closed.
