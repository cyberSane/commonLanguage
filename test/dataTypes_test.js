var dataTypes = require('../source/javascript/dataTypes.js');
var assert = require('assert');

describe('dataTypes', function () {
    describe('isVariable', function () {
        it('should return true if the value is of variable type', function () {
            assert.equal(dataTypes.isVariable('variable'), true);
        })
        it('should return false if the value is other than variable type', function () {
            assert.equal(dataTypes.isVariable('operator'), false);
        })
    })
});
