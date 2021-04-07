"use strict";function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it["return"] != null) it["return"]();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _typeof(obj) {"@babel/helpers - typeof";if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {_typeof = function _typeof(obj) {return typeof obj;};} else {_typeof = function _typeof(obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};}return _typeof(obj);}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var chai = require("chai");
var _ = require('lodash');
var expect = chai.expect;
var should = chai.should();
var Mocha = require("mocha/mocha").Mocha;
var axios = require("axios");
var assert = require('assert');
var Test = Mocha.Test;var


StepFactory = /*#__PURE__*/function () {
  function StepFactory(step, auth, config, id) {var _this = this;_classCallCheck(this, StepFactory);_defineProperty(this, "setClassProperties",















    function () {
      _this.endpoint = _this.step.endpoint;
      _this.method = _this.step.method;
      _this.assert = _this.step.assert;
      _this.headers = _this.step.headers;
      _this.description = _this.step.description;
      _this.param_uri = _this.step.param_uri;
      _this.param_body = _this.step.param_body;
      _this.stepFinished = false;
      _this.requiredStep = _this.step.requiredStep;
      _this._hasRequireTestFailed = false;
    });_defineProperty(this, "setMochaProperties",
    function () {
      _this.mochaInstance = _this.config.mochaInstance;
      _this.suiteInstance = Mocha.Suite.create(_this.config.suiteInstance, _this.description);
      _this.suiteInstance.timeout(_this.config.timeout);
    });_defineProperty(this, "prepareRequest", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(
    function _callee() {var authCookie, requestParam;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:if (!(
              _this.method == null)) {_context.next = 2;break;}return _context.abrupt("return", '');case 2:
              authCookie = _this.auth != null ? { "Cookie": _this.auth } : {};
              requestParam = {
                'url': _this.endpoint,
                'method': _this.method,
                'baseURL': _this.config.baseUrl,
                'params': _this.param_uri,
                'data': _this.param_body != undefined ? _this.param_body : '',
                'headers': _this.headers != undefined ? Object.assign({}, authCookie, _this.headers) : authCookie };

              if (_this.config.cacheInstance != undefined) {
                requestParam = _this.config.cacheInstance.applyValue(requestParam);
              }
              requestParam.params = _this.getStrParamUri(requestParam.params);
              if (_this.param_uri != {}) {
                _this.endpoint = _this.endpoint + requestParam.params;
                requestParam.url = _this.endpoint;
              }_context.next = 9;return (
                _this.executeRequest(requestParam));case 9:return _context.abrupt("return", _context.sent);case 10:case "end":return _context.stop();}}}, _callee);})));_defineProperty(this, "getstepCaseParam",

    function (stepCase) {
      var stepCaseParam = {
        target: stepCase.target,
        comparison: stepCase.comparison,
        value: stepCase.value };

      if (_this.cacheInstance != undefined) {
        stepCaseParam = _this.cacheInstance.applyValue(stepCaseParam);
      }
      return stepCaseParam;
    });_defineProperty(this, "executeAssertions",
    function (stepCaseParam, response) {
      var description = _this.valueToDescription(stepCaseParam.value);
      var self = _this;
      switch (stepCaseParam.comparison) {
        case 'Equals':
          _this.suiteInstance.addTest(new Test(stepCaseParam.target + ' doit être égal à ' + description, function () {
            self.wrapperBeforeExpect('expectEquals', stepCaseParam, response, this.test);
          }));
          break;
        case 'Is not':
          _this.suiteInstance.addTest(new Test(stepCaseParam.target + ' est différent de ' + description, function () {
            self.wrapperBeforeExpect('expectIsNot', stepCaseParam, response, this.test);
          }));
          break;
        case 'Type':
          _this.suiteInstance.addTest(new Test(stepCaseParam.target + ' doit être de type ' + description, function () {
            self.wrapperBeforeExpect('expectType', stepCaseParam, response, this.test);
          }));
          break;
        case 'Contain':
          _this.suiteInstance.addTest(new Test(stepCaseParam.target + ' doit contenir ' + description, function () {
            self.wrapperBeforeExpect('expectContain', stepCaseParam, response, this.test);
          }));
          break;
        case 'Count':
          _this.suiteInstance.addTest(new Test(stepCaseParam.target + ' doit contenir ' + description + ' elements', function () {
            self.wrapperBeforeExpect('expectCount', stepCaseParam, response, this.test);
          }));
          break;}

    });_defineProperty(this, "wrapperBeforeExpect",
    function (expectTestName, stepCaseParam, response, test) {
      try {
        if (!_this.suiteInstance.parent.mustBeSkipped) {
          _this[expectTestName](stepCaseParam, response);
        } else
        {
          test.skip();
        }
      } catch (error) {
        if (_this.requiredStep)
        _this.suiteInstance.parent.mustBeSkipped = true;
        throw error;
      }
    });_defineProperty(this, "expectEquals",

    function (stepCaseParam, response) {
      stepCaseParam.target = stepCaseParam.target == 'status_code' ? 'status' : stepCaseParam.target;
      expect(_.result(response, stepCaseParam.target)).to.deep.equal(stepCaseParam.value);
    });_defineProperty(this, "expectIsNot",
    function (stepCaseParam, response) {
      stepCaseParam.target = stepCaseParam.target == 'status_code' ? 'status' : stepCaseParam.target;
      expect(_.result(response, stepCaseParam.target)).to.not.equal(stepCaseParam.value);
    });_defineProperty(this, "expectType",
    function (stepCaseParam, response) {
      stepCaseParam.target = stepCaseParam.target == 'status_code' ? 'status' : stepCaseParam.target;
      _.result(response, stepCaseParam.target).should.be.a(stepCaseParam.value);
    });_defineProperty(this, "expectContain",
    function (stepCaseParam, response) {
      stepCaseParam.target = stepCaseParam.target == 'status_code' ? 'status' : stepCaseParam.target;
      expect(_.result(response, stepCaseParam.target)).to.contain.deep.members(stepCaseParam.realValue);
    });_defineProperty(this, "expectCount",
    function (stepCaseParam, response) {
      expect(_.result(response, stepCaseParam.target).length).to.deep.equal(stepCaseParam.value);
    });_defineProperty(this, "getStrParamUri",

    function (paramsUri) {
      var param_uri_str = "?";
      if (_this.step.param_uri) {
        Object.keys(paramsUri).forEach(function (param) {
          param_uri_str += param + "=" + paramsUri[param] + "&";
        });
        param_uri_str = param_uri_str.slice(0, -1);
      } else {
        param_uri_str = "";
      }
      return param_uri_str;
    });_defineProperty(this, "executeRequest", /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(
      function _callee2(requestParam) {var resp;return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.prev = 0;_context2.next = 3;return (

                  axios(requestParam));case 3:resp = _context2.sent;return _context2.abrupt("return",
                resp);case 7:_context2.prev = 7;_context2.t0 = _context2["catch"](0);return _context2.abrupt("return",

                _context2.t0.response);case 10:case "end":return _context2.stop();}}}, _callee2, null, [[0, 7]]);}));return function (_x) {return _ref2.apply(this, arguments);};}());_defineProperty(this, "valueToDescription",


    function (value) {
      var description = _typeof(value) === 'object' ? JSON.stringify(value) : value;
      description = description === "" ? '""' : description;
      return description;
    });this.id = id;this.config = config;this.step = step;this.auth = auth;this.setClassProperties();this.setMochaProperties();}_createClass(StepFactory, [{ key: "run", value: function () {var _run = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {var response, _iterator, _step, stepCase, stepCaseParam;return regeneratorRuntime.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return this.prepareRequest();case 2:response = _context3.sent;this.response = response;_iterator = _createForOfIteratorHelper(this.assert);try {for (_iterator.s(); !(_step = _iterator.n()).done;) {stepCase = _step.value;stepCaseParam = this.getstepCaseParam(stepCase);this.executeAssertions(stepCaseParam, response);}} catch (err) {_iterator.e(err);} finally {_iterator.f();}case 6:case "end":return _context3.stop();}}}, _callee3, this);}));function run() {return _run.apply(this, arguments);}return run;}() }]);return StepFactory;}();

