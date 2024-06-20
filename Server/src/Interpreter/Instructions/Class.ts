import AstNode from "../Ast/AstNode";
import Controller from "../Controller";
import { Instruction } from "../Interfaces/Instruction";
import Symbol, { SymbolType } from "../SymbolTable/Symbol";
import SymbolTable from "../SymbolTable/SymbolTable";
import Type from "../SymbolTable/Type";
import Return from "./TransferStatements/Return";

export default class Class extends Symbol implements Instruction {
    
    execute(controller: Controller, symbolTable: SymbolTable) {
        throw new Error("Method not implemented.");
    }
    run(): AstNode {
        throw new Error("Method not implemented.");
    }

}