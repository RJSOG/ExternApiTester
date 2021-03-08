const fs = require("fs");

class FileParser {
    constructor(filename, config){
        this.filepath = config.testFolder + filename;
        let rawdata = fs.readFileSync(this.filepath);
        this.data  = JSON.parse(rawdata);
    }
    getAllTest(){
        return this.data[0];
    }
}
module.exports = FileParser;
