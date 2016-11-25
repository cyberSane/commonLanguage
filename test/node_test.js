var Node = require('../source/javascript/node.js');
var dataType = require('../source/javascript/dataTypes.js');
var assert = require('assert');

describe('node', function () {
    var node;
    beforeEach(function(){
        node = new Node(1, dataType.number);
    });
        
    describe('evaluate', function(){
        it('should return self', function(){
            assert.equal(node, node.evaluate());
        });
    });

    describe('isType', function(){
        it('should return true when same Node type is given', function(){
            assert.equal(true, node.isType(dataType.number));
        });

        it('should return false when other than Node type is given', function(){
          assert.equal(false, node.isType(dataType.variable));  
        });
    });
});
