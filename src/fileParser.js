const fs = require("fs");
const testFolderPath = "/home/archjesus/Data_dd/Informatique/Programmes/JS/test-seal-external-api/test/"

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