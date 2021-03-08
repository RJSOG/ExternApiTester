const FileParser = require('./fileParser')
class Execute {
    constructor(config){
        this.config = config;
        this.FileParser = new FileParser("Execute.json", this.config);
        this.data = this.FileParser.getData();
    }
    getFileToExecute = () => {
        return this.data.fileToExecute;
    }
    getAllTestSeries = () => {
        return this.data.testSeries;
    }
    getExecutionOrderFromName = (name) => {
        this.data.testSeries.forEach(serie => {
            if(serie.name == name){
                return serie;
            }
        });
    }
}
class Singleton {
    constructor(config) {
        if(!Singleton.instance){
            Singleton.instance = new Execute(config);
        }
    }
    getInstance(){
        return Singleton.instance;
    }
}
module.exports = Singleton;