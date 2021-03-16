const fs =  require('fs');
const Ajv = require("ajv/dist/jtd").default

class ValidateSerieFile{
    constructor(config){
        this.ajv = new Ajv();
        this.config = config;
        this.rawData = fs.readFileSync(this.config.testFolder + 'validSerieFileSchema.json', {encoding: 'utf-8'})
        this.schema = JSON.parse(this.rawData)[0];
        console.log(this.schema)
    }
    validSerieFile = (data) => {
        const validate = this.ajv.compile(this.schema);
        try{
            const valid = validate(data);
            return valid;
        }catch(err){
            console.log(validate.errors);
            return false;
        }
    }
}
class Singleton{
    constructor(config){
        if(!Singleton.instance){
            Singleton.instance = new ValidateSerieFile(config);
        }
    }
    getInstance = () => {
        return Singleton.instance;
    }
}
module.exports = Singleton;