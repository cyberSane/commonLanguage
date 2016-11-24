class DataTypes {
  constructor(){
    this.operator = 'operator';
    this.number = 'number';
    this.variable = 'variable';
  }

  isVariable(type) {
    return this.variable == type;
  }
}

var dataTypes = new DataTypes();

module.exports = dataTypes;
