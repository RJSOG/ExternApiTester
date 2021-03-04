const fs = require("fs");
const testFolderPath = ("C:/Users/edonatien/Desktop/test-seal-external-api/test/")

class FileParser {
    constructor(filename){
        this.filepath = testFolderPath + filename;
        let rawdata = fs.readFileSync(this.filepath);
        this.data  = JSON.parse(rawdata);
    }
    getAllTest(){
        return this.data[0];
    }
}
module.exports = FileParser;
