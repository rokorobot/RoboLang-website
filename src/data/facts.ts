// Single source of the technical facts quoted on this site.
//
// Every fact here was read from rokorobot/RoboLang at CORE_COMMIT, the commit
// of the release tag CORE_RELEASE_TAG, which is what `pip install robolang`
// installs. When the core repository publishes a new release, re-verify these
// values against it and change CORE_COMMIT to that tag's commit. Nothing else on
// the site hard-codes a version or a link into the core repository.

export const CORE_REPO = 'https://github.com/rokorobot/RoboLang';
export const CORE_COMMIT = '342c47b9cf30cd04bb6fb874097b4e00a65ff3e7';
export const CORE_RELEASE_TAG = 'v0.8.0';
export const CORE_COMMIT_SHORT = CORE_COMMIT.slice(0, 7);

export const PYPI_URL = 'https://pypi.org/project/robolang/';

export const WEBSITE_REPO = 'https://github.com/rokorobot/RoboLang-website';

export const versions = {
  distribution: '0.8.0',
  language: '1.1 to 2.1',
  latestLanguage: '2.1',
  irSchema: '1.0 to 1.9',
  missionIr: '1.0 and 1.1',
  worldFile: '1.0 to 1.6',
  runRecord: '1.0 to 1.9',
  missionRecord: '1.0 and 1.1',
  core: '0.1 and 0.2',
  coreDefault: '0.1',
  pythonMinimum: '3.11',
} as const;

/** The latest gate signed off in the core repository at CORE_COMMIT. */
export const milestone = {
  name: 'Gate 2 (independent interoperability)',
  date: '2026-11-10',
} as const;

/**
 * The dated development-status snapshot on the roadmap page. It is read from a
 * later core commit than CORE_COMMIT, which stays the baseline for the CLI
 * facts and captured outputs. Links for it go to immutable pull request and
 * commit pages, never to files at a moving branch.
 */
