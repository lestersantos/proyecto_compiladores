import express = require('express');
import Ast from '../../src/Interpreter/Ast/Ast';
import AstNode from '../../src/Interpreter/Ast/AstNode';
import Controller from '../../src/Interpreter/Controller';
import SymbolTable from '../../src/Interpreter/SymbolTable/SymbolTable';
import { errorList } from "../../src/Interpreter/Ast/ErrorList";
import { Console } from 'console';

var jisonParser = require('../../src/Analyzer/interpreter').parser;

const router = express.Router();

const fs = require('fs');

const dataBuffer = readFile();

//testGrammar(dataBuffer.toString());

router.get('/', (req, res) => {
    res.send("Hello Express rom routes.ts file!");
})

router.get('/help', (req, res) => {
    res.send('Help page');
})

router.post('/traversalAST', function(req, res){
    try{
        const {input} = req.body;

        let ast : Ast = jisonParser.parse(input);

        let astTree : AstNode = ast.run();
        let graph = astTree.graphSyntactic();

        res.status(200).json({ast : graph});
    }catch(error){
        console.log(error);
        res.status(500).json({ast : "Se ha producido un error al generar el ast"});
    }
})

router.post('/run-compiler', (req, res) => {
    try {
        let { input } = req.body;
        errorList.SysError = []
        let controller = new Controller();
        let global_TableSymbol = new SymbolTable(null);
        ///

            
        console.log("--------- TEST GRAMMAR FUNCTION ------------");

        console.log(input);

        console.log("initializing.... \n");
        controller.append("UMG-luis>INICIANDO ANALISIS LEXICO Y SINTACTICO....")

        const includeRegex1 = /#include\s\"\w+\.?\w+\"(\r\n|\n|\r)/gm;
        const includeRegex2 = /#include\s\<\w+\.?\w+\>(\r\n|\n|\r)/gm;
        const pragmaRegex = /#pragma\s\w+(\r\n|\n|\r)/gm;

        // input.match(includeRegex1) ? controller.append("UMG-luis>Reconocio: "+input.match(includeRegex1)) : 0;
        // input.match(includeRegex2) ? controller.append("UMG-luis>Reconocio: " + input.match(includeRegex2)): 0;
        // input.match(pragmaRegex) ? controller.append("UMG-luis>Reconocio: "+input.match(pragmaRegex)): 0;

        input.match(includeRegex1) ? console.log("UMG-luis>Reconocio: "+input.match(includeRegex1)) : 0;
        input.match(includeRegex2) ? console.log("UMG-luis>Reconocio: " + input.match(includeRegex2)): 0;
        input.match(pragmaRegex) ?  console.log("UMG-luis>Reconocio: "+input.match(pragmaRegex)): 0;


        input = input.replace(includeRegex1, "");
        input = input.replace(includeRegex2, "");
        input = input.replace(pragmaRegex, "");

        ///
        controller.append("UMG-luis>INICIANDO ANALISIS SEMANTICO....")
        let ast: Ast = jisonParser.parse(input);



        ast.execute(controller, global_TableSymbol);

        console.log(controller.consoleMsg);
        
        let st_html = controller.graphSymbolTable(controller, global_TableSymbol);
        let err_html = controller.graphErrorsTable(controller);

        controller.append("Analisis realizado exitosamente!");
        res.status(200).json({consoleMsg : controller.consoleMsg, st : st_html, errTable : err_html});

        console.log("Analisis finalizado");

    } catch (error) {
        console.log(error);
        res.status(500).json({ resultado: "Se ha producido un error al correr el interprete" });
    }
})

function readFile() {
    //TO RUN AS A CONTAINER WITH MOUNT BIND
    //docker run -p 3000:3000 --name="test-web-server-comp" -v "%cd%":/app syscompiler-app

    //to run in GITPOD OR LINX CONTAINERS
    const text = fs.readFileSync('app/ArchivoPrueba.txt','utf8');
    //install nodemon before run
    //const text = fs.readFileSync('\app\\ArchivoPrueba.txt');
    return text;
}

function testGrammar(input: string) {

    console.log("--------- TEST GRAMMAR FUNCTION ------------");

    console.log(input);

    console.log("initializing.... \n");

    const includeRegex1 = /#include\s\"\w+\.?\w+\"(\r\n|\n|\r)/gm;
    const includeRegex2 = /#include\s\<\w+\.?\w+\>(\r\n|\n|\r)/gm;
    const pragmaRegex = /#pragma\s\w+(\r\n|\n|\r)/gm;

    input.match(includeRegex1) ? console.log("Reconocio: "+input.match(includeRegex1)) : 0;
    input.match(includeRegex2) ? console.log("Reconocio: " + input.match(includeRegex2)): 0;
    input.match(pragmaRegex) ? console.log("Reconocio: "+input.match(pragmaRegex)): 0;


    input = input.replace(includeRegex1, "");
    input = input.replace(includeRegex2, "");
    input = input.replace(pragmaRegex, "");



    ////

    errorList.SysError = []

    let ast: Ast = jisonParser.parse(input);

    let controller = new Controller();
    let global_TableSymbol = new SymbolTable(null);

    ast.execute(controller, global_TableSymbol);


    console.log("----------- MESSAGES FOR WEB APP CONSOLE ------------");
    console.log("lista de errores "+errorList.SysError.length);
    for(let sysError of errorList.SysError){
        console.log("tipo: "+ sysError.errorType+" desc: "+sysError.description);
    }

    for(let sysError of controller.errors){
        console.log("tipo: "+ sysError.errorType+" desc: "+sysError.description);
    }

    console.log(controller.consoleMsg);
    console.log("Analisis finalizado");
}


module.exports = router;