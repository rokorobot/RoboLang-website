# Netlify staging and rollback checklist

For the first deployment of this site to a temporary `*.netlify.app` address.
Connecting the repository to Netlify, and later the `RoboLang.dev` domain, are
separate owner-approved steps. This checklist does not authorize either.

## Before connecting

- [ ] `main` is green in GitHub Actions.
- [ ] Record the commit of `main` being deployed: `________`
- [ ] `netlify.toml` is unchanged from the reviewed version.

## Connect the repository (owner, in the Netlify account)

- [ ] Add a new project from Git and choose `rokorobot/RoboLang-website`.
- [ ] Grant Netlify access to this repository only.
- [ ] Production branch: `main`.
- [ ] Confirm Netlify read these settings from `netlify.toml`:

| Setting | Expected value |
|---|---|
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | 22 |
| Base directory | (empty) |
| Functions directory | (none) |

- [ ] No environment variables or secrets are needed in the Netlify UI. Do not
      add any. `netlify.toml` already sets the build command, the publish
      directory and Node 22.
- [ ] Do not add a custom domain.
- [ ] Deploy previews: enable for pull requests.

## Verify the first deploy

- [ ] The deploy log shows dependencies installing without errors from the
      committed `package-lock.json`. Netlify chooses the install command; do
      not require a specific one.
- [ ] The deploy log shows Node 22.
- [ ] The build reports 7 pages (the six routes and the 404 page) and
      finishes without errors.
- [ ] Record the temporary URL: `https://________.netlify.app`
- [ ] The site loads over HTTPS at that URL.
- [ ] The six public routes return HTTP 200: `/`, `/get-started/`,
      `/reference/`, `/examples/`, `/roadmap/`, `/contribute/`.
- [ ] An unknown path, for example `/no-such-page/`, returns HTTP 404 and
      shows the Page not found page.
- [ ] Response headers on `/` include `X-Content-Type-Options`,
      `X-Frame-Options`, `Referrer-Policy` and `Content-Security-Policy`.
- [ ] The browser console shows no Content Security Policy violations on any
      page. Syntax highlighting uses inline styles, which the policy allows.
- [ ] Files under `/_astro/` are served with a one-year immutable cache header.
- [ ] Run the [manual QA checklist](qa-checklist.md) against the temporary URL.

The canonical and Open Graph URLs in the pages point to `https://robolang.dev`
even on the temporary address. That is expected.

To keep the temporary address out of search results until launch, ask the
owner whether to turn on Netlify's site protection or leave it unlisted. This
is a decision, not a default.

## Rollback

Netlify keeps every deploy. Rolling back does not need a Git change.

- [ ] In the project's Deploys list, open the last known-good deploy and choose
      **Publish deploy**. The site serves that deploy within seconds.
- [ ] Choose **Lock to stop auto publishing** so that a later push to `main`
      does not replace it while the problem is investigated.
- [ ] Fix the problem on a branch, check the deploy preview on the pull
      request, then merge.
- [ ] Unlock auto publishing.
- [ ] Record what happened: date, bad commit, good deploy, cause.

If a bad commit must also be removed from `main`, revert it with a new commit.
Do not force-push `main`.

## Before the custom domain (later step, needs owner approval)

- [ ] Manual QA has passed on the temporary URL.
- [ ] The quickstart on Get Started has been re-run against the current core
      repository and still matches.
- [ ] `.dev` domains are HTTPS-only in browsers. After DNS points at Netlify,
      the site is unreachable until Netlify has issued the certificate, so do
      the DNS change when a short gap is acceptable and confirm the
      certificate before announcing the address.
