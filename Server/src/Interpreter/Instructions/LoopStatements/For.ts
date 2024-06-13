import AstNode from "../../Ast/AstNode";
import SysError from "../../Ast/SysError";
import Controller from "../../Controller";
import Expression from "../../Interfaces/Expression";
import { Instruction } from "../../Interfaces/Instruction";
import SymbolTable from "../../SymbolTable/SymbolTable";
import { enumType } from "../../SymbolTable/Type";
import Break from "../TransferStatements/Break";
import Continue from "../TransferStatements/Continue";
import Return from "../TransferStatements/Return";

export default class For implements Instruction{

    public for_Initialization : Instruction;
    public condition : Expression;
    public for_Update : Instruction;
    public instruction_List : Array<Instruction>;
    public line : number;
    public column : number;

    constructor(for_Initialization : Instruction, condition : Expression, for_Update : Instruction, instruction_List : Array<Instruction>, line :  number, column : number){
        this.for_Initialization = for_Initialization;
        this.condition = condition;
        this.for_Update = for_Update;
        this.instruction_List = instruction_List;
        this.line = line;
        this.column = column;    
    }

    execute(controller: Controller, symbolTable: SymbolTable) {
        let localSt = new SymbolTable(symbolTable);
        let temp = controller.isLoopStmt();
        controller.setIsLoopStmt(true);
        console.log("Estamos en el for");
        this.for_Initialization.execute(controller, localSt);
        let conditionValue = this.condition.getValue(controller,localSt);
        /**
         * we can still declare variables with repited id in local scope
         */

        if (conditionValue.type.getTypeName() == enumType.BOOLEAN) {
            siguiente:
            while(this.condition.getValue(controller,localSt).value == true){

                let localSt2 = new SymbolTable(localSt);
                
                for (let inst of this.instruction_List) {
                    let ret = inst.execute(controller,localSt2);

                    if (ret instanceof Break) {
                        controller.setIsLoopStmt(temp);
                        return ret;
                    }

                    if(ret instanceof Continue){
                        this.for_Update.execute(controller,localSt);
                        continue siguiente;
                    }   
                    if (ret instanceof Return) {
                        
                        return ret;
                    }

                    if (ret != null) {
                        return ret;
                    }
                }
                this.for_Update.execute(controller,localSt);
            }
        }else{
            //TODO: REPORTAR ERROR SEMANTICO
            let error = new SysError("Semantico", `Se esperaba expresion booleana. Se econtro ${conditionValue.type}`, this.line, this.column);
            controller.addError(error);
            controller.append(` ***ERROR: Se esperaba expresion booleana. Se econtro ${conditionValue.type}. En la linea ${this.line} y columna ${this.column}`);
        }

        controller.setIsLoopStmt(temp);
        return null;
    }
    run(): AstNode {
        let parent = new AstNode("Sentencia For","");

        parent.addChild(new AstNode("For",""));
        parent.addChild(new AstNode("(",""));
        
        let initialization = new AstNode("Inicializacion","");

        initialization.addChild(this.for_Initialization.run());

        parent.addChild(initialization);

        let childConditon = new AstNode("Condicion","");
        childConditon.addChild(this.condition.run());
        parent.addChild(childConditon);

        let update = new AstNode("Actualizacion","");
        update.addChild(this.for_Update.run());
        
        parent.addChild(update);
        parent.addChild(new AstNode(")",""));

        parent.addChild(new AstNode("{",""));

        let instChild = new AstNode("Instrucciones","");
        for(let inst of this.instruction_List){
            instChild.addChild(inst.run());
        }
        parent.addChild(instChild);
        parent.addChild(new AstNode("}",""));

        return parent;
    }
}