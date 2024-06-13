import AstNode from "../Ast/AstNode";
import SysError from "../Ast/SysError";
import Controller from "../Controller";
import Expression from "../Interfaces/Expression";
import { Instruction } from "../Interfaces/Instruction";
import Symbol, { SymbolType } from "../SymbolTable/Symbol";
import SymbolTable from "../SymbolTable/SymbolTable";
import Type, { enumType } from "../SymbolTable/Type";

export default class ArrayDeclaration implements Instruction {

    public type: Type;

    public arrType: number;
    public idList: Array<string>;
    public expValue: Expression;

    public line: number;
    public column: number;

    constructor(arrType: number, type: Type, idList: Array<string>, expValue: Expression, line: number, column: number) {
        this.arrType = arrType;

        this.type = type;
        this.idList = idList;
        this.expValue = expValue;
        this.line = line;
        this.column = column;

    }

    execute(controller: Controller, symbolTable: SymbolTable) {
        for (let id of this.idList) {

            if (symbolTable.existInCurrent(id)) {
                let sysError = new SysError("Semantico", ` La varialbe ${id} ya existe en el entorno actual,  `, this.line, this.column);
                controller.addError(sysError);
                controller.append(` ***ERROR: La variable ${id} ya existe en el entorno actual. En la linea  ${this.line} y columna ${this.column}`);
                continue;
            }

            if (this.arrType == 1) {
                let arrayValues = [];
                let resExp = this.expValue.getValue(controller, symbolTable);
                let indexValue = resExp.value;

                if (resExp.type.getTypeName() == enumType.INTEGER) {
                    if (this.type.getTypeName() == enumType.INTEGER) {
                        for (let i = 0; i < indexValue; i++) {
                            arrayValues.push(0);
                        }
                        let newSymbol = new Symbol(SymbolType.VECTOR, this.type, id, arrayValues);
                        symbolTable.add(id, newSymbol);
                    } else if (this.type.getTypeName() == enumType.DOUBLE) {
                        for (let i = 0; i < indexValue; i++) {
                            arrayValues.push(0.0);
                        }
                        let newSymbol = new Symbol(SymbolType.VECTOR, this.type, id, arrayValues);
                        symbolTable.add(id, newSymbol);
                    } else if (this.type.getTypeName() == enumType.STRING) {
                        for (let i = 0; i < indexValue; i++) {
                            arrayValues.push("");
                        }
                        let newSymbol = new Symbol(SymbolType.VECTOR, this.type, id, arrayValues);
                        symbolTable.add(id, newSymbol);
                    } else if (this.type.getTypeName() == enumType.CHAR) {
                        for (let i = 0; i < indexValue; i++) {
                            arrayValues.push('');
                        }
                        let newSymbol = new Symbol(SymbolType.VECTOR, this.type, id, arrayValues);
                        symbolTable.add(id, newSymbol);
                    } else if (this.type.getTypeName() == enumType.BOOLEAN) {
                        for (let i = 0; i < indexValue; i++) {
                            arrayValues.push(true);
                        }
                        let newSymbol = new Symbol(SymbolType.VECTOR, this.type, id, arrayValues);
                        symbolTable.add(id, newSymbol);
                    }

                } else {
                    let sysError = new SysError("Semantico", `Incompatibiliad de tipos tipo ${resExp.type.toString()} no puede asignarse a int,  `, this.line, this.column);
                    controller.addError(sysError);
                    controller.append(` ***ERROR: Incompatibiliad de tipos tipo ${resExp.type.toString()} no puede asignarse a int. En la linea ${this.line} y columna ${this.column}`);
                }
            } else {
                let expressionList = this.expValue.getValue(controller, symbolTable).value;
                console.log("lista de expresiones: " + expressionList);
                let arrayValues = [];

                if (expressionList instanceof Array) {

                    for (let exp of expressionList) {
                        let expValue = exp.getValue(controller, symbolTable).value;
                        let expType = exp.getValue(controller, symbolTable).type;
                        console.log("Valor: " + expValue);
                        if (this.type.getTypeName() == expType.getTypeName()) {
                            arrayValues.push(expValue);
                        } else {
                            if (this.type.getTypeName() == enumType.INTEGER && expType.getTypeName() == enumType.DOUBLE) {
                                arrayValues.push(Math.trunc(expValue));
                            } else if (this.type.getTypeName() == enumType.DOUBLE && expType.getTypeName() == enumType.INTEGER) {
                                arrayValues.push(expValue);
                            } else {
                                let sysError = new SysError("Semantico", `Incompatibiliad de tipos tipo ${expType.toString()} no puede asignarse a tipo ${this.type.toString()},  `, this.line, this.column);
                                controller.addError(sysError);
                                controller.append(` ***ERROR: Incompatibiliad de tipos tipo ${expType.toString()} no puede asignarse a tipo ${this.type.toString()}. En la linea ${this.line} y columna ${this.column}`);
                            }
                        }
                    }

                    let newSymbol = new Symbol(SymbolType.VECTOR, this.type, id, arrayValues);
                    symbolTable.add(id, newSymbol);
                } else {
                    let sysError = new SysError("Semantico", `Se esperaba una lista de expresiones.  `, this.line, this.column);
                    controller.addError(sysError);
                    controller.append(` ***ERROR: Se esperaba una lista de expresiones. En la linea ${this.line} y columna ${this.column}`);
                }
            }
        }
    }
    run(): AstNode {
        let parent = new AstNode("Declaracion de Vector", "");
        let typeChild = new AstNode("Tipo", "");
        typeChild.addChild(new AstNode(this.type.toString()!, ""));

        parent.addChild(typeChild);

        let idListChild = new AstNode("ID's", "");


        for (let id of this.idList) {
            idListChild.addChild(new AstNode(id, ""));
        }

        parent.addChild(idListChild);

        parent.addChild(new AstNode("[", ""));
        parent.addChild(new AstNode("]", ""));

        parent.addChild(new AstNode("=", ""));

        if (this.arrType == 1) {
            parent.addChild(new AstNode("new", ""));
            parent.addChild(typeChild);
            parent.addChild(new AstNode("[", ""));
            let expChild = new AstNode("Expresion", "");
            expChild.addChild(this.expValue.run());
            parent.addChild(expChild);
            parent.addChild(new AstNode("]", ""));
        } else {
            parent.addChild(this.expValue.run());
        }
        return parent;
    }
}