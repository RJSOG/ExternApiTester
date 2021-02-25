const fs = require("fs");
const testFolderPath = "test/"

class TestParser {
    constructor(filename){
        this.filepath = testFolderPath + filename;
        console.log(this.filepath);
    }
}
module.exports = TestParser;