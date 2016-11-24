var Calculator = require('./calculator');
var Node = require('./node');
var dataTypes = require('./dataTypes');

class Tree {
    constructor(operator, leftChild, rightChild, identifiers) {
        this.operator = operator;
        this.leftChild = leftChild;
        this.rightChild = rightChild;
    }

    toString() {
        var leftChild = this.leftChild.toString();
        var operator = this.operator.toString();
        var rightChild = this.rightChild.toString();
        return `(${leftChild}${operator}${rightChild})`;
    }

    toWords() {
        var leftChild = this.leftChild.toWords();
        var operator = this.operator.toWords();
        var rightChild = this.rightChild.toWords();
      return `(${leftChild} ${operator} ${rightChild})`;
    }

    evaluate() {
        var leftChildResult = this.leftChild.evaluate();
        var rightChildResult = this.rightChild.evaluate();
        var operator = this.operator.evaluate();

        var calculator = new Calculator(operator, leftChildResult, rightChildResult);
        var result = calculator.calculate();
        return new Node(result, dataTypes.number);
    }
};


module.exports = Tree;
