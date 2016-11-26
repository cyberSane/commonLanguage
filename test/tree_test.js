var Tree = require('../source/javascript/Tree.js');
var Node = require('../source/javascript/node.js');
var Branch = require('../source/javascript/Branch.js');
var dataTypes = require('../source/javascript/dataTypes.js');
var identifiers= require('../source/javascript/identifiers.js');
var Interpreter= require('../source/javascript/interpreter.js');
var assert = require('assert');

describe('Tree', function () {
	var interpreter = new Interpreter(identifiers);
    describe('evaluate', function () {
    	it('should evaluate one the branch of the tree and return the value',function(){
    		var tree = new Tree();
			var operator = new Node('plus', dataTypes.operator);
            var leftNode = new Node(1, dataTypes.number);
            var rightNode = new Node(2, dataTypes.number);
            var branch = new Branch(operator, leftNode, rightNode, interpreter);
            tree.addBranch(branch);
            var resultNode = new Node(3, dataTypes.number);
            assert.deepEqual(tree.evaluate(),resultNode);
    	})
    	it('should evaluate more than one the branches of the tree and return the value',function(){
    		var tree = new Tree();

    		var firstOperator = new Node('equal', dataTypes.operator);
            var firstLeftNode = new Node('a', dataTypes.variable);
            var firstRightNode = new Node(2, dataTypes.number);
            var firstBranch = new Branch(firstOperator, firstLeftNode, firstRightNode, interpreter);
            tree.addBranch(firstBranch);

			var secondOperator = new Node('plus', dataTypes.operator);
            var secondLeftNode = new Node('a', dataTypes.variable);
            var secondRightNode = new Node(2, dataTypes.number);
            var secondBranch = new Branch(secondOperator, secondLeftNode, secondRightNode, interpreter);
            tree.addBranch(secondBranch);

            var resultNode = new Node(4, dataTypes.number);
            assert.deepEqual(tree.evaluate(),resultNode);
    	})
    });

});