import AstNode from "../../Ast/AstNode";
import SysError from "../../Ast/SysError";
import Controller from "../../Controller";
import Expression from "../../Interfaces/Expression";
import SymbolTable from "../../SymbolTable/SymbolTable";
import Type, { enumType } from "../../SymbolTable/Type";
import Literal from "../Literal";
import Operation from "../Operation";

export default class And extends Operation {

    constructor(exp1: Expression, exp2: Expression, line: number, column: number) {
        super(exp1, exp2, line, column);
        this.operatorSign = "||";
    }

    getType(controller: Controller, symbolTable: SymbolTable): Type {
        return this.type;
    }
    getValue(controller: Controller, symbolTable: SymbolTable): Expression {

        let resExp1 = this.exp1.getValue(controller, symbolTable);
        let resExp2 = this.exp2.getValue(controller, symbolTable);

        let typeExp1 = resExp1.type.getTypeName();
        let typeExp2 = resExp2.type.getTypeName();

        if (typeExp1 == enumType.BOOLEAN) {
            if (typeExp2 == enumType.BOOLEAN) {
                let value = resExp1.value || resExp2.value;
                return new Literal(value, enumType.BOOLEAN);
            } else {
                //TODO: REPORTAR ERROR SEMANTICO
                let error = new SysError("Semantico", `Incompatibilidad de tipos: ${resExp1.type.toString()} || ${resExp2.type.toString()}`, this.line, this.column);
                controller.addError(error);
                controller.append(` ***ERROR: Incompatibilidad de tipos: ${resExp1.type.toString()} || ${resExp2.type.toString()}. En la linea  ${this.line} y columna ${this.column}`);
                return new Literal("Error semantico en Or", enumType.ERROR);
            }
        }

        return new Literal("Error semantico en Or", enumType.ERROR);
    }

}