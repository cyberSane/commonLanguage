class Node {
    constructor(value, symbolType) {
        this.value = value;
        this.symbolType = symbolType;
    }

    isType(typeToCheck){
        return this.symbolType == typeToCheck;
    }

    is(element) {
        return this.value == element;
    }

    evaluate() {
        return this;
    }

    getValue(){
        return this.value;
    }

    toString(){
        return this.value;
    }

};

module.exports = Node;