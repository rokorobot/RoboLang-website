// Accessibility checks on the built site (dist/), not on the source.
//
// 1. Runs axe-core against every built page in jsdom.
// 2. jsdom does no layout or painting, so axe cannot measure colour contrast
//    there. Instead, the colour tokens in src/styles/global.css are checked
//    directly: every text/background pair listed below must meet WCAG AA
//    (4.5:1).
// 3. Every syntax-highlighting colour found in the built pages is checked
//    against the code panel background.
//
// This does not replace a manual check with a keyboard and a screen reader.
import { join } from 'node:path';
import axe from 'axe-core';
import { JSDOM, VirtualConsole } from 'jsdom';
import { builtPages, pageName, read, report, root } from './lib.mjs';

const failures = [];

// ---- 1. axe-core on each built page --------------------------------------
const pages = builtPages();
let rulesPassed = 0;

for (const path of pages) {
  const dom = new JSDOM(read(path), {
    runScripts: 'outside-only',
    pretendToBeVisual: true,
    // Not forwarded: jsdom logs a notice for each canvas probe axe makes.
    virtualConsole: new VirtualConsole(),
  });
  dom.window.eval(axe.source);
  const results = await dom.window.axe.run(dom.window.document, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] },
    rules: { 'color-contrast': { enabled: false } },
  });
  rulesPassed += results.passes.length;
  for (const violation of results.violations) {
    for (const node of violation.nodes) {
      failures.push(`${pageName(path)}: [${violation.id}] ${violation.help} -> ${node.target.join(' ')}`);
    }
  }
  dom.window.close();
}

// ---- 2. contrast of the design tokens -------------------------------------
const css = read(join(root, 'src', 'styles', 'global.css'));
const rootBlock = css.match(/:root\s*{([^}]*)}/)?.[1] ?? '';
const tokens = Object.fromEntries(
  [...rootBlock.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)].map((m) => [m[1], m[2]]),
);

// [foreground, background] pairs that are used together in global.css.
const pairs = [
  // paper surface
  ['ink', 'paper'],
  ['ink', 'paper-2'],
  ['muted', 'paper'],
  ['muted', 'paper-2'],
  ['signal-ink', 'paper'],
  ['signal-ink', 'paper-2'],
  // ink surface
  ['paper-ink', 'ink'],
  ['paper-ink', 'ink-2'],
  ['dim', 'ink'],
  ['dim', 'ink-2'],
  ['signal', 'ink'],
  ['signal', 'ink-2'],
  // buttons
  ['ink', 'signal'],
  ['ink', 'paper-ink'],
];

function luminance(hex) {
  const channel = (i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(1) + 0.7152 * channel(3) + 0.0722 * channel(5);
}

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

let pairsChecked = 0;
for (const [fg, bg] of pairs) {
  if (!tokens[fg] || !tokens[bg]) {
    failures.push(`contrast: token --${fg} or --${bg} is missing from :root`);
    continue;
  }
  pairsChecked += 1;
  const ratio = contrast(tokens[fg], tokens[bg]);
  if (ratio < 4.5) {
    failures.push(`contrast: --${fg} on --${bg} is ${ratio.toFixed(2)}:1 (needs 4.5:1)`);
  }
}

// ---- 3. contrast of syntax highlighting in the built pages ----------------
// Code panels sit on --ink-2. Every colour the highlighter wrote into the
// built HTML must be readable on it.
const codeColours = new Set();
for (const path of pages) {
  const document = new JSDOM(read(path)).window.document;
  for (const el of document.querySelectorAll('pre.astro-code, pre.astro-code span[style]')) {
    const colour = el.getAttribute('style')?.match(/(?:^|;)\s*color:\s*(#[0-9a-fA-F]{6})/)?.[1];
    if (colour) codeColours.add(colour.toLowerCase());
  }
}
if (codeColours.size === 0) failures.push('contrast: found no syntax highlighting colours in the built pages');
for (const colour of codeColours) {
  const ratio = contrast(colour, tokens['ink-2']);
  if (ratio < 4.5) {
    failures.push(`contrast: code colour ${colour} on --ink-2 is ${ratio.toFixed(2)}:1 (needs 4.5:1)`);
  }
}

report(
  'accessibility',
  failures,
  `${pages.length} pages, ${rulesPassed} axe rule passes, ${pairsChecked} token pairs and ${codeColours.size} code colours at AA`,
);
