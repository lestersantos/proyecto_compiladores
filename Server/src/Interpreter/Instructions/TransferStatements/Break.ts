import AstNode from "../../Ast/AstNode";
import Controller from "../../Controller";
import { Instruction } from "../../Interfaces/Instruction";
import SymbolTable from "../../SymbolTable/SymbolTable";

export default class Break implements Instruction{
    
    constructor() { 
        
    }

    execute(controller: Controller, symbolTable: SymbolTable) {
        return this;
    }

    run(): AstNode {
        let parent = new AstNode("Instruccion","");
        parent.addChild(new AstNode("Break",""))
        return parent;
    }
}