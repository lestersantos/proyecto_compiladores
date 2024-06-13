import AstNode from "../Ast/AstNode";
import Controller from "../Controller";
import Expression from "../Interfaces/Expression";
import SymbolTable from "../SymbolTable/SymbolTable";
import Type, { enumType } from "../SymbolTable/Type";
import Literal from "./Literal";

export default class Identifier implements Expression{
    type: Type;
    value: any;

    public id : string;
    public line : number;
    public column : number;

    constructor( id : string, line : number, column : number ){
        this.type = new Type(enumType.ERROR);    
        this.value = undefined;
        this.id = id;
        this.line = line;
        this.column = column;
    }

    getValue(controller: Controller, symbolTable: SymbolTable): Expression {
        //console.log("Msg: From identifier class <> identificador "+this.id);
        let idExist = symbolTable.get(this.id);

        if( idExist != null){
            return new Literal(idExist.value, idExist.type.getTypeName());
        } else {
            //TODO: REPORTAR ERROR SEMANTICO
            return new Literal("Error semantico id "+this.id+" no declarado", enumType.ERROR);
        }
    }
    run(): AstNode {
        let parent = new AstNode("Identificador","");
        parent.addChild(new AstNode(this.id,""));
        return parent;
    }

}