var util = require('./util.js');
var dataTypes = require('./dataTypes.js');

class Node {
    constructor(value, type) {
        this.value = value;
        this.type = type;
    }

    evaluate() {
        return this.value;
    }

    toWords() {
        return util.getWordRepresentation(this.value);
    }

    toString() {
        return this.value;
    }
};

module.exports = function (value, type, identifiers) {
    if(!dataTypes.isVariable(type))
        return new Node(value, type);
    if(dataTypes.isVariable(type) && identifiers.contains(value))
        return identifiers.getValueOf(value);
    throw new Error(`${value} not defined`);
}
