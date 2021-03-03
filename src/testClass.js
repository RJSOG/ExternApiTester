const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const Mocha = require("mocha/mocha").Mocha;
const axios = require("axios");
const Test = Mocha.Test;
const defaultCfg = {
    timeout: 1000,
    report: 'cli',
    baseUrl: 'http://vm-dev-central3.omnitech.security/SealWebMvc/ExternalApi'
}

class TestFactory{
    constructor(test, auth){
        this.test = test;
        this.auth = auth;
        this.setProperty();
        this.setMochaProperties();
        this.testMapper().then(() => {
            if(this.config.report === 'cli'){
                this.mochaInstance.run();
            }
        })
    }
    setProperty(){
        this.endpoint = this.test.endpoint;
        this.method = this.test.method;
        this.assert = this.test.assert;
        this.description = this.test.description;
        this.param_uri = this.getStrParamUri();
        this.param_body = this.test.param_body;
    }
    setMochaProperties(){
        this.config = Object.assign({}, defaultCfg);
        this.mochaInstance = new Mocha();
        this.suiteInstance = Mocha.Suite.create(this.mochaInstance.suite, this.description);
        this.suiteInstance.timeout(this.config.timeout);
    }
    async testMapper(){
        if(this.method == null) return ''
        var methodMapper = {
            "GET" : this.getTest,
            // "POST" : this.postTest(),
            "PUT" : this.putTest
            // "DELETE" : this.deleteTest()
        }
        return await methodMapper[this.method]();
    }
    getTest = async () => {
        let response = await this.getRequest(this.endpoint + this.param_uri, this.auth);
        for(let testCase of this.assert){
            let target = testCase.target;
            let useBody = testCase.use_body;
            let comparison = testCase.comparison;
            let value = testCase.value;
            switch (comparison){
                case 'Equals':
                    this.suiteInstance.addTest(new Test('Expect ' + target + ' to equal ' + value, (() => {
                        target = (target == 'status_code') ? 'status' : target;
                        if(useBody){
                            expect(response.data[target]).to.equal(value);
                        }else{
                            expect(response[target]).to.equal(value);
                        }
                    })))
                    break;
                case 'Is not':
                    this.suiteInstance.addTest(new Test('Expect ' + target + ' is not ' + value, (() => {
                        target = (target == 'status_code') ? 'status' : target;
                        if(useBody){
                            expect(response.data[target]).to.not.equal(value);
                        }else{
                            expect(response[target]).to.not.equal(value);
                        }
                    })));
                    break;
                case 'Type':
                    this.suiteInstance.addTest(new Test('Expect ' + target + ' to be an ' + value, (() => {
                        target = (target == 'status_code') ? 'status' : target;
                        if(useBody){
                            response.data[target].should.be.a(value)
                        }
                    })));
                    break;
            }
        }
    }
    putTest  = async () => {
        let response = await this.putRequest(this.endpoint + this.param_uri, this.auth, this.param_body);
        for(let testCase of this.assert){
            let target = testCase.target;
            let verify = testCase.verify;
            let comparison = testCase.comparison;
            let value = testCase.value;
            switch(comparison){
                case 'Equals':
                    this.suiteInstance.addTest(new Test('Expect ' + target + ' to equal ' + value, (() => {
                        expect(response[target]).to.equal(value);
                    })))
                    break;
            }
        }
    }
    getStrParamUri(){
        let param_uri_str = "?"
        if(this.test.param_uri){
            Object.keys(this.test.param_uri).forEach((param) => {
                param_uri_str += param + "=" + this.test.param_uri[param] + "&";
            })
            param_uri_str = param_uri_str.slice(0, -1);
        }else{
            param_uri_str = "";
        }
        return param_uri_str;
    }
    async getRequest(endpoint, auth){
        try {
            const resp = await axios.get(this.config.baseUrl + endpoint, {headers: {"Cookie": auth}});
            return resp;
        }catch(err){
            console.log(eerr.response.status + " - " + err.response.statusTextrr);
        }
    }
    async putRequest(endpoint, auth, data){
        try{
            const resp = await axios.put(this.config.baseUrl + endpoint, data, {headers: {"Cookie": auth}})
            return resp;
        }catch(err){
            console.log(err.response.status + " - " + err.response.statusText);
        }
    }
}
module.exports = TestFactory;