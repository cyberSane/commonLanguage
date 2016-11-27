var Evaluator = require('./interpreter');
var Node = require('./node');

class Branch {
    constructor(operator, leftChild, rightChild, interpreter) {
        this.operator = operator;
        this.leftChild = leftChild;
        this.rightChild = rightChild;
        this.interpreter = interpreter;
    }

    evaluateNode(operatorValue, leftValue, rightValue){
        var equals = 'as';
        if(operatorValue.is(equals)){
            this.interpreter.hold(leftValue.getValue(), rightValue);
            return rightValue;
        }
        return this.interpreter.interpret(operatorValue, leftValue, rightValue);
    }

    evaluate() {
        var operatorValue = this.operator.evaluate();
        var leftValue = this.leftChild.evaluate();
        var rightValue = this.rightChild.evaluate();

        return this.evaluateNode(operatorValue, leftValue, rightValue);
    }
};


module.exports = Branch;
