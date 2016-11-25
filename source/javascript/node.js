class Node {
    constructor(value, type) {
        this.value = value;
        this.type = type;
    }

    isType(typeToCheck){
        return this.type == typeToCheck;
    }

    is(element) {
        return this.value == element;
    }

    evaluate() {
        return this;
    }
};

module.exports = Node;