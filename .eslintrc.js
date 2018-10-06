module.exports = {
  // Use only this configuration
  root: true,
  // Environment global objects
  env: {
    es6: true,
    jest: true,
  },
  extends: [
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    'standard',
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'semi': ['error', 'always'],
  },
};
