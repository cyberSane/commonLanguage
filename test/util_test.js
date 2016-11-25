var util = require('../source/javascript/util');
var assert = require('assert');

describe('util', function () {
    describe('getWordRepresentation', function () {
        it('should return a word representation of a number', function () {
            assert.equal(util.getWordRepresentation(2), 'two');
        });
        it('should return a word representation of an operator', function () {
            assert.equal(util.getWordRepresentation('+'), 'plus');
        });
    });
});
