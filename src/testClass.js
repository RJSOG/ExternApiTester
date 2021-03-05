const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const Mocha = require("mocha/mocha").Mocha;
const axios = require("axios");
const Test = Mocha.Test;


class TestFactory{
    constructor(test, auth, config){
        this.config = config
        this.test = test;
        this.auth = auth;
        this.setProperty();
        this.setMochaProperties();
        this.methodMapper().then(response => {
            for(let testCase of this.assert){
                let testCaseParam = this.getTestCaseParam(testCase);
                this.executeAssertions(testCaseParam, response);
            }
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
        this.mochaInstance = new Mocha();
        this.suiteInstance = Mocha.Suite.create(this.mochaInstance.suite, this.description);
        this.suiteInstance.timeout(this.config.timeout);
    }
    methodMapper = async () => {
        if(this.method == null) return ''
        let requestParam = {
            'endpoint' : this.endpoint + this.param_uri,
            'auth' : this.auth,
            'data' : (this.param_body != undefined) ? this.param_body : ''
        }
        var methodMapper = {
            "GET" : this.getRequest,
            "POST" : this.postRequest,
            "PUT" : this.putRequest,
            "DELETE" : this.deleteRequest
        }
        return await methodMapper[this.method](requestParam);
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
                            expect(response.data[testCaseParam.target][testCaseParam.subTarget]).to.deep.equal(testCaseParam.value);
                        }else{
                            expect(response[testCaseParam.target][testCaseParam.subTarget]).to.deep.equal(testCaseParam.value);
                        }
                    }else{
                        if(testCaseParam.useBody){
                            expect(response.data[testCaseParam.target]).to.deep.equal(testCaseParam.value);
                        }else{
                            expect(response[testCaseParam.target]).to.deep.equal(testCaseParam.value);
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
    //Transform uri param into one string
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
    getRequest = async (requestParam) => {
        try {
            const resp = await axios.get(this.config.baseUrl + requestParam.endpoint, {headers: {"Cookie": requestParam.auth}});
            return resp;
        }catch(err){
            console.log(err.response.status + " - " + err.response.statusText);
        }
    }
    putRequest = async (requestParam) => {
        try{
            const resp = await axios.put(this.config.baseUrl + requestParam.endpoint, requestParam.data, {headers: {"Cookie": requestParam.auth}});
            return resp;
        }catch(err){
            console.log(err.response.status + " - " + err.response.statusText);
        }
    }
    postRequest = async (requestParam) => {
        try {
            const resp = await axios.post(this.config.baseUrl + requestParam.endpoint, requestParam.data, {headers : {"Cookie": requestParam.auth}});
            return resp;
        }catch(err){
            console.log(err.response.status + " - " + err.response.statusText);
        }
    }
    deleteRequest = async (requestParam) => {
        try {
            const resp = await axios.delete(this.config.baseUrl + requestParam.endpoint, {data : requestParam.data, headers : {"Cookie": requestParam.auth}});
            return resp;
        }catch(err){
            console.log(err.response.status + " - " + err.response.statusText);
        }
    }
}
module.exports = TestFactory;
