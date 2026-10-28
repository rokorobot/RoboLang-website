// Single source of the technical facts quoted on this site.
//
// Every fact here was read from rokorobot/RoboLang at CORE_COMMIT. When the
// core repository publishes a release, re-verify these values against it and
// change CORE_COMMIT to the release tag. Nothing else on the site hard-codes a
// version or a link into the core repository.

export const CORE_REPO = 'https://github.com/rokorobot/RoboLang';
export const CORE_COMMIT = '1bac8c766be2ae629cbe5e8750491fdf0935e693';
export const CORE_COMMIT_SHORT = CORE_COMMIT.slice(0, 7);

export const WEBSITE_REPO = 'https://github.com/rokorobot/RoboLang-website';

export const versions = {
  distribution: '0.1.0a1',
  language: '1.1 and 1.2',
  irSchema: '1.0 and 1.1',
  worldFile: '1.0',
  runRecord: '1.0 and 1.1',
  core: '0.1',
  pythonMinimum: '3.11',
} as const;

/** The latest milestone signed off in the core repository at CORE_COMMIT. */
export const milestone = {
  name: 'RL-ARCH-02 gate 1',
  date: '2026-10-27',
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
  language12: coreFile('spec/robolang-v1.2.md'),
  grammar: coreFile('spec/grammar.ebnf'),
  grammar12: coreFile('spec/grammar-v1.2.ebnf'),
  irSchema: coreFile('spec/ir-schema-v1.0.md'),
  irSchema11: coreFile('spec/ir-schema-v1.1.md'),
  simulation: coreFile('spec/simulation-v1.0.md'),
  core: coreFile('spec/core-v0.1.md'),
  coreMessageSchema: coreFile('spec/core/message-0.1.schema.json'),
  coreDescriptorSchema: coreFile('spec/core/capability-descriptor-0.1.schema.json'),
  referenceSimulation: coreFile('spec/reference-simulation-v0.1.md'),
  gate2: coreFile('spec/interop-gate-2-v0.1.md'),
  rfc001: coreFile('spec/architecture/rfc-001-ai-native-architecture.md'),
  decisions: coreFile('spec/decisions/0001-rl-11a-language-decisions.md'),
  decisionsLang12: coreFile('spec/decisions/0006-lang-1-combined-conditions.md'),
  decisionsDir: coreTree('spec/decisions'),
  foundation1Evidence: coreFile('docs/evidence/rl-basic-01-exit-gate.md'),
  gate1Evidence: coreFile('docs/evidence/rl-arch-02-exit-gate.md'),
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
