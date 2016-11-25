/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"multiply"            return '*'
"divide"              return '/'
"minus"               return '-'
"plus"                return '+'
"power"               return '^'
"factorial"           return '!'
"equals"		      return '=='
"equal"		          return 'ASSIGNMENT'
";"		              return 'SEMICOLON'
"end"                 return 'EOB'
\w+                  return 'WORD'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex
%{
	var path = require('path');
	var Branch = require(path.resolve('./source/javascript/branch.js'));
    var Node = require(path.resolve('./source/javascript/node.js'));
    var dataType = require(path.resolve('./source/javascript/dataTypes'));
    var Tree = require(path.resolve('./source/javascript/tree.js'));
    var tree = new Tree();
%}

/* operator associations and precedence */

%left '+' '-'
%left '*' '/'
%left '^'
%left 'ASSIGNMENT' ';'


%start expressions

%% /* language grammar */

expressions : statement EOF {console.log(JSON.stringify(tree.branchList));};

statement
    : assignment SEMICOLON
    { tree.addBranch($$) }
    | assignment SEMICOLON statement
    { tree.addBranch($$) }
    | e SEMICOLON
    { tree.addBranch($$) }
    | e SEMICOLON statement
    { tree.addBranch($$) }
;

assignment
    : WORD ASSIGNMENT e
    { $$ = new Branch(new Node($2, dataType.variable), $1, $3);  }
    ;


e
    : e '+' e
        {$$ = new Branch(new Node($2, dataType.operator), $1, $3); }

    | e '-' e
        { $$ = new Branch(new Node($2, dataType.operator) , $1, $3); }

    | e '*' e
        { $$ = new Branch(new Node($2, dataType.operator) , $1, $3); }

    | e '/' e
        { $$ = new Branch(new Node($2, dataType.operator) , $1, $3); }

    | e '^' e
        { $$ = new Branch(new Node($2, dataType.operator), $1, $3);}

    | '(' e ')'
        {$$ = new Node($2, dataType.number);}

    | NUMBER
        {$$ = new Node(Number(yytext),dataType.number);}

    | WORD

    ;
