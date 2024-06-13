import AstNode from "../Ast/AstNode";
import Controller from "../Controller";
import SymbolTable from "../SymbolTable/SymbolTable";
import Type from "../SymbolTable/Type";

export default interface Expression{

     type: Type;
     value: any;

    getValue(controller: Controller, symbolTable: SymbolTable): Expression;

    run() : AstNode;
}