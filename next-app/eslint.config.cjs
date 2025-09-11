const js = require('@eslint/js');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');
const globals = require('globals');

module.exports = [
  {
    ignores: ['public/sw.js', 'public/workbox-*.js', 'out/**', '.next/**'],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,mjs}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      'no-unused-vars': 'warn',
      'react/jsx-uses-react': 'warn',
      'react/jsx-uses-vars': 'warn',
    },
  },
];
