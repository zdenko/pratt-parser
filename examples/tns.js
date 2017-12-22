/* jslint node: true, esnext: true */

/* WIP does not work for now!!! */

'use strict';

const {
  Parser,
  WhiteSpaceToken,
  StringToken,
  NumberToken,
  IdentifierToken
} = require('../dist/parser');

function Value(value) {
  return Object.create(null, {
    value: {
      value: value
    }
  });
}

const tnsGrammar = new Parser({
  tokens: [WhiteSpaceToken, NumberToken, IdentifierToken],
  prefix: {
    '(': {
      precedence: 80,
      led(grammar, left) {
        const e = grammar.expression(0);
        grammar.advance(')');
        return e;
      }
    }
  },
  infix: {
    '(': {},
    ')': {},
    '=': {
      precedence: 50,
      combine: (left, right) => [left, right]
    }
  }
});

console.log(
  tnsGrammar.parse(`(ADDRESS_LIST=
  (FAILOVER=ON)
  (LOAD_BALANCE=off)
  (ADDRESS=(PROTOCOL=tcp)(HOST=host2a)(PORT=1630))
  (ADDRESS=(PROTOCOL=tcp)(HOST=host2b)(PORT=1630))`).value
);
