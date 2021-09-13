"use strict";function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var fs = require('fs');
var Ajv = require("ajv")["default"];
var path = require("path");var

ValidateFile =
function ValidateFile(config, _filename) {var _this = this;_classCallCheck(this, ValidateFile);_defineProperty(this, "getPathFile",





  function (filename) {
    return path.resolve(_this.config.testFolder + "/validator/", filename);
  });_defineProperty(this, "validFile",
  function (data) {
    var validate = _this.ajv.compile(_this.schema);
    try {
      return validate(data);
    } catch (err) {
      console.log(validate.errors);
      return false;
    }
  });this.ajv = new Ajv({ strict: false, allowUnionTypes: true, allErrors: true });this.config = config;this.rawData = fs.readFileSync(this.getPathFile(_filename), { encoding: 'utf-8' });this.schema = JSON.parse(this.rawData);};

module.exports = ValidateFile;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92YWxpZGF0ZUZpbGVzLmpzIl0sIm5hbWVzIjpbImZzIiwicmVxdWlyZSIsIkFqdiIsInBhdGgiLCJWYWxpZGF0ZUZpbGUiLCJjb25maWciLCJmaWxlbmFtZSIsInJlc29sdmUiLCJ0ZXN0Rm9sZGVyIiwiZGF0YSIsInZhbGlkYXRlIiwiYWp2IiwiY29tcGlsZSIsInNjaGVtYSIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJlcnJvcnMiLCJzdHJpY3QiLCJhbGxvd1VuaW9uVHlwZXMiLCJhbGxFcnJvcnMiLCJyYXdEYXRhIiwicmVhZEZpbGVTeW5jIiwiZ2V0UGF0aEZpbGUiLCJlbmNvZGluZyIsIkpTT04iLCJwYXJzZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI0V0FBQSxJQUFNQSxFQUFFLEdBQUlDLE9BQU8sQ0FBQyxJQUFELENBQW5CO0FBQ0EsSUFBTUMsR0FBRyxHQUFHRCxPQUFPLENBQUMsS0FBRCxDQUFQLFdBQVo7QUFDQSxJQUFNRSxJQUFJLEdBQUdGLE9BQU8sQ0FBQyxNQUFELENBQXBCLEM7O0FBRU1HLFk7QUFDRixzQkFBWUMsTUFBWixFQUFvQkMsU0FBcEIsRUFBNkI7Ozs7OztBQU1mLFlBQUNBLFFBQUQsRUFBZTtBQUN6QixXQUFPSCxJQUFJLENBQUNJLE9BQUwsQ0FBYSxLQUFJLENBQUNGLE1BQUwsQ0FBWUcsVUFBWixHQUF5QixhQUF0QyxFQUFxREYsUUFBckQsQ0FBUDtBQUNILEdBUjRCO0FBU2pCLFlBQUNHLElBQUQsRUFBVTtBQUNsQixRQUFNQyxRQUFRLEdBQUcsS0FBSSxDQUFDQyxHQUFMLENBQVNDLE9BQVQsQ0FBaUIsS0FBSSxDQUFDQyxNQUF0QixDQUFqQjtBQUNBLFFBQUc7QUFDQyxhQUFPSCxRQUFRLENBQUNELElBQUQsQ0FBZjtBQUNILEtBRkQsQ0FFQyxPQUFNSyxHQUFOLEVBQVU7QUFDUEMsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlOLFFBQVEsQ0FBQ08sTUFBckI7QUFDQSxhQUFPLEtBQVA7QUFDSDtBQUNKLEdBakI0QixFQUN6QixLQUFLTixHQUFMLEdBQVcsSUFBSVQsR0FBSixDQUFRLEVBQUNnQixNQUFNLEVBQUUsS0FBVCxFQUFnQkMsZUFBZSxFQUFFLElBQWpDLEVBQXVDQyxTQUFTLEVBQUUsSUFBbEQsRUFBUixDQUFYLENBQ0EsS0FBS2YsTUFBTCxHQUFjQSxNQUFkLENBQ0EsS0FBS2dCLE9BQUwsR0FBZXJCLEVBQUUsQ0FBQ3NCLFlBQUgsQ0FBZ0IsS0FBS0MsV0FBTCxDQUFpQmpCLFNBQWpCLENBQWhCLEVBQTRDLEVBQUNrQixRQUFRLEVBQUUsT0FBWCxFQUE1QyxDQUFmLENBQ0EsS0FBS1gsTUFBTCxHQUFjWSxJQUFJLENBQUNDLEtBQUwsQ0FBVyxLQUFLTCxPQUFoQixDQUFkLENBQ0gsQzs7QUFjTE0sTUFBTSxDQUFDQyxPQUFQLEdBQWlCeEIsWUFBakIiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBmcyA9ICByZXF1aXJlKCdmcycpO1xyXG5jb25zdCBBanYgPSByZXF1aXJlKFwiYWp2XCIpLmRlZmF1bHRcclxuY29uc3QgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpXHJcblxyXG5jbGFzcyBWYWxpZGF0ZUZpbGV7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcsIGZpbGVuYW1lKXtcclxuICAgICAgICB0aGlzLmFqdiA9IG5ldyBBanYoe3N0cmljdDogZmFsc2UsIGFsbG93VW5pb25UeXBlczogdHJ1ZSwgYWxsRXJyb3JzOiB0cnVlfSk7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgdGhpcy5yYXdEYXRhID0gZnMucmVhZEZpbGVTeW5jKHRoaXMuZ2V0UGF0aEZpbGUoZmlsZW5hbWUpLCB7ZW5jb2Rpbmc6ICd1dGYtOCd9KVxyXG4gICAgICAgIHRoaXMuc2NoZW1hID0gSlNPTi5wYXJzZSh0aGlzLnJhd0RhdGEpXHJcbiAgICB9XHJcbiAgICBnZXRQYXRoRmlsZSA9IChmaWxlbmFtZSkgPT4gIHtcclxuICAgICAgICByZXR1cm4gcGF0aC5yZXNvbHZlKHRoaXMuY29uZmlnLnRlc3RGb2xkZXIgKyBcIi92YWxpZGF0b3IvXCIsIGZpbGVuYW1lKTtcclxuICAgIH1cclxuICAgIHZhbGlkRmlsZSA9IChkYXRhKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdmFsaWRhdGUgPSB0aGlzLmFqdi5jb21waWxlKHRoaXMuc2NoZW1hKTtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWxpZGF0ZShkYXRhKTtcclxuICAgICAgICB9Y2F0Y2goZXJyKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codmFsaWRhdGUuZXJyb3JzKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IFZhbGlkYXRlRmlsZTtcclxuIl19