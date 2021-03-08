const FileParser = require('./fileParser')
class Execute {
    constructor(config){
        this.FileParser = new FileParser("Execute.json", this.config);
        this.data = this.FileParser.getData();
    }
    getFileToExecute = () => {
        return this.data.fileToExecute;
    }
    getAllTestSeries = () => {
        return this.data.testSeries;
    }
}
module.exports = Execute