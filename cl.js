
var Parser = require('jison').Parser;
var grammer = require('fs').readFileSync('./source/jison/clGrammer.jison', 'utf-8');
var parser = new Parser(grammer);
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function(line){
	var tree;
	tree = parser.parse(line);
	try{
		if(line == "")
			return ;	
		var result = tree.evaluate();
		console.log(result.getValue());
	}catch(e){
    	console.log("syntax error:",e);
    	tree.removeLastBranch();
	}
});

