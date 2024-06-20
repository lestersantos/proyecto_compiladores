import AstNode from "../Ast/AstNode";
import SysError from "../Ast/SysError";
import Controller from "../Controller";
import Identifier from "../Expressions/Identifier";
import Literal from "../Expressions/Literal";
import Expression from "../Interfaces/Expression";
import { Instruction } from "../Interfaces/Instruction";
import Symbol, { SymbolType } from "../SymbolTable/Symbol";
import SymbolTable from "../SymbolTable/SymbolTable";
import Type, { enumType } from "../SymbolTable/Type";

export default class Declaration implements Instruction {

    public declType: Type;
    public idList: Array<string>;
    public expression: Expression;

    public line: number;
    public column: number;

    constructor(declType: Type, idList: Array<string>, expression: Expression, line: number, column: number) {
        this.declType = declType;
        this.idList = idList;
        this.expression = expression || null;
        this.line = line;
        this.column = column;
    }

    execute(controller: Controller, symbolTable: SymbolTable) {
        console.log("Msg: From Declaration Found declarations: ");
        for (let id of this.idList) {
            if (symbolTable.existInCurrent(id) == true) {
                let error = new SysError("semantico", `La variable ${id} ya existe en el entorno actual, por lo que no se puede declarar. `, this.line, this.column);

                controller.addError(error);

                //controller.append(` ***ERROR: Semantico, La variable ${id} ya existe en el entorno actual, por lo que no se puede declarar. En la linea  ${this.line} y columna ${this.column}`);
                continue;
            }

            if (this.expression != null) {
                let resExpr = this.expression.getValue(controller, symbolTable);
                //console.log("Dec Expression: "+this.expression)
                let exprType = resExpr.type.getTypeName();

                if (exprType == this.declType.getTypeName()) {
                    let newSymbol = new Symbol(SymbolType.VARIABLE, this.declType, id, resExpr.value);

                    symbolTable.add(id, newSymbol);
                } else {
                    //Casteos implicitos
                    if(this.declType.getTypeName() ==  enumType.DOUBLE && exprType == enumType.INTEGER){
                        let newSymbol = new Symbol(SymbolType.VARIABLE, this.declType, id, resExpr.value);

                        symbolTable.add(id, newSymbol);
                    }else if(this.declType.getTypeName() == enumType.INTEGER && exprType == enumType.DOUBLE){
                        let newSymbol = new Symbol(SymbolType.VARIABLE, this.declType, id, Math.trunc(resExpr.value));

                        symbolTable.add(id, newSymbol);
                    }else{
                        let error = new SysError("Semantico", `Incompatibilidad ${id}: tipo 
                                    ${this.declType.toString()} no puede asignarse tipo 
                                    ${resExpr.type.toString()}`, this.line, this.column);

                    controller.addError(error);

                    //controller.append(`***ERROR: Incompatibilidad ${id}: tipo ${this.declType.toString()} no puede asignarse tipo ${resExpr.type.toString()}. En la linea  ${this.line} y columna ${this.column}`);
                    }
                }
            } else {
                let newSymbol = new Symbol(SymbolType.VARIABLE, this.declType, id, null);
                symbolTable.add(id, newSymbol);
                if (this.declType.getTypeName() == enumType.INTEGER) {
                    newSymbol.setValue(0);
                } else if (this.declType.getTypeName() == enumType.DOUBLE) {
                    newSymbol.setValue(0);
                } else if (this.declType.getTypeName() == enumType.BOOLEAN) {
                    newSymbol.setValue(true);
                } else if (this.declType.getTypeName() == enumType.STRING) {
                    newSymbol.setValue("");
                } else if (this.declType.getTypeName() == enumType.CHAR) {
                    newSymbol.setValue('o');
                }
            }
        }
        return null;
    }

    run(): AstNode {
        let parent = new AstNode("Declaracion","");

        let typeChild = new AstNode("Tipo","");

        typeChild.addChild(new AstNode(this.declType.toString()!,""));

        parent.addChild(typeChild);

        let idListChild = new AstNode("ID's","");


        for(let id of this.idList){
            idListChild.addChild(new AstNode(id,""));
        }

        parent.addChild(idListChild);
        
        parent.addChild(new AstNode("=",""));
        
        if (this.expression != null) {
            parent.addChild(this.expression.run());
        }
        return parent;
    }
}