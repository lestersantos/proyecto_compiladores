import AstNode from "../Ast/AstNode";
import SysError from "../Ast/SysError";
import Controller from "../Controller";
import Expression from "../Interfaces/Expression";
import { SymbolType } from "../SymbolTable/Symbol";
import SymbolTable from "../SymbolTable/SymbolTable";
import Type, { enumType } from "../SymbolTable/Type";
import Literal from "./Literal";

export default class ArrayAccess implements Expression {
    type: Type;
    value: any;

    public id: string;
    public expression: Expression;
    public line: number;
    public column: number;

    constructor(id: string, expression: Expression, line: number, column: number) {
        this.id = id;
        this.expression = expression;
        this.line = line;
        this.column = column;
        this.type = new Type(enumType.ERROR);
        this.value = undefined;
    }

    getValue(controller: Controller, symbolTable: SymbolTable): Expression {
        console.log("array access");
        let resExpr = this.expression.getValue(controller, symbolTable);
        let arrayIndex = resExpr.value;
        let resExprType = resExpr.type;

        if (resExprType.getTypeName() == enumType.INTEGER) {
            if (symbolTable.exist(this.id)) {
                let arraySym = symbolTable.get(this.id);
                if (arraySym?.symbolType == SymbolType.VECTOR) {
                    let arrayValues = arraySym.value;
                    let valueAtIndex = arrayValues[arrayIndex];

                    return new Literal(valueAtIndex,arraySym.type.getTypeName()); ;
                } else {
                    let sysError = new SysError("Semantico", `La variable ${this.id} no es un vector.`, this.line, this.column);
                    controller.addError(sysError);
                    controller.append(` ***ERROR: La variable ${this.id} no es un vector,. En la linea ${this.line} y columna ${this.column}`);

                    return new Literal(`Semantico, La variable ${this.id} no es un vector,`, enumType.ERROR);
                }
            }
            let sysError = new SysError("Semantico", `La variable ${this.id} no existe en la tabla de simbolos.`, this.line, this.column);
            controller.addError(sysError);
            controller.append(` ***ERROR: La variable ${this.id} no existe en la tabla de simbolos. En la linea ${this.line} y columna ${this.column}`);

            return new Literal(`Semantico, La variable ${this.id} no existe en la tabla de simbolos.`, enumType.ERROR);
        } else {
            let sysError = new SysError("Semantico", `Incompatibiliad de tipos tipo ${resExpr.type.toString()} no puede asignarse a int,  `, this.line, this.column);
            controller.addError(sysError);
            controller.append(` ***ERROR: Incompatibiliad de tipos tipo ${resExpr.type.toString()} no puede asignarse a int. En la linea ${this.line} y columna ${this.column}`);

            return new Literal(`Semantico, Incompatibiliad de tipos tipo ${resExpr.type.toString()} no puede asignarse a int,  `, enumType.ERROR);
        }
    }
    run(): AstNode {
        let parent = new AstNode("Vector","");

        parent.addChild(new AstNode(this.id,""));
        parent.addChild(new AstNode("[",""));

        let expChild = new AstNode("Expresion","");
        expChild.addChild(this.expression.run());
        parent.addChild(expChild);
        parent.addChild(new AstNode("]",""));

        return parent;
    }
}