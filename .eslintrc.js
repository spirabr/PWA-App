const OFF = 0, WARN = 1, ERROR = 2;

module.exports = {
  root: true,
  env: {
    node: true,
    'jest/globals': true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript',
    'plugin:jest/recommended',
    'plugin:jest/style'
  ],
  plugins: ['jest'],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'warn',
    indent: [ERROR, 2],
    quotes: [ERROR, 'single']
  }
}
