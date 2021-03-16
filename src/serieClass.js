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
        this.authenticate().then(async auth => {
           if(auth != 1){
            this.auth = auth;
            this.setMochaProperties();
            for (const step of this.serie.serieExecutionOrder) {
                const stepInstance = await this.createStep(step);
                this.assertionsOnSerie(stepInstance.response, stepInstance.id);
            }
            this.mochaInstance.run();
           }
        });
    }
    //Authenticate and get auth cookie
    async authenticate(){
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
        switch (serieCaseParam.comparison){
            case 'Equals':
                this.suiteInstance.addTest(new Test(serieCaseParam.target + ' doit être égal à ' + serieCaseParam.value, (() => {
                    serieCaseParam.target = (serieCaseParam.target == 'status_code') ? 'status' : serieCaseParam.target;
                    expect(_.result(response, serieCaseParam.target)).to.deep.equal(serieCaseParam.realValue);
                })))
                break;
            case 'Is not':
                this.suiteInstance.addTest(new Test(serieCaseParam.target + ' est différent de ' + serieCaseParam.value, (() => {
                    serieCaseParam.target = (serieCaseParam.target == 'status_code') ? 'status' : serieCaseParam.target;
                    expect(_.result(response, serieCaseParam.target)).to.not.equal(serieCaseParam.realValue);
                })));
                break;
            case 'Type':
                this.suiteInstance.addTest(new Test(serieCaseParam.target + ' doit être de type ' + serieCaseParam.value, (() => {
                    serieCaseParam.target = (serieCaseParam.target == 'status_code') ? 'status' : serieCaseParam.target;
                    _.result(response, serieCaseParam.target).should.be.a(serieCaseParam.realValue)
                })));
                break;
            case 'Contain':
                this.suiteInstance.addTest(new Test(serieCaseParam.target + ' doit contenir ' + serieCaseParam.value, (() => {
                    serieCaseParam.target = (serieCaseParam.target == 'status_code') ? 'status' : serieCaseParam.target;
                    expect(_.result(response, serieCaseParam.target)).to.contain.deep.members(serieCaseParam.realValue);
                })));
                break;
        }
    }
    getAssertValue = (value) => {
        let result;
        this.serie.serieExecutionOrder.forEach(testCase => {
            let [id, property] = value.split(".");
            if(id == testCase.id && testCase.hasOwnProperty(property)){
                result = testCase[property];
            }
        });
        return result;
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