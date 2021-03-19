const axios = require('axios');
const chai = require("chai");
const Execute = require('./serieParser')
const StepFactory = require('./stepClass');
const _ = require('lodash');
const Mocha = require("mocha/mocha").Mocha;
const expect = chai.expect;
const should = chai.should();
const Test = Mocha.Test;
const Spec = Mocha.Spec;
const TeamCity = require('mocha-teamcity-reporter');
const { type } = require('mocha/mocha');

class Serie{
    constructor(serie, config){
        this.config = config;
        this.description = serie.description;
        this.serie = serie;
        this.executionOrderId = 0;
        this.executeClassInstance = new Execute(this.config).getInstance();
        this.executionOrder = this.executeClassInstance.getExecutionOrderFromName(this.serie.name);
        this.mochaInstance = new Mocha({
            reporter: (this.config.report == 'tc') ? TeamCity : Spec
        });
        this.config.mochaInstance = this.mochaInstance;
    }
    async startAssert(){
        this.authenticate().then(async auth => {
            this.auth = auth;
            this.setMochaProperties();
            for (const step of this.serie.serieExecutionOrder) {
                const stepInstance = await this.createStep(step);
                this.assertionsOnSerie(stepInstance.response, stepInstance.id);
            }
            this.mochaInstance.run();
        });
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
            target : serieCase.target,
            comparison : serieCase.comparison,
            realValue : this.getAssertValue(serieCase.value),
            value : serieCase.value
        }
    }
    setMochaProperties = () => {
        this.suiteInstance = Mocha.Suite.create(this.mochaInstance.suite, this.description);
        this.suiteInstance.timeout(this.config.timeout);
    }
    executeSerieAssertions = (serieCaseParam, response) => {
        let description = (typeof(serieCaseParam.realValue) == 'object') ? JSON.stringify(serieCaseParam.realValue) : serieCaseParam.realValue;
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
            case 'Type':
                this.suiteInstance.addTest(new Test(stepCaseParam.target + ' doit contenir '+ description + ' elements',(() => {
                    expect(_.result(response, stepCaseParam.target).length).to.deep.equal(stepCaseParam.value);
                })));
                break;
        }
    }
    getAssertValue = (value) => {
        this.serie.serieExecutionOrder.forEach(testCase => {
            if(typeof(value) === 'string'){
                let [id, property] = value.split(".");
                if(id == testCase.id && testCase.hasOwnProperty(property)){
                    value = testCase[property];
                }
            }
        });
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
}
module.exports = Serie;