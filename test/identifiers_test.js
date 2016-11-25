var assert = require('assert');
var Tree = require('../source/javascript/tree.js');
var Node = require('../source/javascript/node.js');
var identifiers = require('../source/javascript/identifiers.js');
var dataTypes = require('../source/javascript/dataTypes.js');

describe('identifiers', function () {
  describe('assign', function () {
    beforeEach(function () {
      identifiers.empty();
    });

    it('should add value if key is not assigned previously', function () {
      var key = 'a';
      assert.equal(identifiers.contains(key), false);
      var value = new Node(2, dataTypes.number);
      identifiers.assign(key, value);
      assert.equal(value, identifiers.getValueOf(key));
    });

    it('should update value if key is assigned previously', function () {
      var key = 'a';
      var value = new Node(2, dataTypes.number);
      identifiers.assign(key, value);
      assert.equal(value, identifiers.getValueOf(key));

      var updatedValue = new Node(4, dataTypes.number);
      identifiers.assign(key, updatedValue);
      assert.equal(updatedValue, identifiers.getValueOf(key));
      // var node = new Node(2, dataTypes.number);
      // var operatorNode = new Node('+');
      // var tree = new Tree(operatorNode, node, node, identifiers);
      // var expected = new Node(4, dataTypes.number);
      // identifier.assign('b', tree);
      // assert.deepEqual(identifiers.getValueOf('b'), expected);
    });
  });
});
