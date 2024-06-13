import Type from "./Type";

export enum SymbolType{

    VARIABLE,
    FUNCTION,
    METHOD,
    VECTOR,
    LIST,
    PARAMETER
}

export default class Symbol{

    public symbolType : SymbolType;

    public type: Type;
    public id : string;
    public value : any;

    public paramList : Array<Symbol> | undefined;
    public isMethod : boolean | undefined;

    constructor(symbolType : SymbolType, type : Type, id : string, value : any, paramList? : Array<Symbol>, isMethod?:boolean){
        this.symbolType = symbolType;
        this.type = type;
        this.id = id;
        this.value = value;
        this.paramList = paramList;
        this.isMethod = isMethod;
    }

    setValue(value : any){
        this.value = value;
    }

}
