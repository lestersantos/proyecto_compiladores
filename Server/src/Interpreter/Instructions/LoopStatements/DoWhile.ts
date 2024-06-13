import AstNode from "../../Ast/AstNode";
import SysError from "../../Ast/SysError";
import Controller from "../../Controller";
import Expression from "../../Interfaces/Expression";
import { Instruction } from "../../Interfaces/Instruction";
import SymbolTable from "../../SymbolTable/SymbolTable";
import { enumType } from "../../SymbolTable/Type";
import Break from "../TransferStatements/Break";
import Continue from "../TransferStatements/Continue";
import Return from "../TransferStatements/Return";

export default class DoWhile implements Instruction {

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
        let temp = controller.isLoopStmt();
        controller.setIsLoopStmt(true);

        let st_Local = new SymbolTable(symbolTable);
        for (let inst of this.instructionList) {
            let ret = inst.execute(controller, st_Local);
            if (ret instanceof Break) {
                controller.setIsLoopStmt(temp);
                return ret;
            }

            if (ret instanceof Continue) {
                continue;
            }

            if (ret instanceof Return) {
                return ret;
            }

            if (ret != null) {
                return ret;
            }
        }

        if (this.expression.getValue(controller, symbolTable).type.getTypeName() == enumType.BOOLEAN) {
            next:
            while (this.expression.getValue(controller, symbolTable).value == true) {
                let st_Local = new SymbolTable(symbolTable);
                for (let inst of this.instructionList) {
                    let ret = inst.execute(controller, st_Local);
                    if (ret instanceof Break) {
                        controller.setIsLoopStmt(temp);
                        return ret;
                    }

                    if (ret instanceof Continue) {
                        continue next;
                    }

                    if (ret instanceof Return) {
                        return ret;
                    }

                    if (ret != null) {
                        return ret;
                    }
                }
            }
        } else {
            //TODO: REPORTAR ERROR SEMANTICO
            let error = new SysError("Semantico", `Se esperaba expresion booleana. Se econtro ${this.expression.type}`, this.line, this.column);
            controller.addError(error);
            controller.append(` ***ERROR: Se esperaba expresion booleana. Se econtro ${this.expression.type}. En la linea ${this.line} y columna ${this.column}`);
        }
    }
    run(): AstNode {
        let parent = new AstNode("Sentencia Do While", "");

        parent.addChild(new AstNode("Do", ""));
        parent.addChild(new AstNode("While", ""));

        parent.addChild(new AstNode("{", ""));

        let instChild = new AstNode("Instrucciones", "");

        for (let inst of this.instructionList) {
            instChild.addChild(inst.run());
        }

        parent.addChild(instChild);

        parent.addChild(new AstNode("}", ""));
        parent.addChild(new AstNode("while", ""));
        parent.addChild(new AstNode("(", ""));

        let childConditon = new AstNode("Condicion", "");
        childConditon.addChild(this.expression.run());
        parent.addChild(childConditon);

        parent.addChild(new AstNode(")", ""));

        return parent;

    }
}