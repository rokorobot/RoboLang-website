// Single source of the technical facts quoted on this site.
//
// Every fact here was read from rokorobot/RoboLang at CORE_COMMIT. When the
// core repository publishes a release, re-verify these values against it and
// change CORE_COMMIT to the release tag. Nothing else on the site hard-codes a
// version or a link into the core repository.

export const CORE_REPO = 'https://github.com/rokorobot/RoboLang';
export const CORE_COMMIT = 'b3ab75da906c3d84c6a552e664816dcbd545663c';
export const CORE_COMMIT_SHORT = CORE_COMMIT.slice(0, 7);

export const WEBSITE_REPO = 'https://github.com/rokorobot/RoboLang-website';

export const versions = {
  distribution: '0.1.0a1',
  language: '1.1',
  irSchema: '1.0',
  pythonMinimum: '3.11',
} as const;

export const LICENSE_NAME = 'Apache-2.0';

/** Link to a file in the core repository, pinned to the verified commit. */
export function coreFile(path: string): string {
  return `${CORE_REPO}/blob/${CORE_COMMIT}/${path}`;
}

/** Link to a directory in the core repository, pinned to the verified commit. */
export function coreTree(path: string): string {
  return `${CORE_REPO}/tree/${CORE_COMMIT}/${path}`;
}

export const specs = {
  language: coreFile('spec/robolang-v1.1.md'),
  grammar: coreFile('spec/grammar.ebnf'),
  irSchema: coreFile('spec/ir-schema-v1.0.md'),
  decisions: coreFile('spec/decisions/0001-rl-11a-language-decisions.md'),
  developmentPlan: coreFile('docs/DEVELOPMENT_PLAN.md'),
  readme: coreFile('README.md'),
  license: coreFile('LICENSE'),
} as const;

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/get-started/', label: 'Get Started' },
  { href: '/reference/', label: 'Language Reference' },
  { href: '/examples/', label: 'Examples' },
  { href: '/roadmap/', label: 'Vision & Roadmap' },
  { href: '/contribute/', label: 'Contribute' },
] as const;
