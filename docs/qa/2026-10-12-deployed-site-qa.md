# Deployed-site QA, 2026-10-12 (RL-11F-C)

Automated and real-browser QA of the site at `https://robolang.netlify.app`,
following [the manual QA checklist](../qa-checklist.md). Every item is PASS,
FAIL or NOT TESTED.

**Automated accessibility checks are not screen-reader testing.** The human
screen-reader pass, Safari, iOS and Android coverage, and the internal pilot
are outstanding gates, listed at the end.

## Summary

| | Count |
|---|---|
| FAIL | 1 (accessible name of the header brand link, defect D1) |
| Follow-up items | 6 |
| Outstanding manual gates | 4 |

No website behaviour was changed. The correction for D1 is proposed below and
waits for owner approval.

## Test conditions

- Date: 2026-10-12, about 01:10 to 01:20 UTC.
- Target: `https://robolang.netlify.app`.
- HTTP checks: `curl` and Node `fetch` from Windows 10.
- Browser: the Chromium-based browser pane of the Claude desktop app on
  Windows 10, with viewport emulation. This is one browser engine only.
- axe-core 4.14.0.

## Deployment provenance: NOT CONFIRMED

Whether the published deploy is `main` commit
`b5ab8de45ffb4a7c5b2564db8e52c5d5e62d6768` could not be confirmed.

- Netlify posts no commit status on `main` commits, and the GitHub deployments
  API lists nothing for this repository.
- The Netlify dashboard and API were not accessible to the tester.
- The served pages carry no commit identifier.

What was observed: all seven served HTML files and the stylesheet are
byte-identical (SHA-256) to a local build of `b5ab8de`. This does **not**
identify the commit, because RL-11F-B changed no site output, so a build of
the previous `main` commit `6c41b3b` produces the same files. To close this,
the owner checks Netlify → robolang → Deploys → Published deploy.

Because of the identical bytes, two checks below were run against a local
build of `b5ab8de` where the deployed site's Content Security Policy prevents
the tooling from running. Those rows say "local build".

## 1. Routes and responses

| Item | Result | Evidence |
|---|---|---|
| Six public routes return HTTP 200 | PASS | `/`, `/get-started/`, `/reference/`, `/examples/`, `/roadmap/`, `/contribute/` all 200 |
| Unknown path returns HTTP 404 with the Page not found page | PASS | `/no-such-page/` → 404, title "Page not found \| RoboLang" |
| Path without trailing slash redirects | PASS | `/examples` → 301 → `/examples/` |
| Site loads over HTTPS | PASS | |
| Plain HTTP redirects to HTTPS | FAIL as observed, see follow-up F1 | `curl -I http://robolang.netlify.app/` → 200, no redirect |

## 2. Headers, security policy and caching

| Item | Result | Evidence |
|---|---|---|
| `X-Content-Type-Options: nosniff` | PASS | on `/` and on assets |
| `X-Frame-Options: DENY` | PASS | on `/` and on the 404 response |
| `Referrer-Policy: strict-origin-when-cross-origin` | PASS | |
| `Content-Security-Policy` as in `netlify.toml` | PASS | `default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; base-uri 'self'; form-action 'none'; frame-ancestors 'none'` |
| `Strict-Transport-Security` | PASS | `max-age=31536000; includeSubDomains; preload` (set by Netlify) |
| `/_astro/*` cached one year, immutable | PASS | `Cache-Control: public,max-age=31536000,immutable` on the stylesheet |
| HTML is revalidated | PASS | `Cache-Control: public,max-age=0,must-revalidate` |
| No Content Security Policy violations in the console | PASS | Chromium, all six pages at 375 px; the only console entry was the expected 404 for `/no-such-page/` |
| No scripts are served | PASS | `document.scripts.length` is 0 on the deployed homepage |

## 3. Links and metadata

