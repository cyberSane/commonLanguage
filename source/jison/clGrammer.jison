%{
   var path = require('path');
    var Branch = require(path.resolve('./source/javascript/branch.js'));
    var Node = require(path.resolve('./source/javascript/node.js'));
    var symbols = require(path.resolve('./source/javascript/symbols'));
    var Tree = require(path.resolve('./source/javascript/tree.js'));
    var identifiers = require(path.resolve('./source/javascript/identifiers.js'));
    var Interpreter = require(path.resolve('./source/javascript/interpreter.js'));
    var interpreter = new Interpreter(identifiers);
    var tree = new Tree(identifiers);
    var zeroNode = new Node(0, symbols.number);
    var plusNode = new Node('plus', symbols.operator);
%}

%lex
%%

\s+                                                 /* skip whitespace */
\d+                                                 return 'NUMBER'
'times'|'by'|'minus'|'plus'|'power'|'not'|'mod'     return 'OPERATOR'
';'                                                 return 'SEMICOLON'
'equals'                                            return 'EQUALS' 
'as'                                                return 'ASSIGNMENT' 
'end'                                               return 'EOB'
\w+                                                 return 'WORD'
<<EOF>>                                             return 'EOF'


/lex

/* operator associations and precedence */

%left 'plus' 'minus'
%left 'times' 'by'
%left 'power'
%right 'not'
%right 'mod'

%start program%%

program
    : statements EOF {return tree;}
    ;

statements
    : statement 
    | statements statement
    ;

statement
    :identifier SEMICOLON
    { tree.addBranch(new Branch(plusNode , $1, zeroNode, interpreter)) }
    | assignment SEMICOLON
    {tree.addBranch($$) }
    | expressions SEMICOLON
    { tree.addBranch($$) }
    |number SEMICOLON 
    { tree.addBranch(new Branch(plusNode , $1, zeroNode, interpreter)); }
    ;

assignment
    : identifier ASSIGNMENT number  
        {$$ = new Branch(new Node($2, symbols.operator) , $1, $3, interpreter);}
    | identifier ASSIGNMENT identifier 
        { $$ = new Branch(new Node($2, symbols.operator) , $1, $3, interpreter); }
    | identifier ASSIGNMENT expressions 
        { $$ = new Branch(new Node($2, symbols.operator) , $1, $3, interpreter); }  
    ; 

expressions
    : expression
    | number OPERATOR expressions 
    { $$ = new Branch(new Node($2, symbols.operator) , $1, $3, interpreter); }

    | identifier OPERATOR expressions 
    { $$ = new Branch(new Node($2, symbols.operator) , $1, $3, interpreter); }

    ;

expression
    : number OPERATOR  number 
    { $$ = new Branch(new Node($2, symbols.operator) , $1, $3, interpreter); }

    | identifier  OPERATOR identifier 
    { $$ = new Branch(new Node($2, symbols.operator) , $1, $3, interpreter); }

    | identifier OPERATOR  number 
    { $$ = new Branch(new Node($2, symbols.operator) , $1, $3, interpreter); }

    | number OPERATOR  identifier 
    { $$ = new Branch(new Node($2, symbols.operator) , $1, $3, interpreter); }
    ;

number
    : NUMBER 
      { $$ = new Node(Number(yytext),symbols.number);}
    ;

identifier
    : WORD
    { $$ = new Node($1,symbols.variable); }
    ;
