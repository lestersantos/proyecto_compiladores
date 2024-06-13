import AstNode from "../Ast/AstNode";
import SysError from "../Ast/SysError";
import Controller from "../Controller";
import Literal from "../Expressions/Literal";
import Expression from "../Interfaces/Expression";
import { Instruction } from "../Interfaces/Instruction";
import { SymbolType } from "../SymbolTable/Symbol";
import SymbolTable from "../SymbolTable/SymbolTable";
import { enumType } from "../SymbolTable/Type";

export default class AppendList implements Instruction {

    public id: string;
    public expression: Expression;
    public line: number;
    public column: number;

    constructor(id: string, expresssion: Expression, line: number, column: number) {
        this.id = id;
        this.expression = expresssion;
        this.line = line;
        this.column = column;
    }
    execute(controller: Controller, symbolTable: SymbolTable) {
        if (symbolTable.exist(this.id)) {
            let listSym = symbolTable.get(this.id);
            let resExpr = this.expression.getValue(controller, symbolTable);

            if (listSym?.symbolType == SymbolType.LIST) {
                let list = listSym.value;
                if (listSym?.type.getTypeName() == resExpr.type.getTypeName()) {
                    list.push(resExpr.value);
                } else {
                    if (listSym?.type.getTypeName() == enumType.DOUBLE && resExpr.type.getTypeName() == enumType.INTEGER) {
                        list.push(resExpr.value);
                    } else if (listSym?.type.getTypeName() == enumType.INTEGER && resExpr.type.getTypeName() == enumType.DOUBLE) {
                        list.push(Math.trunc(resExpr.value));
                    } else {
                        let error = new SysError("Semantico", `Incompatibilidad lista \"${this.id}\": tipo ${listSym?.type.toString()} no puede asignarse tipo ${resExpr.type.toString()}`, this.line, this.column);
                        controller.addError(error);
                        controller.append(` ***ERROR: Incompatibilidad lista \"${this.id}\": tipo ${listSym?.type.toString()} no puede asignarse tipo ${resExpr.type.toString()} En la linea  ${this.line} y columna ${this.column}`);
                    }

                }
            } else {
                let sysError = new SysError("Semantico", `La variable ${this.id} no es una lista.`, this.line, this.column);
                controller.addError(sysError);
                controller.append(` ***ERROR: La variable ${this.id} no es una lista,. En la linea ${this.line} y columna ${this.column}`);

                return new Literal(`Semantico, La variable ${this.id} no es una lista,`, enumType.ERROR);
            }

        } else {
            let sysError = new SysError("Semantico", `La variable ${this.id} no existe en la tabla de simbolos.`, this.line, this.column);
            controller.addError(sysError);
            controller.append(` ***ERROR: La variable ${this.id} no existe en la tabla de simbolos. En la linea ${this.line} y columna ${this.column}`);
            return new Literal(`Semantico, La variable ${this.id} no existe en la tabla de simbolos.`, enumType.ERROR);
        }
    }
    run(): AstNode {
        let parent = new AstNode("Agregar valor a lista","");
        parent.addChild(new AstNode("append",""));
        parent.addChild(new AstNode("(",""));

        let idChild = new AstNode("ID","");
        idChild.addChild(new AstNode(this.id,""));
        parent.addChild(idChild);

        let expChild = new AstNode("Expresion","");
        expChild.addChild(this.expression.run());
        parent.addChild(expChild);

        parent.addChild(new AstNode(")",""));

        return parent;
    }


}