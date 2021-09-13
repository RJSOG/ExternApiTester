global.chai = require('chai');
chai.should();
const ValidateSerieFile = require('../../src/validateSerieFile');

describe('ValidateSerieFile', function() {
    var vsf;
    afterEach(() => {
        vsf?.destroy();
    })

     it ('getPathFile return valid path', function() {
        vsf = new ValidateSerieFile({
             testFolder: 'test/',
         }, 'validSerieFileSchema.json');
         vsf.getInstance().getPathFile('validSerieFileSchema.json').should.be.equal('C:\\Users\\edonatien\\Desktop\\SealExternalApiTester\\test\\validSerieFileSchema.json')
     })

    it ('validSerieFile return true', function() {
        vsf = new ValidateSerieFile({
            testFolder: 'test/unit/json',
        }, 'validate.json');
        vsf.getInstance().validSerieFile({
            foo: 1,
            bar: "abc"
        }).should.be.equal(true);
    })

    it ('validSerieFile return true with validSerieFile.json', function() {
        vsf = new ValidateSerieFile({
            testFolder: 'test',
        }, 'validSerieFileSchema.json');
        vsf.getInstance().validSerieFile({
            "name" : "PermissionSerie",
            "description" : "Cycle de vie d'une permission",
            "executionOrder" : [
                {
                    "file" : "PermissionsStep.json",
                    "id" : "P2"
                },
                {
                    "file" : "PermissionsStep.json",
                    "id" : "P1",
                    "assert" : [
                        {
                            "comparison" : "Contain",
                            "target" : "data.item",
                            "value" : "P2.param_body"
                        }
                    ]
                },
                {
                    "file" : "PermissionsStep.json",
                    "id" : "P3"
                },
                {
                    "file" : "PermissionsStep.json",
                    "id" : "P1",
                    "assert" : [
                        {
                            "comparison" : "Is not",
                            "target" : "data.item",
                            "value" : "P3.param_body"
                        }
                    ]
                }
            ]
        }).should.be.equal(true);
    })
})