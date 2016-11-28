var Node = require('./Node.js');
var symbols = require('./symbols.js');

var addition = function (firstNumber, secondNumber) {
    return firstNumber + secondNumber;
};

var subtraction = function (firstNumber, secondNumber) {
    return firstNumber - secondNumber;
}

var multiplication = function (firstNumber, secondNumber) {
    return firstNumber * secondNumber;
};

var division = function (firstNumber, secondNumber) {
    return firstNumber / secondNumber;
};

var power = function (firstNumber, secondNumber) {
    return Math.pow(firstNumber, secondNumber);
};

var operations = {
    'plus': addition,
    'minus': subtraction,
    'times': multiplication,
    'by': division,
    'power': power
}

class Interpreter {

    constructor(identifiers) {
        this.identifiers = identifiers;
    }

    hold(key, value) {
        if(value.isType(symbols.variable)){
            this.validate(value);
            this.identifiers.assign(key, this.identifiers.getValueOf(value.getValue()));
        }
        else if(this.identifiers.contains(key))
            throw new Error(`${key} is already assign`);
        this.identifiers.assign(key, value);
    }

    interpret(operator, firstValue, secondValue) {
        this.validate(firstValue);
        this.validate(secondValue);
        var first = this.retainValue(firstValue.getValue());
        var second = this.retainValue(secondValue.getValue());
        return new Node(operations[operator.getValue()](first, second), symbols.number);
    }

    validate(node) {
        if(node.isType(symbols.variable) && !this.identifiers.contains(node.getValue())){
            throw new Error(`${node.getValue()} is undefined`);
        }
    }

    retainValue(element) {
        return this.identifiers.contains(element) ? 
        this.identifiers.getValueOf(element).getValue() : element;
    }
}

module.exports = Interpreter;
