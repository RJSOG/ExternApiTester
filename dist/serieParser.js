"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FileParser = require('./fileParser');

var fs = require('fs');

var ValidateSerieFile = require("./validateSerieFile");

var _require = require('process'),
    process = _require.process,
    exit = _require.exit;

var SerieParser = function SerieParser(config) {
  var _this = this;

  _classCallCheck(this, SerieParser);

  _defineProperty(this, "getAllSerieData", function () {
    var allSerieData = [];

    var _iterator = _createForOfIteratorHelper(_this.allSeriesFiles),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var file = _step.value;
        var fileParser = new FileParser(file, "serie", _this.config);
        allSerieData.push(fileParser.getData());
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return allSerieData;
  });

  _defineProperty(this, "getAllSeries", function () {
    return _this.allSerieData;
  });

  _defineProperty(this, "getSerieDataFromName", function (name) {
    var _iterator2 = _createForOfIteratorHelper(_this.allSerieData),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        serie = _step2.value;

        if (serie.name == name) {
          return serie;
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  });

  _defineProperty(this, "getExecutionOrderFromName", function (name) {
    var result;

    _this.allSerieData.forEach(function (serie) {
      if (serie.name == name) {
        result = serie;
      }
    });

    return result.executionOrder;
  });

  _defineProperty(this, "getAllSeriesFiles", function () {
    var files = fs.readdirSync(_this.config.serieFolder);
    return Object.values(files);
  });

  this.config = config;
  this.allSeriesFiles = this.getAllSeriesFiles();
  this.allSerieData = this.getAllSerieData();
  this.validateSerieFile = new ValidateSerieFile(this.config).getInstance();
  this.allSerieData.forEach(function (serie) {
    if (!_this.validateSerieFile.validSerieFile(serie)) {
      console.log("Serie " + serie.name + " is not valid ! Bad format");
      process.exit(1);
    }
  });
};

var Singleton = /*#__PURE__*/function () {
  function Singleton(config) {
    _classCallCheck(this, Singleton);

    if (!Singleton.instance) {
      Singleton.instance = new SerieParser(config);
    }
  }

  _createClass(Singleton, [{
    key: "getInstance",
    value: function getInstance() {
      return Singleton.instance;
    }
  }]);

  return Singleton;
}();

module.exports = Singleton;