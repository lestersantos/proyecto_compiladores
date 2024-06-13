import { errorList } from "./ErrorList";

export default class SysError{

    public errorType : string;
    public description : string;
    public line : number;
    public column : number;

    constructor(errorType : string, description : string, line : number, column : number){
        this.errorType = errorType;
        this.description = description;
        this.line = line;
        this.column = column;
        if(errorType == "Sintactico"|| errorType == "Lexico"){
            errorList.SysError.push(this);
        }
    }

}