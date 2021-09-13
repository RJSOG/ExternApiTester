const fs = require("fs");

class FileParser {
    constructor(filename, config){
        this.config = config;   
        let rawdata = fs.readFileSync(filename, {encoding: 'utf-8'});
        this.data  = JSON.parse(rawdata);
    }
    getData = () => {
        return this.data;
    }
}
module.exports = FileParser;
