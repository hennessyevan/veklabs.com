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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/ts/features/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ts/features/index.ts":
/*!**********************************!*\
  !*** ./src/ts/features/index.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nvar trailers = document.querySelectorAll(\".trailer\");\n\nvar _iterator = _createForOfIteratorHelper(trailers),\n    _step;\n\ntry {\n  var _loop = function _loop() {\n    var trailer = _step.value;\n    var video = trailer.querySelector(\"video\");\n    var controlElement = trailer.querySelector(\".play-icon\");\n    var fullscreenElement = trailer.querySelector(\".fullscreen-icon\");\n    fullscreenElement.addEventListener(\"click\", function (e) {\n      e.stopPropagation();\n      video.requestFullscreen();\n    });\n    video.addEventListener(\"ended\", function () {\n      video.load();\n      trailer.setAttribute(\"playing\", \"false\");\n      trailer.setAttribute(\"played\", \"false\");\n    });\n    trailer.addEventListener(\"click\", function () {\n      if (video.paused) {\n        video.play();\n        trailer.setAttribute(\"playing\", \"true\");\n        trailer.setAttribute(\"played\", \"true\");\n        controlElement.setAttribute(\"src\", \"/assets/controls-pause.svg\");\n      } else {\n        video.pause();\n        trailer.setAttribute(\"playing\", \"false\");\n        controlElement.setAttribute(\"src\", \"/assets/controls-play.svg\");\n      }\n    });\n  };\n\n  for (_iterator.s(); !(_step = _iterator.n()).done;) {\n    _loop();\n  }\n} catch (err) {\n  _iterator.e(err);\n} finally {\n  _iterator.f();\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdHMvZmVhdHVyZXMvaW5kZXgudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdHMvZmVhdHVyZXMvaW5kZXgudHM/OTg1YSJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB0cmFpbGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudHJhaWxlclwiKVxuXG5mb3IgKGNvbnN0IHRyYWlsZXIgb2YgdHJhaWxlcnMpIHtcbiBjb25zdCB2aWRlbzogSFRNTFZpZGVvRWxlbWVudCA9IHRyYWlsZXIucXVlcnlTZWxlY3RvcihcInZpZGVvXCIpXG4gY29uc3QgY29udHJvbEVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQgPSB0cmFpbGVyLnF1ZXJ5U2VsZWN0b3IoXCIucGxheS1pY29uXCIpXG4gY29uc3QgZnVsbHNjcmVlbkVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQgPSB0cmFpbGVyLnF1ZXJ5U2VsZWN0b3IoXG4gIFwiLmZ1bGxzY3JlZW4taWNvblwiXG4gKVxuXG4gZnVsbHNjcmVlbkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGUuc3RvcFByb3BhZ2F0aW9uKClcblxuICB2aWRlby5yZXF1ZXN0RnVsbHNjcmVlbigpXG4gfSlcblxuIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoXCJlbmRlZFwiLCAoKSA9PiB7XG4gIHZpZGVvLmxvYWQoKVxuICB0cmFpbGVyLnNldEF0dHJpYnV0ZShcInBsYXlpbmdcIiwgXCJmYWxzZVwiKVxuICB0cmFpbGVyLnNldEF0dHJpYnV0ZShcInBsYXllZFwiLCBcImZhbHNlXCIpXG4gfSlcblxuIHRyYWlsZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgaWYgKHZpZGVvLnBhdXNlZCkge1xuICAgdmlkZW8ucGxheSgpXG5cbiAgIHRyYWlsZXIuc2V0QXR0cmlidXRlKFwicGxheWluZ1wiLCBcInRydWVcIilcbiAgIHRyYWlsZXIuc2V0QXR0cmlidXRlKFwicGxheWVkXCIsIFwidHJ1ZVwiKVxuXG4gICBjb250cm9sRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCIvYXNzZXRzL2NvbnRyb2xzLXBhdXNlLnN2Z1wiKVxuICB9IGVsc2Uge1xuICAgdmlkZW8ucGF1c2UoKVxuXG4gICB0cmFpbGVyLnNldEF0dHJpYnV0ZShcInBsYXlpbmdcIiwgXCJmYWxzZVwiKVxuICAgY29udHJvbEVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiL2Fzc2V0cy9jb250cm9scy1wbGF5LnN2Z1wiKVxuICB9XG4gfSlcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFqQ0E7QUFBQTtBQWtDQTs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/ts/features/index.ts\n");

/***/ })

/******/ });