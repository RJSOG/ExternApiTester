const should = require("should");
const axios = require("axios");
const expect = require("chai").expect;
const util = require("util");
const TestParser = require("./testParser");

module.exports = {
    init : () => {
        this.parser = new TestParser("test_permissions.json");
    },
    getTestFromGroupName : (groupName) => {
        return this.parser.getAllTestFromGroupName(groupName);
    },
    getSpecificTestInGroup: (testName, groupName) => {
        return this.parser.getSpecificTestfromGroup(testName, groupName);
    }
}