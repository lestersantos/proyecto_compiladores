import AstNode from "../Ast/AstNode";
import Controller from "../Controller";
import { Instruction } from "../Interfaces/Instruction";
import SymbolTable from "../SymbolTable/SymbolTable";
import Call from "./Call";

export default class StartWith implements Instruction{

    public function_call : Call;
    public line : number;
    public column : number;

    constructor(function_call : Call, line : number, column : number){
        this.function_call = function_call;
        this.line = line;
        this.column = column;
    }

    execute(controller: Controller, symbolTable: SymbolTable) {
        console.log("iniciando con funcion: "+this.function_call.identifier);
        this.function_call.execute(controller,symbolTable);
    }
    
    run(): AstNode {
        let parent = new AstNode("Sentencia START WITH","");

        parent.addChild(new AstNode("Start",""));
        parent.addChild(new AstNode("With",""));

        let funcChild = new AstNode("Funcion Incial","");
        funcChild.addChild(this.function_call.run());

        parent.addChild(funcChild);
        return parent;
    }
}