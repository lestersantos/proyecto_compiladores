import AstNode from "../../Ast/AstNode";
import SysError from "../../Ast/SysError";
import Controller from "../../Controller";
import Expression from "../../Interfaces/Expression";
import { SymbolType } from "../../SymbolTable/Symbol";
import SymbolTable from "../../SymbolTable/SymbolTable";
import Type, { enumType } from "../../SymbolTable/Type";
import Identifier from "../Identifier";
import Literal from "../Literal";

export default class Length implements Expression {
    public expression: Expression;
    public line: number;
    public column: number;
    type: Type;
    value: any;
    constructor(expression: Expression, line: number, column: number) {
        this.value = undefined;
        this.line = line;
        this.column = column;
        this.type = new Type(enumType.ERROR);
        this.expression = expression;
    }

    getValue(controller: Controller, symbolTable: SymbolTable): Expression {
        console.log("funcion length");
        if (this.expression instanceof Identifier) {
            let id = this.expression as Identifier;
            if (symbolTable.exist(id.id)) {
                let sym = symbolTable.get(id.id);
                if (sym?.symbolType == SymbolType.LIST) {
                    return new Literal(sym.value.length, enumType.INTEGER);
                } else if (sym?.symbolType == SymbolType.VECTOR) {
                    return new Literal(sym.value.length, enumType.INTEGER);
                } else if (sym?.symbolType == SymbolType.VARIABLE) {
                    //let resExp = this.value.getValue(controller, symbolTable);
                    if (sym.type.getTypeName() == enumType.STRING) {
                        return new Literal(sym.value.length, enumType.INTEGER);
                    } else {
                        let sysError = new SysError("Semantico", `Incompatibiliad de tipos se esperaba length(\'string\') se econtro \'${sym.type.toString()}\'`, this.line, this.column);
                        controller.addError(sysError);
                        controller.append(` ***ERROR: ncompatibiliad de tipos se esperaba length(\'string\') se econtro \'${sym.type.toString()}\'. En la linea ${this.line} y columna ${this.column}`);

                        return new Literal(`Semantico, ncompatibiliad de tipos se esperaba length(\'string\') se econtro \'${sym.type.toString()}\'`, enumType.ERROR);
                    }
                } else {
                    let sysError = new SysError("Semantico", `Incompatibilidad de tipos La variable ${id.id} no es un vector ni lista.`, this.line, this.column);
                    controller.addError(sysError);
                    controller.append(` ***ERROR: Incompatibilidad de tipos La variable ${id.id} no es un vector ni lista. En la linea ${this.line} y columna ${this.column}`);

                    return new Literal(`Semantico, Incompatibilidad de tipos La variable ${id.id} no es un vector ni lista.`, enumType.ERROR);
                }
            }
        } else {
            let resExp = this.expression.getValue(controller, symbolTable);
            if (resExp.type.getTypeName() == enumType.STRING) {
                return new Literal(resExp.value.length, enumType.INTEGER);
            } else {
                let sysError = new SysError("Semantico", `Incompatibiliad de tipos funcion length(string) encontro tipo \'${resExp.type.toString()}\' `, this.line, this.column);
                controller.addError(sysError);
                controller.append(` ***ERROR: Incompatibiliad de tipos funcion length(string) encontro tipo \'${resExp.type.toString()}\' . En la linea ${this.line} y columna ${this.column}`);

                return new Literal(`Semantico, Incompatibiliad de tipos tipo ${resExp.type.toString()} no puede asignarse a string,  `, enumType.ERROR);
            }
        }
        return new Literal("Error semantico", enumType.ERROR);
    }
    run(): AstNode {
        let parent = new AstNode("Instruccion Length", "");

        parent.addChild(new AstNode("length", ""));
        parent.addChild(new AstNode("(", ""));

        let expChild = new AstNode("valor", "");

        if (this.expression instanceof Identifier) {
            let id = this.expression as Identifier;
            expChild.addChild(new AstNode(id.id,""));
        }else{
            expChild.addChild(this.expression.run());
        }
        parent.addChild(expChild);

        parent.addChild(new AstNode(")", ""));
        return parent;
    }
}