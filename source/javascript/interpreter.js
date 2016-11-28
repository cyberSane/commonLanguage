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
        else
            this.identifiers.assign(key, value);
    }

    interpret(operator, firstValue, secondValue) {
        this.validate(firstValue);
        this.validate(secondValue);
        var first = this.retainValue(firstValue.value);
        var second = this.retainValue(secondValue.value);
        return new Node(operations[operator.value](first, second), symbols.number);
    }

    validate(node) {
        if(node.isType(symbols.variable) && !this.identifiers.contains(node.value)){
            throw new Error(`${node.value} is undefined`);
        }
    }

    retainValue(element) {
        return this.identifiers.contains(element) ? 
        this.identifiers.getValueOf(element).value : element;
    }
}

module.exports = Interpreter;
