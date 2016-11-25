var Node = require('./node.js');
var dataTypes = require('./dataTypes.js');

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
    '+': addition,
    '-': subtraction,
    '*': multiplication,
    '/': division,
    '^': power
}

class Interpreter {

    constructor(identifiers) {
        this.identifiers = identifiers;
    }

    hold(key, value) {
        this.identifiers.assign(key, value);
    }

    interpret(operator, firstValue, secondValue) {
        this.validate(firstValue);
        this.validate(secondValue);
        var first = this.retainValue(firstValue.value);
        var second = this.retainValue(secondValue.value);
        
        return new Node(operations[operator.value](first, second), dataTypes.number);
    }

    validate(node) {
        if(node.isType(dataTypes.variable) && !this.identifiers.contains(node.value)){
            throw new Error(`${node.value} is undefined`);
        }
    }

    retainValue(element) {
        return this.identifiers.contains(element) ? 
        this.identifiers.getValueOf(element).value : element;
    }
}

module.exports = Interpreter;
