module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV !== 'production' ? 'off' : 'warn',
    'no-debugger': process.env.NODE_ENV !== 'production' ? 'off' : 'warn',
    'vue/no-parsing-error': [2, {
      'x-invalid-namespace': false
    }]
  }
}
