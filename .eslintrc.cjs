module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // ✅ 核心：ESLint 完全服从 Prettier
  ],
  rules: {
    // ✅ 彻底禁止 ESLint 管缩进（全部交给 Prettier）
    indent: 'off',
    '@typescript-eslint/indent': 'off',
    'vue/html-indent': 'off',
    'vue/script-indent': 'off',

    // ✅ 常用稳定规则
    'no-console': 'warn',
    'no-debugger': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    // JS / TS 单引号
    quotes: ['error', 'single', { avoidEscape: true }], // 避免因为转义使用双引号
    '@typescript-eslint/quotes': ['error', 'single', { avoidEscape: true }],

    // Vue 模板内属性单引号
    'vue/html-quotes': ['error', 'single'],
  },
};
