"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FileParser = require('./fileParser');

var SerieParser = require('./serieParser');

var Serie = require('./serieClass');

var path = require('path');

var ValidateStepFile = require('./validateStepFile');

var fs = require('fs');

var _require = require('process'),
    process = _require.process,
    exit = _require.exit;

var Motor = function Motor(config) {
  var _this = this;

  _classCallCheck(this, Motor);

  _defineProperty(this, "listStepFiles", function () {
    var files = [];
    fs.readdirSync(_this.config.stepFolder).forEach(function (file) {
      if (path.extname(file) == '.json') {
        files.push(file);
      }
    });
    return files;
  });

  _defineProperty(this, "getAllStepData", function () {
    var allTestData = [];

    _this.allStepFiles.forEach(function (file) {
      var fileParser = new FileParser(file, "step", _this.config);
      var fileData = fileParser.getData();

      if (!_this.validateStepFile.validStepFile(fileData)) {
        console.log("Step File " + fileData.groupname + " is not valid ! Bad format");
        process.exit(1);
      }

      allTestData.push(fileData);
    });

    return allTestData;
  });

  _defineProperty(this, "getTestFromFileAndId", function (filename, id) {
    var _iterator = _createForOfIteratorHelper(_this.allStepFiles),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var file = _step.value;

        if (file == filename) {
          var index = _this.allStepFiles.indexOf(file);

          var fileTest = _this.allTestData[index];

          var _iterator2 = _createForOfIteratorHelper(fileTest.all_test),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var caseTest = _step2.value;

              if (caseTest.id == id) {
                return caseTest;
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });

  _defineProperty(this, "createAllSerieSuite", function () {
    var allSerieObject = [];

    _this.serieParser.getAllSeries().forEach(function (testSerie) {
      // console.log(testSerie);
      var serie = {
        "name": testSerie.name,
        "description": testSerie.description,
        "serieExecutionOrder": []
      };
      testSerie.executionOrder.forEach(function (obj) {
        serie.serieExecutionOrder.push(_this.getTestFromFileAndId(obj.file, obj.id));
      });
      allSerieObject.push(serie);
    });

    return allSerieObject;
  });

  _defineProperty(this, "createTestGroup", function () {
    _this.AllSerieSuite.forEach(function (serie) {
      new Serie(serie, _this.config);
    });
  });

  this.config = config;
  this.serieParser = new SerieParser(this.config).getInstance();
  this.validateStepFile = new ValidateStepFile(this.config).getInstance();
  this.allStepFiles = this.listStepFiles();
  this.allTestData = this.getAllStepData();
  this.AllSerieSuite = this.createAllSerieSuite();
  this.createTestGroup();
};

module.exports = Motor;