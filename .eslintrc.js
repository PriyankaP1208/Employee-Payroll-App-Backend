const { off } = require("./config/logers");

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {'linebreak-style': 0,
            'no-console':'off'
    },
};
