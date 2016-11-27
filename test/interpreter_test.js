var Interpreter = require('../source/javascript/interpreter.js');
var Node = require('../source/javascript/node.js');
var symbols = require('../source/javascript/symbols.js');
var identifiers = require('../source/javascript/identifiers.js');
var assert = require('assert');


describe('interpreter', function () {
    var firstNode;
    var secondNode;
    var interpreter;

    beforeEach(function(){
        firstNode = new Node(2,symbols.number);
        secondNode = new Node(1,symbols.number);
        interpreter = new Interpreter(identifiers);
    });

    describe('interpret', function () {
        describe('mathematical operation with two number arguments', function () {
            it('should calculate the subtraction and give result', function () {
                var expectedNode = new Node(1, symbols.number);
                var operatorNode = new Node('minus', symbols.operator);
                
                assert.deepEqual(expectedNode, interpreter.interpret(operatorNode, firstNode, secondNode));
            });

            it('should calculate the addition and give result', function () {
                var expectedNode = new Node(3, symbols.number);
                var operatorNode = new Node('plus', symbols.operator);

               assert.deepEqual(expectedNode, interpreter.interpret(operatorNode, firstNode, secondNode));
            });

            it('should calculate the multiplication and give result', function () {
                var expectedNode = new Node(2, symbols.number);
                var operatorNode = new Node('times', symbols.operator);

                assert.deepEqual(expectedNode, interpreter.interpret(operatorNode, firstNode, secondNode));
            });

            it('should calculate the division and give result', function () {
                var expectedNode = new Node(2, symbols.number);
                var operatorNode = new Node('by', symbols.operator);

                assert.deepEqual(expectedNode, interpreter.interpret(operatorNode, firstNode, secondNode));
            });

            it('should calculate the power and give result', function () {
                var expectedNode = new Node(2, symbols.number);
                var operatorNode = new Node('power', symbols.operator);

                assert.deepEqual(expectedNode, interpreter.interpret(operatorNode, firstNode, secondNode));
            });
        });

        describe('mathematical operation with one variable and one number arguments', function () {
            it('should retrive the value of variable and calculate the subtraction and give result', function () {
                interpreter.hold('a', new Node(2, symbols.number));
                firstNode = new Node('a', symbols.variable);
                var operatorNode = new Node('minus', symbols.operator);
                var expectedNode = new Node(1, symbols.number);
                
                assert.deepEqual(expectedNode, interpreter.interpret(operatorNode, firstNode, secondNode));
            });
        });
    });

    describe('hold', function(){
        it('should add the key in identifiers with the given value', function(){
            var key = 'ram';
            var value = new Node(2, symbols.number);
            assert.equal(false, identifiers.contains(key));
            interpreter.hold(key, value);
            assert.equal(true, identifiers.contains(key));
            assert.equal(value, identifiers.getValueOf(key));
        });

        it('should update the value in identifiers when is already present', function(){
            var key = 'sham';
            var value = new Node(2, symbols.number);
            var updatedValue = new Node(4, symbols.number);
            interpreter.hold(key, value);
            assert.equal(true, identifiers.contains(key));
            interpreter.hold(key, updatedValue);
            assert.equal(true, identifiers.contains(key));
            assert.equal(updatedValue, identifiers.getValueOf(key));
        });
    });

    describe('validate', function(){

        describe('symbol is variable', function(){
            describe('value of symbol present in identifiers', function(){
                it('should not throw exception', function(){
                    var symbol = 'd';
                    var node = new Node(symbol, symbols.variable);
                    var value = new Node(20, symbols.number);
                    interpreter.hold(symbol, value);
                    assert.doesNotThrow(function(){interpreter.validate(node)});
                });
            });

            describe('value of symbol absent in identifiers', function(){
                it('should throw exception', function(){
                    var symbol = 'e';
                    var node = new Node(symbol, symbols.variable);
                    assert.throws(function(){interpreter.validate(node);});
                });
            });
        });

        describe('symbol is a number', function(){
            it('should not throw exception', function(){
                var symbol = 20;
                var node = new Node(symbol, symbols.number);
                assert.doesNotThrow(function(){interpreter.validate(node)});
            });
        });
    });

    describe('retainValue', function(){
        describe('symbol is a variable', function(){
            it('should retain the value from identifiers', function(){
               var symbol = 'f';
               var value = new Node(20, symbols.number)
               var node = new Node(symbol, symbols.number);
               interpreter.hold(symbol, value);
               assert.equal(20, interpreter.retainValue(symbol)); 
            });
        });

        describe('symbol is a number', function(){
            it('should return the same number back', function(){
               var number = 20;
               assert.equal(20, interpreter.retainValue(number)); 
            });
        });
    });

});
