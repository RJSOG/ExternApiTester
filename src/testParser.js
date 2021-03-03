const fs = require("fs");
const testFolderPath = "C:/Users/edonatien/Desktop/test-seal-external-api/test/"

class TestParser {
    constructor(filename){
        this.filepath = testFolderPath + filename;
        let rawdata = fs.readFileSync(this.filepath);
        this.data  = JSON.parse(rawdata);
    }
    getAllTestFromGroupName(group_name){
        for(var group of this.data){
            if(group.groupname == group_name){
                return group.all_test
            }
        }
    }
    getSpecificTestfromGroup(testName, groupName){
        var group = this.getAllTestFromGroupName(groupName);
        for(var test of group){
            if(test.name == testName){
                return test;
            }
        }
    }

}
module.exports = TestParser;
