// Checks every link in the built site (dist/).
//
// - Internal links must be root-relative and resolve to a built file; a
//   #fragment must match an id on the target page.
// - Links to files in the core repository must be pinned to CORE_COMMIT from
//   src/data/facts.ts, so the site never points at a moving branch.
//
// External URLs are not fetched: that would make CI depend on the network.
import { existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { JSDOM } from 'jsdom';
import { builtPages, dist, pageName, read, report, root } from './lib.mjs';

const facts = read(join(root, 'src', 'data', 'facts.ts'));
const commit = facts.match(/CORE_COMMIT = '([0-9a-f]{40})'/)?.[1];
const coreRepo = facts.match(/CORE_REPO = '([^']+)'/)?.[1];
if (!commit || !coreRepo) {
  console.error('Could not read CORE_COMMIT and CORE_REPO from src/data/facts.ts.');
  process.exit(2);
}

const pages = builtPages();
const documents = new Map(pages.map((path) => [path, new JSDOM(read(path)).window.document]));

/** Map a root-relative URL path to the file it is served from, or null. */
function resolveInternal(pathname) {
  const target = join(dist, decodeURIComponent(pathname));
  if (existsSync(target) && statSync(target).isFile()) return target;
  const index = join(target, 'index.html');
  if (pathname.endsWith('/') && existsSync(index)) return index;
  return null;
}

const failures = [];
let internal = 0;
let external = 0;
let pinned = 0;

for (const [path, document] of documents) {
  const name = pageName(path);
  const urls = [
    ...[...document.querySelectorAll('a[href], link[href]')].map((el) => el.getAttribute('href')),
    ...[...document.querySelectorAll('img[src], script[src]')].map((el) => el.getAttribute('src')),
  ];

  for (const url of urls) {
    if (/^https?:\/\//.test(url)) {
      external += 1;
      const core = url.startsWith(`${coreRepo}/blob/`) || url.startsWith(`${coreRepo}/tree/`);
      if (core) {
        pinned += 1;
        if (!url.includes(`/${commit}/`)) {
          failures.push(`${name}: core repository link is not pinned to ${commit.slice(0, 7)}: ${url}`);
        }
      }
      continue;
    }

    internal += 1;
    const [pathPart, fragment] = url.split('#');

    if (pathPart === '') {
      if (fragment && !document.getElementById(fragment)) {
        failures.push(`${name}: no element with id "${fragment}" for link ${url}`);
      }
      continue;
    }
    if (!pathPart.startsWith('/')) {
      failures.push(`${name}: internal link must be root-relative: ${url}`);
      continue;
    }
    const target = resolveInternal(pathPart);
    if (!target) {
      failures.push(`${name}: broken internal link ${url}`);
      continue;
    }
    if (fragment && !documents.get(target)?.getElementById(fragment)) {
      failures.push(`${name}: no element with id "${fragment}" on target of ${url}`);
    }
  }
}

report(
  'links',
  failures,
  `${pages.length} pages, ${internal} internal links, ${external} external links, ${pinned} pinned to ${commit.slice(0, 7)}`,
);
