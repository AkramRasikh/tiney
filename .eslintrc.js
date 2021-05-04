module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
  },
  globals: {
    exports: true,
    module: true,
    require: true,
    graphql: false,
    process: false,
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2019,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
  },
  settings: {
    jest: {
      version: 26,
    },
  },
  plugins: ['only-warn'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'plugin:jest/recommended',
    'eslint-config-prettier',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/forbid-prop-types': 'off',
    'react/prop-types': ['warn'],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-param-reassign': 'off',
    'no-prototype-builtins': 'off',
    'max-classes-per-file': 'off',
    'react/jsx-curly-newline': 'off',
  },
};
