var util = {};
var numberToWord = require('number-to-words');

var operators = {
    '+': 'plus',
    '-': 'minus',
    '*': 'times',
    '/': 'by'
};

util.getWordRepresentation = function (value) {
    if (operators[value])
        return operators[value];
    return numberToWord.toWords(value);
};

module.exports = util;
