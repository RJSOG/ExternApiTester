const should = require("should");
const axios = require("axios");
const index = require("../src/index.js");
const expect = require("chai").expect;
const baseUrl = 'http://vm-dev-central4/SealWebMvc/ExternalApi';

async function authenticate(){
    let identifiants = "edonatien:S34l4dm";
    let buff = Buffer.from(identifiants, 'utf-8');
    let headers = {
	headers: {"Authorization": "Basic " + buff.toString('base64')}
    }
    let resp = await axios.put(baseUrl + '/Authenticate', "" , headers).then((response) => {
        return response;
    }).catch((err) => {
        console.log(err);
    })
    return resp.headers['set-cookie'];
}

async function getRequest(endpoint, auth)){
    let resp = await axios.get(baseUrl + endpoint, {Cookie: auth}).then((response) => {
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
