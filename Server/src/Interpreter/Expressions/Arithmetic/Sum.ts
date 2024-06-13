import AstNode from "../../Ast/AstNode";
import SysError from "../../Ast/SysError";
import Controller from "../../Controller";
import Expression from "../../Interfaces/Expression";
import SymbolTable from "../../SymbolTable/SymbolTable";
import Type, { enumType } from "../../SymbolTable/Type";
import Literal from "../Literal";
import Operation from "../Operation";

export default class Sum extends Operation {

    constructor(exp1: Expression, exp2: Expression, line: number, column: number) {
        super(exp1, exp2, line, column);
        this.operatorSign = "+";
    }

    getType(controller: Controller, symbolTable: SymbolTable): Type {
        return this.type;
    }
    getValue(controller: Controller, symbolTable: SymbolTable): Expression {

        let resExp1 = this.exp1.getValue(controller, symbolTable);
        let resExp2 = this.exp2.getValue(controller, symbolTable);

        // console.log("Sum->"+resExp1.type.toString()+" "+resExp1.value);
        // console.log("Sum->"+resExp1.type.toString()+" "+resExp2.value);
        let typeExp1 = resExp1.type.getTypeName();
        let typeExp2 = resExp2.type.getTypeName();

        if (typeExp1 == enumType.INTEGER) {
            if (typeExp2 == enumType.INTEGER) {
                let value = resExp1.value + resExp2.value;
                return new Literal(value, enumType.INTEGER);
            } else if (typeExp2 == enumType.DOUBLE) {
                let value = resExp1.value + resExp2.value;
                return new Literal(value, enumType.DOUBLE);
            } else if (typeExp2 == enumType.BOOLEAN) {
                let booleanValue = 1;
                if (resExp2.value == false) {
                    booleanValue = 0;
                }
                let value = resExp1.value + booleanValue;
                return new Literal(value, enumType.INTEGER);
            } else if (typeExp2 == enumType.CHAR) {
                let asciiNum = resExp2.value.charCodeAt(0);
                let value = resExp1.value + asciiNum;
                return new Literal(value, enumType.INTEGER);
            } else if (typeExp2 == enumType.STRING) {
                let value = resExp1.value + resExp2.value;
                return new Literal(value, enumType.STRING);
            } else {
                //TODO: REPORTAR ERROR SEMANTICO
                let error = new SysError("Semantico", `Incompatibilidad de tipos: ${resExp1.type.toString()} + ${resExp2.type.toString()}`, this.line, this.column);
                controller.addError(error);
                controller.append(` ***ERROR: Incompatibilidad de tipos: ${resExp1.type.toString()} + ${resExp2.type.toString()}. En la linea  ${this.line} y columna ${this.column}`);
                return new Literal("Error semantico, suma", enumType.ERROR);
            }
        } else if (typeExp1 == enumType.DOUBLE) {
            if (typeExp2 == enumType.INTEGER) {
                let value = resExp1.value + resExp2.value;
                return new Literal(value, enumType.DOUBLE);
            } else if (typeExp2 == enumType.DOUBLE) {
                let value = resExp1.value + resExp2.value;
                return new Literal(value, enumType.DOUBLE);
            } else if (typeExp2 == enumType.BOOLEAN) {
                let booleanValue = 1;
                if (resExp2.value == false) {
                    booleanValue = 0;
                }
                let value = resExp1.value + booleanValue;
                return new Literal(value, enumType.DOUBLE);
            } else if (typeExp2 == enumType.CHAR) {
                let asciiNum = resExp2.value.charCodeAt(0);
                let value = resExp1.value + asciiNum;
                return new Literal(value, enumType.DOUBLE);
            } else if (typeExp2 == enumType.STRING) {
                let value = resExp1.value + resExp2.value;
                return new Literal(value, enumType.STRING);
            } else {
                //TODO: REPORTAR ERROR SEMANTICO
                let error = new SysError("Semantico", `Incompatibilidad de tipos: ${resExp1.type.toString()} + ${resExp2.type.toString()}`, this.line, this.column);
                controller.addError(error);
                controller.append(` ***ERROR: Incompatibilidad de tipos: ${resExp1.type.toString()} + ${resExp2.type.toString()}. En la linea  ${this.line} y columna ${this.column}`);
                return new Literal("Error semantico, suma", enumType.ERROR);
            }
        } else if (typeExp1 == enumType.BOOLEAN) {
            let booleanValue = 1;
            if (resExp1.value == false) {
                booleanValue = 0;
            }

            if (typeExp2 == enumType.INTEGER) {
                let value = resExp2.value + booleanValue;
                return new Literal(value, enumType.INTEGER);
            } else if (typeExp2 == enumType.DOUBLE) {
                let value = resExp2.value + booleanValue;
                return new Literal(value, enumType.DOUBLE);
            } else if (typeExp2 == enumType.STRING) {
                let value = resExp2.value + booleanValue;
                return new Literal(value, enumType.STRING);
            } else {
                //TODO: REPORTAR ERROR SEMANTICO
                let error = new SysError("Semantico", `Incompatibilidad de tipos: ${resExp1.type.toString()} + ${resExp2.type.toString()}`, this.line, this.column);
                controller.addError(error);
                controller.append(` ***ERROR: Incompatibilidad de tipos: ${resExp1.type.toString()} + ${resExp2.type.toString()}. En la linea  ${this.line} y columna ${this.column}`);
                return new Literal("Error semantico, suma", enumType.ERROR);
            }
        } else if (typeExp1 == enumType.CHAR) {
            let asciiNum = resExp1.value.charCodeAt(0);
            if (typeExp2 == enumType.INTEGER) {
                let value = asciiNum + resExp2.value;
                return new Literal(value, enumType.INTEGER);
            } else if (typeExp2 == enumType.DOUBLE) {
                let value = asciiNum + resExp2.value;
                return new Literal(value, enumType.DOUBLE);
            } else if (typeExp2 == enumType.CHAR) {
                let value = resExp1.value + resExp2.value;
                return new Literal(value, enumType.STRING);
            } else if (typeExp2 == enumType.STRING) {
                let value = resExp1.value + resExp2.value;
                return new Literal(value, enumType.STRING);
            } else {
                //TODO: REPORTAR ERROR SEMANTICO
                let error = new SysError("Semantico", `Incompatibilidad de tipos: ${resExp1.type.toString()} + ${resExp2.type.toString()}`, this.line, this.column);
                controller.addError(error);
                controller.append(` ***ERROR: Incompatibilidad de tipos: ${resExp1.type.toString()} + ${resExp2.type.toString()}. En la linea  ${this.line} y columna ${this.column}`);
                return new Literal("Error semantico, suma", enumType.ERROR);
            }
        } else if (typeExp1 == enumType.STRING) {
            if (typeExp2 == enumType.INTEGER || enumType.DOUBLE || enumType.CHAR || enumType.BOOLEAN || enumType.STRING) {
                let value = resExp1.value + resExp2.value;
                return new Literal(value, enumType.STRING);
            } else {
                //TODO: REPORTAR ERROR SEMANTICO
                let error = new SysError("Semantico", `Incompatibilidad de tipos: ${resExp1.type.toString()} + ${resExp2.type.toString()}`, this.line, this.column);
                controller.addError(error);
                controller.append(` ***ERROR: Incompatibilidad de tipos: ${resExp1.type.toString()} + ${resExp2.type.toString()}. En la linea  ${this.line} y columna ${this.column}`);
                return new Literal("Error semantico, suma", enumType.ERROR);
            }
        }

        return new Literal("Error semantico,no hizo match ningun tipo", enumType.ERROR);
    }
    
}