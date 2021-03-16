"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fs = require("fs");

var FileParser = function FileParser(_filename, _type, config) {
  var _this = this;

  _classCallCheck(this, FileParser);

  _defineProperty(this, "getData", function () {
    return _this.data[0];
  });

  _defineProperty(this, "getFilePath", function (filename, type) {
    return {
      "step": _this.config.stepFolder + filename,
      "serie": _this.config.serieFolder + filename
    }[type];
  });

  this.config = config;
  this.type = _type;
  this.filepath = this.getFilePath(_filename, _type);
  var rawdata = fs.readFileSync(this.filepath, {
    encoding: 'utf-8'
  });
  this.data = JSON.parse(rawdata);
};

module.exports = FileParser;