class Cache{
    constructor(){
        this.cacheArr = {}
    } 
    put = (key, value) => {
        if(this.cacheArr[key] === undefined){
            this.cacheArr[key] = value;
        }
    } 
    get = (key) => {
        if(this.cacheArr[key] != undefined){
            return this.cacheArr[key];
        }
    }
    applyValue = (value) => {
        let response = value;
        if(!!response){
                if(typeof(response) === 'object'){
                    for(let [key, inner_value] of Object.entries(response)){
                        response[key] = this.applyValue(inner_value);
                    }
                }else if(typeof(response) === 'array'){
                    response.forEach((element, index) => {
                        response[index] = this.applyValue(element);
                    })
                }else{
                    if(this.isCacheVariable(value)){
                        return this.get(value);
                    }
                }
        }
        return response;
    }
    isCacheVariable = (value) => {
        let regex = /\$\{([A-Za-z0-9_]*)\}/i;
        return regex.test(value);
    }
}
module.exports = Cache;