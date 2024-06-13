import AstNode from "../Ast/AstNode";
import SysError from "../Ast/SysError";
import Controller from "../Controller";
import Literal from "../Expressions/Literal";
import Expression from "../Interfaces/Expression";
import { Instruction } from "../Interfaces/Instruction";
import { SymbolType } from "../SymbolTable/Symbol";
import SymbolTable from "../SymbolTable/SymbolTable";
import { enumType } from "../SymbolTable/Type";

export default class ArrayModification implements Instruction {
    public id: string;
    public expression: Expression;
    public value: Expression;
    public line: number;
    public column: number;

    constructor(id: string, expression: Expression, value: Expression, line: number, column: number) {
        this.id = id;
        this.expression = expression;
        this.value = value;
        this.line = line;
        this.column = column;

    }
    execute(controller: Controller, symbolTable: SymbolTable) {
        let resExpr = this.expression.getValue(controller, symbolTable);
        let arrayIndex = resExpr.value;
        let resExprType = resExpr.type;
        if (symbolTable.exist(this.id)) {
            if (resExprType.getTypeName() == enumType.INTEGER) {

                let resNewValue = this.value.getValue(controller, symbolTable);
                let arraySym = symbolTable.get(this.id);

                if (arraySym?.symbolType == SymbolType.VECTOR) {
                    let arrayValues = arraySym.value;
                    if (arraySym?.type.getTypeName() == resNewValue.type.getTypeName()) {
                        arrayValues[arrayIndex] = resNewValue.value;
                    } else {
                        if (arraySym?.type.getTypeName() == enumType.DOUBLE && resNewValue.type.getTypeName() == enumType.INTEGER) {
                            arrayValues[arrayIndex] = resNewValue.value;
                        } else if (arraySym?.type.getTypeName() == enumType.INTEGER && resNewValue.type.getTypeName() == enumType.DOUBLE) {
                            arrayValues[arrayIndex] = Math.trunc(resNewValue.value);
                        } else {
                            let error = new SysError("Semantico", `Incompatibilidad ${this.id}: tipo ${arraySym?.type.toString()} no puede asignarse tipo ${resNewValue.type.toString()}`, this.line, this.column);
                            controller.addError(error);
                            controller.append(` ***ERROR: Incompatibilidad ${this.id}: tipo ${arraySym?.type.toString()} no puede asignarse tipo ${resNewValue.type.toString()}En la linea  ${this.line} y columna ${this.column}`);
                        }

                    }

                } else {
                    let sysError = new SysError("Semantico", `La variable ${this.id} no es un vector.`, this.line, this.column);
                    controller.addError(sysError);
                    controller.append(` ***ERROR: La variable ${this.id} no es un vector,. En la linea ${this.line} y columna ${this.column}`);

                    return new Literal(`Semantico, La variable ${this.id} no es un vector,`, enumType.ERROR);
                }


            } else {
                let sysError = new SysError("Semantico", `Incompatibiliad de tipos tipo ${resExpr.type.toString()} no puede asignarse a int,  `, this.line, this.column);
                controller.addError(sysError);
                controller.append(` ***ERROR: Incompatibiliad de tipos tipo ${resExpr.type.toString()} no puede asignarse a int. En la linea ${this.line} y columna ${this.column}`);

                return new Literal(`Semantico, Incompatibiliad de tipos tipo ${resExpr.type.toString()} no puede asignarse a int,  `, enumType.ERROR);
            }
        } else {
            let sysError = new SysError("Semantico", `La variable ${this.id} no existe en la tabla de simbolos.`, this.line, this.column);
            controller.addError(sysError);
            controller.append(` ***ERROR: La variable ${this.id} no existe en la tabla de simbolos. En la linea ${this.line} y columna ${this.column}`);
            return new Literal(`Semantico, La variable ${this.id} no existe en la tabla de simbolos.`, enumType.ERROR);
        }
    }
    run(): AstNode {
        let parent = new AstNode("Modificacion de Vector", "");
        let idChild = new AstNode("Id", "");
        idChild.addChild(new AstNode(this.id, ""));
        parent.addChild(idChild);

        parent.addChild(new AstNode("[", ""));
        parent.addChild(this.expression.run());
        parent.addChild(new AstNode("]", ""));

        parent.addChild(new AstNode("=", ""));
        let expChild = new AstNode("Expresion", "");
        expChild.addChild(this.value.run());

        parent.addChild(expChild);

        return parent;
    }
}