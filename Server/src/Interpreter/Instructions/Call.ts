import AstNode from "../Ast/AstNode";
import SysError from "../Ast/SysError";
import Controller from "../Controller";
import Literal from "../Expressions/Literal";
import Expression from "../Interfaces/Expression";
import { Instruction } from "../Interfaces/Instruction";
import Symbol from "../SymbolTable/Symbol";
import SymbolTable from "../SymbolTable/SymbolTable";
import Type, { enumType } from "../SymbolTable/Type";
import Function from "./Function";
import Return from "./TransferStatements/Return";

export default class Call implements Instruction, Expression {
    type: Type;
    value: any;

    public identifier: string;
    public paramList: Array<Expression>;
    public line: number;
    public column: number;

    constructor(identifier: string, paramList: Array<Expression>, line: number, column: number) {
        this.identifier = identifier;
        this.paramList = paramList;
        this.line = line;
        this.column = column;
        this.type = new Type(enumType.ERROR);
        this.value = undefined;
    }



    validateParameters(callParameters: Array<Expression>, functionParemeters: Array<Symbol>, controller: Controller, st: SymbolTable, st_local: SymbolTable) {

        //console.log("Validar parametros");

        if (callParameters.length == functionParemeters.length) {

            let aux: Symbol;
            let aux_id: string;
            let aux_type;

            let aux_exp: Expression;
            let aux_exp_type;
            let aux_exp_value;

            for (let i = 0; i < callParameters.length; i++) {

                aux = functionParemeters[i] as Symbol;
                aux_id = aux.id;
                aux_type = aux.type.getTypeName();

                aux_exp = callParameters[i] as Expression;
                aux_exp_value = aux_exp.getValue(controller, st);
                aux_exp_type = aux_exp_value.type.getTypeName();

                if (aux_type == aux_exp_type) {
                    let newSymbol = new Symbol(aux.symbolType, aux.type, aux_id, aux_exp_value.value);
                    st_local.add(aux_id, newSymbol);
                } else {
                    //Casteos implicitos
                    if (aux_type == enumType.DOUBLE && aux_exp_type == enumType.INTEGER) {
                        let newSymbol = new Symbol(aux.symbolType, aux.type, aux_id, aux_exp_value.value);
                        st_local.add(aux_id, newSymbol);
                    } else if (aux_type == enumType.INTEGER && aux_exp_type == enumType.DOUBLE) {
                        let newSymbol = new Symbol(aux.symbolType, aux.type, aux_id, Math.trunc(aux_exp_value.value));
                        st_local.add(aux_id, newSymbol);
                    } else {
                        let error = new SysError("Semantico", `Incompatibilidad ${aux_id}: tipo 
                                    ${aux.type.toString()} no puede asignarse tipo 
                                    ${aux_exp_value.type.toString()}`, this.line, this.column);

                        controller.addError(error);

                        controller.append(` ***ERROR: Incompatibilidad ${aux_id}: tipo ${aux.type.toString()} no puede asignarse tipo ${aux_exp_value.type.toString()}. En la linea  ${this.line} y columna ${this.column}`);
                    }
                }
            }

            return true;
        } else {
            return false;
        }
    }
    getValue(controller: Controller, symbolTable: SymbolTable): Expression {

        if (symbolTable.exist(this.identifier)) {
            let st_local = new SymbolTable(symbolTable);

            let functionSymbol = symbolTable.get(this.identifier) as Function;

            // console.log("Funcion como Expresion: "+ functionSymbol.id);
            // console.log(functionSymbol);
            if (this.validateParameters(this.paramList, functionSymbol.paramList!, controller, symbolTable, st_local)) {
                let ret = functionSymbol.execute(controller, st_local);

                if (ret != null) {
                    return ret;
                }
            }
            return new Literal("Error semantico: llamada", enumType.ERROR);
        } else {
            return new Literal("Error semantico: llamada", enumType.ERROR);
        }
    }
    execute(controller: Controller, symbolTable: SymbolTable) {

        if (symbolTable.exist(this.identifier)) {
            let st_local = new SymbolTable(symbolTable);

            let functionSymbol = symbolTable.get(this.identifier) as Function;

            //console.log("Validar parametros");
            if (this.validateParameters(this.paramList, functionSymbol.paramList!, controller, symbolTable, st_local)) {
                let ret = functionSymbol.execute(controller, st_local);

                
                if (ret != null) {
                    return ret;
                }
            }
        } else {

        }
    }
    run(): AstNode {
        let parent = new AstNode("Llamada", "");

        parent.addChild(new AstNode(this.identifier, ""));
        parent.addChild(new AstNode("(", ""));

        let valueChildren = new AstNode("Lista Valores", "");

        for (let val of this.paramList) {
            valueChildren.addChild(val.run());
        }
        parent.addChild(valueChildren);
        parent.addChild(new AstNode(")", ""));
        return parent;
    }

}