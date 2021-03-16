const FileParser = require('./fileParser');
const fs = require('fs');
const ValidateSerieFile = require("./validateSerieFile");
const { process, exit } = require('process');

class SerieParser {
    constructor(config){
        this.config = config;
        this.allSeriesFiles = this.getAllSeriesFiles();
        this.allSerieData = this.getAllSerieData();
        this.validateSerieFile = new ValidateSerieFile(this.config).getInstance();
        this.allSerieData.forEach((serie) => {
            if(!this.validateSerieFile.validSerieFile(serie)){
                console.log("Serie " + serie.name + " is not valid ! Bad format");
                process.exit(1);
            }
        })
    }
    getAllSerieData = () => {
        let allSerieData = []
        for(let file of this.allSeriesFiles){
            let fileParser = new FileParser(file, "serie", this.config);
            allSerieData.push(fileParser.getData());
        }
        return allSerieData;
    }
    getAllSeries = () => {
        return this.allSerieData;
    }
    getSerieDataFromName = (name) => {
        for(serie of this.allSerieData){
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
    getAllSeriesFiles = () => {
        let files = fs.readdirSync(this.config.serieFolder);
        return Object.values(files);
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