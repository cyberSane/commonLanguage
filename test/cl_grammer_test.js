var assert = require('assert');
var symbols = require('../source/javascript/symbols.js');
var Parser = require('jison').Parser;
var grammer = require('fs').readFileSync('./source/jison/clGrammer.jison', 'utf-8');
var Node = require('../source/javascript/node.js');
var parser = new Parser(grammer);

describe('common language grammer', function () {
    describe('evaluate', function () {
        it('should return value of evaluated two number expression', function () {
            var expression = '2 plus 3;';
            var expectedNode = new Node(5, symbols.number);
            assert.deepEqual(parser.parse(expression).evaluate(), expectedNode);
        });

        it('should return value of evaluated three number expression', function () {
            var expression = '2 plus 3 minus 4;';
            var expectedNode = new Node(1, symbols.number);
            assert.deepEqual(parser.parse(expression).evaluate(), expectedNode);
        });

        it('should return same nothing when only single number value is given', function(){
           var expression = '2;';
           var expectedNode = new Node(2, symbols.number);
           assert.deepEqual(parser.parse(expression).evaluate(), expectedNode); 
        });
    });
});
