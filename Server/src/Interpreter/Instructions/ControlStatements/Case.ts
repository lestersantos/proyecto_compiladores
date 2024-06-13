import AstNode from "../../Ast/AstNode";
import Controller from "../../Controller";
import Expression from "../../Interfaces/Expression";
import { Instruction } from "../../Interfaces/Instruction";
import SymbolTable from "../../SymbolTable/SymbolTable";
import Break from "../TransferStatements/Break";

export default class Case implements Instruction {

    public expression: Expression;
    public instructionList: Array<Instruction>;
    public line: number;
    public column: number;

    constructor(expression: Expression, instructionList: Array<Instruction>, line: number, column: number) {
        this.expression = expression;
        this.instructionList = instructionList;
        this.line = line;
        this.column = column;
    }

    execute(controller: Controller, symbolTable: SymbolTable) {
        let st_local = new SymbolTable(symbolTable);

        for(let inst of this.instructionList){
            let res : any = inst.execute(controller, st_local);
            //console.log(inst);
            if(res instanceof Break){
                return res
            }
        }
    }
    run(): AstNode {
        let parent = new AstNode("Caso","");

        parent.addChild(new AstNode("Case",""));
        if(this.expression != null){
            parent.addChild(this.expression.run());
        }
        
        parent.addChild(new AstNode(":",""));

        let instChild = new AstNode("Instrucciones","");
        for(let inst of this.instructionList){
            instChild.addChild(inst.run());
        }
        parent.addChild(instChild);

        return parent;

    }
}