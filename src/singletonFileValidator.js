const ValidateFile = require('./validateFiles');
class SingletonFileValidator{
    constructor(config, type){
        this.config = config;
        this.createInstance(type);
    }
    getInstance = (type) => {
        return {
            'step' : SingletonFileValidator.stepInstance,
            'serie' : SingletonFileValidator.serieInstance
        }[type]
    }
    createInstance = (type) => {
        let instanceFactory = {
            'step' : (!SingletonFileValidator.stepInstance) ? SingletonFileValidator.stepInstance = new ValidateFile(this.config, 'stepFileSchema.json') : null,
            'serie' : (!SingletonFileValidator.serieInstance) ? SingletonFileValidator.serieInstance = new ValidateFile(this.config, 'serieFileSchema.json') : null
        }[type];
        return this.getInstance(type);
    }
    destroyInstance = (type) => {
        let destroy = {
            'step' : (SingletonFileValidator.stepInstance) ? SingletonFileValidator.stepInstance = null : null,
            'serie' :  (SingletonFileValidator.serieInstance) ? SingletonFileValidator.serieInstance = null : null
        }[type]
    }
}
module.exports = SingletonFileValidator;