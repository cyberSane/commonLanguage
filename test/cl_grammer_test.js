var assert = require('assert');
var dataTypes = require('../source/javascript/dataTypes.js');
var Parser = require('jison').Parser;
var grammer = require('fs').readFileSync('./source/jison/clGrammer.jison', 'utf-8');
var Node = require('../source/javascript/node.js');
var parser = new Parser(grammer);

describe('jison grammer', function () {
    describe('evaluate', function () {
        it('should return value of evaluated two number expression', function () {
            var expression = '2 plus 3;';
            var expectedNode = new Node(5, dataTypes.number);
            assert.deepEqual(parser.parse(expression).evaluate(), expectedNode);
        });

        it('should return value of evaluated three number expression', function () {
            var expression = '2 plus 3 minus 4;';
            var expectedNode = new Node(1, dataTypes.number);
            assert.deepEqual(parser.parse(expression).evaluate(), expectedNode);
        });

        // it('should return value of evaluated expression with different operators', function () {
        //     var expression = '2 plus 3 minus 4 times 5;';
        //     var expected = -15;
        //     assert.equal(parser.parse(expression).evaluate(), expected);
        // });
    });
});
