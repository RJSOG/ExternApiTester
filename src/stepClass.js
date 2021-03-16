const chai = require("chai");
const _ = require('lodash');
const expect = chai.expect;
const should = chai.should();
const Mocha = require("mocha/mocha").Mocha;
const axios = require("axios");
const Test = Mocha.Test;


class StepFactory{
    constructor(step, auth, config, id){
        this.id = id;
        this.config = config;
        this.step = step;
        this.auth = auth;
        this.setClassProperties();
        this.setMochaProperties();
    }
    async run() {
        const response = await this.methodMapper();
        if(response != 1) {  
            this.response = response;       
            for(let stepCase of this.assert){
                let stepCaseParam = this.getstepCaseParam(stepCase);
                this.executeAssertions(stepCaseParam, response); 
            }
        }
    }
    setClassProperties = () => {
        this.endpoint = this.step.endpoint;
        this.method = this.step.method;
        this.assert = this.step.assert;
        this.headers =  this.step.headers;
        this.description = this.step.description;
        this.param_uri = this.getStrParamUri();
        this.param_body = this.step.param_body;
        this.stepFinished = false;
    }
    setMochaProperties = () => {
        this.mochaInstance = this.config.mochaInstance;
        this.suiteInstance = Mocha.Suite.create(this.mochaInstance.suite, this.description);
        this.suiteInstance.timeout(this.config.timeout);
    }
    methodMapper = async () => {
        if(this.method == null) return ''
        let authCookie = {"Cookie": this.auth};
        let requestParam = {
            'endpoint' : this.endpoint + this.param_uri,
            'data' : (this.param_body != undefined) ? this.param_body : '',
            'headers' : (this.headers != undefined) ? Object.assign({}, authCookie, this.headers) : authCookie
        }
        var methodMapper = {
            "GET" : this.getRequest,
            "POST" : this.postRequest,
            "PUT" : this.putRequest,
            "DELETE" : this.deleteRequest
        }
        return await methodMapper[this.method](requestParam);
    }
    getstepCaseParam = (stepCase) => {
        return {
            target : stepCase.target,
            comparison : stepCase.comparison,
            value : stepCase.value
        }
    }
    executeAssertions = (stepCaseParam, response) => {
        switch (stepCaseParam.comparison){
            case 'Equals':
                this.suiteInstance.addTest(new Test(stepCaseParam.target + '  doit être égal à ' + stepCaseParam.value, (() => {
                    stepCaseParam.target = (stepCaseParam.target == 'status_code') ? 'status' : stepCaseParam.target;
                    expect(_.result(response, stepCaseParam.target)).to.deep.equal(stepCaseParam.value);
                })))
                break;
            case 'Is not':
                this.suiteInstance.addTest(new Test(stepCaseParam.target + ' est différent de ' + stepCaseParam.value, (() => {
                    stepCaseParam.target = (stepCaseParam.target == 'status_code') ? 'status' : stepCaseParam.target;
                    expect(_.result(response, stepCaseParam.target)).to.not.equal(stepCaseParam.value);
                })));
                break;
            case 'Type':
                this.suiteInstance.addTest(new Test(stepCaseParam.target + ' doit être de type ' + stepCaseParam.value, (() => {
                    stepCaseParam.target = (stepCaseParam.target == 'status_code') ? 'status' : stepCaseParam.target;
                    _.result(response, stepCaseParam.target).should.be.a(stepCaseParam.value)
                })));
                break;
            case 'Contain':
                this.suiteInstance.addTest(new Test(stepCaseParam.target + '  doit contenir ' + stepCaseParam.value, (() => {
                    stepCaseParam.target = (stepCaseParam.target == 'status_code') ? 'status' : stepCaseParam.target;
                    expect(_.result(response, stepCaseParam.target)).to.contain.deep.members(stepCaseParam.realValue);
                })));
                break;
        }
    }
    getStrParamUri = () => {
        let param_uri_str = "?"
        if(this.step.param_uri){
            Object.keys(this.step.param_uri).forEach((param) => {
                param_uri_str += param + "=" + this.step.param_uri[param] + "&";
            });
            param_uri_str = param_uri_str.slice(0, -1);
        }else{
            param_uri_str = "";
        }
        return param_uri_str;
    }
    getRequest = async (requestParam) => {
        try {
            const resp = await axios.get(this.config.baseUrl + requestParam.endpoint, {headers: requestParam.headers});
            return resp;
        }catch(err){
            console.log("Assertions on " + this.method + " " + this.endpoint + " failed"  + "  -->  " + err.response.status + " - " + err.response.statusText);
            return 1;
        }
    }
    putRequest = async (requestParam) => {
        try{
            const resp = await axios.put(this.config.baseUrl + requestParam.endpoint, requestParam.data, {headers: requestParam.headers});
            return resp;
        }catch(err){
            console.log("Assertions on " + this.method + " " + this.endpoint + " failed"  + "  -->  " + err.response.status + " - " + err.response.statusText);
            return 1;
        }
    }
    postRequest = async (requestParam) => {
        try {
            const resp = await axios.post(this.config.baseUrl + requestParam.endpoint, requestParam.data, {headers : requestParam.headers});
            return resp;
        }catch(err){
            console.log("Assertions on " + this.method + " " + this.endpoint + " failed"  + "  -->  " + err.response.status + " - " + err.response.statusText);
            return 1;
        }
    }
    deleteRequest = async (requestParam) => {
        try {
            const resp = await axios.delete(this.config.baseUrl + requestParam.endpoint, {data : requestParam.data, headers : requestParam.headers});
            return resp;
        }catch(err){
            console.log("Assertions on " + this.method + " " + this.endpoint + " failed"  + "  -->  " + err.response.status + " - " + err.response.statusText);
            return 1;
        }
    }
}
module.exports = StepFactory;
