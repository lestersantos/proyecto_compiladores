import AstNode from "../Ast/AstNode";
import Controller from "../Controller";
import Expression from "../Interfaces/Expression";
import { Instruction } from "../Interfaces/Instruction";
import SymbolTable from "../SymbolTable/SymbolTable";
import { enumType } from "../SymbolTable/Type";

export default class WriteLine implements Instruction {

    public expression: Expression;

    constructor(expression: Expression) {
        this.expression = expression;
    }

    execute(controller: Controller, symbolTable: SymbolTable) {
        let resExp1 = this.expression.getValue(controller, symbolTable);

        let typeExp1 = resExp1.type.getTypeName();

        if (typeExp1 != enumType.ERROR) {
            
            console.log(this.expression.getValue(controller, symbolTable).value);
            controller.append(this.expression.getValue(controller, symbolTable).value);
        }
    }
    run(): AstNode {
        let parent = new AstNode("WriteLine","");

        parent.addChild(new AstNode("WriteLine",""));
        parent.addChild(new AstNode("(",""));

        let child = new AstNode("exp","");

        child.addChild(this.expression.run());

        parent.addChild(child);
        parent.addChild(new AstNode(")",""));

        return parent;
    }

}