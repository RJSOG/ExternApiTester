"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Motor = require('./motor');

var commandLineArgs = require('command-line-args');

var fs = require('fs');

var _require = require('console'),
    Console = _require.Console;

var defaultCfg = {
  timeout: 1000,
  report: 'cli',
  // ou tc (team city)
  baseUrl: 'http://vm-dev-central4.omnitech.security/SealWebMvc/ExternalApi',
  testFolder: 'test/',
  serieFolder: 'test/series/',
  stepFolder: 'test/step/'
};

var App = function App(options) {
  var _this = this;

  _classCallCheck(this, App);

  _defineProperty(this, "validConfig", function () {
    _this.config.testFolder = _this.config.testFolder.replace(/\\/g, '/');
    _this.config.testFolder.slice(-1) != '/' ? _this.config.testFolder += '/' : '';
    return _this.folderExist() && _this.serieFolderExist() && _this.stepFolderExist() && _this.knownReport() && _this.validAuthStr();
  });

  _defineProperty(this, "folderExist", function () {
    if (fs.existsSync(_this.config.testFolder)) {
      return true;
    } else {
      console.log("Folder don't exists ! Please select a valid folder !");
      return false;
    }
  });

  _defineProperty(this, "knownReport", function () {
    var report = _this.config.report === 'cli' || _this.config.report === 'tc' ? true : false;
    if (!report) console.log("Reporter Unknown use cli or tc");
    return report;
  });

  _defineProperty(this, "serieFolderExist", function () {
    if (fs.existsSync(_this.config.serieFolder)) {
      return true;
    } else {
      console.log("Serie Folder is required can't start !");
      return false;
    }
  });

  _defineProperty(this, "stepFolderExist", function () {
    if (fs.existsSync(_this.config.stepFolder)) {
      return true;
    } else {
      console.log("Step Folder is required can't start !");
      return false;
    }
  });

  _defineProperty(this, "validAuthStr", function () {
    if ("auth" in _this.config) {
      var format = _this.config.auth.includes(":");

      if (!format) console.log("Auth string is in bad format referer to the help section !");
      return format;
    } else {
      console.log("Auth arg is required !");
      return false;
    }
  });

  if (options === 1 || "help" in options) {
    console.log(help());
  } else {
    this.config = Object.assign({}, defaultCfg, options);

    if (this.validConfig()) {
      this.testMotor = new Motor(this.config);
    }
  }
};

function getArg() {
  try {
    var options = commandLineArgs([{
      name: 'timeout',
      alias: 't',
      type: Number
    }, {
      name: 'report',
      alias: 'r',
      type: String
    }, {
      name: 'baseUrl',
      alias: 'u',
      type: String
    }, {
      name: 'testFolder',
      alias: 'f',
      type: String
    }, {
      name: 'serieFolder',
      alias: 's',
      type: String
    }, {
      name: 'stepFolder',
      alias: 'e',
      type: String
    }, {
      name: 'auth',
      alias: 'a',
      type: String
    }, {
      name: 'help',
      alias: 'h',
      type: String
    }]);
    return options;
  } catch (err) {
    return 1;
  }
}

function help() {
  return fs.readFileSync("helpFile.txt").toString('utf-8');
}

var app = new App(getArg());