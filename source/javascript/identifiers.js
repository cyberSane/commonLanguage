var Tree = require('./Tree');

class Identifiers {
  constructor() {
    this.variableTable = {};
  }

  assign(key, value) {
    this.variableTable[key] = value;
  }

  contains(key) {
    return this.variableTable.hasOwnProperty(key);
  }

  getValueOf(key) {
    return this.variableTable[key];
  }

  empty() {
    this.variableTable = {};
  }
}


module.exports = new Identifiers();
