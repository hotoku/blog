/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 9649:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
// EXTERNAL MODULE: ./node_modules/react-dom/client.js
var client = __webpack_require__(745);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
;// CONCATENATED MODULE: ./src/components/MangaCard.tsx
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var MangaCard = function (_a) {
    var item = _a.item;
    var amazonUrl = "https://www.amazon.co.jp/dp/".concat(item.asin, "/?tag=hotoku66-22");
    var imageUrl = "https://images-na.ssl-images-amazon.com/images/P/".concat(item.asin, ".09.LZZZZZZZ.jpg");
    return ((0,jsx_runtime.jsxs)("div", __assign({ className: "amazon-card", style: {
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
        } }, { children: [(0,jsx_runtime.jsx)("div", __assign({ className: "amazon-image", style: { flex: "0 0 120px", marginRight: "15px" } }, { children: (0,jsx_runtime.jsx)("a", __assign({ href: amazonUrl, target: "_blank", rel: "noopener" }, { children: (0,jsx_runtime.jsx)("img", { src: imageUrl, alt: item.title, style: { maxWidth: "100%", height: "auto" } }) })) })), (0,jsx_runtime.jsxs)("div", __assign({ className: "amazon-info" }, { children: [(0,jsx_runtime.jsx)("p", __assign({ style: { margin: "0 0 10px 0", fontWeight: "bold" } }, { children: (0,jsx_runtime.jsx)("a", __assign({ href: amazonUrl, target: "_blank", rel: "noopener", style: { textDecoration: "none", color: "#333" } }, { children: item.title })) })), (0,jsx_runtime.jsx)("a", __assign({ href: amazonUrl, target: "_blank", rel: "noopener", style: {
                            background: "#f0c14b",
                            border: "1px solid #a88734",
                            padding: "5px 15px",
                            borderRadius: "3px",
                            color: "#111",
                            textDecoration: "none",
                            fontSize: "0.9em",
                        } }, { children: "Amazon\u3067\u898B\u308B" }))] }))] })));
};

;// CONCATENATED MODULE: ./src/components/MangaTile.tsx
var MangaTile_assign = (undefined && undefined.__assign) || function () {
    MangaTile_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return MangaTile_assign.apply(this, arguments);
};


var MangaTile = function (_a) {
    var item = _a.item;
    var _b = (0,react.useState)(false), isHovered = _b[0], setIsHovered = _b[1];
    var amazonUrl = "https://www.amazon.co.jp/dp/".concat(item.asin, "/?tag=hotoku66-22");
    var imageUrl = "https://images-na.ssl-images-amazon.com/images/P/".concat(item.asin, ".09.LZZZZZZZ.jpg");
    return ((0,jsx_runtime.jsx)("div", MangaTile_assign({ className: "manga-tile", style: {
            position: "relative",
            border: "1px solid #ddd",
            borderRadius: "8px",
            overflow: "hidden",
            transition: "transform 0.2s ease",
            cursor: "pointer",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
        }, onMouseEnter: function () { return setIsHovered(true); }, onMouseLeave: function () { return setIsHovered(false); } }, { children: (0,jsx_runtime.jsxs)("a", MangaTile_assign({ href: amazonUrl, target: "_blank", rel: "noopener" }, { children: [(0,jsx_runtime.jsx)("img", { src: imageUrl, alt: item.title, style: {
                        width: "100%",
                        height: "auto",
                        display: "block",
                    } }), isHovered && ((0,jsx_runtime.jsx)("div", MangaTile_assign({ style: {
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: "rgba(0, 0, 0, 0.8)",
                        color: "white",
                        padding: "8px",
                        fontSize: "0.85em",
                        lineHeight: "1.2",
                    } }, { children: item.series_name })))] })) })));
};

;// CONCATENATED MODULE: ./src/components/ToggleButton.tsx
var ToggleButton_assign = (undefined && undefined.__assign) || function () {
    ToggleButton_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return ToggleButton_assign.apply(this, arguments);
};

