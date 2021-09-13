"use strict";function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _typeof(obj) {"@babel/helpers - typeof";if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {_typeof = function _typeof(obj) {return typeof obj;};} else {_typeof = function _typeof(obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};}return _typeof(obj);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var Cache =
function Cache() {var _this = this;_classCallCheck(this, Cache);_defineProperty(this, "put",


  function (key, value) {
    if (_this.cacheArr[key] === undefined) {
      _this.cacheArr[key] = value;
    }
  });_defineProperty(this, "get",
  function (key) {
    if (_this.cacheArr[key] != undefined) {
      return _this.cacheArr[key];
    }
  });_defineProperty(this, "applyValue",
  function (value) {
    var response = value;
    if (!!response) {
      if (_typeof(response) === 'object') {
        for (var _i = 0, _Object$entries = Object.entries(response); _i < _Object$entries.length; _i++) {var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),key = _Object$entries$_i[0],inner_value = _Object$entries$_i[1];
          response[key] = _this.applyValue(inner_value);
        }
      } else if (typeof response === 'array') {
        response.forEach(function (element, index) {
          response[index] = _this.applyValue(element);
        });
      } else {
        if (_this.isCacheVariable(value)) {
          return _this.get(value);
        }
      }
    }
    return response;
  });_defineProperty(this, "isCacheVariable",
  function (value) {
    var regex = /\$\{([A-Za-z0-9_]*)\}/i;
    return regex.test(value);
  });this.cacheArr = {};};

module.exports = Cache;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jYWNoZUNsYXNzLmpzIl0sIm5hbWVzIjpbIkNhY2hlIiwia2V5IiwidmFsdWUiLCJjYWNoZUFyciIsInVuZGVmaW5lZCIsInJlc3BvbnNlIiwiT2JqZWN0IiwiZW50cmllcyIsImlubmVyX3ZhbHVlIiwiYXBwbHlWYWx1ZSIsImZvckVhY2giLCJlbGVtZW50IiwiaW5kZXgiLCJpc0NhY2hlVmFyaWFibGUiLCJnZXQiLCJyZWdleCIsInRlc3QiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoieXBFQUFNQSxLO0FBQ0YsaUJBQWE7OztBQUdQLFlBQUNDLEdBQUQsRUFBTUMsS0FBTixFQUFnQjtBQUNsQixRQUFHLEtBQUksQ0FBQ0MsUUFBTCxDQUFjRixHQUFkLE1BQXVCRyxTQUExQixFQUFvQztBQUNoQyxNQUFBLEtBQUksQ0FBQ0QsUUFBTCxDQUFjRixHQUFkLElBQXFCQyxLQUFyQjtBQUNIO0FBQ0osR0FQWTtBQVFQLFlBQUNELEdBQUQsRUFBUztBQUNYLFFBQUcsS0FBSSxDQUFDRSxRQUFMLENBQWNGLEdBQWQsS0FBc0JHLFNBQXpCLEVBQW1DO0FBQy9CLGFBQU8sS0FBSSxDQUFDRCxRQUFMLENBQWNGLEdBQWQsQ0FBUDtBQUNIO0FBQ0osR0FaWTtBQWFBLFlBQUNDLEtBQUQsRUFBVztBQUNwQixRQUFJRyxRQUFRLEdBQUdILEtBQWY7QUFDQSxRQUFHLENBQUMsQ0FBQ0csUUFBTCxFQUFjO0FBQ04sVUFBRyxRQUFPQSxRQUFQLE1BQXFCLFFBQXhCLEVBQWlDO0FBQzdCLDJDQUE4QkMsTUFBTSxDQUFDQyxPQUFQLENBQWVGLFFBQWYsQ0FBOUIscUNBQXVELGlFQUE5Q0osR0FBOEMseUJBQXpDTyxXQUF5QztBQUNuREgsVUFBQUEsUUFBUSxDQUFDSixHQUFELENBQVIsR0FBZ0IsS0FBSSxDQUFDUSxVQUFMLENBQWdCRCxXQUFoQixDQUFoQjtBQUNIO0FBQ0osT0FKRCxNQUlNLElBQUcsT0FBT0gsUUFBUCxLQUFxQixPQUF4QixFQUFnQztBQUNsQ0EsUUFBQUEsUUFBUSxDQUFDSyxPQUFULENBQWlCLFVBQUNDLE9BQUQsRUFBVUMsS0FBVixFQUFvQjtBQUNqQ1AsVUFBQUEsUUFBUSxDQUFDTyxLQUFELENBQVIsR0FBa0IsS0FBSSxDQUFDSCxVQUFMLENBQWdCRSxPQUFoQixDQUFsQjtBQUNILFNBRkQ7QUFHSCxPQUpLLE1BSUQ7QUFDRCxZQUFHLEtBQUksQ0FBQ0UsZUFBTCxDQUFxQlgsS0FBckIsQ0FBSCxFQUErQjtBQUMzQixpQkFBTyxLQUFJLENBQUNZLEdBQUwsQ0FBU1osS0FBVCxDQUFQO0FBQ0g7QUFDSjtBQUNSO0FBQ0QsV0FBT0csUUFBUDtBQUNILEdBL0JZO0FBZ0NLLFlBQUNILEtBQUQsRUFBVztBQUN6QixRQUFJYSxLQUFLLEdBQUcsd0JBQVo7QUFDQSxXQUFPQSxLQUFLLENBQUNDLElBQU4sQ0FBV2QsS0FBWCxDQUFQO0FBQ0gsR0FuQ1ksRUFDVCxLQUFLQyxRQUFMLEdBQWdCLEVBQWhCLENBQ0gsQzs7QUFtQ0xjLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmxCLEtBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQ2FjaGV7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuY2FjaGVBcnIgPSB7fVxyXG4gICAgfSBcclxuICAgIHB1dCA9IChrZXksIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgaWYodGhpcy5jYWNoZUFycltrZXldID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmNhY2hlQXJyW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9IFxyXG4gICAgZ2V0ID0gKGtleSkgPT4ge1xyXG4gICAgICAgIGlmKHRoaXMuY2FjaGVBcnJba2V5XSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZUFycltrZXldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGFwcGx5VmFsdWUgPSAodmFsdWUpID0+IHtcclxuICAgICAgICBsZXQgcmVzcG9uc2UgPSB2YWx1ZTtcclxuICAgICAgICBpZighIXJlc3BvbnNlKXtcclxuICAgICAgICAgICAgICAgIGlmKHR5cGVvZihyZXNwb25zZSkgPT09ICdvYmplY3QnKXtcclxuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IFtrZXksIGlubmVyX3ZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhyZXNwb25zZSkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZVtrZXldID0gdGhpcy5hcHBseVZhbHVlKGlubmVyX3ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0eXBlb2YocmVzcG9uc2UpID09PSAnYXJyYXknKXtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZVtpbmRleF0gPSB0aGlzLmFwcGx5VmFsdWUoZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNDYWNoZVZhcmlhYmxlKHZhbHVlKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICB9XHJcbiAgICBpc0NhY2hlVmFyaWFibGUgPSAodmFsdWUpID0+IHtcclxuICAgICAgICBsZXQgcmVnZXggPSAvXFwkXFx7KFtBLVphLXowLTlfXSopXFx9L2k7XHJcbiAgICAgICAgcmV0dXJuIHJlZ2V4LnRlc3QodmFsdWUpO1xyXG4gICAgfVxyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gQ2FjaGU7Il19