[![npm](https://img.shields.io/npm/v/pratt-parser.svg)](https://www.npmjs.com/package/pratt-parser)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/arlac77/pratt-parser)
[![Build Status](https://secure.travis-ci.org/arlac77/pratt-parser.png)](http://travis-ci.org/arlac77/pratt-parser)
[![bithound](https://www.bithound.io/github/arlac77/pratt-parser/badges/score.svg)](https://www.bithound.io/github/arlac77/pratt-parser)
[![codecov.io](http://codecov.io/github/arlac77/pratt-parser/coverage.svg?branch=master)](http://codecov.io/github/arlac77/pratt-parser?branch=master)
[![Code Climate](https://codeclimate.com/github/arlac77/pratt-parser/badges/gpa.svg)](https://codeclimate.com/github/arlac77/pratt-parser)
[![GitHub Issues](https://img.shields.io/github/issues/arlac77/pratt-parser.svg?style=flat-square)](https://github.com/arlac77/pratt-parser/issues)
[![Dependency Status](https://david-dm.org/arlac77/pratt-parser.svg)](https://david-dm.org/arlac77/pratt-parser)
[![devDependency Status](https://david-dm.org/arlac77/pratt-parser/dev-status.svg)](https://david-dm.org/arlac77/pratt-parser#info=devDependencies)
[![docs](http://inch-ci.org/github/arlac77/pratt-parser.svg?branch=master)](http://inch-ci.org/github/arlac77/pratt-parser)
[![downloads](http://img.shields.io/npm/dm/pratt-parser.svg?style=flat-square)](https://npmjs.org/package/pratt-parser)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Pratt Parser
=====

Based on
https://github.com/douglascrockford/TDOP[Douglas Crockford TDOP].

```javascript
const createGrammar = require('pratt-parser').createGrammar;

function Value(value) {
  return Object.create(null, {
    value: {
      value: value
    }
  });
}

let myGrammar = createGrammar({
  terminals: {
    'number': {}
  },
  prefix: {
    '(': {
      nud(grammar) {
        const e = grammar.expression(0);
        grammar.advance(')');
        return e;
      }
    }
  },
  infix: {
    ')': {},
    '+': {
      precedence: 50,
      combine(left, right) {
        return Value(left.value + right.value);
      }
    },
    '-': {
      precedence: 50,
      combine(left, right) {
        return Value(left.value - right.value);
      }
    },
    '*': {
      precedence: 60,
      combine(left, right) {
        return Value(left.value * right.value);
      }
    },
    '/': {
      precedence: 60,
      combine(left, right) {
        return Value(left.value / right.value);
      }
    }
  }
});

console.log(myGrammar.parse("(1 + (1 + 4 * 3)) * (2 + 1)").value);
```

install
=======

With [npm](http://npmjs.org) do:

```shell
npm install pratt-parser
```

license
=======

BSD-2-Clause