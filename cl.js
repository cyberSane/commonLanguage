var Parser = require('jison').Parser;
var fs = require('fs');
var grammer = fs.readFileSync('./source/jison/clGrammer.jison', 'utf-8');
var parser = new Parser(grammer);
var readline = require('readline');

var readFromReadLine = function(){
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
}

var givenFilePath = process.argv[2];
if(givenFilePath){
	var data = fs.readFileSync(givenFilePath, 'utf-8');
	var tree = parser.parse(data);
	var result = tree.evaluate();
	console.log(result.getValue());
}else{
	readFromReadLine();
}