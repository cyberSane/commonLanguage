
var Parser = require('jison').Parser;
var grammer = require('fs').readFileSync('./source/jison/clGrammer.jison', 'utf-8');
var parser = new Parser(grammer);
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var equations = [];

rl.on('line', function(line){
	try{
		if(line == "")
			return ;	
		equations.push(line);
		var result = parser.parse(equations.join("\n")).evaluate();
		console.log(result.getValue());
	}catch(e){
		equations.pop();
    	console.log("syntax error:",e);
	}
})
