export enum enumType{
    INTEGER,
    DOUBLE,
    BOOLEAN,
    CHAR,
    STRING,
    ERROR,
    VOID
}

export default class Type{
    public typeName : enumType;

    constructor(typeName : enumType){
        this.typeName = typeName;
    }

    toString(){
        switch (this.typeName) {
            case enumType.INTEGER:
                return "Entero";
            case enumType.DOUBLE:
                return "Decimal";
            case enumType.BOOLEAN:
                return "Booleano";
            case enumType.CHAR:
                return "Caracter";
            case enumType.STRING:
                return "Cadena";
            case enumType.ERROR:
                return "Error";
            default:
                break;
        }
    }

    getTypeName() : enumType{
        return this.typeName;
    }
}