| Item | Result | Evidence |
|---|---|---|
| Internal links and fragments resolve | PASS | 12 distinct internal targets fetched from the deployed pages, 0 failures |
| External links open | PASS | 15 distinct external URLs, all 200 |
| Links into the core repository open at the pinned commit | PASS | 10 pinned `blob`/`tree` URLs at `b3ab75d`, all 200 |
| Each page has a distinct title | PASS | six titles, all different |
| Each page has a meta description | PASS | 114 to 164 characters |
| Canonical and `og:url` | PASS | point to `https://robolang.dev/...`, as intended before the domain is connected |
| `lang="en"`, viewport meta, one `h1` per page | PASS | all six pages |
| Favicon served | PASS | 200, `image/svg+xml` |
| `robots.txt` and sitemap | NOT TESTED as a requirement | both return 404; see follow-up F4 |

## 4. Responsive layout

Deployed site, Chromium, emulated 375 × 812, all six pages:

| Item | Result | Evidence |
|---|---|---|
| No horizontal page scroll | PASS | `scrollWidth` 375 on every page |
| Menu button shown, link row hidden | PASS | |
| Status strip at most two lines at 375 px | PASS | 50 px tall (two lines) |
| No clipped heading, button, chip, label or table header | PASS | 0 elements wider than their box |
| No element outside the viewport, other than inside code panels and table scrollers | PASS | 0 |
| Code panels scroll inside themselves | PASS | e.g. 8 of 11 panels on Get Started overflow internally; page width unchanged |

Local build of `b5ab8de`, Chromium, seven pages (six routes and the 404 page)
at each of 320, 375, 768, 1023, 1024, 1440 and 1920 px, 49 combinations:

| Item | Result | Evidence |
|---|---|---|
| No horizontal page scroll | PASS | 0 of 49 |
| No clipped or out-of-bounds element | PASS | 0 of 49 |
| Menu button below 1024 px; six links on one line from 1024 px | PASS | switches between 1023 and 1024; link row is 48 px tall (one line) at 1024, 1440 and 1920 |
| Status strip height | PASS at 768 px and up (one line) | three lines when the content width is 360 px or less; see follow-up F2 |

| Item | Result |
|---|---|
| Page zoom at 200% | NOT TESTED |
| Phone in landscape | NOT TESTED |
| Deployed site at 768, 1024, 1440 and 1920 px on every page | NOT TESTED directly; covered by the local build above and by the deployed homepage at 1440 px |

## 5. Navigation and keyboard

Deployed site, Chromium, real key events.

| Item | Result | Evidence |
|---|---|---|
| First Tab shows "Skip to content" | PASS | [screenshot](evidence/skip-link-focus-375.jpg) |
| Enter on the skip link moves on to the main content | PASS | URL becomes `#main`; the next Tab lands on the first link inside `main`, not in the header |
| Menu opens with Enter | PASS | `details.open` true |
| Menu links reachable with Tab, focus visible | PASS | focus on "Home", 3 px signal-orange outline; [screenshot](evidence/menu-open-keyboard-focus-375.jpg) |
| Menu closes with Space | PASS | `details.open` false |
| Menu opens on a pointer click | PASS | local build, Chromium, 375 px |
| Every focusable element shows a visible focus outline | PASS | 28 focusable elements at 375 px on Examples and 23 at 1440 px on Home; all match `:focus-visible` with a solid outline of at least 2 px |
| No positive `tabindex` | PASS | 0 |
| Code panels are focusable | PASS | `tabindex="0"`, outline shown |
| Code panels scroll sideways with the arrow keys | NOT TESTED (inconclusive) | two attempts showed no scroll, but the browser window was not drawing at the time, which stops key-driven scroll animation. Needs a manual check |
| Header links mark the current page | PASS | `aria-current="page"` on the matching link in the link row and in the menu, on all six deployed pages |
| Tab order follows visual order on every page | NOT TESTED beyond the above | |
| Nothing traps focus | NOT TESTED exhaustively | none seen |

## 6. Automated accessibility (axe)

