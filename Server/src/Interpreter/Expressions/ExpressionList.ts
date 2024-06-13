import AstNode from "../Ast/AstNode";
import Controller from "../Controller";
import Expression from "../Interfaces/Expression";
import SymbolTable from "../SymbolTable/SymbolTable";
import Type, { enumType } from "../SymbolTable/Type";

export default class ExpressionList implements Expression{
    type: Type;
    value: any;

    public expressionList : Array<Expression>;
    public line : number;
    public column : number;

    constructor(expressionList : Array<Expression>, line : number, column : number){
        this.expressionList = expressionList;
        this.line = line;
        this.column = column;
        this.type = new Type(enumType.ERROR);
        this.value = expressionList;
    }

    getValue(controller: Controller, symbolTable: SymbolTable): Expression {
        if(this.expressionList.length > 0){
            this.type = this.expressionList[1].getValue(controller,symbolTable).type;
        }
        this.value = this.expressionList;
        return this;
    }
    run(): AstNode {
        let parent = new AstNode("Lista Expresiones","");
        parent.addChild(new AstNode("{",""));
        for(let exp of this.expressionList){
            let expChild = new AstNode("Expresion","");
            expChild.addChild(exp.run());
            parent.addChild(expChild);
        }
        parent.addChild(new AstNode("}",""));
        return parent;
    }

}