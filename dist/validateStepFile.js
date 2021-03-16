"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fs = require('fs');

var Ajv = require("ajv/dist/jtd")["default"];

var ValidateStepFile = function ValidateStepFile(config) {
  var _this = this;

  _classCallCheck(this, ValidateStepFile);

  _defineProperty(this, "validStepFile", function (data) {
    var validate = _this.ajv.compile(_this.schema);

    try {
      var valid = validate(data);
      return valid;
    } catch (err) {
      console.log(validate.errors);
      return false;
    }
  });

  this.ajv = new Ajv();
  this.config = config;
  this.rawData = fs.readFileSync(this.config.testFolder + 'validStepFileSchema.json', {
    encoding: 'utf-8'
  });
  this.schema = JSON.parse(this.rawData)[0];
};

var Singleton = function Singleton(config) {
  _classCallCheck(this, Singleton);

  _defineProperty(this, "getInstance", function () {
    return Singleton.instance;
  });

  if (!Singleton.instance) {
    Singleton.instance = new ValidateStepFile(config);
  }
};

module.exports = Singleton;