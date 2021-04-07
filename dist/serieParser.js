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
        var serieData = fileParser.getData();
        if (serieData.serieIsEnabled) {
          allSerieData.push(serieData);
        }
      }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
    return allSerieData;
  });_defineProperty(this, "getAllSeries",
  function () {
    return _this.allSerieData;
  });_defineProperty(this, "getSerieDataFromName",
  function (name) {var _iterator2 = _createForOfIteratorHelper(
    _this.allSerieData),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var serie = _step2.value;
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
  });_defineProperty(this, "getSerieCache",
  function (name) {
    var serieCache = [];
    var serieData = _this.getSerieDataFromName(name);var _iterator3 = _createForOfIteratorHelper(
    serieData.executionOrder),_step3;try {for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {var stepCase = _step3.value;
        if (stepCase["cache"] != undefined) {
          serieCache.push(stepCase.cache);
        }
      }} catch (err) {_iterator3.e(err);} finally {_iterator3.f();}
    return serieCache;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJpZVBhcnNlci5qcyJdLCJuYW1lcyI6WyJGaWxlUGFyc2VyIiwicmVxdWlyZSIsImZzIiwicGF0aCIsIlNpbmdsZXRvbkZpbGVWYWxpZGF0b3IiLCJwcm9jZXNzIiwiZXhpdCIsImRpciIsIlNlcmllUGFyc2VyIiwiY29uZmlnIiwiYWxsU2VyaWVEYXRhIiwiYWxsU2VyaWVzRmlsZXMiLCJmaWxlIiwiZmlsZVBhcnNlciIsInNlcmllRGF0YSIsImdldERhdGEiLCJzZXJpZUlzRW5hYmxlZCIsInB1c2giLCJuYW1lIiwic2VyaWUiLCJyZXN1bHQiLCJmb3JFYWNoIiwiZXhlY3V0aW9uT3JkZXIiLCJkaXJQYXRoIiwiYXJyYXlPZkZpbGVzIiwic2VyaWVQYXJzZXIiLCJmaWxlcyIsInJlYWRkaXJTeW5jIiwic3RhdFN5bmMiLCJpc0RpcmVjdG9yeSIsImdldEFsbFNlcmllc0ZpbGVzIiwiZXh0bmFtZSIsImpvaW4iLCJzZXJpZUNhY2hlIiwiZ2V0U2VyaWVEYXRhRnJvbU5hbWUiLCJzdGVwQ2FzZSIsInVuZGVmaW5lZCIsImNhY2hlIiwic2VyaWVGb2xkZXIiLCJnZXRBbGxTZXJpZURhdGEiLCJ2YWxpZGF0ZVNlcmllRmlsZSIsImdldEluc3RhbmNlIiwidmFsaWRGaWxlIiwiY29uc29sZSIsImxvZyIsIlNpbmdsZXRvbiIsImluc3RhbmNlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Imc0RUFBQSxJQUFNQSxVQUFVLEdBQUdDLE9BQU8sQ0FBQyxjQUFELENBQTFCO0FBQ0EsSUFBTUMsRUFBRSxHQUFHRCxPQUFPLENBQUMsSUFBRCxDQUFsQjtBQUNBLElBQU1FLElBQUksR0FBR0YsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7QUFDQSxJQUFNRyxzQkFBc0IsR0FBR0gsT0FBTyxDQUFDLDBCQUFELENBQXRDLEM7QUFDMEJBLE9BQU8sQ0FBQyxTQUFELEMsQ0FBekJJLE8sWUFBQUEsTyxDQUFTQyxJLFlBQUFBLEk7QUFDREwsT0FBTyxD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QWQsQ0FDQSxLQUFLRSxjQUFMLEdBQXNCLEtBQUttQixpQkFBTCxDQUF1QixLQUFLckIsTUFBTCxDQUFZNkIsV0FBbkMsQ0FBdEIsQ0FDQSxLQUFLNUIsWUFBTCxHQUFvQixLQUFLNkIsZUFBTCxFQUFwQixDQUNBLEtBQUtDLGlCQUFMLEdBQXlCLElBQUlwQyxzQkFBSixDQUEyQixLQUFLSyxNQUFoQyxFQUF3QyxPQUF4QyxFQUFpRGdDLFdBQWpELENBQTZELE9BQTdELENBQXpCLENBQ0EsS0FBSy9CLFlBQUwsQ0FBa0JXLE9BQWxCLENBQTBCLFVBQUNGLEtBQUQsRUFBVyxDQUNqQyxJQUFHLENBQUMsS0FBSSxDQUFDcUIsaUJBQUwsQ0FBdUJFLFNBQXZCLENBQWlDdkIsS0FBakMsQ0FBSixFQUE0QyxDQUN4Q3dCLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFdBQVd6QixLQUFLLENBQUNELElBQWpCLEdBQXdCLDRCQUFwQyxFQUNBWixJQUFJLENBQUMsQ0FBRCxDQUFKLENBQ0gsQ0FDSixDQUxELEVBTUgsQzs7QUF5REN1QyxTO0FBQ0YscUJBQVlwQyxNQUFaLEVBQW9CO0FBQ2hCLFFBQUcsQ0FBQ29DLFNBQVMsQ0FBQ0MsUUFBZCxFQUF1QjtBQUNuQkQsTUFBQUEsU0FBUyxDQUFDQyxRQUFWLEdBQXFCLElBQUl0QyxXQUFKLENBQWdCQyxNQUFoQixDQUFyQjtBQUNIO0FBQ0osRztBQUNELDJCQUFhO0FBQ1QsYUFBT29DLFNBQVMsQ0FBQ0MsUUFBakI7QUFDSCxLOztBQUVMQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJILFNBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRmlsZVBhcnNlciA9IHJlcXVpcmUoJy4vZmlsZVBhcnNlcicpO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IFNpbmdsZXRvbkZpbGVWYWxpZGF0b3IgPSByZXF1aXJlKFwiLi9zaW5nbGV0b25GaWxlVmFsaWRhdG9yXCIpO1xuY29uc3QgeyBwcm9jZXNzLCBleGl0IH0gPSByZXF1aXJlKCdwcm9jZXNzJyk7XG5jb25zdCB7IGRpciB9ID0gcmVxdWlyZSgnY29uc29sZScpO1xuXG5jbGFzcyBTZXJpZVBhcnNlciB7XG4gICAgY29uc3RydWN0b3IoY29uZmlnKXtcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgICAgIHRoaXMuYWxsU2VyaWVzRmlsZXMgPSB0aGlzLmdldEFsbFNlcmllc0ZpbGVzKHRoaXMuY29uZmlnLnNlcmllRm9sZGVyKTtcbiAgICAgICAgdGhpcy5hbGxTZXJpZURhdGEgPSB0aGlzLmdldEFsbFNlcmllRGF0YSgpO1xuICAgICAgICB0aGlzLnZhbGlkYXRlU2VyaWVGaWxlID0gbmV3IFNpbmdsZXRvbkZpbGVWYWxpZGF0b3IodGhpcy5jb25maWcsICdzZXJpZScpLmdldEluc3RhbmNlKCdzZXJpZScpO1xuICAgICAgICB0aGlzLmFsbFNlcmllRGF0YS5mb3JFYWNoKChzZXJpZSkgPT4ge1xuICAgICAgICAgICAgaWYoIXRoaXMudmFsaWRhdGVTZXJpZUZpbGUudmFsaWRGaWxlKHNlcmllKSl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTZXJpZSBcIiArIHNlcmllLm5hbWUgKyBcIiBpcyBub3QgdmFsaWQgISBCYWQgZm9ybWF0XCIpO1xuICAgICAgICAgICAgICAgIGV4aXQoMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuICAgIGdldEFsbFNlcmllRGF0YSA9ICgpID0+IHtcbiAgICAgICAgbGV0IGFsbFNlcmllRGF0YSA9IFtdXG4gICAgICAgIGZvcihsZXQgZmlsZSBvZiB0aGlzLmFsbFNlcmllc0ZpbGVzKXtcbiAgICAgICAgICAgIGxldCBmaWxlUGFyc2VyID0gbmV3IEZpbGVQYXJzZXIoZmlsZSwgdGhpcy5jb25maWcpO1xuICAgICAgICAgICAgbGV0IHNlcmllRGF0YSA9IGZpbGVQYXJzZXIuZ2V0RGF0YSgpO1xuICAgICAgICAgICAgaWYoc2VyaWVEYXRhLnNlcmllSXNFbmFibGVkKXtcbiAgICAgICAgICAgICAgICBhbGxTZXJpZURhdGEucHVzaChzZXJpZURhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhbGxTZXJpZURhdGE7XG4gICAgfVxuICAgIGdldEFsbFNlcmllcyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWxsU2VyaWVEYXRhO1xuICAgIH1cbiAgICBnZXRTZXJpZURhdGFGcm9tTmFtZSA9IChuYW1lKSA9PiB7XG4gICAgICAgIGZvcihsZXQgc2VyaWUgb2YgdGhpcy5hbGxTZXJpZURhdGEpe1xuICAgICAgICAgICAgaWYoc2VyaWUubmFtZSA9PSBuYW1lKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VyaWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0RXhlY3V0aW9uT3JkZXJGcm9tTmFtZSA9IChuYW1lKSA9PiB7XG4gICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgIHRoaXMuYWxsU2VyaWVEYXRhLmZvckVhY2goc2VyaWUgPT4ge1xuICAgICAgICAgICAgaWYoc2VyaWUubmFtZSA9PSBuYW1lKXtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBzZXJpZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQuZXhlY3V0aW9uT3JkZXI7XG4gICAgfVxuICAgIGdldEFsbFNlcmllc0ZpbGVzID0gKGRpclBhdGgsIGFycmF5T2ZGaWxlcykgPT4ge1xuICAgICAgICBsZXQgc2VyaWVQYXJzZXIgPSB0aGlzO1xuICAgICAgICBsZXQgZmlsZXMgPSBmcy5yZWFkZGlyU3luYyhkaXJQYXRoKTtcbiAgICAgICAgYXJyYXlPZkZpbGVzID0gYXJyYXlPZkZpbGVzIHx8IFtdO1xuICAgICAgICBmaWxlcy5mb3JFYWNoKGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgICAgICAgIGlmIChmcy5zdGF0U3luYyhkaXJQYXRoICsgXCIvXCIgKyBmaWxlKS5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgICAgIGFycmF5T2ZGaWxlcyA9IHNlcmllUGFyc2VyLmdldEFsbFNlcmllc0ZpbGVzKGRpclBhdGggKyBcIi9cIiArIGZpbGUsIGFycmF5T2ZGaWxlcylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYocGF0aC5leHRuYW1lKGZpbGUpID09ICcuanNvbicpe1xuICAgICAgICAgICAgICAgICAgICBhcnJheU9mRmlsZXMucHVzaChwYXRoLmpvaW4oZGlyUGF0aCwgXCIvXCIsIGZpbGUpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGFycmF5T2ZGaWxlcztcbiAgICB9XG4gICAgZ2V0U2VyaWVDYWNoZSA9IChuYW1lKSA9PiB7XG4gICAgICAgIGxldCBzZXJpZUNhY2hlID0gW107XG4gICAgICAgIGxldCBzZXJpZURhdGEgPSB0aGlzLmdldFNlcmllRGF0YUZyb21OYW1lKG5hbWUpO1xuICAgICAgICBmb3IobGV0IHN0ZXBDYXNlIG9mIHNlcmllRGF0YS5leGVjdXRpb25PcmRlcil7XG4gICAgICAgICAgICBpZihzdGVwQ2FzZVtcImNhY2hlXCJdICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgc2VyaWVDYWNoZS5wdXNoKHN0ZXBDYXNlLmNhY2hlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VyaWVDYWNoZTtcbiAgICB9XG59XG5jbGFzcyBTaW5nbGV0b24ge1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBpZighU2luZ2xldG9uLmluc3RhbmNlKXtcbiAgICAgICAgICAgIFNpbmdsZXRvbi5pbnN0YW5jZSA9IG5ldyBTZXJpZVBhcnNlcihjb25maWcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldEluc3RhbmNlKCl7XG4gICAgICAgIHJldHVybiBTaW5nbGV0b24uaW5zdGFuY2U7XG4gICAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBTaW5nbGV0b247Il19