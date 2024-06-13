import AstNode from "../Ast/AstNode";
import Controller from "../Controller";
import SymbolTable from "../SymbolTable/SymbolTable";


export interface Instruction{

    execute(controller : Controller, symbolTable : SymbolTable) : any;

    run() : AstNode; 

}