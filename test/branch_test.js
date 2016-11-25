var Node = require('../source/javascript/node.js');
var Branch = require('../source/javascript/Branch.js');
var dataTypes = require('../source/javascript/dataTypes.js');
var identifiers = require('../source/javascript/identifiers.js');
var Interpreter = require('../source/javascript/interpreter.js');
var assert = require('assert');

describe('Branch', function () {
  var interpreter;

  beforeEach(function () {
    interpreter = new Interpreter(identifiers);
  });

  describe('evaluate', function () {
    describe('No assignment present', function () {
      describe('Two number nodes are given', function () {
        it('should evaluate both nodes with operator and give back the resultant node', function () {
          var operator = new Node('+', dataTypes.operator);
          var leftNode = new Node(1, dataTypes.number);
          var rightNode = new Node(2, dataTypes.number);
          var branch = new Branch(operator, leftNode, rightNode);
          var expectedNode = new Node(3, dataTypes.number);
          assert.deepEqual(expectedNode, branch.evaluate(interpreter));
        });
      });

      describe('One node is number and other is word', function () {
        describe('when word is present in identifiers', function () {
          it('should evaluate the branch nodes and give back the resultant node', function () {
            var operator = new Node('+', dataTypes.operator);
            var leftNode = new Node(1, dataTypes.number);
            var rightNode = new Node(2, dataTypes.number);
            var keyNode = new Node('a', dataTypes.variable);

            var branch = new Branch(operator, keyNode, rightNode);

            identifiers.assign(keyNode.value, leftNode);
            var expectedNode = new Node(3, dataTypes.number);
            assert.deepEqual(expectedNode, branch.evaluate(interpreter));
          });
        });

        describe('when word is not present in identifiers', function () {
          it('should evaluate the branch nodes and throw error', function () {
            var operator = new Node('+', dataTypes.operator);
            var wordNode = new Node('b', dataTypes.variable);
            var rightNode = new Node(2, dataTypes.number);
            var branch = new Branch(operator, wordNode, rightNode);
            assert.throws(function () {
              branch.evaluate(interpreter)
            });
          });
        });
      });
    });
    describe('Assignment present', function () {
      describe('only assignment branch is given', function () {
        it('should return the assignment value back', function () {
          var operator = new Node('=', dataTypes.operator);
          var wordNode = new Node('b', dataTypes.variable);
          var rightNode = new Node(2, dataTypes.number);
          var branch = new Branch(operator, wordNode, rightNode);
          assert.deepEqual(rightNode, branch.evaluate(interpreter));
        });
      });

      describe('nested branch of assignment and add operator is given', function () {
        it('should return the assignment value back', function () {
          var assignmentOperator = new Node('=', dataTypes.operator);
          var wordNode = new Node('b', dataTypes.variable);
          var rightNode = new Node(2, dataTypes.number);
          var assignmentBranch = new Branch(assignmentOperator, wordNode, rightNode);
          var plusOperator = new Node('+', dataTypes.operator);
          var plusBranch = new Branch(plusOperator, assignmentBranch, rightNode);
          var expectedNode = new Node(4, dataTypes.number);
          assert.deepEqual(expectedNode, plusBranch.evaluate(interpreter));
        });
      });
    });
  });
});
