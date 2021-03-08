const FileParser = require('./fileParser');
const TestGroup = require('./testGroup');
const path = require('path');
const fs = require('fs');

class TestMotor{
    constructor(config){
        this.config = config;
        this.allTestGroup = [];
        this.allTestFiles = this.listTestFiles();
        this.createAllTestGroup();
    }
    createTestGroup(group){
        this.allTestGroup.push(new TestGroup(group, this.config));
    }
    listTestFiles(){
        let files = [];
        fs.readdirSync(this.config.testFolder).forEach(file => {(path.extname(file) == '.json') ? files.push(file) : ''})
        return files;
    }
    createAllTestGroup(){
        this.allTestFiles.forEach(file => {
            let fileParser = new FileParser(file, this.config);
            let group = fileParser.getAllTest();
            this.createTestGroup(group);
        });
    }
}
module.exports = {TestMotor};