var identifiers = require('./identifiers.js');

class Tree {
    constructor() {
        this.branchList = [];
        this.identifiers = identifiers;
    }

    addBranch(branch){
        this.branchList.unshift(branch);
    }
}

module.exports = Tree;
