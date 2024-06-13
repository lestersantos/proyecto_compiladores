import AstNode from "../Ast/AstNode";
import Controller from "../Controller";
import Expression from "../Interfaces/Expression";
import SymbolTable from "../SymbolTable/SymbolTable";
import Type, { enumType } from "../SymbolTable/Type";



export default class Literal implements Expression {

    public value: any;
    public type: Type;

    constructor(value: any, type: enumType) {
        this.value = value;
        this.type = this.setType(type);
        
    }

    setType(type: enumType): Type {
        switch (type) {
            case enumType.INTEGER:
                return new Type(enumType.INTEGER);
            case enumType.DOUBLE:
                return new Type(enumType.DOUBLE);
            case enumType.BOOLEAN:
                return new Type(enumType.BOOLEAN);
            case enumType.CHAR:
                return new Type(enumType.CHAR);
            case enumType.STRING:
                return new Type(enumType.STRING);
            case enumType.VOID:
                return new Type(enumType.VOID);
            default:
                return new Type(enumType.ERROR);
        }
    }
    getType(): Type {
        return this.type;
    }
    getValue(controller: Controller, symbolTable: SymbolTable) : Expression {
        return new Literal(this.value,this.getType().getTypeName());
    }
    run(): AstNode {
        let parent = new AstNode("Literal","");
        parent.addChild(new AstNode(this.value.toString(),""));
        return parent;
    }


}