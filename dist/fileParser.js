"use strict";function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var fs = require("fs");var

FileParser =
function FileParser(filename, config) {var _this = this;_classCallCheck(this, FileParser);_defineProperty(this, "getData",




  function () {
    return _this.data;
  });this.config = config;var rawdata = fs.readFileSync(filename, { encoding: 'utf-8' });this.data = JSON.parse(rawdata);};

module.exports = FileParser;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9maWxlUGFyc2VyLmpzIl0sIm5hbWVzIjpbImZzIiwicmVxdWlyZSIsIkZpbGVQYXJzZXIiLCJmaWxlbmFtZSIsImNvbmZpZyIsImRhdGEiLCJyYXdkYXRhIiwicmVhZEZpbGVTeW5jIiwiZW5jb2RpbmciLCJKU09OIiwicGFyc2UiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiNFdBQUEsSUFBTUEsRUFBRSxHQUFHQyxPQUFPLENBQUMsSUFBRCxDQUFsQixDOztBQUVNQyxVO0FBQ0Ysb0JBQVlDLFFBQVosRUFBc0JDLE1BQXRCLEVBQTZCOzs7OztBQUtuQixjQUFNO0FBQ1osV0FBTyxLQUFJLENBQUNDLElBQVo7QUFDSCxHQVA0QixFQUN6QixLQUFLRCxNQUFMLEdBQWNBLE1BQWQsQ0FDQSxJQUFJRSxPQUFPLEdBQUdOLEVBQUUsQ0FBQ08sWUFBSCxDQUFnQkosUUFBaEIsRUFBMEIsRUFBQ0ssUUFBUSxFQUFFLE9BQVgsRUFBMUIsQ0FBZCxDQUNBLEtBQUtILElBQUwsR0FBYUksSUFBSSxDQUFDQyxLQUFMLENBQVdKLE9BQVgsQ0FBYixDQUNILEM7O0FBS0xLLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQlYsVUFBakIiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBmcyA9IHJlcXVpcmUoXCJmc1wiKTtcblxuY2xhc3MgRmlsZVBhcnNlciB7XG4gICAgY29uc3RydWN0b3IoZmlsZW5hbWUsIGNvbmZpZyl7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnOyAgIFxuICAgICAgICBsZXQgcmF3ZGF0YSA9IGZzLnJlYWRGaWxlU3luYyhmaWxlbmFtZSwge2VuY29kaW5nOiAndXRmLTgnfSk7XG4gICAgICAgIHRoaXMuZGF0YSAgPSBKU09OLnBhcnNlKHJhd2RhdGEpO1xuICAgIH1cbiAgICBnZXREYXRhID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhO1xuICAgIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gRmlsZVBhcnNlcjtcbiJdfQ==