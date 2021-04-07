const axios = require('axios');
const chai = require("chai");
const SerieParser = require('./serieParser')
const StepFactory = require('./stepClass');
const Cache = require('./cacheClass');
const _ = require('lodash');
const Mocha = require("mocha/mocha").Mocha;
const expect = chai.expect;
const should = chai.should();
const Test = Mocha.Test;
const { type } = require('mocha/mocha');
const { times } = require('lodash');

class Serie{
    constructor(serie, config){
        this.config = config;
        this.config.parent = this;
        this.config.isDispose = false;
        this.description = serie.description;
        this.serieStop = false;
        this.serie = serie;
        this.executionOrderId = 0;
        this.serieParser = new SerieParser(this.config).getInstance();
        this.executionOrder = this.serieParser.getExecutionOrderFromName(this.serie.name)
        this.allStepResponse = [];
        if(serie.cache){
            this.prepareCache();
        }
    }
    async startAssert(){
        this.auth = await this.authenticate();
        this.setMochaProperties();
        for (const step of this.serie.serieExecutionOrder) {
            const stepInstance = await this.createStep(step);
            this.allStepResponse.push({
                id : step.id,
                response : stepInstance.response
            });
            if(this.serie.cache){
                this.fillCache(stepInstance.response);
            }
            this.assertionsOnSerie(stepInstance.response, stepInstance.id);
        }
    }
    prepareCache = () => {
        this.cache = new Cache();
        this.config.cacheInstance = this.cache;
        this.cacheData = this.serieParser.getSerieCache(this.serie.name);
    }
    fillCache = (response) => {
        this.cacheData.forEach((cacheObject) => {
            for(let element of cacheObject){
                if(typeof(element.value) === 'string'){
                    if(element.value.includes("response")){
                        let target = this.getTarget(element.value);
                        let value = _.result(response, target);
                        this.cache.put(element.name, value)
                    }
                }else{
                    this.cache.put(element.name, element.value);
                }
            }
        })
    }
    //Authenticate and get auth cookie
    async authenticate(){
        if(this.serie.automatedAuth){
            let buff = Buffer.from(this.config.auth.toString(), 'utf-8');
            let headers = {
                headers: {"Authorization": "Basic " + buff.toString('base64')}
            }
            try{
                let resp = await axios.put(this.config.baseUrl + '/Authenticate', "" , headers)
                return resp.headers['set-cookie'];
            }
            catch(err) {
                console.log("Authentification Failed !\n" + err);
                return 1
            }
        }
        return null;
    }
    async createStep(step){
        let stepInstance = new StepFactory(step, this.auth, this.config, this.executionOrderId)
        this.executionOrderId += 1;
        await stepInstance.run();
        return stepInstance;
    }
    getSerieCaseParam = (serieCase) => {
        return {
            target : (serieCase.target.split(".")[1] === "response") ? this.getTarget(serieCase.target) : serieCase.target,
            comparison : serieCase.comparison,
            realValue : this.getAssertValue(serieCase.value),
            value : serieCase.value
        }
    }
    getTarget = (target) => {
        let pattern = "response";
        return target.slice(target.indexOf(pattern) + pattern.length + 1, target.length)
    }   
    setMochaProperties = () => {
        this.suiteInstance = Mocha.Suite.create(this.config.mochaInstance.suite, this.description);
        this.suiteInstance.timeout(this.config.timeout);
        this.config.suiteInstance = this.suiteInstance;
    }
    executeSerieAssertions = (serieCaseParam, response) => {
        let description = (typeof(serieCaseParam.realValue) === 'object') ? JSON.stringify(serieCaseParam.realValue) : serieCaseParam.realValue;
        serieCaseParam.realValue = (this.isNumeric(serieCaseParam.realValue)) ? Number(serieCaseParam.realValue) : serieCaseParam.realValue;
        switch (serieCaseParam.comparison){
            case 'Equals':
                this.suiteInstance.addTest(new Test(serieCaseParam.target + ' doit être égal à '+ description, (() => {
                    serieCaseParam.target = (serieCaseParam.target == 'status_code') ? 'status' : serieCaseParam.target;
                    expect(_.result(response, serieCaseParam.target)).to.deep.equal(serieCaseParam.realValue);
                })))
                break;
            case 'Is not':
                this.suiteInstance.addTest(new Test(serieCaseParam.target + ' est différent de '+ description, (() => {
                    serieCaseParam.target = (serieCaseParam.target == 'status_code') ? 'status' : serieCaseParam.target;
                    expect(_.result(response, serieCaseParam.target)).to.not.equal(serieCaseParam.realValue);
                })));
                break;
            case 'Type':
                this.suiteInstance.addTest(new Test(serieCaseParam.target + ' doit être de type '+ description, (() => {
                    serieCaseParam.target = (serieCaseParam.target == 'status_code') ? 'status' : serieCaseParam.target;
                    _.result(response, serieCaseParam.target).should.be.a(serieCaseParam.realValue)
                })));
                break;
            case 'Contain':
                this.suiteInstance.addTest(new Test(serieCaseParam.target + ' doit contenir '+ description, (() => {
                    serieCaseParam.target = (serieCaseParam.target == 'status_code') ? 'status' : serieCaseParam.target;
                    expect(_.result(response, serieCaseParam.target)).to.contain.deep.members(serieCaseParam.realValue);
                })));
                break;
            case 'Count':
                this.suiteInstance.addTest(new Test(serieCaseParam.target + ' doit contenir '+ description + ' elements',(() => {
                    expect(_.result(response, serieCaseParam.target).length).to.deep.equal(serieCaseParam.realValue);
                })));
                break;
        }
    }
    isNumeric = (str) => {
        return /^\d+$/.test(str);
    }
    getAssertValue = (value) => {
        if(typeof(value) === 'string'){
            let pattern = "response"
            let [id, property] = value.split(".");
            if(property === pattern){
                let response = this.getStepResponse(id);
                let responseProperty = value.slice(value.indexOf(pattern) + pattern.length + 1, value.length);
                value = _.result(response, responseProperty);
            }else{
                this.serie.serieExecutionOrder.forEach(testCase => {
                    if(id == testCase.id){
                        if(testCase.hasOwnProperty(property)){
                            value = testCase[property];
                        }
                    } 
                });
            }
        }
        return value;
    }
    assertionsOnSerie = (response, id) => {
        if(this.haveAssert(id)){
            this.executionOrder[id].assert.forEach((caseAssert) => {
                let serieCaseParam = this.getSerieCaseParam(caseAssert);
                this.executeSerieAssertions(serieCaseParam, response);
            });
        }
    }
    haveAssert = (id) => {
        return this.executionOrder[id].hasOwnProperty("assert");
    }
    getStepResponse = (id) => {
        let stepResponse;
        this.allStepResponse.forEach((stepObj) => {
            if(stepObj.id == id){
                stepResponse = stepObj.response;
            }
        })
        return stepResponse
    }
}
module.exports = Serie;