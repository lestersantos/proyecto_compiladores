import AstNode from "../Ast/AstNode";
import Controller from "../Controller";
import { Instruction } from "../Interfaces/Instruction";
import SymbolTable from "../SymbolTable/SymbolTable";

export default class Default implements Instruction {

    public production: string;

    constructor(production: string) {
        this.production = production;
    }


    execute(controller: Controller, symbolTable: SymbolTable) {
        console.log("Msg: From Default class, production "+this.production+" not implemented.");
    }
    run(): AstNode {
        console.log("Method not implemented.");
        let parent = new AstNode("Default inst not implemented yet","");
        return parent;
    }

}