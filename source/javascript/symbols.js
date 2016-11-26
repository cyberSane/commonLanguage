class Symbols {
  constructor(){
    this.operator = 'operator';
    this.number = 'number';
    this.variable = 'variable';
  }

  isVariable(type) {
    return this.variable == type;
  }
}

var symbols = new Symbols();

module.exports = symbols;
