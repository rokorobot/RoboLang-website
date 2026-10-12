// Accessibility checks on the built site (dist/), not on the source.
//
// 1. Runs axe-core against every built page in jsdom.
// 2. jsdom does no layout or painting, so axe cannot measure colour contrast
//    there. Instead, the colour tokens in src/styles/global.css are checked
//    directly: every text/background pair must meet WCAG AA (4.5:1) in both
//    the light and the dark theme.
//
// This does not replace a manual check with a keyboard and a screen reader.
import { join } from 'node:path';
import axe from 'axe-core';
import { JSDOM } from 'jsdom';
import { builtPages, pageName, read, report, root } from './lib.mjs';

const failures = [];

// ---- 1. axe-core on each built page --------------------------------------
const pages = builtPages();
let rulesPassed = 0;

for (const path of pages) {
  const dom = new JSDOM(read(path), { runScripts: 'outside-only', pretendToBeVisual: true });
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
const darkStart = css.indexOf('@media (prefers-color-scheme: dark)');
const rootBlock = (text) => text.match(/:root\s*{([^}]*)}/)?.[1] ?? '';
const tokens = (block) =>
  Object.fromEntries([...block.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)].map((m) => [m[1], m[2]]));

const light = tokens(rootBlock(css.slice(0, darkStart)));
const themes = { light, dark: { ...light, ...tokens(rootBlock(css.slice(darkStart))) } };

// [foreground, background] pairs that are used together in global.css.
const pairs = [
  ['text', 'bg'],
  ['muted', 'bg'],
  ['accent', 'bg'],
  ['text', 'surface'],
  ['muted', 'surface'],
  ['accent', 'surface'],
  ['on-accent', 'accent'],
  ['banner-text', 'banner-bg'],
  ['code-text', 'code-bg'],
  ['muted', 'code-bg'],
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
for (const [themeName, theme] of Object.entries(themes)) {
  for (const [fg, bg] of pairs) {
    if (!theme[fg] || !theme[bg]) {
      failures.push(`contrast: token --${fg} or --${bg} is missing in the ${themeName} theme`);
      continue;
    }
    pairsChecked += 1;
    const ratio = contrast(theme[fg], theme[bg]);
    if (ratio < 4.5) {
      failures.push(
        `contrast: --${fg} on --${bg} is ${ratio.toFixed(2)}:1 in the ${themeName} theme (needs 4.5:1)`,
      );
    }
  }
}

report(
  'accessibility',
  failures,
  `${pages.length} pages, ${rulesPassed} axe rule passes, ${pairsChecked} colour pairs at AA`,
);
