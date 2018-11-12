(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["mock"],{

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



fetch_mock__WEBPACK_IMPORTED_MODULE_0__["post"](`${location.origin}/api/rap_rec`, (url, opts) => {
  const requestData = JSON.parse(opts.body);

  if (!requestData.loops) {
    requestData.loops = [];
  }

  if (!requestData.shots) {
    requestData.shots = [];
  }

  const guid = `rec_${Math.random()}`;
  localStorage.setItem(guid, JSON.stringify(requestData));
  console.log(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getShareLink"])(guid));
  return {
    guid
  };
}).get(new RegExp(`${location.origin}\/api\/rap_rec`), (url, opts) => {
  const guid = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getRecordFromUrl"])(`?${url.split("?")[1]}`);

  if (guid !== null) {
    const data = localStorage.getItem(guid);

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
/*! exports provided: getShareLink, randomInRange, getRecordFromUrl, getNewsDurationMs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getShareLink", function() { return getShareLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomInRange", function() { return randomInRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRecordFromUrl", function() { return getRecordFromUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNewsDurationMs", function() { return getNewsDurationMs; });
const getShareLink = guid => {
  return `${location.origin}${location.pathname}?rec=${guid}&_share=1`;
};
const randomInRange = (min, max) => {
  return min + Math.random() * (max - min);
};
const getRecordFromUrl = (url = window.location.search) => {
  const urlParams = new URLSearchParams(url);
  return urlParams.get("rec");
};
const getNewsDurationMs = text => {
  return text.length * 50;
};

/***/ })

},[["./src/utils/apiMock.js","runtime","vendor"]]]);