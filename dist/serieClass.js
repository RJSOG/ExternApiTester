"use strict";function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _typeof(obj) {"@babel/helpers - typeof";if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {_typeof = function _typeof(obj) {return typeof obj;};} else {_typeof = function _typeof(obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};}return _typeof(obj);}function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e2) {throw _e2;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e3) {didErr = true;err = _e3;}, f: function f() {try {if (!normalCompletion && it["return"] != null) it["return"]();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var axios = require('axios');
var chai = require("chai");
var SerieParser = require('./serieParser');
var StepFactory = require('./stepClass');
var Cache = require('./cacheClass');
var _ = require('lodash');
var Mocha = require("mocha/mocha").Mocha;
var expect = chai.expect;
var should = chai.should();
var Test = Mocha.Test;var _require =
require('mocha/mocha'),type = _require.type;var _require2 =
require('lodash'),times = _require2.times;var

Serie = /*#__PURE__*/function () {
  function Serie(serie, config) {var _this = this;_classCallCheck(this, Serie);_defineProperty(this, "prepareCache",





























    function () {
      _this.cache = new Cache();
      _this.config.cacheInstance = _this.cache;
      _this.cacheData = _this.serieParser.getSerieCache(_this.serie.name);
    });_defineProperty(this, "fillCache",
    function (response) {
      _this.cacheData.forEach(function (cacheObject) {var _iterator = _createForOfIteratorHelper(
        cacheObject),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var element = _step.value;
            if (typeof element.value === 'string') {
              if (element.value.includes("response")) {
                var target = _this.getTarget(element.value);
                var value = _.result(response, target);
                _this.cache.put(element.name, value);
              }
            } else {
              _this.cache.put(element.name, element.value);
            }
          }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
      });
    });_defineProperty(this, "getSerieCaseParam",
























    function (serieCase) {
      return {
        target: serieCase.target.split(".")[1] === "response" ? _this.getTarget(serieCase.target) : serieCase.target,
        comparison: serieCase.comparison,
        realValue: _this.getAssertValue(serieCase.value),
        value: serieCase.value };

    });_defineProperty(this, "getTarget",
    function (target) {
      var pattern = "response";
      return target.slice(target.indexOf(pattern) + pattern.length + 1, target.length);
    });_defineProperty(this, "setMochaProperties",
    function () {
      _this.suiteInstance = Mocha.Suite.create(_this.config.mochaInstance.suite, _this.description);
      _this.suiteInstance.timeout(_this.config.timeout);
      _this.config.suiteInstance = _this.suiteInstance;
    });_defineProperty(this, "executeSerieAssertions",
    function (serieCaseParam, response) {
      var description = _typeof(serieCaseParam.realValue) === 'object' ? JSON.stringify(serieCaseParam.realValue) : serieCaseParam.realValue;
      serieCaseParam.realValue = _this.isNumeric(serieCaseParam.realValue) ? Number(serieCaseParam.realValue) : serieCaseParam.realValue;
      switch (serieCaseParam.comparison) {
        case 'Equals':
          _this.suiteInstance.addTest(new Test(serieCaseParam.target + ' doit être égal à ' + description, function () {
            serieCaseParam.target = serieCaseParam.target == 'status_code' ? 'status' : serieCaseParam.target;
            expect(_.result(response, serieCaseParam.target)).to.deep.equal(serieCaseParam.realValue);
          }));
          break;
        case 'Is not':
          _this.suiteInstance.addTest(new Test(serieCaseParam.target + ' est différent de ' + description, function () {
            serieCaseParam.target = serieCaseParam.target == 'status_code' ? 'status' : serieCaseParam.target;
            expect(_.result(response, serieCaseParam.target)).to.not.equal(serieCaseParam.realValue);
          }));
          break;
        case 'Type':
          _this.suiteInstance.addTest(new Test(serieCaseParam.target + ' doit être de type ' + description, function () {
            serieCaseParam.target = serieCaseParam.target == 'status_code' ? 'status' : serieCaseParam.target;
            _.result(response, serieCaseParam.target).should.be.a(serieCaseParam.realValue);
          }));
          break;
        case 'Contain':
          _this.suiteInstance.addTest(new Test(serieCaseParam.target + ' doit contenir ' + description, function () {
            serieCaseParam.target = serieCaseParam.target == 'status_code' ? 'status' : serieCaseParam.target;
            expect(_.result(response, serieCaseParam.target)).to.contain.deep.members(serieCaseParam.realValue);
          }));
          break;
        case 'Count':
          _this.suiteInstance.addTest(new Test(serieCaseParam.target + ' doit contenir ' + description + ' elements', function () {
            expect(_.result(response, serieCaseParam.target).length).to.deep.equal(serieCaseParam.realValue);
          }));
          break;}

    });_defineProperty(this, "isNumeric",
    function (str) {
      return /^\d+$/.test(str);
    });_defineProperty(this, "getAssertValue",
    function (value) {
      if (typeof value === 'string') {
        var pattern = "response";var _value$split =
        value.split("."),_value$split2 = _slicedToArray(_value$split, 2),id = _value$split2[0],property = _value$split2[1];
        if (property === pattern) {
          var response = _this.getStepResponse(id);
          var responseProperty = value.slice(value.indexOf(pattern) + pattern.length + 1, value.length);
          value = _.result(response, responseProperty);
        } else {
          _this.serie.serieExecutionOrder.forEach(function (testCase) {
            if (id == testCase.id) {
              if (testCase.hasOwnProperty(property)) {
                value = testCase[property];
              }
            }
          });
        }
      }
      return value;
    });_defineProperty(this, "assertionsOnSerie",
    function (response, id) {
      if (_this.haveAssert(id)) {
        _this.executionOrder[id].assert.forEach(function (caseAssert) {
          var serieCaseParam = _this.getSerieCaseParam(caseAssert);
          _this.executeSerieAssertions(serieCaseParam, response);
        });
      }
    });_defineProperty(this, "haveAssert",
    function (id) {
      return _this.executionOrder[id].hasOwnProperty("assert");
    });_defineProperty(this, "getStepResponse",
    function (id) {
      var stepResponse;
      _this.allStepResponse.forEach(function (stepObj) {
        if (stepObj.id == id) {
          stepResponse = stepObj.response;
        }
      });
      return stepResponse;
    });this.config = config;this.config.parent = this;this.config.isDispose = false;this.description = serie.description;this.serieStop = false;this.serie = serie;this.executionOrderId = 0;this.serieParser = new SerieParser(this.config).getInstance();this.executionOrder = this.serieParser.getExecutionOrderFromName(this.serie.name);this.allStepResponse = [];if (serie.cache) {this.prepareCache();}}_createClass(Serie, [{ key: "startAssert", value: function () {var _startAssert = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {var _iterator2, _step2, step, stepInstance;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return this.authenticate();case 2:this.auth = _context.sent;this.setMochaProperties();_iterator2 = _createForOfIteratorHelper(this.serie.serieExecutionOrder);_context.prev = 5;_iterator2.s();case 7:if ((_step2 = _iterator2.n()).done) {_context.next = 17;break;}step = _step2.value;_context.next = 11;return this.createStep(step);case 11:stepInstance = _context.sent;this.allStepResponse.push({ id: step.id, response: stepInstance.response });if (this.serie.cache) {this.fillCache(stepInstance.response);}this.assertionsOnSerie(stepInstance.response, stepInstance.id);case 15:_context.next = 7;break;case 17:_context.next = 22;break;case 19:_context.prev = 19;_context.t0 = _context["catch"](5);_iterator2.e(_context.t0);case 22:_context.prev = 22;_iterator2.f();return _context.finish(22);case 25:case "end":return _context.stop();}}}, _callee, this, [[5, 19, 22, 25]]);}));function startAssert() {return _startAssert.apply(this, arguments);}return startAssert;}() }, { key: "authenticate", value: //Authenticate and get auth cookie
    function () {var _authenticate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {var buff, headers, resp;return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:if (!this.serie.automatedAuth) {_context2.next = 14;break;}buff = Buffer.from(this.config.auth.toString(), 'utf-8');headers = { headers: { "Authorization": "Basic " + buff.toString('base64') } };_context2.prev = 3;_context2.next = 6;return axios.put(this.config.baseUrl + '/Authenticate', "", headers);case 6:resp = _context2.sent;return _context2.abrupt("return", resp.headers['set-cookie']);case 10:_context2.prev = 10;_context2.t0 = _context2["catch"](3);console.log("Authentification Failed !\n" + _context2.t0);return _context2.abrupt("return", 1);case 14:return _context2.abrupt("return", null);case 15:case "end":return _context2.stop();}}}, _callee2, this, [[3, 10]]);}));function authenticate() {return _authenticate.apply(this, arguments);}return authenticate;}() }, { key: "createStep", value: function () {var _createStep = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(step) {var stepInstance;return regeneratorRuntime.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:stepInstance = new StepFactory(step, this.auth, this.config, this.executionOrderId);this.executionOrderId += 1;_context3.next = 4;return stepInstance.run();case 4:return _context3.abrupt("return", stepInstance);case 5:case "end":return _context3.stop();}}}, _callee3, this);}));function createStep(_x) {return _createStep.apply(this, arguments);}return createStep;}() }]);return Serie;}();
