/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/ts/404/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/readOnlyError.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/readOnlyError.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _readOnlyError(name) {\n  throw new Error(\"\\\"\" + name + \"\\\" is read-only\");\n}\n\nmodule.exports = _readOnlyError;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9yZWFkT25seUVycm9yLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvcmVhZE9ubHlFcnJvci5qcz9kYTYwIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIF9yZWFkT25seUVycm9yKG5hbWUpIHtcbiAgdGhyb3cgbmV3IEVycm9yKFwiXFxcIlwiICsgbmFtZSArIFwiXFxcIiBpcyByZWFkLW9ubHlcIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3JlYWRPbmx5RXJyb3I7Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/@babel/runtime/helpers/readOnlyError.js\n");

/***/ }),

/***/ "./src/ts/404/index.ts":
/*!*****************************!*\
  !*** ./src/ts/404/index.ts ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_readOnlyError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/readOnlyError */ \"./node_modules/@babel/runtime/helpers/readOnlyError.js\");\n/* harmony import */ var _babel_runtime_helpers_readOnlyError__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_readOnlyError__WEBPACK_IMPORTED_MODULE_0__);\n\nvar canvas = document.querySelector(\"#tv\");\nvar context = canvas.getContext(\"gl\") || canvas.getContext(\"2d\");\nvar scaleFactor = 2.5; // Noise size\n\nvar samples = [];\nvar sampleIndex = 0;\nvar scanOffsetY = 0;\nvar scanSize = 0;\nvar FPS = 50;\nvar scanSpeed = FPS * 15; // 15 seconds from top to bottom\n\nvar SAMPLE_COUNT = 10;\n\nwindow.onresize = function () {\n  canvas.width = canvas.offsetWidth / scaleFactor;\n  canvas.height = canvas.width / (canvas.offsetWidth / canvas.offsetHeight);\n  scanSize = canvas.offsetHeight / scaleFactor / 3;\n  samples = [];\n\n  for (var i = 0; i < SAMPLE_COUNT; i++) {\n    samples.push(generateRandomSample(context, canvas.width, canvas.height));\n  }\n};\n\nfunction interpolate(x, x0, y0, x1, y1) {\n  return y0 + (y1 - y0) * ((x - x0) / (x1 - x0));\n}\n\nfunction generateRandomSample(context, w, h) {\n  var intensity = [];\n  var random = 0;\n  var factor = h / 50;\n  var trans = 1 - Math.random() * 0.05;\n  var intensityCurve = [];\n\n  for (var i = 0; i < Math.floor(h / factor) + factor; i++) {\n    intensityCurve.push(Math.floor(Math.random() * 15));\n  }\n\n  for (var i = 0; i < h; i++) {\n    var value = interpolate(i / factor, Math.floor(i / factor), intensityCurve[Math.floor(i / factor)], Math.floor(i / factor) + 1, intensityCurve[Math.floor(i / factor) + 1]);\n    intensity.push(value);\n  }\n\n  var imageData = context.createImageData(w, h);\n\n  for (var i = 0; i < w * h; i++) {\n    var k = i * 4;\n    var color = Math.floor(36 * Math.random()); // Optional: add an intensity curve to try to simulate scan lines\n\n    color += intensity[Math.floor(i / w)];\n    imageData.data[k] = imageData.data[k + 1] = imageData.data[k + 2] = color;\n    imageData.data[k + 3] = Math.round(255 * trans);\n  }\n\n  return imageData;\n}\n\nfunction render() {\n  context.putImageData(samples[Math.floor(sampleIndex)], 0, 0);\n  sampleIndex += (_babel_runtime_helpers_readOnlyError__WEBPACK_IMPORTED_MODULE_0___default()(\"sampleIndex\"), 20 / FPS); // 1/FPS == 1 second\n\n  if (sampleIndex >= samples.length) sampleIndex = (_babel_runtime_helpers_readOnlyError__WEBPACK_IMPORTED_MODULE_0___default()(\"sampleIndex\"), 0);\n  var grd = context.createLinearGradient(0, scanOffsetY, 0, scanSize + scanOffsetY);\n  grd.addColorStop(0, \"rgba(255,255,255,0)\");\n  grd.addColorStop(0.1, \"rgba(255,255,255,0)\");\n  grd.addColorStop(0.2, \"rgba(255,255,255,0.2)\");\n  grd.addColorStop(0.3, \"rgba(255,255,255,0.0)\");\n  grd.addColorStop(0.45, \"rgba(255,255,255,0.1)\");\n  grd.addColorStop(0.5, \"rgba(255,255,255,1.0)\");\n  grd.addColorStop(0.55, \"rgba(255,255,255,0.55)\");\n  grd.addColorStop(0.6, \"rgba(255,255,255,0.25)\"); //grd.addColorStop(0.8, 'rgba(255,255,255,0.15)');\n\n  grd.addColorStop(1, \"rgba(255,255,255,0)\");\n  context.fillStyle = grd;\n  context.fillRect(0, scanOffsetY, canvas.width, scanSize + scanOffsetY);\n  context.globalCompositeOperation = \"lighter\";\n  scanOffsetY += (_babel_runtime_helpers_readOnlyError__WEBPACK_IMPORTED_MODULE_0___default()(\"scanOffsetY\"), canvas.height / scanSpeed);\n  if (scanOffsetY > canvas.height) scanOffsetY = (_babel_runtime_helpers_readOnlyError__WEBPACK_IMPORTED_MODULE_0___default()(\"scanOffsetY\"), -(scanSize / 2));\n  window.requestAnimationFrame(render);\n}\n\nwindow.onresize();\nwindow.requestAnimationFrame(render);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdHMvNDA0L2luZGV4LnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL3RzLzQwNC9pbmRleC50cz8zMTNlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfcmVhZE9ubHlFcnJvciBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9yZWFkT25seUVycm9yXCI7XG52YXIgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0dlwiKTtcbnZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCJnbFwiKSB8fCBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xudmFyIHNjYWxlRmFjdG9yID0gMi41OyAvLyBOb2lzZSBzaXplXG5cbnZhciBzYW1wbGVzID0gW107XG52YXIgc2FtcGxlSW5kZXggPSAwO1xudmFyIHNjYW5PZmZzZXRZID0gMDtcbnZhciBzY2FuU2l6ZSA9IDA7XG52YXIgRlBTID0gNTA7XG52YXIgc2NhblNwZWVkID0gRlBTICogMTU7IC8vIDE1IHNlY29uZHMgZnJvbSB0b3AgdG8gYm90dG9tXG5cbnZhciBTQU1QTEVfQ09VTlQgPSAxMDtcblxud2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24gKCkge1xuICBjYW52YXMud2lkdGggPSBjYW52YXMub2Zmc2V0V2lkdGggLyBzY2FsZUZhY3RvcjtcbiAgY2FudmFzLmhlaWdodCA9IGNhbnZhcy53aWR0aCAvIChjYW52YXMub2Zmc2V0V2lkdGggLyBjYW52YXMub2Zmc2V0SGVpZ2h0KTtcbiAgc2NhblNpemUgPSBjYW52YXMub2Zmc2V0SGVpZ2h0IC8gc2NhbGVGYWN0b3IgLyAzO1xuICBzYW1wbGVzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBTQU1QTEVfQ09VTlQ7IGkrKykge1xuICAgIHNhbXBsZXMucHVzaChnZW5lcmF0ZVJhbmRvbVNhbXBsZShjb250ZXh0LCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gaW50ZXJwb2xhdGUoeCwgeDAsIHkwLCB4MSwgeTEpIHtcbiAgcmV0dXJuIHkwICsgKHkxIC0geTApICogKCh4IC0geDApIC8gKHgxIC0geDApKTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVSYW5kb21TYW1wbGUoY29udGV4dCwgdywgaCkge1xuICB2YXIgaW50ZW5zaXR5ID0gW107XG4gIHZhciByYW5kb20gPSAwO1xuICB2YXIgZmFjdG9yID0gaCAvIDUwO1xuICB2YXIgdHJhbnMgPSAxIC0gTWF0aC5yYW5kb20oKSAqIDAuMDU7XG4gIHZhciBpbnRlbnNpdHlDdXJ2ZSA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgTWF0aC5mbG9vcihoIC8gZmFjdG9yKSArIGZhY3RvcjsgaSsrKSB7XG4gICAgaW50ZW5zaXR5Q3VydmUucHVzaChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNSkpO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBoOyBpKyspIHtcbiAgICB2YXIgdmFsdWUgPSBpbnRlcnBvbGF0ZShpIC8gZmFjdG9yLCBNYXRoLmZsb29yKGkgLyBmYWN0b3IpLCBpbnRlbnNpdHlDdXJ2ZVtNYXRoLmZsb29yKGkgLyBmYWN0b3IpXSwgTWF0aC5mbG9vcihpIC8gZmFjdG9yKSArIDEsIGludGVuc2l0eUN1cnZlW01hdGguZmxvb3IoaSAvIGZhY3RvcikgKyAxXSk7XG4gICAgaW50ZW5zaXR5LnB1c2godmFsdWUpO1xuICB9XG5cbiAgdmFyIGltYWdlRGF0YSA9IGNvbnRleHQuY3JlYXRlSW1hZ2VEYXRhKHcsIGgpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdyAqIGg7IGkrKykge1xuICAgIHZhciBrID0gaSAqIDQ7XG4gICAgdmFyIGNvbG9yID0gTWF0aC5mbG9vcigzNiAqIE1hdGgucmFuZG9tKCkpOyAvLyBPcHRpb25hbDogYWRkIGFuIGludGVuc2l0eSBjdXJ2ZSB0byB0cnkgdG8gc2ltdWxhdGUgc2NhbiBsaW5lc1xuXG4gICAgY29sb3IgKz0gaW50ZW5zaXR5W01hdGguZmxvb3IoaSAvIHcpXTtcbiAgICBpbWFnZURhdGEuZGF0YVtrXSA9IGltYWdlRGF0YS5kYXRhW2sgKyAxXSA9IGltYWdlRGF0YS5kYXRhW2sgKyAyXSA9IGNvbG9yO1xuICAgIGltYWdlRGF0YS5kYXRhW2sgKyAzXSA9IE1hdGgucm91bmQoMjU1ICogdHJhbnMpO1xuICB9XG5cbiAgcmV0dXJuIGltYWdlRGF0YTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyKCkge1xuICBjb250ZXh0LnB1dEltYWdlRGF0YShzYW1wbGVzW01hdGguZmxvb3Ioc2FtcGxlSW5kZXgpXSwgMCwgMCk7XG4gIHNhbXBsZUluZGV4ICs9IChfcmVhZE9ubHlFcnJvcihcInNhbXBsZUluZGV4XCIpLCAyMCAvIEZQUyk7IC8vIDEvRlBTID09IDEgc2Vjb25kXG5cbiAgaWYgKHNhbXBsZUluZGV4ID49IHNhbXBsZXMubGVuZ3RoKSBzYW1wbGVJbmRleCA9IChfcmVhZE9ubHlFcnJvcihcInNhbXBsZUluZGV4XCIpLCAwKTtcbiAgdmFyIGdyZCA9IGNvbnRleHQuY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgc2Nhbk9mZnNldFksIDAsIHNjYW5TaXplICsgc2Nhbk9mZnNldFkpO1xuICBncmQuYWRkQ29sb3JTdG9wKDAsIFwicmdiYSgyNTUsMjU1LDI1NSwwKVwiKTtcbiAgZ3JkLmFkZENvbG9yU3RvcCgwLjEsIFwicmdiYSgyNTUsMjU1LDI1NSwwKVwiKTtcbiAgZ3JkLmFkZENvbG9yU3RvcCgwLjIsIFwicmdiYSgyNTUsMjU1LDI1NSwwLjIpXCIpO1xuICBncmQuYWRkQ29sb3JTdG9wKDAuMywgXCJyZ2JhKDI1NSwyNTUsMjU1LDAuMClcIik7XG4gIGdyZC5hZGRDb2xvclN0b3AoMC40NSwgXCJyZ2JhKDI1NSwyNTUsMjU1LDAuMSlcIik7XG4gIGdyZC5hZGRDb2xvclN0b3AoMC41LCBcInJnYmEoMjU1LDI1NSwyNTUsMS4wKVwiKTtcbiAgZ3JkLmFkZENvbG9yU3RvcCgwLjU1LCBcInJnYmEoMjU1LDI1NSwyNTUsMC41NSlcIik7XG4gIGdyZC5hZGRDb2xvclN0b3AoMC42LCBcInJnYmEoMjU1LDI1NSwyNTUsMC4yNSlcIik7IC8vZ3JkLmFkZENvbG9yU3RvcCgwLjgsICdyZ2JhKDI1NSwyNTUsMjU1LDAuMTUpJyk7XG5cbiAgZ3JkLmFkZENvbG9yU3RvcCgxLCBcInJnYmEoMjU1LDI1NSwyNTUsMClcIik7XG4gIGNvbnRleHQuZmlsbFN0eWxlID0gZ3JkO1xuICBjb250ZXh0LmZpbGxSZWN0KDAsIHNjYW5PZmZzZXRZLCBjYW52YXMud2lkdGgsIHNjYW5TaXplICsgc2Nhbk9mZnNldFkpO1xuICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwibGlnaHRlclwiO1xuICBzY2FuT2Zmc2V0WSArPSAoX3JlYWRPbmx5RXJyb3IoXCJzY2FuT2Zmc2V0WVwiKSwgY2FudmFzLmhlaWdodCAvIHNjYW5TcGVlZCk7XG4gIGlmIChzY2FuT2Zmc2V0WSA+IGNhbnZhcy5oZWlnaHQpIHNjYW5PZmZzZXRZID0gKF9yZWFkT25seUVycm9yKFwic2Nhbk9mZnNldFlcIiksIC0oc2NhblNpemUgLyAyKSk7XG4gIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbn1cblxud2luZG93Lm9ucmVzaXplKCk7XG53aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/ts/404/index.ts\n");

/***/ })

/******/ });