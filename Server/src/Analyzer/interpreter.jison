
/* PARSER/INTERPRETER FOR UMG PROJECT */

/* LEXICAL DEFINITIONS SECTION */
%lex
%options case-insensitive 


//REGULAR EXPRESSIONS SECTION
num         [0-9]+
digit       [0-9]
letter      [a-zA-ZÑñ]+
integer     ({digit})+
doublenum   {digit}+"."{digit}+
id          {letter}({letter}|{digit}|"_")*
//--> STRINGS
escapechar   [\'\"\\ntr]
escape      \\{escapechar}
acceptance  [^\"\\]
string      (\"({escape} | {acceptance})*\")

//--> CHARACTER
escapechar2 [\'\"\\ntr"]
escape2     \\{escapechar2}
acceptance2 [^\'\\]
character   (\'({escape2} | {acceptance2})\')

//--> PREPROCESSOR

%%

/* Comentarios */
"//".*              {/*Ignoramos los comentarios simples*/ console.log("Reconocio: "+ yytext+" Comentario"); }   id++
"/*"((\*+[^/*])|([^*]))*\**"*/" {/*ignorar comentarios con multiples lineas*/ console.log("Reconocio: "+ yytext+" Comentario multiple");}

/* Simbolos del programa */

/* SCOPE RESOLUTION OPERATOR*/
"::"                  { console.log("Reconocio : " + yytext);  return 'SCOPEROP' }

"++"                  { console.log("Reconocio : " + yytext);  return 'PLUSPLUS' }
"--"                  { console.log("Reconocio : " + yytext);  return 'MINUSMINUS' }
"=="                  { console.log("Reconocio : " + yytext);  return 'EQUALTO' }

"."                  { console.log("Reconocio : " + yytext);  return 'DOT' }
","                  { console.log("Reconocio : " + yytext);  return 'COMMA' }
";"                  { console.log("Reconocio : " + yytext);  return 'SEMICOLON' }
":"                  { console.log("Reconocio : " + yytext);  return 'COLON' }
"["                  { console.log("Reconocio : " + yytext);  return 'LSBRACKET' }
"]"                  { console.log("Reconocio : " + yytext);  return 'RSBRACKET' }
"("                  { console.log("Reconocio : " + yytext);  return 'LPAR' }
")"                  { console.log("Reconocio : " + yytext);  return 'RPAR' }
"{"                  { console.log("Reconocio : " + yytext);  return 'LCBRACKET' }
"}"                  { console.log("Reconocio : " + yytext);  return 'RCBRACKET' }
"="                  { console.log("Reconocio : " + yytext);  return 'EQUAL' }

/* MATHEMATICAL OPERATORS */
"+"                  { console.log("Reconocio : " + yytext);  return 'PLUS' } 
"*"                  { console.log("Reconocio : " + yytext);  return 'MULTI' } 
"/"                  { console.log("Reconocio : " + yytext);  return 'DIV' } 
"-"                  { console.log("Reconocio : " + yytext);  return 'MINUS' } 
"%"                  { console.log("Reconocio : " + yytext);  return 'MOD' } 
"^"                  { console.log("Reconocio : " + yytext);  return 'POT' }
"PI"                 { console.log("Reconocio : " + yytext);  return 'PI' } 
"E"                  { console.log("Reconocio : " + yytext);  return 'E' }

/* STANDARD LIBRARY OPERATORS*/
"<<"                  { console.log("Reconocio : " + yytext);  return 'INSERTOP' }
">>"                  { console.log("Reconocio : " + yytext);  return 'EXTRACTOP' }

/* RELATIONAL OPERATORS */
"<="                  { console.log("Reconocio : " + yytext);  return 'LESSEQUAL' }
"<"                   { console.log("Reconocio : " + yytext);  return 'LESSTHAN' }
">="                  { console.log("Reconocio : " + yytext);  return 'GREATEREQUAL' }
">"                   { console.log("Reconocio : " + yytext);  return 'GREATERTHAN' }
"!="                  { console.log("Reconocio : " + yytext);  return 'NOTEQUAL' }

/* LOGICAL OPERATORS */
"&&"                  { console.log("Reconocio : " + yytext);  return 'AND' }
"||"                  { console.log("Reconocio : " + yytext);  return 'OR' }
"!"                  { console.log("Reconocio : " + yytext);  return 'NOT' }

/* TERNARY OPERATOR FROM SYSCOMPILER */
"?"                  { console.log("Reconocio : " + yytext);  return 'QMARK' }

/* PREPROCESSOR DIRECTIVE SYMBOL CPP */

"#"                  { console.log("Reconocio : " + yytext);  return 'HASH' }

/* KEYWORDS */
"using"               { console.log("Reconocio : " + yytext);  return 'USING' }
"namespace"           { console.log("Reconocio : " + yytext);  return 'NAMESPACE' }

"cout"                { console.log("Reconocio : " + yytext);  return 'COUT' }
"endl"                { console.log("Reconocio : " + yytext);  return 'ENDL' }
"cin"                 { console.log("Reconocio : " + yytext);  return 'CIN' }

"class"               { console.log("Reconocio : " + yytext);  return 'CLASS' }

/* ACCESS MODIFIERS*/
"public"              { console.log("Reconocio : " + yytext);  return 'PUBLIC' }
"private"             { console.log("Reconocio : " + yytext);  return 'PRIVATE' }
"protected"             { console.log("Reconocio : " + yytext);  return 'PROTECTED' }

"include"             { console.log("Reconocio : " + yytext);  return 'INCLUDE' }
"pragma"              { console.log("Reconocio : " + yytext);  return 'PRAGMA' }

"true"                { console.log("Reconocio : " + yytext);  return 'TRUE' }
"false"               { console.log("Reconocio : " + yytext);  return 'FALSE' }
"int"                 { console.log("Reconocio : " + yytext);  return 'INT' }
"double"              { console.log("Reconocio : " + yytext);  return 'DOUBLE' }
"boolean"             { console.log("Reconocio : " + yytext);  return 'BOOLEAN' }
"char"                { console.log("Reconocio : " + yytext);  return 'RCHAR' }
"string"              { console.log("Reconocio : " + yytext);  return 'RSTRING' }

"new"                 { console.log("Reconocio : " + yytext);  return 'NEW' }
"DynamicList"         { console.log("Reconocio : " + yytext);  return 'DLIST' }
"append"              { console.log("Reconocio : " + yytext);  return 'APPEND' }
"getValue"            { console.log("Reconocio : " + yytext);  return 'GETVALUE' }
"setValue"            { console.log("Reconocio : " + yytext);  return 'SETVALUE' }

"if"                  { console.log("Reconocio : " + yytext);  return 'IF' }
"else"                { console.log("Reconocio : " + yytext);  return 'ELSE' }
"switch"              { console.log("Reconocio : " + yytext);  return 'SWITCH' }
"case"                { console.log("Reconocio : " + yytext);  return 'CASE' }
"default"             { console.log("Reconocio : " + yytext);  return 'DEFAULT' }

"while"               { console.log("Reconocio : " + yytext);  return 'WHILE' }
"for"                 { console.log("Reconocio : " + yytext);  return 'FOR' }
"do"                  { console.log("Reconocio : " + yytext);  return 'DO' }

"break"               { console.log("Reconocio : " + yytext);  return 'BREAK' }
"continue"            { console.log("Reconocio : " + yytext);  return 'CONTINUE' }
"return"              { console.log("Reconocio : " + yytext);  return 'RETURN' }

"void"                { console.log("Reconocio : " + yytext);  return 'VOID' }
"WriteLine"           { console.log("Reconocio : " + yytext);  return 'WRLINE' }
"toLower"             { console.log("Reconocio : " + yytext);  return 'TOLOWER' }
"toUpper"             { console.log("Reconocio : " + yytext);  return 'TOUPPER' }
"length"              { console.log("Reconocio : " + yytext);  return 'LENGTH' }
"truncate"            { console.log("Reconocio : " + yytext);  return 'TRUNCATE' }
"round"             { console.log("Reconocio : " + yytext);  return 'ROUND' }
"typeof"             { console.log("Reconocio : " + yytext);  return 'TYPEOF' }
"toString"             { console.log("Reconocio : " + yytext);  return 'TOSTRING' }
"toCharArray"             { console.log("Reconocio : " + yytext);  return 'TOCHAR' }
"start"             { console.log("Reconocio : " + yytext);  return 'START' }
"with"             { console.log("Reconocio : " + yytext);  return 'WITH' }

//SIMBOLOS ER

{doublenum} { console.log("Reconocio : " + yytext + " Doble");  return 'DOUBLENUM' } 
{integer}   { console.log("Reconocio : " + yytext + " Entero");  return 'INTEGER' }
{id}   { console.log("Reconocio : " + yytext+ " Id");  return 'ID' }
{string}   { console.log("Reconocio : " + yytext+ " Cadena");  return 'STRING' }
{character}   { console.log("Reconocio : " + yytext+ " Caracter");  return 'CHAR' }

/*Espacios*/
[\s\r\n\t]             {/* Espacios se ignoran */}


<<EOF>>               return 'EOF'
.                     { console.log("Error Lexico "+yytext
                        +" linea: "+yylineno
                        +" columna: "+(yylloc.last_column+1));

                      new SysError.default("Lexico"," El caracter "+ yytext 
                      +" no forma parte del lenguaje ",
                      yylineno + 2,
                      yylloc.last_column);
                      }

/lex

// area de imports
%{
    const ast = require('../Interpreter/Ast/Ast');

    const Type = require('../Interpreter/SymbolTable/Type');
    const {enumType} = require('../Interpreter/SymbolTable/Type');
    const Symbol = require('../Interpreter/SymbolTable/Symbol');
    const {SymbolType} = require('../Interpreter/SymbolTable/Symbol');

    const Division = require('../Interpreter/Expressions/Arithmetic/Division');
    const Multiplication = require('../Interpreter/Expressions/Arithmetic/Multiplication');    
    const Sum = require('../Interpreter/Expressions/Arithmetic/Sum');  
    const Subtraction = require('../Interpreter/Expressions/Arithmetic/Subtraction');
    const Exponentiation = require('../Interpreter/Expressions/Arithmetic/Exponentiation');
    const Unary = require('../Interpreter/Expressions/Arithmetic/Unary');
    const Modulus = require('../Interpreter/Expressions/Arithmetic/Modulus');

    const And = require('../Interpreter/Expressions/Logic/And');
    const Not = require('../Interpreter/Expressions/Logic/Not');
    const Or = require('../Interpreter/Expressions/Logic/Or');

    const EqualTo = require('../Interpreter/Expressions/Relational/EqualTo');
    const GreaterEqual = require('../Interpreter/Expressions/Relational/GreaterEqual');
    const GreaterThan = require('../Interpreter/Expressions/Relational/GreaterThan');
    const LessEqual = require('../Interpreter/Expressions/Relational/LessEqual');
    const LessThan = require('../Interpreter/Expressions/Relational/LessThan');
    const NotEqual = require('../Interpreter/Expressions/Relational/NotEqual');

    const Literal = require('../Interpreter/Expressions/Literal');
    const Identifier = require('../Interpreter/Expressions/Identifier');

    const WriteLine = require('../Interpreter/Instructions/WriteLine');
    const Declaration = require('../Interpreter/Instructions/Declaration');
    const Assignment = require('../Interpreter/Instructions/Assignment');
    const For = require('../Interpreter/Instructions/LoopStatements/For');
    const While = require('../Interpreter/Instructions/LoopStatements/While');
    const DoWhile = require('../Interpreter/Instructions/LoopStatements/DoWhile');

    const Ternary = require('../Interpreter/Expressions/Ternary'); 

    const Ifs = require('../Interpreter/Instructions/ControlStatements/Ifs');
    const Case = require('../Interpreter/Instructions/ControlStatements/Case');
    const Switch = require('../Interpreter/Instructions/ControlStatements/Switch');

    const Break = require('../Interpreter/Instructions/TransferStatements/Break');
    const Continue = require('../Interpreter/Instructions/TransferStatements/Continue');
    const Return = require('../Interpreter/Instructions/TransferStatements/Return');

    const Function = require('../Interpreter/Instructions/Function');
    const Call = require('../Interpreter/Instructions/Call');
    const StartWith = require('../Interpreter/Instructions/StartWith');

    const ArrayDecl  = require('../Interpreter/Instructions/ArrayDeclaration');
    const ExpressionList = require('../Interpreter/Expressions/ExpressionList');
    const ArrayAccess = require('../Interpreter/Expressions/ArrayAccess');
    const ArrayModification = require('../Interpreter/Instructions/ArrayModification');

    const ListDeclaration = require('../Interpreter/Instructions/ListDeclaration');
    const AppendList = require('../Interpreter/Instructions/AppendList');
    const GetValueList = require('../Interpreter/Expressions/GetValueList');
    const ListModification = require('../Interpreter/Instructions/ListModification');

    const Length = require('../Interpreter/Expressions/NativeFunctions/Length');

    const SysError = require('../Interpreter/Ast/SysError');
    const Default = require('../Interpreter/Instructions/Default');

%}
/* operator associations and precedence */
// LOWER TO HIGHER PRECEDENCCE
%right 'QMARK'
%left 'OR'
%left 'AND'

%left 'EQUALTO', 'NOTEQUAL'

%left 'LESSTHAN', 'LESSEQUAL', 'GREATERTHAN', 'GREATEREQUAL'

%left 'PLUS' 'MINUS'
%left 'MULTI' 'DIV', 'MOD'
%left 'INSERTOP', 'EXTRACTOP'
%right 'POT'
%right 'NOT'
%left UMINUS

%start inicio

%% /* language grammar */

inicio : instrucciones EOF  { $$ = new ast.default($1); return $$ };

instrucciones : instrucciones instruccion   { $$ = $1; $$.push($2); }
            | instruccion                   { $$ = new Array(); $$.push($1);}
            ;

instruccion : startwith            {$$ = $1}
            | writeline            { $$ = $1; }
            | variable_declaration SEMICOLON { $$ = $1; }
            | variable_assignment  SEMICOLON { $$ = $1; }
            | if_statement         { $$ = $1; }
            | for_statement        { $$ = $1; }
            | while_statement      { $$ = $1; }
            | do_while_statement   { $$ = $1; }
            | switch_statement     { $$ = $1; }
            | post_increment  SEMICOLON     { $$ = $1; }
            | post_decrement  SEMICOLON     { $$ = $1; }
            | functions             {$$ = $1; }
            | func_call SEMICOLON   {$$ = $1; }
            | BREAK SEMICOLON       { $$ = new Break.default(); }
            | CONTINUE SEMICOLON      { $$ = new Continue.default(); }
            | RETURN SEMICOLON      { $$ = new Return.default(null); }
            | RETURN e SEMICOLON      { $$ = new Return.default($2); }
            | array_decl            {$$ = $1; }
            | array_modification    {$$ = $1; }
            | list_decl             {$$ = $1; }
            | append_list           {$$ = $1; }
            | list_modification     {$$ = $1; }
            | namespace_declaration SEMICOLON {}
            | classes SEMICOLON          {$$ = $1; }
            | function_declaration       {$$ = $1; }
            | access_specifiers          {$$ = $1; }
            | standard_cout         {$$ = $1; }
            | standard_cin          {$$ = $1; }
            | error                 { console.log("Error Sintactico "+yytext + 
                                                  " linea: "+this._$.first_line + 
                                                  " columna: "+this._$.first_column);
            
                                     new SysError.default("Sintactico","No se esperaba el caracter "+yytext , 
                                     this._$.first_line, this._$.last_column);
            
                                     }
            ;

namespace_declaration  : using_declaration {}                      
                       ;

using_declaration  : USING NAMESPACE ID {$$ = $1}
                   ;

variable_declaration  : decl_type id_list EQUAL e  {$$ = new Declaration.default($1,$2,$4,@1.first_line,@1.last_column);}
                      | decl_type id_list  {$$ = new Declaration.default($1,$2,null,@1.first_line,@1.last_column);} 
                      | ID ID {$$ = new Default.default($1+" OBJ DECLA"); }                
                      ;

id_list : id_list COMMA ID {$$ = $1; $$.push($3); }
        | ID               { $$ = new Array(); $$.push($1); }
        ;

decl_type   : INT       {$$ = new Type.default(enumType.INTEGER);}
            | DOUBLE    {$$ = new Type.default(enumType.DOUBLE);}
            | BOOLEAN   {$$ = new Type.default(enumType.BOOLEAN);}
            | RCHAR     {$$ = new Type.default(enumType.CHAR);}
            | RSTRING   {$$ = new Type.default(enumType.STRING);}
            ;

writeline : WRLINE LPAR e RPAR SEMICOLON {$$ = new WriteLine.default($3); }
            ;

variable_assignment : ID EQUAL e  { $$ = new Assignment.default($1,$3,@1.first_line,@1.last_column); }
                      ;

if_statement :  IF LPAR e RPAR LCBRACKET instrucciones RCBRACKET { $$ = new Ifs.default($3,$6,[],@1.first_line,@1.last_column); }
                | IF LPAR e RPAR LCBRACKET instrucciones RCBRACKET ELSE LCBRACKET instrucciones RCBRACKET {$$ = new Ifs.default($3,$6,$10,@1.first_line,@1.last_column);}
                | IF LPAR e RPAR LCBRACKET instrucciones RCBRACKET ELSE if_statement {$$ = new Ifs.default($3,$6,[$9],@1.first_line,@1.last_column);}
              ;

for_statement : FOR LPAR for_init_opt SEMICOLON e SEMICOLON for_update RPAR LCBRACKET instrucciones RCBRACKET { $$ = new For.default($3,$5,$7,$10,@1.first_line,@1.last_column); }
                ;

for_init_opt :   variable_assignment    {$$ = $1;}
                | variable_declaration  {$$ = $1;}
                ;

for_update :    post_increment { $$ = $1; }
              | post_decrement { $$ = $1; }
              | variable_assignment { $$ = $1; }
              ;

while_statement : WHILE LPAR e RPAR LCBRACKET instrucciones RCBRACKET { $$ = new While.default($3, $6, @1.first_line, @1.last_column); }
                  ;

do_while_statement : DO LCBRACKET instrucciones RCBRACKET WHILE LPAR e RPAR SEMICOLON { $$ = new DoWhile.default($7,$3,@1.first_line,@1.last_column); }
                     ;

switch_statement :  SWITCH LPAR e RPAR LCBRACKET case_list RCBRACKET         { $$ = new Switch.default($3, $6, null, @1.first_line, @1.last_column); }
                  | SWITCH LPAR e RPAR LCBRACKET case_list default RCBRACKET { $$ = new Switch.default($3, $6, $7, @1.first_line, @1.last_column); }
                  | SWITCH LPAR e RPAR LCBRACKET default RCBRACKET           { $$ = new Switch.default($3, [], $6, @1.first_line, @1.last_column); }
                  ;

case_list :   case_list case  { $$ = $1; $$.push($2); }
            | case            { $$ = new Array(); $$.push($1); }
            ;

case : CASE e COLON instrucciones { $$ = new Case.default($2,$4,@1.first_line, @1.last_column ); }
      ;

default : DEFAULT COLON instrucciones { $$ = new Case.default(null,$3,@1.first_line, @1.last_column ); }
          ;

functions : decl_type ID LPAR params_list RPAR LCBRACKET instrucciones RCBRACKET { $$ = new Function.default(SymbolType.FUNCTION,$1,$2,$4,false,$7, @1.first_line, @1.last_column); }
            | decl_type ID LPAR RPAR LCBRACKET instrucciones RCBRACKET {$$ = new Function.default(SymbolType.FUNCTION,$1,$2,[],false,$6, @1.first_line, @1.last_column);}
            | decl_type ID SCOPEROP ID LPAR RPAR LCBRACKET instrucciones RCBRACKET {$$ = $2+$3+$4; }
            | decl_type ID SCOPEROP ID LPAR params_list RPAR LCBRACKET instrucciones RCBRACKET {$$ = $2+$3+$4; }
            | VOID ID LPAR params_list RPAR LCBRACKET instrucciones RCBRACKET {$$ = new Function.default(SymbolType.METHOD,$1,$2,$4,true,$7, @1.first_line, @1.last_column);}
            | VOID ID LPAR RPAR LCBRACKET instrucciones RCBRACKET {$$ = new Function.default(SymbolType.METHOD,$1,$2,[],true,$6, @1.first_line, @1.last_column);}
            ;

params_list :   params_list COMMA decl_type ID {$$ = $1; $$.push(new Symbol.default(SymbolType.PARAMETER, $3, $4, null)); }
              | decl_type ID { $$ = new Array(); $$.push(new Symbol.default(SymbolType.PARAMETER, $1, $2, null)); }
              ;

func_call :   ID LPAR value_List RPAR { $$ = new Call.default($1,$3,@1.first_line, @1.last_column); }
            | ID LPAR RPAR            { $$ = new Call.default($1,[], @1.first_line, @1.last_column); }
            | ID DOT ID LPAR RPAR            { $$ = new Default.default("class member call "); }
            | ID DOT ID LPAR value_List RPAR { $$ = new Default.default("class member call with parameters"); }
            ;

value_List :   value_List COMMA e     {$$ = $1; $$.push($3); }
              | e                     {$$ = new Array(); $$.push($1); }
             ;
post_increment  : ID PLUSPLUS  { $$ = new Assignment.default($1,new Sum.default(new Identifier.default($1, @1.first_line, @1.last_column),new Literal.default(1,enumType.INTEGER), @1.first_line, @1.last_column),@1.first_line,@1.last_column); }
                ;

post_decrement  : ID MINUSMINUS { $$ = new Assignment.default($1,new Subtraction.default(new Identifier.default($1, @1.first_line, @1.last_column),new Literal.default(1,enumType.INTEGER), @1.first_line, @1.last_column),@1.first_line,@1.last_column); }
                ;

pre_increment   : PLUSPLUS ID %prec UMINUS
                ;
pre_decrement   : MINUSMINUS ID %prec UMINUS
                ;

ternary : e QMARK e COLON e { $$ = new Ternary.default($1, $3, $5, @1.first_line, @1.last_column); }
          ;

startwith :   START WITH func_call SEMICOLON {$$ = new StartWith.default($3,@1.first_line, @1.last_column);}
            ;

array_decl : decl_type id_list LSBRACKET RSBRACKET EQUAL NEW decl_type LSBRACKET e RSBRACKET SEMICOLON {$$ = new ArrayDecl.default(1,$1,$2,$9,@1.first_line,@1.last_column); }
              |decl_type id_list LSBRACKET RSBRACKET EQUAL e SEMICOLON { $$ = new ArrayDecl.default(2,$1,$2,$6,@1.first_line,@1.last_column);}
              ; 

array_modification : ID LSBRACKET e RSBRACKET EQUAL e SEMICOLON { $$ = new ArrayModification.default($1,$3,$6,@1.first_line,@1.last_column); }
                      ;

list_decl :  DLIST LESSTHAN decl_type GREATERTHAN ID EQUAL NEW DLIST LESSTHAN decl_type GREATERTHAN SEMICOLON { $$ = new ListDeclaration.default($3,$5,@1.first_line,@1.last_column);}
            ;

append_list : APPEND LPAR ID COMMA e RPAR SEMICOLON { $$ = new AppendList.default($3,$5,@1.first_line,@1.last_column); }
              ;

list_modification : SETVALUE LPAR ID COMMA e COMMA e RPAR SEMICOLON { $$ = new ListModification.default($3,$5,$7,@1.first_line,@1.last_column);}
                    ;

classes : CLASS ID LCBRACKET instrucciones RCBRACKET {$$ = new Default.default("INST CLASS");}
        | CLASS ID LCBRACKET  RCBRACKET {$$ = new Default.default("INST CLASS");}
         ;

function_declaration :  decl_type ID LPAR params_list RPAR SEMICOLON {$$ = new Default.default("INST FUNCTION DECLARATION");}
                      ;

access_modifiers   : PUBLIC       {$$ = new Default.default("ACCESS MODIFIER PUBLIC");}
                   | PRIVATE      {$$ = new Default.default("ACCESS MODIFIER PRIVATE");}
                   | PROTECTED    {$$ = new Default.default("ACCESS MODIFIER PROTECTED");}
                   ;

access_specifiers : access_modifiers COLON {$$ = new Default.default("ACCESS SPECIFIERS");}
                   ;

standard_cout : COUT INSERTOP e SEMICOLON {$$ = new Default.default("INST COUT"); }
               ;

standard_cin : CIN EXTRACTOP e SEMICOLON {$$ = new Default.default("INST CIN"); }
               ;

e
    : e PLUS e              { $$ = new Sum.default($1, $3, @1.first_line, @1.last_column); }
    | e MINUS e             { $$ = new Subtraction.default($1, $3, @1.first_line, @1.last_column); }
    | e MULTI e             { $$ = new Multiplication.default($1, $3, @1.first_line, @1.last_column); }
    | e DIV e               { $$ = new Division.default($1, $3, @1.first_line, @1.last_column); }
    | e POT e               { $$ = new Exponentiation.default($1, $3, @1.first_line, @1.last_column);}
    | e MOD e               { $$ = new Modulus.default($1, $3, @1.first_line, @1.last_column); }
    | e INSERTOP e          {}
    | e EXTRACTOP e          {}
    | post_increment        { $$ = $1; }
    | post_decrement        { $$ = $1; }
    | pre_increment         {}
    | pre_decrement         {}
    | e GREATERTHAN e       { $$ = new GreaterThan.default($1, $3, @1.first_line, @1.last_column); }
    | e GREATEREQUAL e      { $$ = new GreaterEqual.default($1, $3, @1.first_line, @1.last_column); }
    | e LESSTHAN e          { $$ = new LessThan.default($1, $3, @1.first_line, @1.last_column); }
    | e LESSEQUAL e         { $$ = new LessEqual.default($1, $3, @1.first_line, @1.last_column); }
    | e EQUALTO e           { $$ = new EqualTo.default($1, $3, @1.first_line, @1.last_column); }
    | e NOTEQUAL e          { $$ = new NotEqual.default($1, $3, @1.first_line, @1.last_column); }
    | e AND e               { $$ = new And.default($1, $3, @1.first_line, @1.last_column); }
    | e OR e                { $$ = new Or.default($1, $3, @1.first_line, @1.last_column); }
    | NOT e                 { $$ = new Not.default($2, @1.first_line, @1.last_column);}
    | LPAR e RPAR           { $$ = $2; }    
    | MINUS e %prec UMINUS  { $$ = new Unary.default($2, @1.first_line, @1.last_column);}
    | INTEGER               { $$ = new Literal.default(Number($1),enumType.INTEGER); }
    | DOUBLENUM             { $$ = new Literal.default(Number($1),enumType.DOUBLE); }
    | STRING                { $1 = $1.slice(1,$1.length-1); $$ = new Literal.default($1,enumType.STRING); }
    | CHAR                  { $1 = $1.slice(1,$1.length-1); $$ = new Literal.default($1,enumType.CHAR); }
    | ID                    { $$ = new Identifier.default($1, @1.first_line, @1.last_column); }
    | TRUE                  { $$ = new Literal.default(true,enumType.BOOLEAN); }
    | FALSE                 { $$ = new Literal.default(false,enumType.BOOLEAN); }
    | ENDL                  {}
    | func_call             {$$ = $1; }
    | ternary               {$$ = $1; }
    | TYPEOF LPAR e RPAR    {$$ = new TypeOf.default($3,@1.first_line, @1.last_column); }
    | LCBRACKET value_List RCBRACKET {$$ = new ExpressionList.default($2,@1.first_line,@1.last_column); }
    | ID LSBRACKET e RSBRACKET { $$ = new ArrayAccess.default($1,$3,@1.first_line, @1.last_column);} 
    | GETVALUE LPAR ID COMMA e RPAR = { $$ = new GetValueList.default($3,$5,@1.first_line, @1.last_column);}
    | LENGTH LPAR e RPAR     {$$ = new Length.default($3,@1.first_line,@1.last_column);}
    ;