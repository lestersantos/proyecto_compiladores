import AstNode from "../Ast/AstNode";
import Controller from "../Controller";
import Expression from "../Interfaces/Expression";
import { Instruction } from "../Interfaces/Instruction";
import SymbolTable from "../SymbolTable/SymbolTable";
import Type, { enumType } from "../SymbolTable/Type";
import Literal from "./Literal";

export default class Ternary implements Expression{

    public condition : Expression;
    public expr1 : Expression;
    public expr2 : Expression
    public line : number;
    public column : number;

    type: Type;
    value: any;

    constructor(condition : Expression, expr1 : Expression, expr2 : Expression, line : number, column : number){
        this.condition = condition;
        this.expr1 = expr1;
        this.expr2 = expr2;
        this.line = line;
        this.column = column;   
        this.type = new Type(enumType.ERROR);
        this.value = undefined;
    }
    
    getValue(controller: Controller, symbolTable: SymbolTable): Expression {
        
        let resCondition = this.condition.getValue(controller, symbolTable);

        let resCondType = resCondition.type.getTypeName();

        if (resCondType == enumType.BOOLEAN) {
            return resCondition.value ? this.expr1.getValue(controller,symbolTable) :this.expr2.getValue(controller,symbolTable);
            // if (resCondition.value == true) {
            //     let resExpr1 = this.expr1.getValue(controller,symbolTable);

            //     return new Literal(resExpr1.value,resExpr1.type.getTypeName());
            // }else{
            //     let resExpr2 = this.expr2.getValue(controller,symbolTable);

            //     return new Literal(resExpr2.value,resExpr2.type.getTypeName());
            // }
        }else{
            return new Literal("Error semantico", enumType.ERROR);
        }

    }

    run(): AstNode {
        let parent = new AstNode("Ternario","");


        parent.addChild(this.condition.run());
        parent.addChild(new AstNode("?",""));
        parent.addChild(this.expr1.run());
        parent.addChild(new AstNode(":",""));
        parent.addChild(this.expr2.run());

        return parent;
    }

}