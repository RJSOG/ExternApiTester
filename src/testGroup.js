const axios = require('axios');
const Execute = require('./executeClass')
const TestFactory = require('./testClass');

class TestGroup{
    constructor(serie, config){
        this.config = config;
        this.serie = serie;
        this.executeClassInstance = new Execute(this.config).getInstance();
        this.executionOrder = this.executeClassInstance.getExecutionOrderFromName(this.serie.name)
        this.allRunningTest = [];
        this.authenticate().then(auth => {
            this.auth = auth;
            this.serie.testGroup.forEach(async (test) => {
                this.createTest(test);
                await new Promise(resolve => setTimeout(resolve, 500)); //Pause to have test printed in the right way 
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
        let resp = await axios.put(this.config.baseUrl + '/Authenticate', "" , headers).catch((err) => {
            console.log(err);
        });
        return resp.headers['set-cookie'];
    }
    createTest(test){
        this.allRunningTest.push(new TestFactory(test, this.auth, this.config))
    }
}
module.exports = TestGroup;