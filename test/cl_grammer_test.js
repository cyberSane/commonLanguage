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

    describe('assignment of variables', function () {
        it('should return value of evaluated expression which contain set', function () {
            var expression = 'set a as 20;';
            var expectedNode = new Node(20, symbols.number);
            assert.deepEqual(parser.parse(expression).evaluate(), expectedNode);
        });

        it.skip('should return value of evaluated expression which contain let', function () {
            var expression = 'let a as 1;';
            var expectedNode = new Node(1, symbols.number);
            assert.deepEqual(parser.parse(expression).evaluate(), expectedNode);
        });

        it.skip('should return the overwritten value of evaluated expression when expression contains two let statements', function(){
           var expression = 'let a as 56; let a as 23;';
           var expectedNode = new Node(23, symbols.number);
           assert.deepEqual(parser.parse(expression).evaluate(), expectedNode);
        });

        it.skip('should throw an error when expression contains two set statements', function(){
           var expression = 'set a as 56; set a as 23;';
           var expectedNode = new Node(56, symbols.number);
           assert.throws(function(){parser.parse(expression).evaluate();});
        });

        it.skip('should return the value of evaluated expression of statements contains two let expression and one calculation expression', function(){
           var expression = 'let a as 56; let a as 23; a plus a;';
           var expectedNode = new Node(46, symbols.number);
           assert.deepEqual(parser.parse(expression).evaluate(), expectedNode);
        });

        it.skip('should return value of evaluated expression which contain set and calculation expression', function () {
            var expression = 'set a as 28; a plus 2;';
            var expectedNode = new Node(30, symbols.number);
            assert.deepEqual(parser.parse(expression).evaluate(), expectedNode);
        });

    });
});
