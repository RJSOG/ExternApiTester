const should = require("should");
const axios = require("axios");
const index = require("../src/index.js");
const expect = require("chai").expect;
const baseUrl = 'http://vm-dev-central4';

async function getRequest(endpoint){
    let resp = await axios.get(baseUrl + endpoint).then((response) => {
        return response;
    }).catch(err => {
        console.log(err);
    });
    return resp;
}


function testFunc(description, endpoint, assert){
    describe(description, function() {
        it(description, function(done) {
            let response = getRequest(endpoint)
            expect(response.statusCode).to.equal(assert.status_code);
        });
    });
}

index.init();
var test = index.getSpecificTestInGroup("Test GET permissions", "Permissions");
testFunc(test.description, test.endpoint, test.assert);