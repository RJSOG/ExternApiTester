const axios = require('axios');
const TestFactory = require('./testClass');
const baseUrl = 'http://vm-dev-central4.omnitech.security/SealWebMvc/ExternalApi';

class TestGroup{
    constructor(testGroup){
        this.allJsonTest = testGroup.all_test;
        this.allRunningTest = [];
        this.groupName = testGroup.groupname;
        this.authenticate().then(auth => {
            this.auth = auth;
            this.allJsonTest.forEach(test => {
                this.createTest(test);
            })
        })
    }
    //Authenticate and get auth cookie
    async authenticate(){
        let identifiants = "edonatien:S34l4dm";
        let buff = Buffer.from(identifiants, 'utf-8');
        let headers = {
            headers: {"Authorization": "Basic " + buff.toString('base64')}
        }
        let resp = await axios.put(baseUrl + '/Authenticate', "" , headers).catch((err) => {
            console.log(err);
        });
        return resp.headers['set-cookie'];
    }
    createTest(test){
        this.allRunningTest.push(new TestFactory(test, this.auth))
    }
}
module.exports = TestGroup;