# RoboLang-website

Source for [RoboLang.dev](https://robolang.dev), the developer website for
[RoboLang](https://github.com/rokorobot/RoboLang), an open-source task
description language for robots.

This repository contains only the website. The language implementation, the
grammar and the IR schema live in
[rokorobot/RoboLang](https://github.com/rokorobot/RoboLang), which is the
authoritative source for all specifications.

## Status

The website is under development and is not published yet.

## How it is built

A static site built with [Astro](https://astro.build) and strict TypeScript.
There is no backend, no database, no client-side framework and no JavaScript
shipped to the browser.

| Path | Contents |
|---|---|
| `src/pages/` | The six pages and the 404 page |
| `src/layouts/`, `src/components/` | Shared layout, header, footer, status banner, page head, code block |
| `src/data/facts.ts` | Versions and links into the core repository, pinned to one commit |
| `src/data/examples.ts` | Example task files and captured `robolang` output |
| `src/data/code-theme.ts` | Syntax-highlighting theme and a highlighting grammar for `.rob` |
| `src/styles/global.css` | All styles and the colour tokens |
| `scripts/` | Checks that run against the built site |

## Develop

Requires Node.js 22 or newer.

```bash
npm ci
```

```bash
npm run dev
```

```bash
npm run verify
```

`npm run verify` runs everything CI runs: `astro check`, the build, the link
check and the accessibility check.

## Checks

Both checks read the built pages in `dist/`, so run `npm run build` first.

- `npm run test:links` fails on a broken internal link or fragment, and on any
  link into the core repository that is not pinned to `CORE_COMMIT`. External
  URLs are not fetched.
- `npm run test:a11y` runs axe-core on every built page in jsdom. jsdom does no
  layout, so axe cannot measure contrast itself; instead the script checks the
  colour tokens in `global.css` and every syntax-highlighting colour found in
  the built pages against WCAG AA.

## Design

Industrial editorial: a warm near-black "ink" surface for the header, page
heads, code panels and footer, an off-white "paper" surface for the body, and
one signal orange for key actions, section numbers and markers. Corners are
square and structure comes from rules, not shadows. The tokens are at the top
of `src/styles/global.css`; fonts are system stacks, so nothing is loaded from
another host. Below 64rem the navigation is a `<details>` menu.

## Keeping the site accurate

- Technical facts come from `src/data/facts.ts`, verified against the core
  commit named there. To move to a newer core version, re-verify the facts,
  change `CORE_COMMIT` and re-capture the outputs in `src/data/examples.ts` by
  running the real `robolang` command.
- The site links to the specifications. It does not copy them.
- The site must not claim that task execution, safety enforcement, ROS 2
  integration or AI generation is available in the supported package.

## Deploy

The site is intended for Netlify. The settings are in `netlify.toml`:

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | 22 |

Netlify installs dependencies with `npm ci` because `package-lock.json` is
committed.

## License

Apache-2.0. See [LICENSE](LICENSE).
