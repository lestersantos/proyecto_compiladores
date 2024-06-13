import AstNode from "../Ast/AstNode";
import Controller from "../Controller";
import Expression from "../Interfaces/Expression";
import SymbolTable from "../SymbolTable/SymbolTable";
import Type, { enumType } from "../SymbolTable/Type";

export default abstract class UnaryOperation implements Expression{
    public exp1 : Expression;
    public line : number;
    public column : number;
    public type: Type;
    public value: any;
    public operatorSign : string;

    constructor(exp1 : Expression, line : number, column : number){
        this.exp1 = exp1;
        this.line = line;
        this.column = column;
        this.type = new Type(enumType.ERROR);    
        this.value = undefined;
        this.operatorSign = "";
    }
    abstract  getValue(controller: Controller, symbolTable: SymbolTable): Expression;

    run() : AstNode{
        let parent = new AstNode("Exp","");

        parent.addChild(new AstNode(this.operatorSign, ""));
        parent.addChild(this.exp1.run());

        return parent;
    }
}