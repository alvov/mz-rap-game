(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["mock"],{

/***/ "./src/consts.js":
/*!***********************!*\
  !*** ./src/consts.js ***!
  \***********************/
/*! exports provided: LoopState, API_URL, MAXIMUM_RECORD_TURNS, MAXIMUM_NEWS_READ, VOLUME, BPM, BEATS_IN_LOOP, LOOP_DURATION_SEC, SpeechSynthesisUtterance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoopState", function() { return LoopState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API_URL", function() { return API_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAXIMUM_RECORD_TURNS", function() { return MAXIMUM_RECORD_TURNS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAXIMUM_NEWS_READ", function() { return MAXIMUM_NEWS_READ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VOLUME", function() { return VOLUME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BPM", function() { return BPM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BEATS_IN_LOOP", function() { return BEATS_IN_LOOP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOOP_DURATION_SEC", function() { return LOOP_DURATION_SEC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpeechSynthesisUtterance", function() { return SpeechSynthesisUtterance; });
var LoopState = {
  Off: "off",
  Loading: "loading",
  NextOn: "nextOn",
  NextOff: "nextOff",
  Active: "active"
};
var API_URL = "".concat(location.origin, "/api/rap_rec");
var MAXIMUM_RECORD_TURNS = 32;
var MAXIMUM_NEWS_READ = 15;
var VOLUME = 0.3;
var BPM = 90;
var BEATS_IN_LOOP = 8;
var LOOP_DURATION_SEC = BEATS_IN_LOOP / (BPM / 60);
var SpeechSynthesisUtterance = window.webkitSpeechSynthesisUtterance || window.mozSpeechSynthesisUtterance || window.msSpeechSynthesisUtterance || window.oSpeechSynthesisUtterance || window.SpeechSynthesisUtterance;

/***/ }),

/***/ "./src/utils/apiMock.js":
/*!******************************!*\
  !*** ./src/utils/apiMock.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var fetch_mock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fetch-mock */ "./node_modules/fetch-mock/es5/client.js");
/* harmony import */ var fetch_mock__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fetch_mock__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils/utils.js");



fetch_mock__WEBPACK_IMPORTED_MODULE_0__["post"]("".concat(location.origin, "/api/rap_rec"), function (url, opts) {
  var requestData = JSON.parse(opts.body);

  if (!requestData.loops) {
    requestData.loops = [];
  }

  if (!requestData.shots) {
    requestData.shots = [];
  }

  var guid = "rec_".concat(Math.random());
  localStorage.setItem(guid, JSON.stringify(requestData));
  console.log(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getShareLink"])(guid));
  return {
    guid: guid
  };
}).get(new RegExp("".concat(location.origin, "/api/rap_rec")), function (url, opts) {
  var guid = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getRecordFromUrl"])("?".concat(url.split("?")[1]));

  if (guid !== null) {
    var data = localStorage.getItem(guid);

    if (typeof data === "string") {
      return {
        data: JSON.parse(data)
      };
    }
  }
});

/***/ }),

/***/ "./src/utils/utils.js":
/*!****************************!*\
  !*** ./src/utils/utils.js ***!
  \****************************/
/*! exports provided: getShareLink, randomInRange, getRecordFromUrl, getNewsDurationMs, testSpeechSynthesis, testSpeechSynthesisUtterance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getShareLink", function() { return getShareLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomInRange", function() { return randomInRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRecordFromUrl", function() { return getRecordFromUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNewsDurationMs", function() { return getNewsDurationMs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "testSpeechSynthesis", function() { return testSpeechSynthesis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "testSpeechSynthesisUtterance", function() { return testSpeechSynthesisUtterance; });
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../consts */ "./src/consts.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }


var getShareLink = function getShareLink(guid) {
  return "".concat(location.origin).concat(location.pathname, "?rec=").concat(guid, "&_share=1");
};
var randomInRange = function randomInRange(min, max) {
  return min + Math.random() * (max - min);
};
var getRecordFromUrl = function getRecordFromUrl() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location.search;
  var urlParams = new URLSearchParams(url);
  return urlParams.get("rec");
};
var getNewsDurationMs = function getNewsDurationMs(text) {
  return text.length * 50;
};
var testSpeechSynthesis = function testSpeechSynthesis() {
  return _typeof(window.speechSynthesis) === "object" && typeof window.speechSynthesis.getVoices === "function" && typeof window.speechSynthesis.speak === "function" && typeof window.speechSynthesis.cancel === "function";
};
var testSpeechSynthesisUtterance = function testSpeechSynthesisUtterance() {
  try {
    var utter = new _consts__WEBPACK_IMPORTED_MODULE_0__["SpeechSynthesisUtterance"]("тест");
    return _typeof(utter.voice) === "object" && typeof utter.pitch === "number" && typeof utter.rate === "number";
  } catch (e) {
    return false;
  }
};

/***/ })

},[["./src/utils/apiMock.js","runtime","vendor"]]]);