
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
		equations.push(line);
		console.log(parser.parse(equations.join("\n")).evaluate());
	}catch(e){
		equations.pop();
    	console.log("syntax error:",e);
	}
})
