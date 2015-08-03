/* jslint node: true, esnext: true */

"use strict";

const defineGrammar = require('../lib/grammar');


test("calculator",
  function () {
    let myGrammar = defineGrammar({
      terminals: {
        'number': {}
      },
      operators: {
        '+': {
          precedence: 50,
          parseWithPrefix: function (prefix,grammar) {
            const right = grammar.expression(50);
            return Object.create(prefix,{ value: { value: prefix.value + right.value }});
          }
        },
        '*': {
          precedence: 60,
          parseWithPrefix: function (prefix,grammar) {
            const right = grammar.expression(60);
            return Object.create(prefix,{ value: { value: prefix.value * right.value }});
          }
        }
      }
    });

    expect(1);

    equal(myGrammar.parse("1 + 41 * 3 ").value, 124);
  });

/*
 att1.att2[name='herbert'].att3
*/
