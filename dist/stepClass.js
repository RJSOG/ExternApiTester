"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var chai = require("chai");

var _ = require('lodash');

var expect = chai.expect;
var should = chai.should();

var Mocha = require("mocha/mocha").Mocha;

var axios = require("axios");

var Test = Mocha.Test;

var StepFactory = /*#__PURE__*/function () {
  function StepFactory(step, auth, config, id) {
    var _this = this;

    _classCallCheck(this, StepFactory);

    _defineProperty(this, "setClassProperties", function () {
      _this.endpoint = _this.step.endpoint;
      _this.method = _this.step.method;
      _this.assert = _this.step.assert;
      _this.headers = _this.step.headers;
      _this.description = _this.step.description;
      _this.param_uri = _this.getStrParamUri();
      _this.param_body = _this.step.param_body;
      _this.stepFinished = false;
    });

    _defineProperty(this, "setMochaProperties", function () {
      _this.mochaInstance = _this.config.mochaInstance;
      _this.suiteInstance = Mocha.Suite.create(_this.mochaInstance.suite, _this.description);

      _this.suiteInstance.timeout(_this.config.timeout);
    });

    _defineProperty(this, "methodMapper", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var authCookie, requestParam, methodMapper;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(_this.method == null)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", '');

            case 2:
              authCookie = {
                "Cookie": _this.auth
              };
              requestParam = {
                'endpoint': _this.endpoint + _this.param_uri,
                'data': _this.param_body != undefined ? _this.param_body : '',
                'headers': _this.headers != undefined ? Object.assign({}, authCookie, _this.headers) : authCookie
              };
              methodMapper = {
                "GET": _this.getRequest,
                "POST": _this.postRequest,
                "PUT": _this.putRequest,
                "DELETE": _this.deleteRequest
              };
              _context.next = 7;
              return methodMapper[_this.method](requestParam);

            case 7:
              return _context.abrupt("return", _context.sent);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(this, "getstepCaseParam", function (stepCase) {
      return {
        target: stepCase.target,
        comparison: stepCase.comparison,
        value: stepCase.value
      };
    });

    _defineProperty(this, "executeAssertions", function (stepCaseParam, response) {
      switch (stepCaseParam.comparison) {
        case 'Equals':
          _this.suiteInstance.addTest(new Test(stepCaseParam.target + '  doit être égal à ' + stepCaseParam.value, function () {
            stepCaseParam.target = stepCaseParam.target == 'status_code' ? 'status' : stepCaseParam.target;
            expect(_.result(response, stepCaseParam.target)).to.deep.equal(stepCaseParam.value);
          }));

          break;

        case 'Is not':
          _this.suiteInstance.addTest(new Test(stepCaseParam.target + ' est différent de ' + stepCaseParam.value, function () {
            stepCaseParam.target = stepCaseParam.target == 'status_code' ? 'status' : stepCaseParam.target;
            expect(_.result(response, stepCaseParam.target)).to.not.equal(stepCaseParam.value);
          }));

          break;

        case 'Type':
          _this.suiteInstance.addTest(new Test(stepCaseParam.target + ' doit être de type ' + stepCaseParam.value, function () {
            stepCaseParam.target = stepCaseParam.target == 'status_code' ? 'status' : stepCaseParam.target;

            _.result(response, stepCaseParam.target).should.be.a(stepCaseParam.value);
          }));

          break;

        case 'Contain':
          _this.suiteInstance.addTest(new Test(stepCaseParam.target + '  doit contenir ' + stepCaseParam.value, function () {
            stepCaseParam.target = stepCaseParam.target == 'status_code' ? 'status' : stepCaseParam.target;
            expect(_.result(response, stepCaseParam.target)).to.contain.deep.members(stepCaseParam.realValue);
          }));

          break;
      }
    });

    _defineProperty(this, "getStrParamUri", function () {
      var param_uri_str = "?";

      if (_this.step.param_uri) {
        Object.keys(_this.step.param_uri).forEach(function (param) {
          param_uri_str += param + "=" + _this.step.param_uri[param] + "&";
        });
        param_uri_str = param_uri_str.slice(0, -1);
      } else {
        param_uri_str = "";
      }

      return param_uri_str;
    });

    _defineProperty(this, "getRequest", /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(requestParam) {
        var resp;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return axios.get(_this.config.baseUrl + requestParam.endpoint, {
                  headers: requestParam.headers
                });

              case 3:
                resp = _context2.sent;
                return _context2.abrupt("return", resp);

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                console.log("Assertions on " + _this.method + " " + _this.endpoint + " failed" + "  -->  " + _context2.t0.response.status + " - " + _context2.t0.response.statusText);
                return _context2.abrupt("return", 1);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 7]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());

    _defineProperty(this, "putRequest", /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(requestParam) {
        var resp;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return axios.put(_this.config.baseUrl + requestParam.endpoint, requestParam.data, {
                  headers: requestParam.headers
                });

              case 3:
                resp = _context3.sent;
                return _context3.abrupt("return", resp);

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                console.log("Assertions on " + _this.method + " " + _this.endpoint + " failed" + "  -->  " + _context3.t0.response.status + " - " + _context3.t0.response.statusText);
                return _context3.abrupt("return", 1);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 7]]);
      }));

      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }());

    _defineProperty(this, "postRequest", /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(requestParam) {
        var resp;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return axios.post(_this.config.baseUrl + requestParam.endpoint, requestParam.data, {
                  headers: requestParam.headers
                });

              case 3:
                resp = _context4.sent;
                return _context4.abrupt("return", resp);

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4["catch"](0);
                console.log("Assertions on " + _this.method + " " + _this.endpoint + " failed" + "  -->  " + _context4.t0.response.status + " - " + _context4.t0.response.statusText);
                return _context4.abrupt("return", 1);

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 7]]);
      }));

      return function (_x3) {
        return _ref4.apply(this, arguments);
      };
    }());

    _defineProperty(this, "deleteRequest", /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(requestParam) {
        var resp;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return axios["delete"](_this.config.baseUrl + requestParam.endpoint, {
                  data: requestParam.data,
                  headers: requestParam.headers
                });

              case 3:
                resp = _context5.sent;
                return _context5.abrupt("return", resp);

              case 7:
                _context5.prev = 7;
                _context5.t0 = _context5["catch"](0);
                console.log("Assertions on " + _this.method + " " + _this.endpoint + " failed" + "  -->  " + _context5.t0.response.status + " - " + _context5.t0.response.statusText);
                return _context5.abrupt("return", 1);

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 7]]);
      }));

      return function (_x4) {
        return _ref5.apply(this, arguments);
      };
    }());

    this.id = id;
    this.config = config;
    this.step = step;
    this.auth = auth;
    this.setClassProperties();
    this.setMochaProperties();
  }

  _createClass(StepFactory, [{
    key: "run",
    value: function () {
      var _run = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var response, _iterator, _step, stepCase, stepCaseParam;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.methodMapper();

              case 2:
                response = _context6.sent;

                if (response != 1) {
                  this.response = response;
                  _iterator = _createForOfIteratorHelper(this.assert);

                  try {
                    for (_iterator.s(); !(_step = _iterator.n()).done;) {
                      stepCase = _step.value;
                      stepCaseParam = this.getstepCaseParam(stepCase);
                      this.executeAssertions(stepCaseParam, response);
                    }
                  } catch (err) {
                    _iterator.e(err);
                  } finally {
                    _iterator.f();
                  }
                }

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function run() {
        return _run.apply(this, arguments);
      }

      return run;
    }()
  }]);

  return StepFactory;
}();

module.exports = StepFactory;