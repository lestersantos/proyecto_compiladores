import AstNode from "../Ast/AstNode";
import Controller from "../Controller";
import { Instruction } from "../Interfaces/Instruction";
import Symbol, { SymbolType } from "../SymbolTable/Symbol";
import SymbolTable from "../SymbolTable/SymbolTable";
import Type from "../SymbolTable/Type";
import Return from "./TransferStatements/Return";

export default class Function extends Symbol implements Instruction {

    public instructionList: Array<Instruction>;
    public line: number;
    public column: number;

    //constructor(symbolType : SymbolType, type : Type, id : string, value : any)
    constructor(symbolType: SymbolType, type: Type, identifier: string, paramList: Array<Symbol>, isMethod: boolean, instructionList: Array<Instruction>, line: number, column: number) {
        super(symbolType, type, identifier, null, paramList, isMethod);
        this.instructionList = instructionList;
        this.line = line;
        this.column = column;
    }

    addFunctionST(st: SymbolTable) {
        //console.log(`guardamos ${this.type.toString()} ${this.id}`);
        if (st.exist(this.id) == false) {
            st.add(this.id, this);
        } else {
            // error semantico
        }
    }

    execute(controller: Controller, symbolTable: SymbolTable) {
        let st_local = new SymbolTable(symbolTable);
        //console.log("Estamos dentro de funcion");

        for (let inst of this.instructionList) {
            let ret;

            //validation for non object productions, productions not implemented yet with intepreter pattern
            
            if(typeof inst == "string"){
                console.log("Msg: From Function, execution instruction not yet implemented");
                console.log("typeof: "+typeof inst);
                console.log("production > "+inst);
            }else{
                ret = inst.execute(controller, st_local);
            }

            if (ret instanceof Return) {
                //console.log("encontro return en funcion. se termina la funcion");
                break;
            }
            if (ret != null) {
                return ret;
            }
        }
        return null;
    }
    run(): AstNode {

        let parent = new AstNode("Funcion", "");

        parent.addChild(new AstNode(this.type.toString()!, ""));
        parent.addChild(new AstNode(this.id,""));
        parent.addChild(new AstNode("(",""));

        let paramChildren = new AstNode("Parametros","");
        for(let param of this.paramList!){
            paramChildren.addChild(new AstNode(param.type.toString()!,""));
            paramChildren.addChild(new AstNode(param.id,""));
        }
        parent.addChild(paramChildren);
        parent.addChild(new AstNode(")",""));

        parent.addChild(new AstNode("{",""));

        let instChild = new AstNode("Instrucciones","");
        for(let inst of this.instructionList){
            instChild.addChild(inst.run());
        }
        parent.addChild(instChild);
        parent.addChild(new AstNode("}",""));

        return parent;
    }
}