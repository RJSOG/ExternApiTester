const should = require("should");
const axios = require("axios");
const expect = require("chai").expect;
const util = require("util");
const TestParser = require("./testParser");

var parser = new TestParser("test_permissions.json");