const FileParser = require('./fileParser');
const TestGroup = require('./testGroup');
const path = require('path');
const fs = require('fs');

class TestMotor{
    constructor(testFolder){
        this.testFolder = testFolder;
        this.allTestGroup = [];
        this.allTestFiles = this.listTestFiles();
        this.createAllTestGroup();
    }
    createTestGroup(group){
        this.allTestGroup.push(new TestGroup(group));
    }
    newFileParser(filename){
        return new FileParser(filename);
    }
    listTestFiles(){
        let files = [];
        fs.readdirSync(this.testFolder).forEach(file => {(path.extname(file) == '.json') ? files.push(file) : ''})
        return files;
    }
    createAllTestGroup(){
        this.allTestFiles.forEach(file => {
            let fileParser = new FileParser(file);
            let group = fileParser.getAllTest();
            this.createTestGroup(group);
        });
    }
}
module.exports = {TestMotor};