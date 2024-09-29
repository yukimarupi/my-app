// eslint.config.js
import { ESLint } from 'eslint'

export default {
  files: ['src/**/*.{js,jsx}'],
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  linterOptions: {
    reportUnusedDisableDirectives: true,
  },
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'error',
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
}
