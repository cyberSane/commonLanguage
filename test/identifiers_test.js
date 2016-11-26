var assert = require('assert');
var Branch = require('../source/javascript/Branch.js');
var Node = require('../source/javascript/Node.js');
var identifiers = require('../source/javascript/identifiers.js');
var symbols = require('../source/javascript/symbols.js');
var Interpreter = require('../source/javascript/interpreter');

describe('identifiers', function () {
    describe('assign', function () {
        it('should return true if value has been assigned', function () {
            var node = new Node(2,symbols.number);
            identifiers.assign('a', node);
            assert.equal(identifiers.contains('a'), true);
        });
        it('should return evaluated value of branch', function () {
            var interpreter = new Interpreter(identifiers);
            var node = new Node(2, symbols.number);
            var operatorNode = new Node('plus', symbols.operator);
            var branch = new Branch(operatorNode, node, node, interpreter);
            var expected = new Node(4, symbols.number);
            identifiers.assign('b', branch);
            assert.deepEqual(identifiers.getValueOf('b'), expected);
        });
    });

});
