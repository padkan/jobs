/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:vitest-globals/recommended',
    '@vue/prettier'
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
