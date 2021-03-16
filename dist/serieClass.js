"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var axios = require('axios');

var chai = require("chai");

var Execute = require('./serieParser');

var StepFactory = require('./stepClass');

var _ = require('lodash');

var Mocha = require("mocha/mocha").Mocha;

var expect = chai.expect;
var should = chai.should();
var Test = Mocha.Test;
var Spec = Mocha.Spec;

var TeamCity = require('mocha-teamcity-reporter');

var Serie = /*#__PURE__*/function () {
  function Serie(serie, config) {
    var _this = this;

    _classCallCheck(this, Serie);

    _defineProperty(this, "getSerieCaseParam", function (serieCase) {
      return {
        target: serieCase.target,
        comparison: serieCase.comparison,
        realValue: _this.getAssertValue(serieCase.value),
        value: serieCase.value
      };
    });

    _defineProperty(this, "setMochaProperties", function () {
      _this.suiteInstance = Mocha.Suite.create(_this.mochaInstance.suite, _this.description);

      _this.suiteInstance.timeout(_this.config.timeout);
    });

    _defineProperty(this, "executeSerieAssertions", function (serieCaseParam, response) {
      switch (serieCaseParam.comparison) {
        case 'Equals':
          _this.suiteInstance.addTest(new Test(serieCaseParam.target + ' doit être égal à ' + serieCaseParam.value, function () {
            serieCaseParam.target = serieCaseParam.target == 'status_code' ? 'status' : serieCaseParam.target;
            expect(_.result(response, serieCaseParam.target)).to.deep.equal(serieCaseParam.realValue);
          }));

          break;

        case 'Is not':
          _this.suiteInstance.addTest(new Test(serieCaseParam.target + ' est différent de ' + serieCaseParam.value, function () {
            serieCaseParam.target = serieCaseParam.target == 'status_code' ? 'status' : serieCaseParam.target;
            expect(_.result(response, serieCaseParam.target)).to.not.equal(serieCaseParam.realValue);
          }));

          break;

        case 'Type':
          _this.suiteInstance.addTest(new Test(serieCaseParam.target + ' doit être de type ' + serieCaseParam.value, function () {
            serieCaseParam.target = serieCaseParam.target == 'status_code' ? 'status' : serieCaseParam.target;

            _.result(response, serieCaseParam.target).should.be.a(serieCaseParam.realValue);
          }));

          break;

        case 'Contain':
          _this.suiteInstance.addTest(new Test(serieCaseParam.target + ' doit contenir ' + serieCaseParam.value, function () {
            serieCaseParam.target = serieCaseParam.target == 'status_code' ? 'status' : serieCaseParam.target;
            expect(_.result(response, serieCaseParam.target)).to.contain.deep.members(serieCaseParam.realValue);
          }));

          break;
      }
    });

    _defineProperty(this, "getAssertValue", function (value) {
      var result;

      _this.serie.serieExecutionOrder.forEach(function (testCase) {
        var _value$split = value.split("."),
            _value$split2 = _slicedToArray(_value$split, 2),
            id = _value$split2[0],
            property = _value$split2[1];

        if (id == testCase.id && testCase.hasOwnProperty(property)) {
          result = testCase[property];
        }
      });

      return result;
    });

    _defineProperty(this, "assertionsOnSerie", function (response, id) {
      if (_this.haveAssert(id)) {
        _this.executionOrder[id].assert.forEach(function (caseAssert) {
          var serieCaseParam = _this.getSerieCaseParam(caseAssert);

          _this.executeSerieAssertions(serieCaseParam, response);
        });
      }
    });

    _defineProperty(this, "haveAssert", function (id) {
      return _this.executionOrder[id].hasOwnProperty("assert");
    });

    this.config = config;
    this.description = serie.description;
    this.serie = serie;
    this.executionOrderId = 0;
    this.executeClassInstance = new Execute(this.config).getInstance();
    this.executionOrder = this.executeClassInstance.getExecutionOrderFromName(this.serie.name);
    this.mochaInstance = new Mocha({
      reporter: this.config.report == 'tc' ? TeamCity : Spec
    });
    this.config.mochaInstance = this.mochaInstance;
    this.authenticate().then( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(auth) {
        var _iterator, _step, step, stepInstance;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(auth != 1)) {
                  _context.next = 23;
                  break;
                }

                _this.auth = auth;

                _this.setMochaProperties();

                _iterator = _createForOfIteratorHelper(_this.serie.serieExecutionOrder);
                _context.prev = 4;

                _iterator.s();

              case 6:
                if ((_step = _iterator.n()).done) {
                  _context.next = 14;
                  break;
                }

                step = _step.value;
                _context.next = 10;
                return _this.createStep(step);

              case 10:
                stepInstance = _context.sent;

                _this.assertionsOnSerie(stepInstance.response, stepInstance.id);

              case 12:
                _context.next = 6;
                break;

              case 14:
                _context.next = 19;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](4);

                _iterator.e(_context.t0);

              case 19:
                _context.prev = 19;

                _iterator.f();

                return _context.finish(19);

              case 22:
                _this.mochaInstance.run();

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 16, 19, 22]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  } //Authenticate and get auth cookie


  _createClass(Serie, [{
    key: "authenticate",
    value: function () {
      var _authenticate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var buff, headers, resp;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                buff = Buffer.from(this.config.auth.toString(), 'utf-8');
                headers = {
                  headers: {
                    "Authorization": "Basic " + buff.toString('base64')
                  }
                };
                _context2.prev = 2;
                _context2.next = 5;
                return axios.put(this.config.baseUrl + '/Authenticate', "", headers);

              case 5:
                resp = _context2.sent;
                return _context2.abrupt("return", resp.headers['set-cookie']);

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](2);
                console.log("Authentification Failed !\n" + _context2.t0);
                return _context2.abrupt("return", 1);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 9]]);
      }));

      function authenticate() {
        return _authenticate.apply(this, arguments);
      }

      return authenticate;
    }()
  }, {
    key: "createStep",
    value: function () {
      var _createStep = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(step) {
        var stepInstance;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                stepInstance = new StepFactory(step, this.auth, this.config, this.executionOrderId);
                this.executionOrderId += 1;
                _context3.next = 4;
                return stepInstance.run();

              case 4:
                return _context3.abrupt("return", stepInstance);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function createStep(_x2) {
        return _createStep.apply(this, arguments);
      }

      return createStep;
    }()
  }]);

  return Serie;
}();

module.exports = Serie;