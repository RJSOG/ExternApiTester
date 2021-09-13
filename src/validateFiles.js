const fs =  require('fs');
const Ajv = require("ajv").default
const path = require("path")

class ValidateFile{
    constructor(config, filename){
        this.ajv = new Ajv({strict: false, allowUnionTypes: true, allErrors: true});
        this.config = config;
        this.rawData = fs.readFileSync(this.getPathFile(filename), {encoding: 'utf-8'})
        this.schema = JSON.parse(this.rawData)
    }
    getPathFile = (filename) =>  {
        return path.resolve(this.config.testFolder + "/validator/", filename);
    }
    validFile = (data) => {
        const validate = this.ajv.compile(this.schema);
        try{
            return validate(data);
        }catch(err){
            console.log(validate.errors);
            return false;
        }
    }
}
module.exports = ValidateFile;