module.exports = StepFactory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zdGVwQ2xhc3MuanMiXSwibmFtZXMiOlsiY2hhaSIsInJlcXVpcmUiLCJfIiwiZXhwZWN0Iiwic2hvdWxkIiwiTW9jaGEiLCJheGlvcyIsImFzc2VydCIsIlRlc3QiLCJTdGVwRmFjdG9yeSIsInN0ZXAiLCJhdXRoIiwiY29uZmlnIiwiaWQiLCJlbmRwb2ludCIsIm1ldGhvZCIsImhlYWRlcnMiLCJkZXNjcmlwdGlvbiIsInBhcmFtX3VyaSIsInBhcmFtX2JvZHkiLCJzdGVwRmluaXNoZWQiLCJyZXF1aXJlZFN0ZXAiLCJfaGFzUmVxdWlyZVRlc3RGYWlsZWQiLCJtb2NoYUluc3RhbmNlIiwic3VpdGVJbnN0YW5jZSIsIlN1aXRlIiwiY3JlYXRlIiwidGltZW91dCIsImF1dGhDb29raWUiLCJyZXF1ZXN0UGFyYW0iLCJiYXNlVXJsIiwidW5kZWZpbmVkIiwiT2JqZWN0IiwiYXNzaWduIiwiY2FjaGVJbnN0YW5jZSIsImFwcGx5VmFsdWUiLCJwYXJhbXMiLCJnZXRTdHJQYXJhbVVyaSIsInVybCIsImV4ZWN1dGVSZXF1ZXN0Iiwic3RlcENhc2UiLCJzdGVwQ2FzZVBhcmFtIiwidGFyZ2V0IiwiY29tcGFyaXNvbiIsInZhbHVlIiwicmVzcG9uc2UiLCJ2YWx1ZVRvRGVzY3JpcHRpb24iLCJzZWxmIiwiYWRkVGVzdCIsIndyYXBwZXJCZWZvcmVFeHBlY3QiLCJ0ZXN0IiwiZXhwZWN0VGVzdE5hbWUiLCJwYXJlbnQiLCJtdXN0QmVTa2lwcGVkIiwic2tpcCIsImVycm9yIiwicmVzdWx0IiwidG8iLCJkZWVwIiwiZXF1YWwiLCJub3QiLCJiZSIsImEiLCJjb250YWluIiwibWVtYmVycyIsInJlYWxWYWx1ZSIsImxlbmd0aCIsInBhcmFtc1VyaSIsInBhcmFtX3VyaV9zdHIiLCJrZXlzIiwiZm9yRWFjaCIsInBhcmFtIiwic2xpY2UiLCJyZXNwIiwiSlNPTiIsInN0cmluZ2lmeSIsInNldENsYXNzUHJvcGVydGllcyIsInNldE1vY2hhUHJvcGVydGllcyIsInByZXBhcmVSZXF1ZXN0IiwiZ2V0c3RlcENhc2VQYXJhbSIsImV4ZWN1dGVBc3NlcnRpb25zIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6ImcyR0FBQSxJQUFNQSxJQUFJLEdBQUdDLE9BQU8sQ0FBQyxNQUFELENBQXBCO0FBQ0EsSUFBTUMsQ0FBQyxHQUFHRCxPQUFPLENBQUMsUUFBRCxDQUFqQjtBQUNBLElBQU1FLE1BQU0sR0FBR0gsSUFBSSxDQUFDRyxNQUFwQjtBQUNBLElBQU1DLE1BQU0sR0FBR0osSUFBSSxDQUFDSSxNQUFMLEVBQWY7QUFDQSxJQUFNQyxLQUFLLEdBQUdKLE9BQU8sQ0FBQyxhQUFELENBQVAsQ0FBdUJJLEtBQXJDO0FBQ0EsSUFBTUMsS0FBSyxHQUFHTCxPQUFPLENBQUMsT0FBRCxDQUFyQjtBQUNBLElBQU1NLE1BQU0sR0FBR04sT0FBTyxDQUFDLFFBQUQsQ0FBdEI7QUFDQSxJQUFNTyxJQUFJLEdBQUdILEtBQUssQ0FBQ0csSUFBbkIsQzs7O0FBR01DLFc7QUFDRix1QkFBWUMsSUFBWixFQUFrQkMsSUFBbEIsRUFBd0JDLE1BQXhCLEVBQWdDQyxFQUFoQyxFQUFvQzs7Ozs7Ozs7Ozs7Ozs7OztBQWdCZixnQkFBTTtBQUN2QixNQUFBLEtBQUksQ0FBQ0MsUUFBTCxHQUFnQixLQUFJLENBQUNKLElBQUwsQ0FBVUksUUFBMUI7QUFDQSxNQUFBLEtBQUksQ0FBQ0MsTUFBTCxHQUFjLEtBQUksQ0FBQ0wsSUFBTCxDQUFVSyxNQUF4QjtBQUNBLE1BQUEsS0FBSSxDQUFDUixNQUFMLEdBQWMsS0FBSSxDQUFDRyxJQUFMLENBQVVILE1BQXhCO0FBQ0EsTUFBQSxLQUFJLENBQUNTLE9BQUwsR0FBZSxLQUFJLENBQUNOLElBQUwsQ0FBVU0sT0FBekI7QUFDQSxNQUFBLEtBQUksQ0FBQ0MsV0FBTCxHQUFtQixLQUFJLENBQUNQLElBQUwsQ0FBVU8sV0FBN0I7QUFDQSxNQUFBLEtBQUksQ0FBQ0MsU0FBTCxHQUFpQixLQUFJLENBQUNSLElBQUwsQ0FBVVEsU0FBM0I7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QSxhQUFQO0FBQ0gsS0E5SW1DO0FBK0luQix3QkFBT3ZDLFlBQVA7O0FBRVV2QixrQkFBQUEsS0FBSyxDQUFDdUIsWUFBRCxDQUZmLFNBRUg0QyxJQUZHO0FBR0ZBLGdCQUFBQSxJQUhFOztBQUtGLDZCQUFJNUIsUUFMRiw2RUEvSW1COzs7QUF1SmYsY0FBQ0QsS0FBRCxFQUFXO0FBQzVCLFVBQUkzQixXQUFXLEdBQUksUUFBUTJCLEtBQVIsTUFBbUIsUUFBcEIsR0FBZ0M4QixJQUFJLENBQUNDLFNBQUwsQ0FBZS9CLEtBQWYsQ0FBaEMsR0FBd0RBLEtBQTFFO0FBQ0EzQixNQUFBQSxXQUFXLEdBQUlBLFdBQVcsS0FBSyxFQUFqQixHQUF1QixJQUF2QixHQUE4QkEsV0FBNUM7QUFDQSxhQUFPQSxXQUFQO0FBQ0gsS0EzSm1DLEVBQ2hDLEtBQUtKLEVBQUwsR0FBVUEsRUFBVixDQUNBLEtBQUtELE1BQUwsR0FBY0EsTUFBZCxDQUNBLEtBQUtGLElBQUwsR0FBWUEsSUFBWixDQUNBLEtBQUtDLElBQUwsR0FBWUEsSUFBWixDQUNBLEtBQUtpRSxrQkFBTCxHQUNBLEtBQUtDLGtCQUFMLEdBQ0gsQyxnSUFDRCxpT0FDMkIsS0FBS0MsY0FBTCxFQUQzQixRQUNVakMsUUFEVixrQkFFSSxLQUFLQSxRQUFMLEdBQWdCQSxRQUFoQixDQUZKLHVDQUd5QixLQUFLdEMsTUFIOUIsT0FHSSxvREFBa0MsQ0FBekJpQyxRQUF5QixlQUMxQkMsYUFEMEIsR0FDVixLQUFLc0MsZ0JBQUwsQ0FBc0J2QyxRQUF0QixDQURVLENBRTlCLEtBQUt3QyxpQkFBTCxDQUF1QnZDLGFBQXZCLEVBQXNDSSxRQUF0QyxFQUNILENBTkwsMEg7O0FBcUpKb0MsTUFBTSxDQUFDQyxPQUFQLEdBQWlCekUsV0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjaGFpID0gcmVxdWlyZShcImNoYWlcIik7XG5jb25zdCBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5jb25zdCBleHBlY3QgPSBjaGFpLmV4cGVjdDtcbmNvbnN0IHNob3VsZCA9IGNoYWkuc2hvdWxkKCk7XG5jb25zdCBNb2NoYSA9IHJlcXVpcmUoXCJtb2NoYS9tb2NoYVwiKS5Nb2NoYTtcbmNvbnN0IGF4aW9zID0gcmVxdWlyZShcImF4aW9zXCIpO1xuY29uc3QgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0Jyk7XG5jb25zdCBUZXN0ID0gTW9jaGEuVGVzdDtcblxuXG5jbGFzcyBTdGVwRmFjdG9yeSB7XG4gICAgY29uc3RydWN0b3Ioc3RlcCwgYXV0aCwgY29uZmlnLCBpZCkge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgICAgICB0aGlzLnN0ZXAgPSBzdGVwO1xuICAgICAgICB0aGlzLmF1dGggPSBhdXRoO1xuICAgICAgICB0aGlzLnNldENsYXNzUHJvcGVydGllcygpO1xuICAgICAgICB0aGlzLnNldE1vY2hhUHJvcGVydGllcygpO1xuICAgIH1cbiAgICBhc3luYyBydW4oKSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5wcmVwYXJlUmVxdWVzdCgpO1xuICAgICAgICB0aGlzLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgICAgIGZvciAobGV0IHN0ZXBDYXNlIG9mIHRoaXMuYXNzZXJ0KSB7XG4gICAgICAgICAgICBsZXQgc3RlcENhc2VQYXJhbSA9IHRoaXMuZ2V0c3RlcENhc2VQYXJhbShzdGVwQ2FzZSk7XG4gICAgICAgICAgICB0aGlzLmV4ZWN1dGVBc3NlcnRpb25zKHN0ZXBDYXNlUGFyYW0sIHJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXRDbGFzc1Byb3BlcnRpZXMgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuZW5kcG9pbnQgPSB0aGlzLnN0ZXAuZW5kcG9pbnQ7XG4gICAgICAgIHRoaXMubWV0aG9kID0gdGhpcy5zdGVwLm1ldGhvZDtcbiAgICAgICAgdGhpcy5hc3NlcnQgPSB0aGlzLnN0ZXAuYXNzZXJ0O1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSB0aGlzLnN0ZXAuaGVhZGVycztcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRoaXMuc3RlcC5kZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5wYXJhbV91cmkgPSB0aGlzLnN0ZXAucGFyYW1fdXJpO1xuICAgICAgICB0aGlzLnBhcmFtX2JvZHkgPSB0aGlzLnN0ZXAucGFyYW1fYm9keTtcbiAgICAgICAgdGhpcy5zdGVwRmluaXNoZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZXF1aXJlZFN0ZXAgPSB0aGlzLnN0ZXAucmVxdWlyZWRTdGVwO1xuICAgICAgICB0aGlzLl9oYXNSZXF1aXJlVGVzdEZhaWxlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBzZXRNb2NoYVByb3BlcnRpZXMgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMubW9jaGFJbnN0YW5jZSA9IHRoaXMuY29uZmlnLm1vY2hhSW5zdGFuY2U7XG4gICAgICAgIHRoaXMuc3VpdGVJbnN0YW5jZSA9IE1vY2hhLlN1aXRlLmNyZWF0ZSh0aGlzLmNvbmZpZy5zdWl0ZUluc3RhbmNlLCB0aGlzLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgdGhpcy5zdWl0ZUluc3RhbmNlLnRpbWVvdXQodGhpcy5jb25maWcudGltZW91dCk7XG4gICAgfVxuICAgIHByZXBhcmVSZXF1ZXN0ID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5tZXRob2QgPT0gbnVsbCkgcmV0dXJuICcnXG4gICAgICAgIGxldCBhdXRoQ29va2llID0gKHRoaXMuYXV0aCAhPSBudWxsKSA/IHsgXCJDb29raWVcIjogdGhpcy5hdXRoIH0gOiB7fTtcbiAgICAgICAgbGV0IHJlcXVlc3RQYXJhbSA9IHtcbiAgICAgICAgICAgICd1cmwnOiB0aGlzLmVuZHBvaW50LFxuICAgICAgICAgICAgJ21ldGhvZCc6IHRoaXMubWV0aG9kLFxuICAgICAgICAgICAgJ2Jhc2VVUkwnOiB0aGlzLmNvbmZpZy5iYXNlVXJsLFxuICAgICAgICAgICAgJ3BhcmFtcyc6IHRoaXMucGFyYW1fdXJpLFxuICAgICAgICAgICAgJ2RhdGEnOiAodGhpcy5wYXJhbV9ib2R5ICE9IHVuZGVmaW5lZCkgPyB0aGlzLnBhcmFtX2JvZHkgOiAnJyxcbiAgICAgICAgICAgICdoZWFkZXJzJzogKHRoaXMuaGVhZGVycyAhPSB1bmRlZmluZWQpID8gT2JqZWN0LmFzc2lnbih7fSwgYXV0aENvb2tpZSwgdGhpcy5oZWFkZXJzKSA6IGF1dGhDb29raWVcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLmNvbmZpZy5jYWNoZUluc3RhbmNlICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICByZXF1ZXN0UGFyYW0gPSB0aGlzLmNvbmZpZy5jYWNoZUluc3RhbmNlLmFwcGx5VmFsdWUocmVxdWVzdFBhcmFtKTtcbiAgICAgICAgfVxuICAgICAgICByZXF1ZXN0UGFyYW0ucGFyYW1zID0gdGhpcy5nZXRTdHJQYXJhbVVyaShyZXF1ZXN0UGFyYW0ucGFyYW1zKTtcbiAgICAgICAgaWYgKHRoaXMucGFyYW1fdXJpICE9IHt9KSB7XG4gICAgICAgICAgICB0aGlzLmVuZHBvaW50ID0gdGhpcy5lbmRwb2ludCArIHJlcXVlc3RQYXJhbS5wYXJhbXM7XG4gICAgICAgICAgICByZXF1ZXN0UGFyYW0udXJsID0gdGhpcy5lbmRwb2ludFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmV4ZWN1dGVSZXF1ZXN0KHJlcXVlc3RQYXJhbSk7XG4gICAgfVxuICAgIGdldHN0ZXBDYXNlUGFyYW0gPSAoc3RlcENhc2UpID0+IHtcbiAgICAgICAgbGV0IHN0ZXBDYXNlUGFyYW0gPSAgeyBcbiAgICAgICAgICAgIHRhcmdldDogc3RlcENhc2UudGFyZ2V0LFxuICAgICAgICAgICAgY29tcGFyaXNvbjogc3RlcENhc2UuY29tcGFyaXNvbixcbiAgICAgICAgICAgIHZhbHVlOiBzdGVwQ2FzZS52YWx1ZSxcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLmNhY2hlSW5zdGFuY2UgIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHN0ZXBDYXNlUGFyYW0gPSB0aGlzLmNhY2hlSW5zdGFuY2UuYXBwbHlWYWx1ZShzdGVwQ2FzZVBhcmFtKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RlcENhc2VQYXJhbTtcbiAgICB9XG4gICAgZXhlY3V0ZUFzc2VydGlvbnMgPSAoc3RlcENhc2VQYXJhbSwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgbGV0IGRlc2NyaXB0aW9uID0gdGhpcy52YWx1ZVRvRGVzY3JpcHRpb24oc3RlcENhc2VQYXJhbS52YWx1ZSk7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBzd2l0Y2ggKHN0ZXBDYXNlUGFyYW0uY29tcGFyaXNvbikge1xuICAgICAgICAgICAgY2FzZSAnRXF1YWxzJzpcbiAgICAgICAgICAgICAgICB0aGlzLnN1aXRlSW5zdGFuY2UuYWRkVGVzdChuZXcgVGVzdChzdGVwQ2FzZVBhcmFtLnRhcmdldCArICcgZG9pdCDDqnRyZSDDqWdhbCDDoCAnICsgZGVzY3JpcHRpb24sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi53cmFwcGVyQmVmb3JlRXhwZWN0KCdleHBlY3RFcXVhbHMnLCBzdGVwQ2FzZVBhcmFtLCByZXNwb25zZSwgdGhpcy50ZXN0KTtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdJcyBub3QnOlxuICAgICAgICAgICAgICAgIHRoaXMuc3VpdGVJbnN0YW5jZS5hZGRUZXN0KG5ldyBUZXN0KHN0ZXBDYXNlUGFyYW0udGFyZ2V0ICsgJyBlc3QgZGlmZsOpcmVudCBkZSAnICsgZGVzY3JpcHRpb24sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi53cmFwcGVyQmVmb3JlRXhwZWN0KCdleHBlY3RJc05vdCcsIHN0ZXBDYXNlUGFyYW0sIHJlc3BvbnNlLCB0aGlzLnRlc3QpO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ1R5cGUnOlxuICAgICAgICAgICAgICAgIHRoaXMuc3VpdGVJbnN0YW5jZS5hZGRUZXN0KG5ldyBUZXN0KHN0ZXBDYXNlUGFyYW0udGFyZ2V0ICsgJyBkb2l0IMOqdHJlIGRlIHR5cGUgJyArIGRlc2NyaXB0aW9uLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYud3JhcHBlckJlZm9yZUV4cGVjdCgnZXhwZWN0VHlwZScsIHN0ZXBDYXNlUGFyYW0sIHJlc3BvbnNlLCB0aGlzLnRlc3QpO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0NvbnRhaW4nOlxuICAgICAgICAgICAgICAgIHRoaXMuc3VpdGVJbnN0YW5jZS5hZGRUZXN0KG5ldyBUZXN0KHN0ZXBDYXNlUGFyYW0udGFyZ2V0ICsgJyBkb2l0IGNvbnRlbmlyICcgKyBkZXNjcmlwdGlvbiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLndyYXBwZXJCZWZvcmVFeHBlY3QoJ2V4cGVjdENvbnRhaW4nLCBzdGVwQ2FzZVBhcmFtLCByZXNwb25zZSwgdGhpcy50ZXN0KTtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdDb3VudCc6XG4gICAgICAgICAgICAgICAgdGhpcy5zdWl0ZUluc3RhbmNlLmFkZFRlc3QobmV3IFRlc3Qoc3RlcENhc2VQYXJhbS50YXJnZXQgKyAnIGRvaXQgY29udGVuaXIgJyArIGRlc2NyaXB0aW9uICsgJyBlbGVtZW50cycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi53cmFwcGVyQmVmb3JlRXhwZWN0KCdleHBlY3RDb3VudCcsIHN0ZXBDYXNlUGFyYW0sIHJlc3BvbnNlLCB0aGlzLnRlc3QpO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICB3cmFwcGVyQmVmb3JlRXhwZWN0ID0gKGV4cGVjdFRlc3ROYW1lLCBzdGVwQ2FzZVBhcmFtLCByZXNwb25zZSwgdGVzdCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYoIXRoaXMuc3VpdGVJbnN0YW5jZS5wYXJlbnQubXVzdEJlU2tpcHBlZCl7XG4gICAgICAgICAgICAgICAgdGhpc1tleHBlY3RUZXN0TmFtZV0oc3RlcENhc2VQYXJhbSwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB0ZXN0LnNraXAoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlcXVpcmVkU3RlcClcbiAgICAgICAgICAgICAgICB0aGlzLnN1aXRlSW5zdGFuY2UucGFyZW50Lm11c3RCZVNraXBwZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBlY3RFcXVhbHMgPSAoc3RlcENhc2VQYXJhbSwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgc3RlcENhc2VQYXJhbS50YXJnZXQgPSAoc3RlcENhc2VQYXJhbS50YXJnZXQgPT0gJ3N0YXR1c19jb2RlJykgPyAnc3RhdHVzJyA6IHN0ZXBDYXNlUGFyYW0udGFyZ2V0O1xuICAgICAgICBleHBlY3QoXy5yZXN1bHQocmVzcG9uc2UsIHN0ZXBDYXNlUGFyYW0udGFyZ2V0KSkudG8uZGVlcC5lcXVhbChzdGVwQ2FzZVBhcmFtLnZhbHVlKVxuICAgIH1cbiAgICBleHBlY3RJc05vdCA9IChzdGVwQ2FzZVBhcmFtLCByZXNwb25zZSkgPT4ge1xuICAgICAgICBzdGVwQ2FzZVBhcmFtLnRhcmdldCA9IChzdGVwQ2FzZVBhcmFtLnRhcmdldCA9PSAnc3RhdHVzX2NvZGUnKSA/ICdzdGF0dXMnIDogc3RlcENhc2VQYXJhbS50YXJnZXQ7XG4gICAgICAgIGV4cGVjdChfLnJlc3VsdChyZXNwb25zZSwgc3RlcENhc2VQYXJhbS50YXJnZXQpKS50by5ub3QuZXF1YWwoc3RlcENhc2VQYXJhbS52YWx1ZSk7XG4gICAgfVxuICAgIGV4cGVjdFR5cGUgPSAoc3RlcENhc2VQYXJhbSwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgc3RlcENhc2VQYXJhbS50YXJnZXQgPSAoc3RlcENhc2VQYXJhbS50YXJnZXQgPT0gJ3N0YXR1c19jb2RlJykgPyAnc3RhdHVzJyA6IHN0ZXBDYXNlUGFyYW0udGFyZ2V0O1xuICAgICAgICBfLnJlc3VsdChyZXNwb25zZSwgc3RlcENhc2VQYXJhbS50YXJnZXQpLnNob3VsZC5iZS5hKHN0ZXBDYXNlUGFyYW0udmFsdWUpO1xuICAgIH1cbiAgICBleHBlY3RDb250YWluID0gKHN0ZXBDYXNlUGFyYW0sIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHN0ZXBDYXNlUGFyYW0udGFyZ2V0ID0gKHN0ZXBDYXNlUGFyYW0udGFyZ2V0ID09ICdzdGF0dXNfY29kZScpID8gJ3N0YXR1cycgOiBzdGVwQ2FzZVBhcmFtLnRhcmdldDtcbiAgICAgICAgZXhwZWN0KF8ucmVzdWx0KHJlc3BvbnNlLCBzdGVwQ2FzZVBhcmFtLnRhcmdldCkpLnRvLmNvbnRhaW4uZGVlcC5tZW1iZXJzKHN0ZXBDYXNlUGFyYW0ucmVhbFZhbHVlKTtcbiAgICB9XG4gICAgZXhwZWN0Q291bnQgPSAoc3RlcENhc2VQYXJhbSwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgZXhwZWN0KF8ucmVzdWx0KHJlc3BvbnNlLCBzdGVwQ2FzZVBhcmFtLnRhcmdldCkubGVuZ3RoKS50by5kZWVwLmVxdWFsKHN0ZXBDYXNlUGFyYW0udmFsdWUpO1xuICAgIH1cblxuICAgIGdldFN0clBhcmFtVXJpID0gKHBhcmFtc1VyaSkgPT4ge1xuICAgICAgICBsZXQgcGFyYW1fdXJpX3N0ciA9IFwiP1wiXG4gICAgICAgIGlmICh0aGlzLnN0ZXAucGFyYW1fdXJpKSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhwYXJhbXNVcmkpLmZvckVhY2goKHBhcmFtKSA9PiB7XG4gICAgICAgICAgICAgICAgcGFyYW1fdXJpX3N0ciArPSBwYXJhbSArIFwiPVwiICsgcGFyYW1zVXJpW3BhcmFtXSArIFwiJlwiO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBwYXJhbV91cmlfc3RyID0gcGFyYW1fdXJpX3N0ci5zbGljZSgwLCAtMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJhbV91cmlfc3RyID0gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFyYW1fdXJpX3N0cjtcbiAgICB9XG4gICAgZXhlY3V0ZVJlcXVlc3QgPSBhc3luYyAocmVxdWVzdFBhcmFtKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwID0gYXdhaXQgYXhpb3MocmVxdWVzdFBhcmFtKTtcbiAgICAgICAgICAgIHJldHVybiByZXNwO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnIucmVzcG9uc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFsdWVUb0Rlc2NyaXB0aW9uID0gKHZhbHVlKSA9PiB7XG4gICAgICAgIGxldCBkZXNjcmlwdGlvbiA9ICh0eXBlb2YgKHZhbHVlKSA9PT0gJ29iamVjdCcpID8gSlNPTi5zdHJpbmdpZnkodmFsdWUpIDogdmFsdWU7XG4gICAgICAgIGRlc2NyaXB0aW9uID0gKGRlc2NyaXB0aW9uID09PSBcIlwiKSA/ICdcIlwiJyA6IGRlc2NyaXB0aW9uO1xuICAgICAgICByZXR1cm4gZGVzY3JpcHRpb247XG4gICAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBTdGVwRmFjdG9yeTtcbiJdfQ==