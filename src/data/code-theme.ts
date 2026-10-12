// Syntax highlighting for code panels: a small TextMate grammar for .rob
// files and a colour theme for the ink surface.
//
// scripts/check-a11y.mjs reads every highlight colour from the built pages
// and checks it against the code panel background, so a colour added here
// that is too dim fails the build.
import type { LanguageRegistration, ThemeRegistration } from 'shiki';

/** Highlighting only. The authoritative grammar is spec/grammar.ebnf in the core repository. */
export const robGrammar: LanguageRegistration = {
  name: 'rob',
  scopeName: 'source.rob',
  repository: {},
  patterns: [
    { name: 'comment.line.double-slash.rob', match: '//.*$' },
    {
      name: 'string.quoted.double.rob',
      begin: '"',
      end: '"',
      patterns: [{ name: 'constant.character.escape.rob', match: '\\\\.' }],
    },
    { name: 'keyword.control.rob', match: '@safety\\b|\\b(robolang|task|pre|plan)\\b' },
    { name: 'storage.type.rob', match: '\\b(robot|object|location|region)\\b' },
    { name: 'entity.name.function.rob', match: '\\b(move|grasp|place|inspect|wait|communicate)\\b' },
    {
      name: 'support.function.rob',
      match: '\\b(robot_ready|region_clear|object_exists|sensor_ok|max_speed)\\b',
    },
    { name: 'keyword.operator.word.rob', match: '\\b(to|at|using|with|for|until|timeout)\\b' },
    { name: 'constant.numeric.rob', match: '\\b\\d+(\\.\\d+)?\\b' },
  ],
};

export const inkTheme: ThemeRegistration = {
  name: 'robolang-ink',
  type: 'dark',
  colors: {
    'editor.background': '#1d1b18',
    'editor.foreground': '#e7e3d8',
  },
  tokenColors: [
    { scope: ['comment'], settings: { foreground: '#9c968a' } },
    { scope: ['string', 'constant.character.escape'], settings: { foreground: '#d9c58a' } },
    { scope: ['keyword', 'keyword.control'], settings: { foreground: '#ff7a3d' } },
    { scope: ['storage', 'storage.type', 'support.type'], settings: { foreground: '#8fc1b5' } },
    { scope: ['entity.name', 'entity.name.function', 'support.function'], settings: { foreground: '#f7f4ec' } },
    { scope: ['keyword.operator', 'keyword.operator.word', 'punctuation'], settings: { foreground: '#bdb7ab' } },
    { scope: ['constant', 'constant.numeric', 'constant.language'], settings: { foreground: '#e8a87c' } },
    { scope: ['variable'], settings: { foreground: '#e7e3d8' } },
  ],
};
