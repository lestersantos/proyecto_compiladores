import Symbol  from "./Symbol";

export default class SymbolTable {

    public previousST: SymbolTable;
    public currentST: Map<string, Symbol>;

    constructor(previousST: SymbolTable | any) {
        this.previousST = previousST;
        this.currentST = new Map<string, Symbol>();
    }

    add(id: string, symbol: Symbol) {
        this.currentST.set(id.toLowerCase(), symbol);
    }

    exist(id: string): boolean {
        let symbolTable: SymbolTable = this;

        while (symbolTable != null) {
            let symbolExist = symbolTable.currentST.get(id.toLowerCase());

            if (symbolExist != null) {
                return true;
            }
            symbolTable = symbolTable.previousST;
        }
        return false;
    }

    get(id : string) {
        let symbolTable: SymbolTable = this;

        while (symbolTable != null) {
            let symbol = symbolTable.currentST.get(id.toLowerCase());

            if (symbol != null) {
                return symbol;
            }
            symbolTable = symbolTable.previousST;
        }
        return null;
    }

    existInCurrent(id: string) : boolean{
        let symbolTable : SymbolTable = this;

        let exist = symbolTable.currentST.get(id.toLowerCase());

        if (exist != null) {
            return true;
        }
        return false;
    }
}