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

    getValue(){
        return this.value;
    }

    toString(){
        return this.value;
    }

};

module.exports = Node;