const TestMotor = require('./testMotor');
const commandLineArgs = require('command-line-args');
const fs = require('fs');

const options = commandLineArgs([
    {name: 'timeout', alias: 't', type: Number},
    {name: 'report', alias: 'r',  type: String},
    {name: 'baseUrl', alias: 'u', type: String},
    {name: 'testFolder', alias: 'f', type: String}
])

const defaultCfg = {
    timeout: 1000,
    report: 'cli', // ou tc (team city)
    baseUrl: 'http://vm-dev-central4.omnitech.security/SealWebMvc/ExternalApi',
    testFolder: 'test/'
}

class App {
    constructor(options){
        this.config = Object.assign({}, defaultCfg, options);
        if(this.validConfig()){
            this.testMotor = new TestMotor.TestMotor(this.config);
        }
    }
    validConfig = () => {
        this.config.testFolder = this.config.testFolder.replace(/\\/g, '/');
        (this.config.testFolder.slice(-1) != '/') ? this.config.testFolder += '/' : '';
        return this.folderExist && this.knownReport && this.executeFileExist;
    }
    folderExist = () => {
        if(fs.existsSync(this.config.testFolder)){
            return true;
        }else{
            console.log("Folder don't exists ! Please select a valid folder !");
            return false;
        }
    } 
    knownReport = () => {
        return (this.config.report === 'cli' || this.config.report === 'tc') ? true : false;
    }
    executeFileExist = () => {
        if(fs.existsSync(this.config.testFolder + "Execute.json")){
            return true;
        }else{
            console.log("Execute File is required can't start !");
            return false;
        }  
    }
}
let app = new App(options);