module.exports = Serie;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJpZUNsYXNzLmpzIl0sIm5hbWVzIjpbImF4aW9zIiwicmVxdWlyZSIsImNoYWkiLCJTZXJpZVBhcnNlciIsIlN0ZXBGYWN0b3J5IiwiQ2FjaGUiLCJfIiwiTW9jaGEiLCJleHBlY3QiLCJzaG91bGQiLCJUZXN0IiwidHlwZSIsInRpbWVzIiwiU2VyaWUiLCJzZXJpZSIsImNvbmZpZyIsImNhY2hlIiwiY2FjaGVJbnN0YW5jZSIsImNhY2hlRGF0YSIsInNlcmllUGFyc2VyIiwiZ2V0U2VyaWVDYWNoZSIsIm5hbWUiLCJyZXNwb25zZSIsImZvckVhY2giLCJjYWNoZU9iamVjdCIsImVsZW1lbnQiLCJ2YWx1ZSIsImluY2x1ZGVzIiwidGFyZ2V0IiwiZ2V0VGFyZ2V0IiwicmVzdWx0IiwicHV0Iiwic2VyaWVDYXNlIiwic3BsaXQiLCJjb21wYXJpc29uIiwicmVhbFZhbHVlIiwiZ2V0QXNzZXJ0VmFsdWUiLCJwYXR0ZXJuIiwic2xpY2UiLCJpbmRleE9mIiwibGVuZ3RoIiwic3VpdGVJbnN0YW5jZSIsIlN1aXRlIiwiY3JlYXRlIiwibW9jaGFJbnN0YW5jZSIsInN1aXRlIiwiZGVzY3JpcHRpb24iLCJ0aW1lb3V0Iiwic2VyaWVDYXNlUGFyYW0iLCJKU09OIiwic3RyaW5naWZ5IiwiaXNOdW1lcmljIiwiTnVtYmVyIiwiYWRkVGVzdCIsInRvIiwiZGVlcCIsImVxdWFsIiwibm90IiwiYmUiLCJhIiwiY29udGFpbiIsIm1lbWJlcnMiLCJzdHIiLCJ0ZXN0IiwiaWQiLCJwcm9wZXJ0eSIsImdldFN0ZXBSZXNwb25zZSIsInJlc3BvbnNlUHJvcGVydHkiLCJzZXJpZUV4ZWN1dGlvbk9yZGVyIiwidGVzdENhc2UiLCJoYXNPd25Qcm9wZXJ0eSIsImhhdmVBc3NlcnQiLCJleGVjdXRpb25PcmRlciIsImFzc2VydCIsImNhc2VBc3NlcnQiLCJnZXRTZXJpZUNhc2VQYXJhbSIsImV4ZWN1dGVTZXJpZUFzc2VydGlvbnMiLCJzdGVwUmVzcG9uc2UiLCJhbGxTdGVwUmVzcG9uc2UiLCJzdGVwT2JqIiwicGFyZW50IiwiaXNEaXNwb3NlIiwic2VyaWVTdG9wIiwiZXhlY3V0aW9uT3JkZXJJZCIsImdldEluc3RhbmNlIiwiZ2V0RXhlY3V0aW9uT3JkZXJGcm9tTmFtZSIsInByZXBhcmVDYWNoZSIsImF1dGhlbnRpY2F0ZSIsImF1dGgiLCJzZXRNb2NoYVByb3BlcnRpZXMiLCJzdGVwIiwiY3JlYXRlU3RlcCIsInN0ZXBJbnN0YW5jZSIsInB1c2giLCJmaWxsQ2FjaGUiLCJhc3NlcnRpb25zT25TZXJpZSIsImF1dG9tYXRlZEF1dGgiLCJidWZmIiwiQnVmZmVyIiwiZnJvbSIsInRvU3RyaW5nIiwiaGVhZGVycyIsImJhc2VVcmwiLCJyZXNwIiwiY29uc29sZSIsImxvZyIsInJ1biIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJtdElBQUEsSUFBTUEsS0FBSyxHQUFHQyxPQUFPLENBQUMsT0FBRCxDQUFyQjtBQUNBLElBQU1DLElBQUksR0FBR0QsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7QUFDQSxJQUFNRSxXQUFXLEdBQUdGLE9BQU8sQ0FBQyxlQUFELENBQTNCO0FBQ0EsSUFBTUcsV0FBVyxHQUFHSCxPQUFPLENBQUMsYUFBRCxDQUEzQjtBQUNBLElBQU1JLEtBQUssR0FBR0osT0FBTyxDQUFDLGNBQUQsQ0FBckI7QUFDQSxJQUFNSyxDQUFDLEdBQUdMLE9BQU8sQ0FBQyxRQUFELENBQWpCO0FBQ0EsSUFBTU0sS0FBSyxHQUFHTixPQUFPLENBQUMsYUFBRCxDQUFQLENBQXVCTSxLQUFyQztBQUNBLElBQU1DLE1BQU0sR0FBR04sSUFBSSxDQUFDTSxNQUFwQjtBQUNBLElBQU1DLE1BQU0sR0FBR1AsSUFBSSxDQUFDTyxNQUFMLEVBQWY7QUFDQSxJQUFNQyxJQUFJLEdBQUdILEtBQUssQ0FBQ0csSUFBbkIsQztBQUNpQlQsT0FBTyxDQUFDLGFBQUQsQyxDQUFoQlUsSSxZQUFBQSxJO0FBQ1VWLE9BQU8sQ0FBQyxRQUFELEMsQ0FBakJXLEssYUFBQUEs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LFlBSlgsa0U7QUFzR0plLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQi9GLEtBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXhpb3MgPSByZXF1aXJlKCdheGlvcycpO1xuY29uc3QgY2hhaSA9IHJlcXVpcmUoXCJjaGFpXCIpO1xuY29uc3QgU2VyaWVQYXJzZXIgPSByZXF1aXJlKCcuL3NlcmllUGFyc2VyJylcbmNvbnN0IFN0ZXBGYWN0b3J5ID0gcmVxdWlyZSgnLi9zdGVwQ2xhc3MnKTtcbmNvbnN0IENhY2hlID0gcmVxdWlyZSgnLi9jYWNoZUNsYXNzJyk7XG5jb25zdCBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5jb25zdCBNb2NoYSA9IHJlcXVpcmUoXCJtb2NoYS9tb2NoYVwiKS5Nb2NoYTtcbmNvbnN0IGV4cGVjdCA9IGNoYWkuZXhwZWN0O1xuY29uc3Qgc2hvdWxkID0gY2hhaS5zaG91bGQoKTtcbmNvbnN0IFRlc3QgPSBNb2NoYS5UZXN0O1xuY29uc3QgeyB0eXBlIH0gPSByZXF1aXJlKCdtb2NoYS9tb2NoYScpO1xuY29uc3QgeyB0aW1lcyB9ID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5cbmNsYXNzIFNlcmlle1xuICAgIGNvbnN0cnVjdG9yKHNlcmllLCBjb25maWcpe1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICAgICAgdGhpcy5jb25maWcucGFyZW50ID0gdGhpcztcbiAgICAgICAgdGhpcy5jb25maWcuaXNEaXNwb3NlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBzZXJpZS5kZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5zZXJpZVN0b3AgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zZXJpZSA9IHNlcmllO1xuICAgICAgICB0aGlzLmV4ZWN1dGlvbk9yZGVySWQgPSAwO1xuICAgICAgICB0aGlzLnNlcmllUGFyc2VyID0gbmV3IFNlcmllUGFyc2VyKHRoaXMuY29uZmlnKS5nZXRJbnN0YW5jZSgpO1xuICAgICAgICB0aGlzLmV4ZWN1dGlvbk9yZGVyID0gdGhpcy5zZXJpZVBhcnNlci5nZXRFeGVjdXRpb25PcmRlckZyb21OYW1lKHRoaXMuc2VyaWUubmFtZSlcbiAgICAgICAgdGhpcy5hbGxTdGVwUmVzcG9uc2UgPSBbXTtcbiAgICAgICAgaWYoc2VyaWUuY2FjaGUpe1xuICAgICAgICAgICAgdGhpcy5wcmVwYXJlQ2FjaGUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBzdGFydEFzc2VydCgpe1xuICAgICAgICB0aGlzLmF1dGggPSBhd2FpdCB0aGlzLmF1dGhlbnRpY2F0ZSgpO1xuICAgICAgICB0aGlzLnNldE1vY2hhUHJvcGVydGllcygpO1xuICAgICAgICBmb3IgKGNvbnN0IHN0ZXAgb2YgdGhpcy5zZXJpZS5zZXJpZUV4ZWN1dGlvbk9yZGVyKSB7XG4gICAgICAgICAgICBjb25zdCBzdGVwSW5zdGFuY2UgPSBhd2FpdCB0aGlzLmNyZWF0ZVN0ZXAoc3RlcCk7XG4gICAgICAgICAgICB0aGlzLmFsbFN0ZXBSZXNwb25zZS5wdXNoKHtcbiAgICAgICAgICAgICAgICBpZCA6IHN0ZXAuaWQsXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UgOiBzdGVwSW5zdGFuY2UucmVzcG9uc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYodGhpcy5zZXJpZS5jYWNoZSl7XG4gICAgICAgICAgICAgICAgdGhpcy5maWxsQ2FjaGUoc3RlcEluc3RhbmNlLnJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYXNzZXJ0aW9uc09uU2VyaWUoc3RlcEluc3RhbmNlLnJlc3BvbnNlLCBzdGVwSW5zdGFuY2UuaWQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByZXBhcmVDYWNoZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5jYWNoZSA9IG5ldyBDYWNoZSgpO1xuICAgICAgICB0aGlzLmNvbmZpZy5jYWNoZUluc3RhbmNlID0gdGhpcy5jYWNoZTtcbiAgICAgICAgdGhpcy5jYWNoZURhdGEgPSB0aGlzLnNlcmllUGFyc2VyLmdldFNlcmllQ2FjaGUodGhpcy5zZXJpZS5uYW1lKTtcbiAgICB9XG4gICAgZmlsbENhY2hlID0gKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHRoaXMuY2FjaGVEYXRhLmZvckVhY2goKGNhY2hlT2JqZWN0KSA9PiB7XG4gICAgICAgICAgICBmb3IobGV0IGVsZW1lbnQgb2YgY2FjaGVPYmplY3Qpe1xuICAgICAgICAgICAgICAgIGlmKHR5cGVvZihlbGVtZW50LnZhbHVlKSA9PT0gJ3N0cmluZycpe1xuICAgICAgICAgICAgICAgICAgICBpZihlbGVtZW50LnZhbHVlLmluY2x1ZGVzKFwicmVzcG9uc2VcIikpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IHRoaXMuZ2V0VGFyZ2V0KGVsZW1lbnQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gXy5yZXN1bHQocmVzcG9uc2UsIHRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhY2hlLnB1dChlbGVtZW50Lm5hbWUsIHZhbHVlKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FjaGUucHV0KGVsZW1lbnQubmFtZSwgZWxlbWVudC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbiAgICAvL0F1dGhlbnRpY2F0ZSBhbmQgZ2V0IGF1dGggY29va2llXG4gICAgYXN5bmMgYXV0aGVudGljYXRlKCl7XG4gICAgICAgIGlmKHRoaXMuc2VyaWUuYXV0b21hdGVkQXV0aCl7XG4gICAgICAgICAgICBsZXQgYnVmZiA9IEJ1ZmZlci5mcm9tKHRoaXMuY29uZmlnLmF1dGgudG9TdHJpbmcoKSwgJ3V0Zi04Jyk7XG4gICAgICAgICAgICBsZXQgaGVhZGVycyA9IHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XCJBdXRob3JpemF0aW9uXCI6IFwiQmFzaWMgXCIgKyBidWZmLnRvU3RyaW5nKCdiYXNlNjQnKX1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICBsZXQgcmVzcCA9IGF3YWl0IGF4aW9zLnB1dCh0aGlzLmNvbmZpZy5iYXNlVXJsICsgJy9BdXRoZW50aWNhdGUnLCBcIlwiICwgaGVhZGVycylcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcC5oZWFkZXJzWydzZXQtY29va2llJ107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkF1dGhlbnRpZmljYXRpb24gRmFpbGVkICFcXG5cIiArIGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgYXN5bmMgY3JlYXRlU3RlcChzdGVwKXtcbiAgICAgICAgbGV0IHN0ZXBJbnN0YW5jZSA9IG5ldyBTdGVwRmFjdG9yeShzdGVwLCB0aGlzLmF1dGgsIHRoaXMuY29uZmlnLCB0aGlzLmV4ZWN1dGlvbk9yZGVySWQpXG4gICAgICAgIHRoaXMuZXhlY3V0aW9uT3JkZXJJZCArPSAxO1xuICAgICAgICBhd2FpdCBzdGVwSW5zdGFuY2UucnVuKCk7XG4gICAgICAgIHJldHVybiBzdGVwSW5zdGFuY2U7XG4gICAgfVxuICAgIGdldFNlcmllQ2FzZVBhcmFtID0gKHNlcmllQ2FzZSkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGFyZ2V0IDogKHNlcmllQ2FzZS50YXJnZXQuc3BsaXQoXCIuXCIpWzFdID09PSBcInJlc3BvbnNlXCIpID8gdGhpcy5nZXRUYXJnZXQoc2VyaWVDYXNlLnRhcmdldCkgOiBzZXJpZUNhc2UudGFyZ2V0LFxuICAgICAgICAgICAgY29tcGFyaXNvbiA6IHNlcmllQ2FzZS5jb21wYXJpc29uLFxuICAgICAgICAgICAgcmVhbFZhbHVlIDogdGhpcy5nZXRBc3NlcnRWYWx1ZShzZXJpZUNhc2UudmFsdWUpLFxuICAgICAgICAgICAgdmFsdWUgOiBzZXJpZUNhc2UudmFsdWVcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRUYXJnZXQgPSAodGFyZ2V0KSA9PiB7XG4gICAgICAgIGxldCBwYXR0ZXJuID0gXCJyZXNwb25zZVwiO1xuICAgICAgICByZXR1cm4gdGFyZ2V0LnNsaWNlKHRhcmdldC5pbmRleE9mKHBhdHRlcm4pICsgcGF0dGVybi5sZW5ndGggKyAxLCB0YXJnZXQubGVuZ3RoKVxuICAgIH0gICBcbiAgICBzZXRNb2NoYVByb3BlcnRpZXMgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc3VpdGVJbnN0YW5jZSA9IE1vY2hhLlN1aXRlLmNyZWF0ZSh0aGlzLmNvbmZpZy5tb2NoYUluc3RhbmNlLnN1aXRlLCB0aGlzLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgdGhpcy5zdWl0ZUluc3RhbmNlLnRpbWVvdXQodGhpcy5jb25maWcudGltZW91dCk7XG4gICAgICAgIHRoaXMuY29uZmlnLnN1aXRlSW5zdGFuY2UgPSB0aGlzLnN1aXRlSW5zdGFuY2U7XG4gICAgfVxuICAgIGV4ZWN1dGVTZXJpZUFzc2VydGlvbnMgPSAoc2VyaWVDYXNlUGFyYW0sIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGxldCBkZXNjcmlwdGlvbiA9ICh0eXBlb2Yoc2VyaWVDYXNlUGFyYW0ucmVhbFZhbHVlKSA9PT0gJ29iamVjdCcpID8gSlNPTi5zdHJpbmdpZnkoc2VyaWVDYXNlUGFyYW0ucmVhbFZhbHVlKSA6IHNlcmllQ2FzZVBhcmFtLnJlYWxWYWx1ZTtcbiAgICAgICAgc2VyaWVDYXNlUGFyYW0ucmVhbFZhbHVlID0gKHRoaXMuaXNOdW1lcmljKHNlcmllQ2FzZVBhcmFtLnJlYWxWYWx1ZSkpID8gTnVtYmVyKHNlcmllQ2FzZVBhcmFtLnJlYWxWYWx1ZSkgOiBzZXJpZUNhc2VQYXJhbS5yZWFsVmFsdWU7XG4gICAgICAgIHN3aXRjaCAoc2VyaWVDYXNlUGFyYW0uY29tcGFyaXNvbil7XG4gICAgICAgICAgICBjYXNlICdFcXVhbHMnOlxuICAgICAgICAgICAgICAgIHRoaXMuc3VpdGVJbnN0YW5jZS5hZGRUZXN0KG5ldyBUZXN0KHNlcmllQ2FzZVBhcmFtLnRhcmdldCArICcgZG9pdCDDqnRyZSDDqWdhbCDDoCAnKyBkZXNjcmlwdGlvbiwgKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VyaWVDYXNlUGFyYW0udGFyZ2V0ID0gKHNlcmllQ2FzZVBhcmFtLnRhcmdldCA9PSAnc3RhdHVzX2NvZGUnKSA/ICdzdGF0dXMnIDogc2VyaWVDYXNlUGFyYW0udGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICBleHBlY3QoXy5yZXN1bHQocmVzcG9uc2UsIHNlcmllQ2FzZVBhcmFtLnRhcmdldCkpLnRvLmRlZXAuZXF1YWwoc2VyaWVDYXNlUGFyYW0ucmVhbFZhbHVlKTtcbiAgICAgICAgICAgICAgICB9KSkpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdJcyBub3QnOlxuICAgICAgICAgICAgICAgIHRoaXMuc3VpdGVJbnN0YW5jZS5hZGRUZXN0KG5ldyBUZXN0KHNlcmllQ2FzZVBhcmFtLnRhcmdldCArICcgZXN0IGRpZmbDqXJlbnQgZGUgJysgZGVzY3JpcHRpb24sICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlcmllQ2FzZVBhcmFtLnRhcmdldCA9IChzZXJpZUNhc2VQYXJhbS50YXJnZXQgPT0gJ3N0YXR1c19jb2RlJykgPyAnc3RhdHVzJyA6IHNlcmllQ2FzZVBhcmFtLnRhcmdldDtcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0KF8ucmVzdWx0KHJlc3BvbnNlLCBzZXJpZUNhc2VQYXJhbS50YXJnZXQpKS50by5ub3QuZXF1YWwoc2VyaWVDYXNlUGFyYW0ucmVhbFZhbHVlKTtcbiAgICAgICAgICAgICAgICB9KSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnVHlwZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5zdWl0ZUluc3RhbmNlLmFkZFRlc3QobmV3IFRlc3Qoc2VyaWVDYXNlUGFyYW0udGFyZ2V0ICsgJyBkb2l0IMOqdHJlIGRlIHR5cGUgJysgZGVzY3JpcHRpb24sICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlcmllQ2FzZVBhcmFtLnRhcmdldCA9IChzZXJpZUNhc2VQYXJhbS50YXJnZXQgPT0gJ3N0YXR1c19jb2RlJykgPyAnc3RhdHVzJyA6IHNlcmllQ2FzZVBhcmFtLnRhcmdldDtcbiAgICAgICAgICAgICAgICAgICAgXy5yZXN1bHQocmVzcG9uc2UsIHNlcmllQ2FzZVBhcmFtLnRhcmdldCkuc2hvdWxkLmJlLmEoc2VyaWVDYXNlUGFyYW0ucmVhbFZhbHVlKVxuICAgICAgICAgICAgICAgIH0pKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdDb250YWluJzpcbiAgICAgICAgICAgICAgICB0aGlzLnN1aXRlSW5zdGFuY2UuYWRkVGVzdChuZXcgVGVzdChzZXJpZUNhc2VQYXJhbS50YXJnZXQgKyAnIGRvaXQgY29udGVuaXIgJysgZGVzY3JpcHRpb24sICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlcmllQ2FzZVBhcmFtLnRhcmdldCA9IChzZXJpZUNhc2VQYXJhbS50YXJnZXQgPT0gJ3N0YXR1c19jb2RlJykgPyAnc3RhdHVzJyA6IHNlcmllQ2FzZVBhcmFtLnRhcmdldDtcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0KF8ucmVzdWx0KHJlc3BvbnNlLCBzZXJpZUNhc2VQYXJhbS50YXJnZXQpKS50by5jb250YWluLmRlZXAubWVtYmVycyhzZXJpZUNhc2VQYXJhbS5yZWFsVmFsdWUpO1xuICAgICAgICAgICAgICAgIH0pKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdDb3VudCc6XG4gICAgICAgICAgICAgICAgdGhpcy5zdWl0ZUluc3RhbmNlLmFkZFRlc3QobmV3IFRlc3Qoc2VyaWVDYXNlUGFyYW0udGFyZ2V0ICsgJyBkb2l0IGNvbnRlbmlyICcrIGRlc2NyaXB0aW9uICsgJyBlbGVtZW50cycsKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0KF8ucmVzdWx0KHJlc3BvbnNlLCBzZXJpZUNhc2VQYXJhbS50YXJnZXQpLmxlbmd0aCkudG8uZGVlcC5lcXVhbChzZXJpZUNhc2VQYXJhbS5yZWFsVmFsdWUpO1xuICAgICAgICAgICAgICAgIH0pKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaXNOdW1lcmljID0gKHN0cikgPT4ge1xuICAgICAgICByZXR1cm4gL15cXGQrJC8udGVzdChzdHIpO1xuICAgIH1cbiAgICBnZXRBc3NlcnRWYWx1ZSA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICBpZih0eXBlb2YodmFsdWUpID09PSAnc3RyaW5nJyl7XG4gICAgICAgICAgICBsZXQgcGF0dGVybiA9IFwicmVzcG9uc2VcIlxuICAgICAgICAgICAgbGV0IFtpZCwgcHJvcGVydHldID0gdmFsdWUuc3BsaXQoXCIuXCIpO1xuICAgICAgICAgICAgaWYocHJvcGVydHkgPT09IHBhdHRlcm4pe1xuICAgICAgICAgICAgICAgIGxldCByZXNwb25zZSA9IHRoaXMuZ2V0U3RlcFJlc3BvbnNlKGlkKTtcbiAgICAgICAgICAgICAgICBsZXQgcmVzcG9uc2VQcm9wZXJ0eSA9IHZhbHVlLnNsaWNlKHZhbHVlLmluZGV4T2YocGF0dGVybikgKyBwYXR0ZXJuLmxlbmd0aCArIDEsIHZhbHVlLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBfLnJlc3VsdChyZXNwb25zZSwgcmVzcG9uc2VQcm9wZXJ0eSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLnNlcmllLnNlcmllRXhlY3V0aW9uT3JkZXIuZm9yRWFjaCh0ZXN0Q2FzZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGlkID09IHRlc3RDYXNlLmlkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRlc3RDYXNlLmhhc093blByb3BlcnR5KHByb3BlcnR5KSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB0ZXN0Q2FzZVtwcm9wZXJ0eV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBhc3NlcnRpb25zT25TZXJpZSA9IChyZXNwb25zZSwgaWQpID0+IHtcbiAgICAgICAgaWYodGhpcy5oYXZlQXNzZXJ0KGlkKSl7XG4gICAgICAgICAgICB0aGlzLmV4ZWN1dGlvbk9yZGVyW2lkXS5hc3NlcnQuZm9yRWFjaCgoY2FzZUFzc2VydCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBzZXJpZUNhc2VQYXJhbSA9IHRoaXMuZ2V0U2VyaWVDYXNlUGFyYW0oY2FzZUFzc2VydCk7XG4gICAgICAgICAgICAgICAgdGhpcy5leGVjdXRlU2VyaWVBc3NlcnRpb25zKHNlcmllQ2FzZVBhcmFtLCByZXNwb25zZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBoYXZlQXNzZXJ0ID0gKGlkKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmV4ZWN1dGlvbk9yZGVyW2lkXS5oYXNPd25Qcm9wZXJ0eShcImFzc2VydFwiKTtcbiAgICB9XG4gICAgZ2V0U3RlcFJlc3BvbnNlID0gKGlkKSA9PiB7XG4gICAgICAgIGxldCBzdGVwUmVzcG9uc2U7XG4gICAgICAgIHRoaXMuYWxsU3RlcFJlc3BvbnNlLmZvckVhY2goKHN0ZXBPYmopID0+IHtcbiAgICAgICAgICAgIGlmKHN0ZXBPYmouaWQgPT0gaWQpe1xuICAgICAgICAgICAgICAgIHN0ZXBSZXNwb25zZSA9IHN0ZXBPYmoucmVzcG9uc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBzdGVwUmVzcG9uc2VcbiAgICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IFNlcmllOyJdfQ==