| Item | Result | Evidence |
|---|---|---|
| axe-core in CI (jsdom) on the built pages | PASS | 0 violations, but see follow-up F5 |
| axe-core in Chromium, local build, seven pages at 375 px (menu closed and open) and 1440 px, 21 runs, WCAG 2 A/AA, 2.1, 2.2 AA and best-practice rules | **FAIL: 1 rule** | `label-content-name-mismatch` (serious) on the header brand link, on every page. Defect D1 |
| Colour contrast on rendered pages | PASS with items for human review | 0 contrast violations in all 21 runs; 19 to 334 text nodes passed per page. axe could not decide some nodes (up to 63 on Examples at 375 px, mostly text inside code panels). Follow-up F6 |

## 7. Content

| Item | Result | Evidence |
|---|---|---|
| Status strip on every page, full hardware warning in every footer | PASS | present in all six deployed pages |
| Version numbers agree across pages | PASS | generated from one source file |
| Site works with JavaScript disabled | PASS | the site serves no scripts; the menu is a `<details>` element |
| Following Get Started on a clean machine reproduces the output | NOT TESTED | belongs to the internal pilot |
| Print output | NOT TESTED | |

## 8. Browsers and assistive technology

| Item | Result |
|---|---|
| Chromium (desktop, Windows) | Tested as above |
| Firefox | NOT TESTED |
| Edge | NOT TESTED |
| Safari on macOS | NOT TESTED |
| Safari on iOS | NOT TESTED |
| Chrome on Android | NOT TESTED |
| Screen reader (NVDA or VoiceOver) | NOT TESTED |

## Defect

### D1. Header brand link: visible text is not in its accessible name

- Where: every page, the "RoboLang.dev" link at the top left.
- Rule: axe `label-content-name-mismatch`, impact serious. WCAG 2.5.3 Label in
  Name, Level A.
- Cause: `src/components/Header.astro` gives the link
  `aria-label="RoboLang home"`, while its visible text reads "RoboLang.dev".
  A speech-input user who says the visible label may not activate the link.
- Why CI missed it: the rule depends on what is visibly rendered, and jsdom
  does not render.
- Proposed correction, **not applied**: change the label so that it starts
  with the visible text, `aria-label="RoboLang.dev home"`, and remove
  `aria-hidden` from the `.dev` span. One line in one file; no visual change.
- Suggested severity: fix before external testers are invited. It does not
  block the internal pilot.

## Follow-up items

- **F1. Plain HTTP is served without a redirect** on the `netlify.app`
  address. HSTS is sent, so browsers upgrade after the first HTTPS visit, and
  `.dev` domains are HTTPS-only in browsers, so the custom domain is not
  affected. Check the HTTPS setting in Netlify when the domain is configured.
- **F2. The status strip is three lines** when the content width is 360 px or
  less (common Android width, and 320 px). It is two lines at 375 px.
- **F3. Row headers in tables are set as uppercase monospace labels**, so
  repository names on Contribute read "ROKOROBOT/ROBOLANG". Cosmetic; decide
  whether row headers should keep normal text.
  [screenshot](evidence/contribute-375.jpg)
- **F4. No `robots.txt` and no sitemap, and the temporary address is
  indexable.** Decide whether to keep the `netlify.app` address out of search
  results until launch, and whether to add a sitemap for `robolang.dev`.
- **F5. CI accessibility checks run in jsdom** and cannot evaluate rules that
  need rendering, which is how D1 passed CI. Consider a real-browser axe run
  before each release.
- **F6. axe left some contrast results undecided**, mostly text in code
  panels. The highlight colours pass the token check in CI; a person should
  confirm on screen.

## Outstanding gates

1. **Published deploy commit**: confirm in the Netlify dashboard that the
   published deploy is `b5ab8de`.
2. **Human screen-reader pass** (checklist section 5), including how the
   CSS-generated section numbers and status brackets are spoken.
3. **Safari, iOS, Android, Firefox and Edge** (checklist section 1), plus the
   manual items above marked NOT TESTED: arrow-key scrolling of code panels,
   200% zoom, landscape and print.
4. **Internal pilot** of the private Variant B challenge, which also covers
   following Get Started on a clean machine.

External testers are not to be invited until these are closed.
