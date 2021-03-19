"use strict";function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it["return"] != null) it["return"]();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var FileParser = require('./fileParser');
var fs = require('fs');
var path = require('path');
var SingletonFileValidator = require("./singletonFileValidator");var _require =
require('process'),process = _require.process,exit = _require.exit;var _require2 =
require('console'),dir = _require2.dir;var

SerieParser =
function SerieParser(config) {var _this = this;_classCallCheck(this, SerieParser);_defineProperty(this, "getAllSerieData",











  function () {
    var allSerieData = [];var _iterator = _createForOfIteratorHelper(
    _this.allSeriesFiles),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var file = _step.value;
        var fileParser = new FileParser(file, _this.config);
        allSerieData.push(fileParser.getData());
      }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
    return allSerieData;
  });_defineProperty(this, "getAllSeries",
  function () {
    return _this.allSerieData;
  });_defineProperty(this, "getSerieDataFromName",
  function (name) {var _iterator2 = _createForOfIteratorHelper(
    _this.allSerieData),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {serie = _step2.value;
        if (serie.name == name) {
          return serie;
        }
      }} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}
  });_defineProperty(this, "getExecutionOrderFromName",
  function (name) {
    var result;
    _this.allSerieData.forEach(function (serie) {
      if (serie.name == name) {
        result = serie;
      }
    });
    return result.executionOrder;
  });_defineProperty(this, "getAllSeriesFiles",
  function (dirPath, arrayOfFiles) {
    var serieParser = _this;
    var files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function (file) {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = serieParser.getAllSeriesFiles(dirPath + "/" + file, arrayOfFiles);
      } else {
        if (path.extname(file) == '.json') {
          arrayOfFiles.push(path.join(dirPath, "/", file));
        }
      }
    });
    return arrayOfFiles;
  });this.config = config;this.allSeriesFiles = this.getAllSeriesFiles(this.config.serieFolder);this.allSerieData = this.getAllSerieData();this.validateSerieFile = new SingletonFileValidator(this.config, 'serie').getInstance('serie');this.allSerieData.forEach(function (serie) {if (!_this.validateSerieFile.validFile(serie)) {console.log("Serie " + serie.name + " is not valid ! Bad format");exit(1);}});};var

Singleton = /*#__PURE__*/function () {
  function Singleton(config) {_classCallCheck(this, Singleton);
    if (!Singleton.instance) {
      Singleton.instance = new SerieParser(config);
    }
  }_createClass(Singleton, [{ key: "getInstance", value:
    function getInstance() {
      return Singleton.instance;
    } }]);return Singleton;}();

