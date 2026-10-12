// Shared helpers for the checks that run against the built site in dist/.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = fileURLToPath(new URL('..', import.meta.url));
export const dist = join(root, 'dist');

/** Every .html file under dist/, as absolute paths. */
export function builtPages() {
  if (!existsSync(dist)) {
    console.error('dist/ not found. Run "npm run build" first.');
    process.exit(2);
  }
  const pages = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) walk(path);
      else if (name.endsWith('.html')) pages.push(path);
    }
  };
  walk(dist);
  if (pages.length === 0) {
    console.error('dist/ contains no HTML pages.');
    process.exit(2);
  }
  return pages.sort();
}

/** dist-relative name with forward slashes, for messages. */
export function pageName(path) {
  return relative(dist, path).split(sep).join('/');
}

export function read(path) {
  return readFileSync(path, 'utf8');
}

/** Print failures and set the exit status. */
export function report(checkName, failures, summary) {
  if (failures.length > 0) {
    console.error(`${checkName}: ${failures.length} problem(s)`);
    for (const failure of failures) console.error(`  ${failure}`);
    process.exit(1);
  }
  console.log(`${checkName}: ok (${summary})`);
}