var ToggleButton = function (_a) {
    var viewMode = _a.viewMode, onToggle = _a.onToggle;
    return ((0,jsx_runtime.jsx)("div", ToggleButton_assign({ style: { marginBottom: "20px", textAlign: "center" } }, { children: (0,jsx_runtime.jsx)("button", ToggleButton_assign({ onClick: onToggle, style: {
                background: "#f0c14b",
                border: "1px solid #a88734",
                padding: "10px 20px",
                borderRadius: "5px",
                color: "#111",
                fontSize: "0.9em",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "background 0.2s ease",
            }, onMouseEnter: function (e) {
                e.currentTarget.style.background = "#e0b13b";
            }, onMouseLeave: function (e) {
                e.currentTarget.style.background = "#f0c14b";
            } }, { children: viewMode === "card"
                ? "📱 タイル表示に切り替え"
                : "📋 カード表示に切り替え" })) })));
};

;// CONCATENATED MODULE: ./src/components/MangaViewer.tsx
var MangaViewer_assign = (undefined && undefined.__assign) || function () {
    MangaViewer_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return MangaViewer_assign.apply(this, arguments);
};





var MangaViewer = function (_a) {
    var items = _a.items;
    var _b = (0,react.useState)("card"), viewMode = _b[0], setViewMode = _b[1];
    var toggleViewMode = function () {
        setViewMode(function (prev) { return (prev === "card" ? "tile" : "card"); });
    };
    return ((0,jsx_runtime.jsxs)("div", MangaViewer_assign({ className: "manga-viewer" }, { children: [(0,jsx_runtime.jsx)(ToggleButton, { viewMode: viewMode, onToggle: toggleViewMode }), (0,jsx_runtime.jsx)("div", MangaViewer_assign({ className: "manga-container ".concat(viewMode, "-view") }, { children: viewMode === "card"
                    ? items.map(function (item) { return (0,jsx_runtime.jsx)(MangaCard, { item: item }, item.asin); })
                    : items.map(function (item) { return (0,jsx_runtime.jsx)(MangaTile, { item: item }, item.asin); }) }))] })));
};

;// CONCATENATED MODULE: ./src/index.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



function main() {
    return __awaiter(this, void 0, void 0, function () {
        var convertMermaidTag;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("main start");
                    return [4 /*yield*/, Promise.all(/* import() */[__webpack_require__.e(890), __webpack_require__.e(476)]).then(__webpack_require__.bind(__webpack_require__, 1903))];
                case 1:
                    convertMermaidTag = (_a.sent()).default;
                    console.log("imported");
                    convertMermaidTag();
                    // 新しいManga Viewer機能
                    console.log("About to initialize MangaViewer");
                    initializeMangaViewer();
                    return [2 /*return*/];
            }
        });
    });
}
function initializeMangaViewer() {
    console.log("initializeMangaViewer called");
    var container = document.getElementById('manga-viewer-container');
    console.log("Container element:", container);
    if (!container) {
        console.error("manga-viewer-container not found!");
        return;
    }
    // HTMLから埋め込まれたデータを取得
    var dataElement = document.getElementById('manga-data');
    console.log("Data element:", dataElement);
    if (!dataElement || !dataElement.textContent) {
        console.error("manga-data element not found or empty!");
        return;
    }
    try {
        console.log("Parsing JSON data...");
        var mangaItems = JSON.parse(dataElement.textContent);
        console.log("Parsed manga items count:", mangaItems.length);
        console.log("First item:", mangaItems[0]);
        console.log("Creating React root...");
        var root = (0,client/* createRoot */.s)(container);
        console.log("Rendering MangaViewer...");
        root.render(react.createElement(MangaViewer, { items: mangaItems }));
        console.log("MangaViewer rendered successfully!");
    }
    catch (error) {
        console.error('Failed to initialize MangaViewer:', error);
    }
}
main();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".bundle.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "tutorial:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			};
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			826: 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunktutorial"] = self["webpackChunktutorial"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [67], () => (__webpack_require__(9649)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;