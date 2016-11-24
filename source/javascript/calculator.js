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

class Calculator {
    constructor(operator, firstValue, secondValue) {
        this.operator = operator;
        this.firstValue = firstValue;
        this.secondValue = secondValue;
    }

    calculate() {
        return operations[this.operator](this.firstValue, this.secondValue);
    }
}

module.exports = Calculator;
