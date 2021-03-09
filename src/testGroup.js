const axios = require('axios');
const chai = require("chai");
const Execute = require('./executeClass')
const TestFactory = require('./testClass');
const _ = require('lodash');
const EventEmmitter = require('events');
const Mocha = require("mocha/mocha").Mocha;
const expect = chai.expect;
const should = chai.should();
const Test = Mocha.Test;

class TestGroup{
    constructor(serie, config){
        this.config = config;
        this.description = serie.description;
        this.myEmitter = new EventEmmitter();
        this.myEmitter.on("Finished", this.eventListener);
        this.config.myEmitter = this.myEmitter;
        this.serie = serie;
        this.executionOrderId = 0;
        this.executeClassInstance = new Execute(this.config).getInstance();
        this.executionOrder = this.executeClassInstance.getExecutionOrderFromName(this.serie.name);
        this.allRunningTest = [];
        this.authenticate().then(auth => {
            this.auth = auth;
            this.serie.testGroup.forEach(async (test) => {
                this.createTest(test);
                await new Promise(resolve => setTimeout(resolve, 5000)); //Pause to have test printed in the right way 
            })
        });
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
        this.allRunningTest.push(new TestFactory(test, this.auth, this.config, this.executionOrderId));
        this.executionOrderId += 1;
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
        this.mochaInstance = new Mocha();
        this.suiteInstance = Mocha.Suite.create(this.mochaInstance.suite, this.description);
        this.suiteInstance.timeout(this.config.timeout);
    }
    executeSerieAssertions = (serieCaseParam, response) => {
        switch (serieCaseParam.comparison){
            case 'Equals':
                this.suiteInstance.addTest(new Test('Expect ' + serieCaseParam.target + ' to equal ' + serieCaseParam.value, (() => {
                    serieCaseParam.target = (serieCaseParam.target == 'status_code') ? 'status' : serieCaseParam.target;
                    expect(_.result(response, serieCaseParam.target)).to.deep.equal(serieCaseParam.realValue);
                })))
                break;
            case 'Is not':
                this.suiteInstance.addTest(new Test('Expect ' + serieCaseParam.target + ' is not ' + serieCaseParam.value, (() => {
                    serieCaseParam.target = (serieCaseParam.target == 'status_code') ? 'status' : serieCaseParam.target;
                    expect(_.result(response, serieCaseParam.target)).to.not.equal(serieCaseParam.realValue);
                })));
                break;
            case 'Type':
                this.suiteInstance.addTest(new Test('Expect ' + serieCaseParam.target + ' to be an ' + serieCaseParam.value, (() => {
                    serieCaseParam.target = (serieCaseParam.target == 'status_code') ? 'status' : serieCaseParam.target;
                    _.result(response, serieCaseParam.target).should.be.a(serieCaseParam.realValue)
                })));
                break;
            case 'Is in':
                this.suiteInstance.addTest(new Test('Expect ' + serieCaseParam.target + ' to contains ' + serieCaseParam.value, (() => {
                    serieCaseParam.target = (serieCaseParam.target == 'status_code') ? 'status' : serieCaseParam.target;
                    expect(_.result(response, serieCaseParam.target)).to.deep.include(serieCaseParam.realValue);
                })));
                break;
        }
    }
    getAssertValue = (value) => {
        let result;
        this.serie.testGroup.forEach(testCase => {
            let [id, property] = value.split(".");
            if(id == testCase.id && testCase.hasOwnProperty(property)){
                result = testCase[property];
            }
        });
        return result;
    }
    eventListener = (response, id) => {
        if(this.haveAssert(id)){
            this.setMochaProperties();
            this.executionOrder[id].assert.forEach((caseAssert) => {
                let serieCaseParam = this.getSerieCaseParam(caseAssert);
                this.executeSerieAssertions(serieCaseParam, response);
                if(this.config.report === 'cli'){
                    this.mochaInstance.run();
                }
            });
        }
    }
    haveAssert = (id) => {
        return this.executionOrder[id].hasOwnProperty("assert");
    }
}
module.exports = TestGroup;