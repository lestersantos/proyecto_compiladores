import AstNode from "../../Ast/AstNode";
import Controller from "../../Controller";
import Expression from "../../Interfaces/Expression";
import { Instruction } from "../../Interfaces/Instruction";
import SymbolTable from "../../SymbolTable/SymbolTable";

export default class Return implements Instruction {

    public returnValue: Expression;

    constructor(returnValue: Expression) {
        this.returnValue = returnValue;
    }

    execute(controller: Controller, symbolTable: SymbolTable) {

        if (this.returnValue != null) {
            console.log("Msg: From return class <> ");
            console.log(this.returnValue.getValue(controller,symbolTable));
            return this.returnValue.getValue(controller, symbolTable);
        } else {
            //console.log("return sin expresion");
            return this;
            
        }
    }

    run(): AstNode {
        let parent = new AstNode("Instruccion", "");
        parent.addChild(new AstNode("Return", ""))
        if (this.returnValue != null) {
            parent.addChild(this.returnValue.run());
            return parent;
        }
        return parent;
    }
}