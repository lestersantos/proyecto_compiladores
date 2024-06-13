import SysError from "./Ast/SysError";
import Symbol, { SymbolType } from "./SymbolTable/Symbol";
import SymbolTable from "./SymbolTable/SymbolTable";
import { errorList } from "./Ast/ErrorList";

export default class Controller {
    public errors: Array<SysError>;
    public consoleMsg: string;
    public loopStatement: boolean;

    constructor() {
        this.errors = new Array<SysError>();
        this.consoleMsg = "";
        this.loopStatement = false;
    }

    append(msg: string) {
        this.consoleMsg = this.consoleMsg + msg + "\r\n ";
    }

    setIsLoopStmt(isLoopStmt: boolean) {
        this.loopStatement = isLoopStmt;
    }

    isLoopStmt() {
        return this.loopStatement;
    }

    addError(error: SysError): void {
        this.errors.push(error);
    }

    graphSymbolTable(controller: Controller, st: SymbolTable): string {
        var htmlBody = "<thead  class=\"thead-dark\"><tr><td colspan=\"6\">Tabla de Simbolos </td></tr><tr><th>Rol</th><th>Nombre</th><th>Tipo</th><th>Ambito</th><th>Valor</th><th>Parametros</th></tr></thead>";

        while (st != null) {

            st.currentST.forEach((sym: Symbol, key: string) => {
                /*
                htmlBody += "<tr ><th scope=\"row\">" + this.getRol(sym) + "</th><td>" + sym.id +
                    "</td><td>" + this.getType(sym) + "</td>" +
                    "</td><td>" + this.getScope() +
                    "</td><td>" + this.getValue(sym) +
                    "</td><td>" + this.getParameters(sym) + "</td>" + "</tr>";*/
                    if(sym.symbolType == SymbolType.VECTOR){
                        htmlBody += "<tr ><th scope=\"row\">" + this.getRol(sym) + "</th><td>" + sym.id +
                    "</td><td>" + this.getType(sym) + "</td>" +
                    "</td><td>" + this.getScope() +
                    "</td><td>" +"vector size: "+ sym.value.length.toString() +
                    "</td><td>" + this.getParameters(sym) + "</td>" + "</tr>";
                    }else{
                        htmlBody += "<tr ><th scope=\"row\">" + this.getRol(sym) + "</th><td>" + sym.id +
                    "</td><td>" + this.getType(sym) + "</td>" +
                    "</td><td>" + this.getScope() +
                    "</td><td>" + this.getValue(sym) +
                    "</td><td>" + this.getParameters(sym) + "</td>" + "</tr>";
                    }
            })

            st = st.previousST;
        }

        return htmlBody;
    }

    graphErrorsTable(controller : Controller) : string{
        console.log("lista de errores "+errorList.SysError.length);
        var htmlBody = "<thead  class=\"thead-dark\"><tr><td colspan=\"6\">Tabla de Errores </td></tr><tr><th>Tipo de Error</th><th>Descripcion</th><th>Linea</th><th>Columna</th></tr></thead>";
        
        for(let sysError of errorList.SysError){
            console.log("tipo: "+ sysError.errorType+" desc: "+sysError.description);
            htmlBody += "<tr ><th scope=\"row\">" 
                    + sysError.errorType + "</th><td>" 
                    + sysError.description+"</td><td>" 
                    + sysError.line.toString() + "</td>" +
                    "</td><td>" + sysError.column.toString() + "</tr>";
        }
        for(let sysError of controller.errors){
            console.log("tipo: "+ sysError.errorType+" desc: "+sysError.description);
            htmlBody += "<tr ><th scope=\"row\">" 
                    + sysError.errorType + "</th><td>" 
                    + sysError.description+"</td><td>" 
                    + sysError.line.toString() + "</td>" +
                    "</td><td>" + sysError.column.toString() + "</tr>";
        }

        return htmlBody;
    }
    getValue(sym: Symbol): string {
        if (sym.value != null) {
            return sym.value.toString();
        } else {
            return '...'
        }
    }

    getType(sym: Symbol): string {
        return sym.type.toString()?.toLowerCase()!;
    }

    getRol(sym: Symbol): string {
        let rol: string = ' ';
        switch (sym.symbolType) {
            case SymbolType.VARIABLE:
                rol = "variable";
                break;
            case SymbolType.FUNCTION:
                rol = "funcion";
                break;
            case SymbolType.METHOD:
                rol = "metodo";
                break;
            case SymbolType.VECTOR:
                rol = "vector";
                break;
            case SymbolType.LIST:
                rol = "lista";
                break;
            case SymbolType.PARAMETER:
                rol = "parametro";
                break;
            default:
                rol = "...";
                break;
        }
        return rol;
    }

    getScope() : string{
        return 'global';
    }

    getParameters(sym : Symbol){
        if(sym.paramList != undefined){
            return sym.paramList.length;
        }else{
            return "...";
        }
    }
}