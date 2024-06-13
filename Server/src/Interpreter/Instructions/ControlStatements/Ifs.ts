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

export default class If implements Instruction {

    public expression: Expression;
    public ifInstructionList: Array<Instruction>;
    public elseInstructionList: Array<Instruction>;
    public line: number;
    public column: number;

    constructor(expression: Expression, ifInstructionList: Array<Instruction>, elseInstructionList: Array<Instruction>, line: number, column: number) {
        this.expression = expression;
        this.ifInstructionList = ifInstructionList;
        this.elseInstructionList = elseInstructionList;
        this.line = line;
        this.column = column;
    }
    execute(controller: Controller, symbolTable: SymbolTable) {

        let st_Local = new SymbolTable(symbolTable);
        let ifConditionValue = this.expression.getValue(controller, symbolTable);

        if (ifConditionValue.type.getTypeName() == enumType.BOOLEAN) {
            if (ifConditionValue.value == true) {
                for (let inst of this.ifInstructionList) {
                    //console.log("instruccion en if: "+inst);
                    let ret = inst.execute(controller, st_Local);
                    if (ret instanceof Break) {
                        if (controller.isLoopStmt() == true) {
                            return ret;
                        } else {
                            //TODO: REPORTAR ERROR SEMANTICO
                            let error = new SysError("Semantico", `No se puede ejecutar la sentencia break dentro de la sentencia if.`, this.line, this.column);
                            controller.addError(error);
                            controller.append(` ***ERROR: No se puede ejecutar la sentencia break dentro de la sentencia if. En la linea ${this.line} y columna ${this.column}`);
                        }
                    }

                    if (ret instanceof Continue) {
                        if (controller.isLoopStmt() == true) {
                            return ret;
                        } else {
                            //TODO: REPORTAR ERROR SEMANTICO
                            let error = new SysError("Semantico", `No se puede ejecutar la sentencia continue dentro de la sentencia if.`, this.line, this.column);
                            controller.addError(error);
                            controller.append(` ***ERROR: No se puede ejecutar la sentencia continue dentro de la sentencia if. En la linea ${this.line} y columna ${this.column}`);
                        }
                    }

                    if (ret instanceof Return) {
                        //console.log("encontro return");
                        return ret;
                    }

                    if (ret != null) {
                        return ret;
                    }
                }
            } else {

                for (let inst of this.elseInstructionList) {
                    let ret = inst.execute(controller, st_Local);

                    if (ret instanceof Break) {
                        if (controller.isLoopStmt() == true) {
                            return ret;
                        } else {
                            //TODO: REPORTAR ERROR SEMANTICO
                            let error = new SysError("Semantico", `No se puede ejecutar la sentencia continue dentro de la sentencia else.`, this.line, this.column);
                            controller.addError(error);
                            controller.append(` ***ERROR: No se puede ejecutar la sentencia continue dentro de la sentencia else. En la linea ${this.line} y columna ${this.column}`);
                        }
                    }

                    if (ret instanceof Return) {
                        console.log("encontro return en else");
                        return ret;
                    }

                    if (ret != null) {
                        return ret;
                    }
                }
            }
        }
        return null;
    }
    run(): AstNode {
        let parent = new AstNode("Sentencia If", "");

        parent.addChild(new AstNode("If", ""));

        parent.addChild(new AstNode("(", ""));

        let ifConditionChild = new AstNode("Condicion", "");

        ifConditionChild.addChild(this.expression.run());
        parent.addChild(ifConditionChild);
        parent.addChild(new AstNode(")", ""));
        parent.addChild(new AstNode("{", ""));

        let instChild = new AstNode("Instrucciones", "");
        for (let inst of this.ifInstructionList) {
            instChild.addChild(inst.run());
        }
        parent.addChild(instChild);

        parent.addChild(new AstNode("}", ""));

        if (this.elseInstructionList.length > 0) {
            let elseChild = new AstNode("Sentencia Else","");

            for (let inst of this.elseInstructionList) {
                elseChild.addChild(inst.run());
            }

            parent.addChild(elseChild);
        }

        return parent;
    }
}