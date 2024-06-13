import AstNode from "../Ast/AstNode";
import SysError from "../Ast/SysError";
import Controller from "../Controller";
import { Instruction } from "../Interfaces/Instruction";
import Symbol, { SymbolType } from "../SymbolTable/Symbol";
import SymbolTable from "../SymbolTable/SymbolTable";
import Type from "../SymbolTable/Type";

export default class ListDeclaration implements Instruction {
    public type: Type;
    public id: string;

    public line: number;
    public column: number;

    constructor(type: Type, id: string, line: number, column: number) {
        this.type = type;
        this.id = id;
        this.line = line;
        this.column = column;
    }

    execute(controller: Controller, symbolTable: SymbolTable) {
        if (symbolTable.existInCurrent(this.id) == false) {

            let dynamicList = new Array();
            let newSymbol = new Symbol(SymbolType.LIST, this.type, this.id, dynamicList);
            symbolTable.add(this.id, newSymbol);

        } else {
            let sysError = new SysError("Semantico", ` La varialbe ${this.id} ya existe en el entorno actual,  `, this.line, this.column);
            controller.addError(sysError);
            controller.append(` ***ERROR: La variable ${this.id} ya existe en el entorno actual. En la linea  ${this.line} y columna ${this.column}`);
            return;
        }
    }
    run(): AstNode {
        let parent = new AstNode("Lista","");
        parent.addChild(new AstNode("DynamicList",""));
        parent.addChild(new AstNode("<",""));
        let typeChild = new AstNode("Tipo","");
        typeChild.addChild(new AstNode(this.type.toString()!,""));
        parent.addChild(typeChild);
        parent.addChild(new AstNode(">",""));

        parent.addChild(new AstNode("=",""));
        parent.addChild(new AstNode("new",""));
        parent.addChild(new AstNode("DynamicList",""));
        parent.addChild(new AstNode("<",""));
        parent.addChild(typeChild);
        parent.addChild(new AstNode(">",""));

        return parent;
    }
}