export const roadmapSnapshot = {
  date: '24 November 2026',
  commit: 'a902c0df2a9cbf78d6fc9c992ec26de76399131b',
  // Tagged and on GitHub, not yet on PyPI on the snapshot date.
  pendingRelease: '0.9.0',
  pendingLanguage: '2.2',
  release090: `${CORE_REPO}/pull/168`,
  lang22: `${CORE_REPO}/pull/167`,
  decision0045: `${CORE_REPO}/commit/2c86db36dbe4cada42187e8e27ed0d6ba0415c47`,
  decision0045Draft: `${CORE_REPO}/pull/169`,
  proposedI11: `${CORE_REPO}/pull/170`,
  proposedI15: `${CORE_REPO}/pull/171`,
  evolution: `${CORE_REPO}/pull/138`,
  roadmapI1I10: `${CORE_REPO}/pull/139`,
  release030: `${CORE_REPO}/pull/121`,
  gate2Runs: `${CORE_REPO}/pull/119`,
  gate2Errata: `${CORE_REPO}/pull/120`,
  strategyH3: `${CORE_REPO}/pull/117`,
  safetyCase: `${CORE_REPO}/pull/128`,
  decision0038: `${CORE_REPO}/pull/129`,
  g1Proposal: `${CORE_REPO}/pull/173`,
  g1Phase3: `${CORE_REPO}/pull/176`,
  heldout: `${CORE_REPO}/pull/177`,
  h3Acceptance: `${CORE_REPO}/pull/90`,
  // The development history (src/data/history.ts) was read at this core commit.
  historyCommit: '3dbe03542ea954828789a75009b37151043f8347',
  developmentSteps: `${CORE_REPO}/pull/183`,
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

const lang = (v: string) => coreFile(`spec/robolang-v${v}.md`);
const grammar = (v: string) => coreFile(`spec/grammar-v${v}.ebnf`);
const ir = (v: string) => coreFile(`spec/ir-schema-v${v}.md`);
const decision = (file: string) => coreFile(`spec/decisions/${file}.md`);

export const specs = {
  language: coreFile('spec/robolang-v1.1.md'),
  language12: lang('1.2'),
  language13: lang('1.3'),
  language14: lang('1.4'),
  language15: lang('1.5'),
  language16: lang('1.6'),
  language17: lang('1.7'),
  language18: lang('1.8'),
  language19: lang('1.9'),
  language20: lang('2.0'),
  language21: lang('2.1'),
  languageReference: coreFile('docs/language-reference.md'),
  grammar: coreFile('spec/grammar.ebnf'),
  grammar12: grammar('1.2'),
  grammar13: grammar('1.3'),
  grammar14: grammar('1.4'),
  grammar15: grammar('1.5'),
  grammar16: grammar('1.6'),
  grammar17: grammar('1.7'),
  grammar18: grammar('1.8'),
  grammar19: grammar('1.9'),
  grammar20: grammar('2.0'),
  grammar21: grammar('2.1'),
  irSchema: ir('1.0'),
  irSchema11: ir('1.1'),
  irSchema12: ir('1.2'),
  irSchema13: ir('1.3'),
  irSchema14: ir('1.4'),
  irSchema15: ir('1.5'),
  irSchema16: ir('1.6'),
  irSchema17: ir('1.7'),
  irSchema18: ir('1.8'),
  irSchema19: ir('1.9'),
  missionIr: coreFile('spec/mission-ir-v1.0.md'),
  irReader: coreFile('spec/ir-reader-v0.1.md'),
  simulation: coreFile('spec/simulation-v1.0.md'),
  exportGoal: coreFile('spec/export-goal-v0.1.md'),
  delegate: coreFile('spec/delegate-v0.2.md'),
  delegateCore02: coreFile('spec/delegate-core-0.2.md'),
  core: coreFile('spec/core-v0.1.md'),
  core02: coreFile('spec/core-v0.2.md'),
  coreMessageSchema: coreFile('spec/core/message-0.1.schema.json'),
  coreMessageSchema02: coreFile('spec/core/message-0.2.schema.json'),
  coreDescriptorSchema: coreFile('spec/core/capability-descriptor-0.1.schema.json'),
  referenceSimulation: coreFile('spec/reference-simulation-v0.1.md'),
  gate2: coreFile('spec/interop-gate-2-v0.1.md'),
  gate2Evidence: coreFile('docs/interop/interop-4-run-2.md'),
  authorization: coreFile('spec/authorization-v0.1.md'),
  ros2Backend: coreFile('spec/ros2-backend-v0.1.md'),
  rfc001: coreFile('spec/architecture/rfc-001-ai-native-architecture.md'),
  decisions: decision('0001-rl-11a-language-decisions'),
  decisionsLang12: decision('0006-lang-1-combined-conditions'),
  decisionsLang13: decision('0014-lang-2-goals-and-typed-sensors'),
  decisionsLang14: decision('0027-bounded-branching'),
  decisionsLang15: decision('0033-step-failure-handlers'),
  decisionsLang16: decision('0036-lang-4-measured-values'),
  decisionsLang17: decision('0039-region-limits'),
  decisionsLang18: decision('0040-declared-actions'),
  decisionsLang19: decision('0042-clock-readings'),
  decisionsLang20: decision('0041-mission-layer'),
  decisionsLang21: decision('0043-incoming-messages'),
  decisionsDir: coreTree('spec/decisions'),
  foundation1Evidence: coreFile('docs/evidence/rl-basic-01-exit-gate.md'),
  gate1Evidence: coreFile('docs/evidence/rl-arch-02-exit-gate.md'),
  developmentPlan: coreFile('docs/DEVELOPMENT_PLAN.md'),
  languageRoadmap: coreFile('docs/LANGUAGE_ROADMAP.md'),
  languageEvolution: coreFile('docs/LANGUAGE_EVOLUTION.md'),
  languageEvolutionRules: coreFile('docs/LANGUAGE_EVOLUTION_RULES.md'),
  strategy: coreFile('docs/STRATEGY.md'),
  safetyCase: coreFile('docs/safety-case-draft.md'),
  changelog: coreFile('CHANGELOG.md'),
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
