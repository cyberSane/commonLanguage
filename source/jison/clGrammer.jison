%{
   var path = require('path');
    var Branch = require(path.resolve('./source/javascript/branch.js'));
    var Node = require(path.resolve('./source/javascript/Node.js'));
    var symbols = require(path.resolve('./source/javascript/symbols'));
    var Tree = require(path.resolve('./source/javascript/tree.js'));
    var identifiers = require(path.resolve('./source/javascript/identifiers.js'));
    var Interpreter = require(path.resolve('./source/javascript/Interpreter.js'));
    var interpreter = new Interpreter(identifiers);
    var tree = new Tree(identifiers);
    var zeroNode = new Node(0, symbols.number);
    var plusNode = new Node('plus', symbols.operator);
    var currentTree = new Tree();
%}

%lex
%%

\s+                                                 /* skip whitespace */
\d+                                                         return 'NUMBER'
'times'|'by'|'minus'|'plus'|'power'|'not'|'mod'             return 'OPERATOR'
'equals'|'notEquals'|'greaterThan'|
'greaterThenEqualsTo'|'smallerThen'|'smallerThenEqualTo'    return 'RELATIONAL'
'if'                                                        return 'IF'
';'                                                         return 'SEMICOLON'
'equals'                                                    return 'EQUALS' 
'as'                                                        return 'ASSIGNMENT' 
'set'                                                       return 'SET'
'end'                                                       return 'EOB'
'do'                                                        return 'DO'
\w+                                                         return 'WORD'
<<EOF>>                                                     return 'EOF'


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
    | block EOF
    ;


block
    : relationals statements EOB
        {
        subTrees = new Trees();
        subTrees.add($1);
        subTrees.add($2);
        trees.add(subTrees); currentTree = new Tree();
        }
    ;

relationals
    : IF number RELATIONAL number DO
        {currentTree.addBranch(new Branch($3, $2, $4, interpreter));}
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
    : SET identifier ASSIGNMENT number  
        {$$ = new Branch(new Node($3, symbols.operator) , $2, $4, interpreter);}
    | SET identifier ASSIGNMENT identifier 
        {$$ = new Branch(new Node($3, symbols.operator) , $2, $4, interpreter);}
    | SET identifier ASSIGNMENT expressions 
        {$$ = new Branch(new Node($3, symbols.operator) , $2, $4, interpreter);}
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
