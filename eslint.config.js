import globals from 'globals';
import js from '@eslint/js';
import ts from 'typescript-eslint';
import react from 'eslint-plugin-react';

// TODO "@typescript-eslint/explicit-function-return-type": "error"

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      react: {
        version: '17',
      },
    },
  },
  {
    ignores: ['**/build/', '**/dist/'],
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  react.configs.flat.recommended,
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/no-unknown-property': [2, { ignore: ['class'] }],
    },
  },
];
