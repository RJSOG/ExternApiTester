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
        const response = await this.prepareRequest();
        this.response = response;       
        for(let stepCase of this.assert){
            let stepCaseParam = this.getstepCaseParam(stepCase);
            this.executeAssertions(stepCaseParam, response); 
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
    prepareRequest = async () => {
        if(this.method == null) return ''
        let authCookie = (this.auth != null) ? {"Cookie": this.auth} : {};
        if(this.param_uri != {}){
            this.endpoint = this.endpoint + this.getStrParamUri();
        }
        let requestParam = {
            'url' : this.endpoint,
            'method' : this.method,
            'baseURL' : this.config.baseUrl,
            'params' : this.param_uri,
            'data' : (this.param_body != undefined) ? this.param_body : '',
            'headers' : (this.headers != undefined) ? Object.assign({}, authCookie, this.headers) : authCookie
        }
        return await this.executeRequest(requestParam);
    }
    getstepCaseParam = (stepCase) => {
        return {
            target : stepCase.target,
            comparison : stepCase.comparison,
            value : stepCase.value
        }
    }
    executeAssertions = (stepCaseParam, response) => {
        let description = (typeof(stepCaseParam.value) === 'object') ? JSON.stringify(stepCaseParam.value) : stepCaseParam.value; 
        switch (stepCaseParam.comparison){
            case 'Equals':
                this.suiteInstance.addTest(new Test(stepCaseParam.target + ' doit être égal à ' + description, (() => {
                    stepCaseParam.target = (stepCaseParam.target == 'status_code') ? 'status' : stepCaseParam.target;
                    expect(_.result(response, stepCaseParam.target)).to.deep.equal(stepCaseParam.value);
                })))
                break;
            case 'Is not':
                this.suiteInstance.addTest(new Test(stepCaseParam.target + ' est différent de ' + description, (() => {
                    stepCaseParam.target = (stepCaseParam.target == 'status_code') ? 'status' : stepCaseParam.target;
                    expect(_.result(response, stepCaseParam.target)).to.not.equal(stepCaseParam.value);
                })));
                break;
            case 'Type':
                this.suiteInstance.addTest(new Test(stepCaseParam.target + ' doit être de type ' + description, (() => {
                    stepCaseParam.target = (stepCaseParam.target == 'status_code') ? 'status' : stepCaseParam.target;
                    _.result(response, stepCaseParam.target).should.be.a(stepCaseParam.value);
                })));
                break;
            case 'Contain':
                this.suiteInstance.addTest(new Test(stepCaseParam.target + ' doit contenir ' + description, (() => {
                    stepCaseParam.target = (stepCaseParam.target == 'status_code') ? 'status' : stepCaseParam.target;
                    expect(_.result(response, stepCaseParam.target)).to.contain.deep.members(stepCaseParam.realValue);
                })));
                break;
            case 'Type':
                this.suiteInstance.addTest(new Test(stepCaseParam.target + ' doit contenir ' + description + ' elements',(() => {
                    expect(_.result(response, stepCaseParam.target).length).to.deep.equal(stepCaseParam.value);
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
    executeRequest = async (requestParam) => {
        try {
            const resp = await axios(requestParam);
            return resp;
        }catch(err){    
            return err.response;
        }
    }
}
module.exports = StepFactory;
