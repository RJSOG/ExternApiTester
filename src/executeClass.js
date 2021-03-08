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
    getExecutionORder = () => {
        return this.data.testSeries.executionOrder;
    }
}
module.exports = Execute