var identifiers = require('./identifiers.js');

class Tree {
    constructor() {
        this.branchList = [];
        this.identifiers = identifiers;
    }

    addBranch(branch){
        this.branchList.push(branch);
    }

    evaluate(){
    	var result;
    	this.branchList.forEach(function(branch){
    		result = branch.evaluate();
    	});
    	return result;
    }
}

module.exports = Tree;
