/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    'plugin:vitest-globals/recommended'

    // '@vue/eslint-config-prettier/skip-formatting',
    // 'plugin:vitest-globals/recommended',
    // '@vue/eslint-config-typescript',
    // '@vue/prettier'

    //'@vue/typescript/recommended'
    // 'plugin:prettier',
    //'plugin:prettier-plugin-tailwindcss',
    //'prettier'
    //'prettier-plugin-tailwindcss'
  ],

  parserOptions: {
    ecmaVersion: 'latest'
  },
  env: {
    'vitest-globals/env': true
  }
};
