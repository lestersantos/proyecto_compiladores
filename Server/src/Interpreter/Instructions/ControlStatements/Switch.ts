import AstNode from "../../Ast/AstNode";
import SysError from "../../Ast/SysError";
import Controller from "../../Controller";
import Expression from "../../Interfaces/Expression";
import { Instruction } from "../../Interfaces/Instruction";
import SymbolTable from "../../SymbolTable/SymbolTable";
import Type, { enumType } from "../../SymbolTable/Type";
import Break from "../TransferStatements/Break";
import Case from "./Case";

export default class Switch implements Instruction{

    public expression : Expression;
    public caseList : Array<Case>;
    public defaultCase : Instruction;
    public line : number;
    public column : number;

    constructor(expression : Expression, caseList : Array<Case>, defaultCase : Instruction, line : number,  column : number){
        this.expression = expression;
        this.caseList = caseList;
        this.defaultCase = defaultCase;
        this.line = line;
        this.column = column;
    }

    execute(controller: Controller, st: SymbolTable) {
        let st_local = new SymbolTable(st);

        let breakFlag = false;
        
        let enterCaseFlag = false;
       
        console.log("Msg: From switch "+this.expression.getValue(controller, st).type);

        if(this.expression.getValue(controller, st).type.getTypeName() == enumType.ERROR){
            console.log(this.expression.getValue(controller,st));
            return ;    
        }

        for(let swcase of this.caseList){
            if (this.expression.getValue(controller, st).type.getTypeName() == swcase.expression.getValue(controller,st).type.getTypeName()) {
                if(this.expression.getValue(controller,st).value == swcase.expression.getValue(controller, st).value || enterCaseFlag){
                    enterCaseFlag = true;

                    let res : any = swcase.execute(controller, st_local);
                    if(res instanceof Break){
                        breakFlag = true;
                        return res;
                    }
                }
            }else{
                //error
                //TODO: REPORTAR ERROR SEMANTICO
                let error = new SysError("Semantico", `Incompatibilidad ${swcase.expression.getValue(controller,st).type.getTypeName()} no puede convertirse a ${this.expression.getValue(controller, st).type.getTypeName()} .`, this.line, this.column);
                controller.addError(error);
                controller.append(` ***ERROR: Incompatibilidad ${swcase.expression.getValue(controller,st).type.getTypeName()} no puede convertirse a ${this.expression.getValue(controller, st).type.getTypeName()}. En la linea ${this.line} y columna ${this.column}`);
            }
        }

        if(!breakFlag && this.defaultCase != null){
            
            let res : any = this.defaultCase.execute(controller,st_local);
            if(res instanceof Break){
                breakFlag = true;
                return res;
            }
        }
    }
    run(): AstNode {
        let parent = new AstNode("Sentencia Switch","");
        
        parent.addChild(new AstNode("Switch",""));
        parent.addChild(new AstNode("(",""));

        parent.addChild(this.expression.run());

        parent.addChild(new AstNode(")",""));

        parent.addChild(new AstNode("{",""));

        let caseListChild = new AstNode("Casos","");

        for(let swcase of this.caseList){
            caseListChild.addChild(swcase.run());
        }
        parent.addChild(caseListChild);
        if(this.defaultCase != null){
            let defaultCaseChild = new AstNode("Default","");
            defaultCaseChild.addChild(this.defaultCase.run());
            parent.addChild(defaultCaseChild);
        }

        
        parent.addChild(new AstNode("}",""));
        
        return parent;
    }
}