var Evaluator = require('./interpreter');
var Node = require('./node');
var dataTypes = require('./dataTypes');

class Branch {
    constructor(operator, leftChild, rightChild) {
        this.operator = operator;
        this.leftChild = leftChild;
        this.rightChild = rightChild;
    }

    evaluateNode(operatorValue, leftValue, rightValue, interpreter){
        var equals = '=';
        if(operatorValue.is(equals)){
            interpreter.hold(leftValue.value, rightValue);
            return rightValue;
        }
        return interpreter.interpret(operatorValue, leftValue, rightValue);
    }

    evaluate(interpreter) {
        var operatorValue = this.operator.evaluate(interpreter);
        var leftValue = this.leftChild.evaluate(interpreter);
        var rightValue = this.rightChild.evaluate(interpreter);

        return this.evaluateNode(operatorValue, leftValue, rightValue, interpreter);
    }
};


module.exports = Branch;
