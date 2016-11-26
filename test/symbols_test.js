var symbols = require('../source/javascript/symbols.js');
var assert = require('assert');

describe('symbols', function () {
    describe('isVariable', function () {
        it('should return true if the value is of variable type', function () {
            assert.equal(symbols.isVariable('variable'), true);
        })
        it('should return false if the value is other than variable type', function () {
            assert.equal(symbols.isVariable('operator'), false);
        })
    })
});
