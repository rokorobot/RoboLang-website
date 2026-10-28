// Checks that the built site keeps the spaces around inline elements.
//
// Astro 7's default `compressHTML: 'jsx'` drops the line break between text and
// an inline element that starts the next source line, so "See" and a link to
// "Contribute" render as "SeeContribute". astro.config.mjs sets
// `compressHTML: true` to prevent that; this check fails if it comes back.
//
// - No text may run straight into an inline element (a, code, strong, em), or
//   an inline element straight into a following word, outside code blocks.
// - A few known sentences must render with their spaces.
import { join } from 'node:path';
import { JSDOM } from 'jsdom';
import { builtPages, dist, pageName, read, report } from './lib.mjs';

const INLINE = 'a, code, strong, em';

/** Sentences that once rendered without a space, keyed by built page. */
const expected = {
  'contribute/index.html': ['the full output and the result of robolang --version.'],
  'index.html': ['with four subcommands: validate, inspect, simulate and arch02.'],
  'get-started/index.html': ['Use --task NAME to show a single task'],
  'reference/index.html': ['preceded by a version marker, robolang 1.1; or robolang 1.2;'],
  'examples/index.html': ['is reported as unit_unspecified_not_enforced: checked, recorded'],
  'roadmap/index.html': ['where Core 0.1 is ambiguous. See Contribute.'],
};

const failures = [];
let inline = 0;
const pages = builtPages();

for (const path of pages) {
  const name = pageName(path);
  const document = new JSDOM(read(path)).window.document;

  for (const element of document.body.querySelectorAll(INLINE)) {
    if (element.closest('pre')) continue;
    inline += 1;
    const before = element.previousSibling;
    const after = element.nextSibling;
    if (before?.nodeType === 3 && /[A-Za-z0-9.,;:]$/.test(before.textContent)) {
      failures.push(`${name}: no space before <${element.localName}>: "…${before.textContent.slice(-20)}${element.textContent.slice(0, 20)}…"`);
    }
    if (after?.nodeType === 3 && /[A-Za-z0-9]$/.test(element.textContent) && /^[A-Za-z0-9]/.test(after.textContent)) {
      failures.push(`${name}: no space after <${element.localName}>: "…${element.textContent.slice(-20)}${after.textContent.slice(0, 20)}…"`);
    }
  }

  const text = document.body.textContent.replace(/\s+/g, ' ');
  for (const sentence of expected[name] ?? []) {
    if (!text.includes(sentence)) failures.push(`${name}: expected text not found: "${sentence}"`);
  }
}

for (const name of Object.keys(expected)) {
  if (!pages.some((path) => pageName(path) === name)) failures.push(`${join(dist, name)} was not built`);
}

report('whitespace', failures, `${pages.length} pages, ${inline} inline elements`);
