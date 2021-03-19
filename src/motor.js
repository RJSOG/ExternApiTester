const FileParser = require('./fileParser');
const SerieParser = require('./serieParser');
const Serie = require('./serieClass');
const path = require('path');
const SingletonFileValidator = require('./singletonFileValidator');
const fs = require('fs');
const { process, exit } = require('process');

class Motor{
    constructor(config){
        this.config = config;
        this.serieParser = new SerieParser(this.config).getInstance();
        this.validateStepFile = new SingletonFileValidator(this.config, 'step').getInstance('step');
        this.allStepFiles = this.getAllStepFiles(this.config.stepFolder);
        this.allTestData = this.getAllStepData();
        this.AllSerieSuite = this.createAllSerieSuite();
        this.createTestGroup();
    }
    getAllStepFiles = (dirPath, arrayOfFiles) => {
        let motor = this;
        let files = fs.readdirSync(dirPath);
        arrayOfFiles = arrayOfFiles || [];
        files.forEach(function(file) {
            if (fs.statSync(dirPath + "/" + file).isDirectory()) {
              arrayOfFiles = motor.getAllStepFiles(dirPath + "/" + file, arrayOfFiles)
            } else {
                if(path.extname(file) == '.json'){
                    arrayOfFiles.push(path.join(dirPath, "/", file));
                }
            }
          })
        return arrayOfFiles;
    }
    getAllStepData = () => {
        let allTestData = []
        this.allStepFiles.forEach(file => {
            let fileParser = new FileParser(file, this.config);
            let fileData = fileParser.getData();
            if(!this.validateStepFile.validFile(fileData)){
                console.log("Step File " + fileData.groupname + " is not valid ! Bad format");
                exit(1);
            }
            allTestData.push(fileData);
        });
        return allTestData
    }
    getTestFromFileAndId = (filename, id) => {
        for(let file of this.allStepFiles){
            if(path.basename(file) == filename){
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
            let serie = {
                "name" : testSerie.name,
                "description" : testSerie.description,
                "serieExecutionOrder" : [],
                "automatedAuth" : testSerie.automatedAuth
            }
            testSerie.executionOrder.forEach(executionStep => {
                let caseTestObj = this.getTestFromFileAndId(executionStep.file, executionStep.id)
                serie.serieExecutionOrder.push(caseTestObj)
            });
            allSerieObject.push(serie);
        })
        return allSerieObject;
    } 
    async createTestGroup(){
        for(let serie of this.AllSerieSuite){
            let serieInstance = new Serie(serie, this.config);
            await serieInstance.startAssert();
        }
    }
}
module.exports = Motor;