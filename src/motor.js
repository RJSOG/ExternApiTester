const FileParser = require('./fileParser');
const SerieParser = require('./serieParser');
const Serie = require('./serieClass');
const path = require('path');
const ValidateStepFile = require('./validateStepFile');
const fs = require('fs');
const { process, exit } = require('process')

class Motor{
    constructor(config){
        this.config = config;
        this.serieParser = new SerieParser(this.config).getInstance();
        this.validateStepFile = new ValidateStepFile(this.config).getInstance();
        this.allStepFiles = this.listStepFiles();
        this.allTestData = this.getAllStepData();
        this.AllSerieSuite = this.createAllSerieSuite();
        this.createTestGroup();
    }
    listStepFiles = () => {
        let files = [];
        fs.readdirSync(this.config.stepFolder).forEach(file => {
             if(path.extname(file) == '.json'){
                 files.push(file);
             }
        });
        return files;
    }
    getAllStepData = () => {
        let allTestData = []
        this.allStepFiles.forEach(file => {
            let fileParser = new FileParser(file, "step" ,this.config);
            let fileData = fileParser.getData();
            if(!this.validateStepFile.validStepFile(fileData)){
                console.log("Step File " + fileData.groupname + " is not valid ! Bad format");
                process.exit(1);
            }
            allTestData.push(fileData);
        });
        return allTestData
    }
    getTestFromFileAndId = (filename, id) => {
        for(let file of this.allStepFiles){
            if(file == filename){
                let index = this.allStepFiles.indexOf(file);
                let fileTest = this.allTestData[index];
                for(let caseTest of fileTest.all_test){
                    if(caseTest.id == id){
                        return caseTest;
                    }
                }
            }
        }
    }
    createAllSerieSuite = () => {
        let allSerieObject = []
        this.serieParser.getAllSeries().forEach(testSerie => {
            // console.log(testSerie);
            let serie = {
                "name" : testSerie.name,
                "description" : testSerie.description,
                "serieExecutionOrder" : []
            }
            testSerie.executionOrder.forEach(obj => {
                serie.serieExecutionOrder.push(this.getTestFromFileAndId(obj.file, obj.id))
            });
            allSerieObject.push(serie);
        })
        return allSerieObject;
    } 
    createTestGroup = () => {
        this.AllSerieSuite.forEach(serie => {
            new Serie(serie, this.config);
        });
    }
}
module.exports = Motor;