module.exports = Singleton;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJpZVBhcnNlci5qcyJdLCJuYW1lcyI6WyJGaWxlUGFyc2VyIiwicmVxdWlyZSIsImZzIiwicGF0aCIsIlNpbmdsZXRvbkZpbGVWYWxpZGF0b3IiLCJwcm9jZXNzIiwiZXhpdCIsImRpciIsIlNlcmllUGFyc2VyIiwiY29uZmlnIiwiYWxsU2VyaWVEYXRhIiwiYWxsU2VyaWVzRmlsZXMiLCJmaWxlIiwiZmlsZVBhcnNlciIsInB1c2giLCJnZXREYXRhIiwibmFtZSIsInNlcmllIiwicmVzdWx0IiwiZm9yRWFjaCIsImV4ZWN1dGlvbk9yZGVyIiwiZGlyUGF0aCIsImFycmF5T2ZGaWxlcyIsInNlcmllUGFyc2VyIiwiZmlsZXMiLCJyZWFkZGlyU3luYyIsInN0YXRTeW5jIiwiaXNEaXJlY3RvcnkiLCJnZXRBbGxTZXJpZXNGaWxlcyIsImV4dG5hbWUiLCJqb2luIiwic2VyaWVGb2xkZXIiLCJnZXRBbGxTZXJpZURhdGEiLCJ2YWxpZGF0ZVNlcmllRmlsZSIsImdldEluc3RhbmNlIiwidmFsaWRGaWxlIiwiY29uc29sZSIsImxvZyIsIlNpbmdsZXRvbiIsImluc3RhbmNlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Imc0RUFBQSxJQUFNQSxVQUFVLEdBQUdDLE9BQU8sQ0FBQyxjQUFELENBQTFCO0FBQ0EsSUFBTUMsRUFBRSxHQUFHRCxPQUFPLENBQUMsSUFBRCxDQUFsQjtBQUNBLElBQU1FLElBQUksR0FBR0YsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7QUFDQSxJQUFNRyxzQkFBc0IsR0FBR0gsT0FBTyxDQUFDLDBCQUFELENBQXRDLEM7QUFDMEJBLE9BQU8sQ0FBQyxTQUFELEMsQ0FBekJJLE8sWUFBQUEsTyxDQUFTQyxJLFlBQUFBLEk7QUFDREwsT0FBTyxDQUFDLFNBQUQsQyxDQUFmTSxHLGFBQUFBLEc7O0FBRUZDLFc7QUFDRixxQkFBWUMsTUFBWixFQUFtQjs7Ozs7Ozs7Ozs7O0FBWUQsY0FBTTtBQUNwQixRQUFJQyxZQUFZ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QjtBQUNoQixRQUFHLENBQUM2QixTQUFTLENBQUNDLFFBQWQsRUFBdUI7QUFDbkJELE1BQUFBLFNBQVMsQ0FBQ0MsUUFBVixHQUFxQixJQUFJL0IsV0FBSixDQUFnQkMsTUFBaEIsQ0FBckI7QUFDSDtBQUNKLEc7QUFDRCwyQkFBYTtBQUNULGFBQU82QixTQUFTLENBQUNDLFFBQWpCO0FBQ0gsSzs7QUFFTEMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCSCxTQUFqQiIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEZpbGVQYXJzZXIgPSByZXF1aXJlKCcuL2ZpbGVQYXJzZXInKTtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCBTaW5nbGV0b25GaWxlVmFsaWRhdG9yID0gcmVxdWlyZShcIi4vc2luZ2xldG9uRmlsZVZhbGlkYXRvclwiKTtcbmNvbnN0IHsgcHJvY2VzcywgZXhpdCB9ID0gcmVxdWlyZSgncHJvY2VzcycpO1xuY29uc3QgeyBkaXIgfSA9IHJlcXVpcmUoJ2NvbnNvbGUnKTtcblxuY2xhc3MgU2VyaWVQYXJzZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZyl7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgICAgICB0aGlzLmFsbFNlcmllc0ZpbGVzID0gdGhpcy5nZXRBbGxTZXJpZXNGaWxlcyh0aGlzLmNvbmZpZy5zZXJpZUZvbGRlcik7XG4gICAgICAgIHRoaXMuYWxsU2VyaWVEYXRhID0gdGhpcy5nZXRBbGxTZXJpZURhdGEoKTtcbiAgICAgICAgdGhpcy52YWxpZGF0ZVNlcmllRmlsZSA9IG5ldyBTaW5nbGV0b25GaWxlVmFsaWRhdG9yKHRoaXMuY29uZmlnLCAnc2VyaWUnKS5nZXRJbnN0YW5jZSgnc2VyaWUnKTtcbiAgICAgICAgdGhpcy5hbGxTZXJpZURhdGEuZm9yRWFjaCgoc2VyaWUpID0+IHtcbiAgICAgICAgICAgIGlmKCF0aGlzLnZhbGlkYXRlU2VyaWVGaWxlLnZhbGlkRmlsZShzZXJpZSkpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2VyaWUgXCIgKyBzZXJpZS5uYW1lICsgXCIgaXMgbm90IHZhbGlkICEgQmFkIGZvcm1hdFwiKTtcbiAgICAgICAgICAgICAgICBleGl0KDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbiAgICBnZXRBbGxTZXJpZURhdGEgPSAoKSA9PiB7XG4gICAgICAgIGxldCBhbGxTZXJpZURhdGEgPSBbXVxuICAgICAgICBmb3IobGV0IGZpbGUgb2YgdGhpcy5hbGxTZXJpZXNGaWxlcyl7XG4gICAgICAgICAgICBsZXQgZmlsZVBhcnNlciA9IG5ldyBGaWxlUGFyc2VyKGZpbGUsIHRoaXMuY29uZmlnKTtcbiAgICAgICAgICAgIGFsbFNlcmllRGF0YS5wdXNoKGZpbGVQYXJzZXIuZ2V0RGF0YSgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWxsU2VyaWVEYXRhO1xuICAgIH1cbiAgICBnZXRBbGxTZXJpZXMgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmFsbFNlcmllRGF0YTtcbiAgICB9XG4gICAgZ2V0U2VyaWVEYXRhRnJvbU5hbWUgPSAobmFtZSkgPT4ge1xuICAgICAgICBmb3Ioc2VyaWUgb2YgdGhpcy5hbGxTZXJpZURhdGEpe1xuICAgICAgICAgICAgaWYoc2VyaWUubmFtZSA9PSBuYW1lKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VyaWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0RXhlY3V0aW9uT3JkZXJGcm9tTmFtZSA9IChuYW1lKSA9PiB7XG4gICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgIHRoaXMuYWxsU2VyaWVEYXRhLmZvckVhY2goc2VyaWUgPT4ge1xuICAgICAgICAgICAgaWYoc2VyaWUubmFtZSA9PSBuYW1lKXtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBzZXJpZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQuZXhlY3V0aW9uT3JkZXI7XG4gICAgfVxuICAgIGdldEFsbFNlcmllc0ZpbGVzID0gKGRpclBhdGgsIGFycmF5T2ZGaWxlcykgPT4ge1xuICAgICAgICBsZXQgc2VyaWVQYXJzZXIgPSB0aGlzO1xuICAgICAgICBsZXQgZmlsZXMgPSBmcy5yZWFkZGlyU3luYyhkaXJQYXRoKTtcbiAgICAgICAgYXJyYXlPZkZpbGVzID0gYXJyYXlPZkZpbGVzIHx8IFtdO1xuICAgICAgICBmaWxlcy5mb3JFYWNoKGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgICAgICAgIGlmIChmcy5zdGF0U3luYyhkaXJQYXRoICsgXCIvXCIgKyBmaWxlKS5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgICAgIGFycmF5T2ZGaWxlcyA9IHNlcmllUGFyc2VyLmdldEFsbFNlcmllc0ZpbGVzKGRpclBhdGggKyBcIi9cIiArIGZpbGUsIGFycmF5T2ZGaWxlcylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYocGF0aC5leHRuYW1lKGZpbGUpID09ICcuanNvbicpe1xuICAgICAgICAgICAgICAgICAgICBhcnJheU9mRmlsZXMucHVzaChwYXRoLmpvaW4oZGlyUGF0aCwgXCIvXCIsIGZpbGUpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGFycmF5T2ZGaWxlcztcbiAgICB9XG59XG5jbGFzcyBTaW5nbGV0b24ge1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBpZighU2luZ2xldG9uLmluc3RhbmNlKXtcbiAgICAgICAgICAgIFNpbmdsZXRvbi5pbnN0YW5jZSA9IG5ldyBTZXJpZVBhcnNlcihjb25maWcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldEluc3RhbmNlKCl7XG4gICAgICAgIHJldHVybiBTaW5nbGV0b24uaW5zdGFuY2U7XG4gICAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBTaW5nbGV0b247Il19