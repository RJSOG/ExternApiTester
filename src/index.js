require("@babel/polyfill");

const Motor = require('./motor');
const commandLineArgs = require('command-line-args');
const fs = require('fs');
const { Console } = require('console');


const defaultCfg = {
    timeout: 1000,
    report: 'cli', // ou tc (team city)
    baseUrl: 'http://vm-dev-central4.omnitech.security/SealWebMvc/ExternalApi',
    testFolder: 'test/',
    serieFolder: 'test/series/',
    stepFolder: 'test/step/'
}

class App {
    constructor(options){
        if(options === 1 || "help" in options){
            console.log(help())
        }else{
            this.config = Object.assign({}, defaultCfg, options);
            if(this.validConfig()){
                this.testMotor = new Motor(this.config);
            }
        }
    }
    validConfig = () => {
        this.config.testFolder = this.config.testFolder.replace(/\\/g, '/');
        (this.config.testFolder.slice(-1) != '/') ? this.config.testFolder += '/' : '';
        return this.folderExist() && this.serieFolderExist() && this.stepFolderExist() && this.knownReport() && this.validAuthStr();
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
        let report = (this.config.report === 'cli' || this.config.report === 'tc') ? true : false;
        if(!report) console.log("Reporter Unknown use cli or tc")
        return report
    }
    serieFolderExist = () => {
        if(fs.existsSync(this.config.serieFolder)){
            return true;
        }else{
            console.log("Serie Folder is required can't start !");
            return false;
        }  
    }
    stepFolderExist = () => {
        if(fs.existsSync(this.config.stepFolder)){
            return true;
        }else{
            console.log("Step Folder is required can't start !");
            return false;
        }  
    }
    validAuthStr = () => {  
        if("auth" in this.config){
            let format = this.config.auth.includes(":");
            if(!format) console.log("Auth string is in bad format referer to the help section !");
            return format;

        }else{
            console.log("Auth arg is required !");
            return false;
        }
    }
}
function getArg(){
    try{
        const options = commandLineArgs([
            {name: 'timeout', alias: 't', type: Number},
            {name: 'report', alias: 'r',  type: String},
            {name: 'baseUrl', alias: 'u', type: String},
            {name: 'testFolder', alias: 'f', type: String},
            {name: 'serieFolder', alias: 's', type: String},
            {name: 'stepFolder', alias: 'e', type: String},
            {name: 'auth', alias: 'a', type: String},
            {name: 'help', alias: 'h', type: String},
        ]);
        return options
    }
    catch(err){
        return 1;
    }
}
function help(){
    return fs.readFileSync("helpFile.txt").toString('utf-8');
}
let app = new App(getArg());
