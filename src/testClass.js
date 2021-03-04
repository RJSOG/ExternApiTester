const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const Mocha = require("mocha/mocha").Mocha;
const axios = require("axios");
const Test = Mocha.Test;
const defaultCfg = {
    timeout: 1000,
    report: 'cli',
    baseUrl: 'http://vm-dev-central4.omnitech.security/SealWebMvc/ExternalApi'
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
    setProperty = () => {
        this.endpoint = this.test.endpoint;
        this.method = this.test.method;
        this.assert = this.test.assert;
        this.description = this.test.description;
        this.param_uri = this.getStrParamUri();
        this.param_body = this.test.param_body;
    }
    setMochaProperties = () => {
        this.config = Object.assign({}, defaultCfg);
        this.mochaInstance = new Mocha();
        this.suiteInstance = Mocha.Suite.create(this.mochaInstance.suite, this.description);
        this.suiteInstance.timeout(this.config.timeout);
    }
    testMapper = async () => {
        if(this.method == null) return ''
        var methodMapper = {
            "GET" : this.getTest,
            "POST" : this.postTest,
            "PUT" : this.putTest,
            "DELETE" : this.deleteTest
        }
        return await methodMapper[this.method]();
    }
    getTest = async () => {
        let response = await this.getRequest(this.endpoint + this.param_uri, this.auth);
        for(let testCase of this.assert){
            let testCaseParam = this.getTestCaseParam(testCase);
            this.executeAssertions(testCaseParam, response);
        }
    }
    putTest  = async () => {
        let response = await this.putRequest(this.endpoint + this.param_uri, this.auth, this.param_body);
        for(let testCase of this.assert){
            let testCaseParam = this.getTestCaseParam(testCase);
            this.executeAssertions(testCaseParam, response);
        }
    }
    deleteTest = async () => {
        let response = await this.deleteRequest(this.endpoint + this.param_uri, this.auth, this.param_body);
        for(let testCase of this.assert){
            let testCaseParam = this.getTestCaseParam(testCase);
            this.executeAssertions(testCaseParam, response)
        }
    }
    postTest = async () => {
        let response =  await this.postRequest(this.endpoint + this.param_uri, this.auth, this.param_body);
        for(let testCase of this.assert){
            let testCaseParam = this.getTestCaseParam(testCase);
            this.executeAssertions(testCaseParam, response)
        }
    }
    getTestCaseParam = (testCase) => {
        return {
            target : testCase.target,
            subTarget : (testCase.subTarget != undefined) ? testCase.subTarget : false,
            targetDescription : (testCase.subTarget != undefined) ? testCase.target + "." + testCase.subTarget : testCase.target,
            useBody : testCase.use_body,
            verify : (testCase.verify != undefined) ? testCase.verify : false,
            comparison : testCase.comparison,
            value : testCase.value
        }
    }
    executeAssertions = (testCaseParam, response) => {
        switch (testCaseParam.comparison){
            case 'Equals':
                this.suiteInstance.addTest(new Test('Expect ' + testCaseParam.targetDescription + ' to equal ' + testCaseParam.value, (() => {
                    testCaseParam.target = (testCaseParam.target == 'status_code') ? 'status' : testCaseParam.target;
                    if(testCaseParam.subTarget){
                        if(testCaseParam.useBody){
                            expect(response.data[testCaseParam.target][testCaseParam.subTarget]).to.equal(testCaseParam.value);
                        }else{
                            expect(response[testCaseParam.target][testCaseParam.subTarget]).to.equal(testCaseParam.value);
                        }
                    }else{
                        if(testCaseParam.useBody){
                            expect(response.data[testCaseParam.target]).to.equal(testCaseParam.value);
                        }else{
                            expect(response[testCaseParam.target]).to.equal(testCaseParam.value);
                        }
                    }
                })))
                break;
            case 'Is not':
                this.suiteInstance.addTest(new Test('Expect ' + testCaseParam.targetDescription + ' is not ' + testCaseParam.value, (() => {
                    testCaseParam.target = (testCaseParam.target == 'status_code') ? 'status' : testCaseParam.target;
                    if(testCaseParam.subTarget){
                        if(testCaseParam.useBody){
                            expect(response.data[testCaseParam.target][testCaseParam.subTarget]).to.not.equal(testCaseParam.value);
                        }else{
                            expect(response[testCaseParam.target][testCaseParam.subTarget]).to.not.equal(testCaseParam.value);
                        }
                    }else{
                        if(testCaseParam.useBody){
                            expect(response.data[testCaseParam.target]).to.not.equal(testCaseParam.value);
                        }else{
                            expect(response[testCaseParam.target]).to.not.equal(testCaseParam.value);
                        }
                    }
                })));
                break;
            case 'Type':
                this.suiteInstance.addTest(new Test('Expect ' + testCaseParam.targetDescription + ' to be an ' + testCaseParam.value, (() => {
                    testCaseParam.target = (testCaseParam.target == 'status_code') ? 'status' : testCaseParam.target;
                    if(testCaseParam.subTarget){
                        if(testCaseParam.useBody){
                            response.data[testCaseParam.target][testCaseParam.subTarget].should.be.a(testCaseParam.value)
                        }
                    }else{
                        if(testCaseParam.useBody){
                            response.data[testCaseParam.target].should.be.a(testCaseParam.value)
                        }
                    }
                })));
                break;
        }
    }
    getStrParamUri = () => {
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
    getRequest = async (endpoint, auth) => {
        try {
            const resp = await axios.get(this.config.baseUrl + endpoint, {headers: {"Cookie": auth}});
            return resp;
        }catch(err){
            console.log(err.response.status + " - " + err.response.statusTextrr);
        }
    }
    putRequest = async (endpoint, auth, data) => {
        try{
            const resp = await axios.put(this.config.baseUrl + endpoint, data, {headers: {"Cookie": auth}});
            return resp;
        }catch(err){
            console.log(err.response.status + " - " + err.response.statusText);
        }
    }
    postRequest = async (endpoint, auth, data) => {
        try {
            const resp = await axios.post(this.config.baseUrl + endpoint, data, {headers : {"Cookie": auth}});
            return resp;
        }catch(err){
            console.log(err.response.status + " - " + err.response.statusText);
        }
    }
    deleteRequest = async (endpoint, auth, data) => {
        try {
            const resp = await axios.delete(this.config.baseUrl + endpoint, data, {headers : {"Cookie": auth}});
            return resp;
        }catch(err){
            console.log(err.response.status + " - " + err.response.statusText);
        }
    }
}
module.exports = TestFactory;
