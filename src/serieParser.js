const FileParser = require('./fileParser');
const fs = require('fs');
const path = require('path');
const SingletonFileValidator = require("./singletonFileValidator");
const { process, exit } = require('process');
const { dir } = require('console');

class SerieParser {
    constructor(config){
        this.config = config;
        this.allSeriesFiles = this.getAllSeriesFiles(this.config.serieFolder);
        this.allSerieData = this.getAllSerieData();
        this.validateSerieFile = new SingletonFileValidator(this.config, 'serie').getInstance('serie');
        this.allSerieData.forEach((serie) => {
            if(!this.validateSerieFile.validFile(serie)){
                console.log("Serie " + serie.name + " is not valid ! Bad format");
                exit(1);
            }
        })
    }
    getAllSerieData = () => {
        let allSerieData = []
        for(let file of this.allSeriesFiles){
            let fileParser = new FileParser(file, this.config);
            let serieData = fileParser.getData();
            if(serieData.serieIsEnabled){
                allSerieData.push(serieData);
            }
        }
        return allSerieData;
    }
    getAllSeries = () => {
        return this.allSerieData;
    }
    getSerieDataFromName = (name) => {
        for(let serie of this.allSerieData){
            if(serie.name == name){
                return serie;
            }
        }
    }
    getExecutionOrderFromName = (name) => {
        let result;
        this.allSerieData.forEach(serie => {
            if(serie.name == name){
                result = serie;
            }
        });
        return result.executionOrder;
    }
    getAllSeriesFiles = (dirPath, arrayOfFiles) => {
        let serieParser = this;
        let files = fs.readdirSync(dirPath);
        arrayOfFiles = arrayOfFiles || [];
        files.forEach(function(file) {
            if (fs.statSync(dirPath + "/" + file).isDirectory()) {
              arrayOfFiles = serieParser.getAllSeriesFiles(dirPath + "/" + file, arrayOfFiles)
            } else {
                if(path.extname(file) == '.json'){
                    arrayOfFiles.push(path.join(dirPath, "/", file));
                }
            }
          })
        return arrayOfFiles;
    }
    getSerieCache = (name) => {
        let serieCache = [];
        let serieData = this.getSerieDataFromName(name);
        for(let stepCase of serieData.executionOrder){
            if(stepCase["cache"] != undefined){
                serieCache.push(stepCase.cache);
            }
        }
        return serieCache;
    }
}
class Singleton {
    constructor(config) {
        if(!Singleton.instance){
            Singleton.instance = new SerieParser(config);
        }
    }
    getInstance(){
        return Singleton.instance;
    }
}
module.exports = Singleton;