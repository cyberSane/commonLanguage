var Node = require('../source/javascript/node.js');
var Branch = require('../source/javascript/Branch.js');
var dataTypes = require('../source/javascript/dataTypes.js');
var identifiers= require('../source/javascript/identifiers.js');
var Interpreter= require('../source/javascript/interpreter.js');
var assert = require('assert');

describe('Branch', function () {
    var interpreter;

    beforeEach(function(){
        interpreter = new Interpreter(identifiers);
    });

    describe('evaluate', function () {
        describe('No assignment present', function () {
            describe('Two number nodes are given', function () {
                it('should evaluate both nodes with operator and give back the resultant node', function () {
                    var operator = new Node('plus', dataTypes.operator);
                    var leftNode = new Node(1, dataTypes.number);
                    var rightNode = new Node(2, dataTypes.number);
                    var branch = new Branch(operator, leftNode, rightNode, interpreter);
                    var expectedNode = new Node(3, dataTypes.number);
                    assert.deepEqual(expectedNode, branch.evaluate());
                });
            });

            describe('One node is number and other is word', function () {
                describe('when word is present in identifiers',function () {
                    it('should evaluate the branch nodes and give back the resultant node', function () {
                        var operator = new Node('plus', dataTypes.operator);
                        var leftNode = new Node(1, dataTypes.number);
                        var rightNode = new Node(2, dataTypes.number);
                        var keyNode = new Node('a', dataTypes.variable);
                        
                        var branch = new Branch(operator, keyNode, rightNode, interpreter);

                        identifiers.assign(keyNode.value,leftNode);
                        var expectedNode = new Node(3, dataTypes.number);
                        assert.deepEqual(expectedNode, branch.evaluate());
                    });
                });

                describe('when word is not present in identifiers',function () {
                    it('should evaluate the branch nodes and throw error', function () {
                        var operator = new Node('plus', dataTypes.operator);
                        var wordNode = new Node('b', dataTypes.variable);
                        var rightNode = new Node(2, dataTypes.number);
                        var branch = new Branch(operator, wordNode, rightNode, interpreter);
                        var expectedNode = new Node(3, dataTypes.number);
                        assert.throws(function(){branch.evaluate()});
                    });
                });
           });
        });
        describe('Assignment present', function () {
            it('should evaluate the assignment operator and give back the assigned node', function () {
                var operator = new Node('equal', dataTypes.operator);
                var wordNode = new Node('c', dataTypes.variable);
                var rightNode = new Node(2, dataTypes.number);
                var branch = new Branch(operator, wordNode, rightNode, interpreter);
                assert.deepEqual(rightNode, branch.evaluate());
            });
        });

    });
});
