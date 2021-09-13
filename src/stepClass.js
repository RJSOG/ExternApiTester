const chai = require("chai");
const _ = require('lodash');
const expect = chai.expect;
const should = chai.should();
const Mocha = require("mocha/mocha").Mocha;
const axios = require("axios");
const assert = require('assert');
const Test = Mocha.Test;


class StepFactory {
    constructor(step, auth, config, id) {
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
        for (let stepCase of this.assert) {
            let stepCaseParam = this.getstepCaseParam(stepCase);
            this.executeAssertions(stepCaseParam, response);
        }
    }
    setClassProperties = () => {
        this.endpoint = this.step.endpoint;
        this.method = this.step.method;
        this.assert = this.step.assert;
        this.headers = this.step.headers;
        this.description = this.step.description;
        this.param_uri = this.step.param_uri;
        this.param_body = this.step.param_body;
        this.stepFinished = false;
        this.requiredStep = this.step.requiredStep;
        this._hasRequireTestFailed = false;
    }
    setMochaProperties = () => {
        this.mochaInstance = this.config.mochaInstance;
        this.suiteInstance = Mocha.Suite.create(this.config.suiteInstance, this.description);
        this.suiteInstance.timeout(this.config.timeout);
    }
    prepareRequest = async () => {
        if (this.method == null) return ''
        let authCookie = (this.auth != null) ? { "Cookie": this.auth } : {};
        let requestParam = {
            'url': this.endpoint,
            'method': this.method,
            'baseURL': this.config.baseUrl,
            'params': this.param_uri,
            'data': (this.param_body != undefined) ? this.param_body : '',
            'headers': (this.headers != undefined) ? Object.assign({}, authCookie, this.headers) : authCookie
        }
        if(this.config.cacheInstance != undefined){
            requestParam = this.config.cacheInstance.applyValue(requestParam);
        }
        requestParam.params = this.getStrParamUri(requestParam.params);
        if (this.param_uri != {}) {
            this.endpoint = this.endpoint + requestParam.params;
            requestParam.url = this.endpoint
        }
        return await this.executeRequest(requestParam);
    }
    getstepCaseParam = (stepCase) => {
        let stepCaseParam =  { 
            target: stepCase.target,
            comparison: stepCase.comparison,
            value: stepCase.value,
        }
        if(this.cacheInstance != undefined){
            stepCaseParam = this.cacheInstance.applyValue(stepCaseParam);
        }
        return stepCaseParam;
    }
    executeAssertions = (stepCaseParam, response) => {
        let description = this.valueToDescription(stepCaseParam.value);
        const self = this;
        switch (stepCaseParam.comparison) {
            case 'Equals':
                this.suiteInstance.addTest(new Test(stepCaseParam.target + ' doit être égal à ' + description, function () {
                    self.wrapperBeforeExpect('expectEquals', stepCaseParam, response, this.test);
                }));
                break;
            case 'Is not':
                this.suiteInstance.addTest(new Test(stepCaseParam.target + ' est différent de ' + description, function () {
                    self.wrapperBeforeExpect('expectIsNot', stepCaseParam, response, this.test);
                }));
                break;
            case 'Type':
                this.suiteInstance.addTest(new Test(stepCaseParam.target + ' doit être de type ' + description, function () {
                    self.wrapperBeforeExpect('expectType', stepCaseParam, response, this.test);
                }));
                break;
            case 'Contain':
                this.suiteInstance.addTest(new Test(stepCaseParam.target + ' doit contenir ' + description, function () {
                    self.wrapperBeforeExpect('expectContain', stepCaseParam, response, this.test);
                }));
                break;
            case 'Count':
                this.suiteInstance.addTest(new Test(stepCaseParam.target + ' doit contenir ' + description + ' elements', function () {
                    self.wrapperBeforeExpect('expectCount', stepCaseParam, response, this.test);
                }));
                break;
        }
    }
    wrapperBeforeExpect = (expectTestName, stepCaseParam, response, test) => {
        try {
            if(!this.suiteInstance.parent.mustBeSkipped){
                this[expectTestName](stepCaseParam, response);
            }
            else{
                test.skip();
            }
        } catch (error) {
            if (this.requiredStep)
                this.suiteInstance.parent.mustBeSkipped = true;
            throw error;
        }
    }

    expectEquals = (stepCaseParam, response) => {
        stepCaseParam.target = (stepCaseParam.target == 'status_code') ? 'status' : stepCaseParam.target;
        expect(_.result(response, stepCaseParam.target)).to.deep.equal(stepCaseParam.value)
    }
    expectIsNot = (stepCaseParam, response) => {
        stepCaseParam.target = (stepCaseParam.target == 'status_code') ? 'status' : stepCaseParam.target;
        expect(_.result(response, stepCaseParam.target)).to.not.equal(stepCaseParam.value);
    }
    expectType = (stepCaseParam, response) => {
        stepCaseParam.target = (stepCaseParam.target == 'status_code') ? 'status' : stepCaseParam.target;
        _.result(response, stepCaseParam.target).should.be.a(stepCaseParam.value);
    }
    expectContain = (stepCaseParam, response) => {
        stepCaseParam.target = (stepCaseParam.target == 'status_code') ? 'status' : stepCaseParam.target;
        expect(_.result(response, stepCaseParam.target)).to.contain.deep.members(stepCaseParam.realValue);
    }
    expectCount = (stepCaseParam, response) => {
        expect(_.result(response, stepCaseParam.target).length).to.deep.equal(stepCaseParam.value);
    }

    getStrParamUri = (paramsUri) => {
        let param_uri_str = "?"
        if (this.step.param_uri) {
            Object.keys(paramsUri).forEach((param) => {
                param_uri_str += param + "=" + paramsUri[param] + "&";
            });
            param_uri_str = param_uri_str.slice(0, -1);
        } else {
            param_uri_str = "";
        }
        return param_uri_str;
    }
    executeRequest = async (requestParam) => {
        try {
            const resp = await axios(requestParam);
            return resp;
        } catch (err) {
            return err.response;
        }
    }
    valueToDescription = (value) => {
        let description = (typeof (value) === 'object') ? JSON.stringify(value) : value;
        description = (description === "") ? '""' : description;
        return description;
    }
}
module.exports = StepFactory;
