/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "b93d134ebf8696007891";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
/******/ 	__webpack_require__.p = "/rap_game/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/index.js":
/*!*************************!*\
  !*** ./assets/index.js ***!
  \*************************/
/*! exports provided: mp3, ogg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mp3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mp3 */ "./assets/mp3/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mp3", function() { return _mp3__WEBPACK_IMPORTED_MODULE_0__["mp3"]; });

/* harmony import */ var _ogg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ogg */ "./assets/ogg/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ogg", function() { return _ogg__WEBPACK_IMPORTED_MODULE_1__["ogg"]; });





/***/ }),

/***/ "./assets/mp3/bass-1.mp3":
/*!*******************************!*\
  !*** ./assets/mp3/bass-1.mp3 ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/bass-1-33_lx.mp3";

/***/ }),

/***/ "./assets/mp3/bass-2.mp3":
/*!*******************************!*\
  !*** ./assets/mp3/bass-2.mp3 ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/bass-2-1yse6.mp3";

/***/ }),

/***/ "./assets/mp3/bass-3.mp3":
/*!*******************************!*\
  !*** ./assets/mp3/bass-3.mp3 ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/bass-3-2tMew.mp3";

/***/ }),

/***/ "./assets/mp3/bass-4.mp3":
/*!*******************************!*\
  !*** ./assets/mp3/bass-4.mp3 ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/bass-4-1H7r2.mp3";

/***/ }),

/***/ "./assets/mp3/beat-1.mp3":
/*!*******************************!*\
  !*** ./assets/mp3/beat-1.mp3 ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/beat-1-3rZ9s.mp3";

/***/ }),

/***/ "./assets/mp3/beat-2.mp3":
/*!*******************************!*\
  !*** ./assets/mp3/beat-2.mp3 ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/beat-2-2XwmK.mp3";

/***/ }),

/***/ "./assets/mp3/beat-3.mp3":
/*!*******************************!*\
  !*** ./assets/mp3/beat-3.mp3 ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/beat-3-3E98G.mp3";

/***/ }),

/***/ "./assets/mp3/beat-4.mp3":
/*!*******************************!*\
  !*** ./assets/mp3/beat-4.mp3 ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/beat-4-8II0f.mp3";

/***/ }),

/***/ "./assets/mp3/hats-1.mp3":
/*!*******************************!*\
  !*** ./assets/mp3/hats-1.mp3 ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/hats-1--Imlu.mp3";

/***/ }),

/***/ "./assets/mp3/hats-2.mp3":
/*!*******************************!*\
  !*** ./assets/mp3/hats-2.mp3 ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/hats-2-104ht.mp3";

/***/ }),

/***/ "./assets/mp3/hats-3.mp3":
/*!*******************************!*\
  !*** ./assets/mp3/hats-3.mp3 ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/hats-3-174sy.mp3";

/***/ }),

/***/ "./assets/mp3/hats-4.mp3":
/*!*******************************!*\
  !*** ./assets/mp3/hats-4.mp3 ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/hats-4-2QZrd.mp3";

/***/ }),

/***/ "./assets/mp3/index.js":
/*!*****************************!*\
  !*** ./assets/mp3/index.js ***!
  \*****************************/
/*! exports provided: mp3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mp3", function() { return mp3; });
/* harmony import */ var _beat_1_mp3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./beat-1.mp3 */ "./assets/mp3/beat-1.mp3");
/* harmony import */ var _beat_1_mp3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_beat_1_mp3__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _beat_2_mp3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./beat-2.mp3 */ "./assets/mp3/beat-2.mp3");
/* harmony import */ var _beat_2_mp3__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_beat_2_mp3__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _beat_3_mp3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./beat-3.mp3 */ "./assets/mp3/beat-3.mp3");
/* harmony import */ var _beat_3_mp3__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_beat_3_mp3__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _beat_4_mp3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./beat-4.mp3 */ "./assets/mp3/beat-4.mp3");
/* harmony import */ var _beat_4_mp3__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_beat_4_mp3__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _hats_1_mp3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hats-1.mp3 */ "./assets/mp3/hats-1.mp3");
/* harmony import */ var _hats_1_mp3__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_hats_1_mp3__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _hats_2_mp3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hats-2.mp3 */ "./assets/mp3/hats-2.mp3");
/* harmony import */ var _hats_2_mp3__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_hats_2_mp3__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _hats_3_mp3__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./hats-3.mp3 */ "./assets/mp3/hats-3.mp3");
/* harmony import */ var _hats_3_mp3__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_hats_3_mp3__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _hats_4_mp3__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./hats-4.mp3 */ "./assets/mp3/hats-4.mp3");
/* harmony import */ var _hats_4_mp3__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_hats_4_mp3__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _bass_1_mp3__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./bass-1.mp3 */ "./assets/mp3/bass-1.mp3");
/* harmony import */ var _bass_1_mp3__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_bass_1_mp3__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _bass_2_mp3__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./bass-2.mp3 */ "./assets/mp3/bass-2.mp3");
/* harmony import */ var _bass_2_mp3__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_bass_2_mp3__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _bass_3_mp3__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./bass-3.mp3 */ "./assets/mp3/bass-3.mp3");
/* harmony import */ var _bass_3_mp3__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_bass_3_mp3__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _bass_4_mp3__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./bass-4.mp3 */ "./assets/mp3/bass-4.mp3");
/* harmony import */ var _bass_4_mp3__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_bass_4_mp3__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _tema_1_mp3__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./tema-1.mp3 */ "./assets/mp3/tema-1.mp3");
/* harmony import */ var _tema_1_mp3__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_tema_1_mp3__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _tema_2_mp3__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./tema-2.mp3 */ "./assets/mp3/tema-2.mp3");
/* harmony import */ var _tema_2_mp3__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_tema_2_mp3__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _tema_3_mp3__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./tema-3.mp3 */ "./assets/mp3/tema-3.mp3");
/* harmony import */ var _tema_3_mp3__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_tema_3_mp3__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _tema_4_mp3__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./tema-4.mp3 */ "./assets/mp3/tema-4.mp3");
/* harmony import */ var _tema_4_mp3__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_tema_4_mp3__WEBPACK_IMPORTED_MODULE_15__);
















const mp3 = {
  beat1: (_beat_1_mp3__WEBPACK_IMPORTED_MODULE_0___default()),
  beat2: (_beat_2_mp3__WEBPACK_IMPORTED_MODULE_1___default()),
  beat3: (_beat_3_mp3__WEBPACK_IMPORTED_MODULE_2___default()),
  beat4: (_beat_4_mp3__WEBPACK_IMPORTED_MODULE_3___default()),
  hats1: (_hats_1_mp3__WEBPACK_IMPORTED_MODULE_4___default()),
  hats2: (_hats_2_mp3__WEBPACK_IMPORTED_MODULE_5___default()),
  hats3: (_hats_3_mp3__WEBPACK_IMPORTED_MODULE_6___default()),
  hats4: (_hats_4_mp3__WEBPACK_IMPORTED_MODULE_7___default()),
  bass1: (_bass_1_mp3__WEBPACK_IMPORTED_MODULE_8___default()),
  bass2: (_bass_2_mp3__WEBPACK_IMPORTED_MODULE_9___default()),
  bass3: (_bass_3_mp3__WEBPACK_IMPORTED_MODULE_10___default()),
  bass4: (_bass_4_mp3__WEBPACK_IMPORTED_MODULE_11___default()),
  tema1: (_tema_1_mp3__WEBPACK_IMPORTED_MODULE_12___default()),
  tema2: (_tema_2_mp3__WEBPACK_IMPORTED_MODULE_13___default()),
  tema3: (_tema_3_mp3__WEBPACK_IMPORTED_MODULE_14___default()),
  tema4: (_tema_4_mp3__WEBPACK_IMPORTED_MODULE_15___default())
};

/***/ }),

/***/ "./assets/mp3/tema-1.mp3":
/*!*******************************!*\
  !*** ./assets/mp3/tema-1.mp3 ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/tema-1-2MTC4.mp3";

/***/ }),

/***/ "./assets/mp3/tema-2.mp3":
/*!*******************************!*\
  !*** ./assets/mp3/tema-2.mp3 ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/tema-2-2Nwq0.mp3";

/***/ }),

/***/ "./assets/mp3/tema-3.mp3":
/*!*******************************!*\
  !*** ./assets/mp3/tema-3.mp3 ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/tema-3-2b6mc.mp3";

/***/ }),

/***/ "./assets/mp3/tema-4.mp3":
/*!*******************************!*\
  !*** ./assets/mp3/tema-4.mp3 ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/tema-4-l7Oe2.mp3";

/***/ }),

/***/ "./assets/ogg/bass-1.ogg":
/*!*******************************!*\
  !*** ./assets/ogg/bass-1.ogg ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/bass-1-13f7m.ogg";

/***/ }),

/***/ "./assets/ogg/bass-2.ogg":
/*!*******************************!*\
  !*** ./assets/ogg/bass-2.ogg ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/bass-2-1M1aS.ogg";

/***/ }),

/***/ "./assets/ogg/bass-3.ogg":
/*!*******************************!*\
  !*** ./assets/ogg/bass-3.ogg ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/bass-3-3_ecE.ogg";

/***/ }),

/***/ "./assets/ogg/bass-4.ogg":
/*!*******************************!*\
  !*** ./assets/ogg/bass-4.ogg ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/bass-4-1iPOf.ogg";

/***/ }),

/***/ "./assets/ogg/beat-1.ogg":
/*!*******************************!*\
  !*** ./assets/ogg/beat-1.ogg ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/beat-1-ZS0kV.ogg";

/***/ }),

/***/ "./assets/ogg/beat-2.ogg":
/*!*******************************!*\
  !*** ./assets/ogg/beat-2.ogg ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/beat-2-3IoUP.ogg";

/***/ }),

/***/ "./assets/ogg/beat-3.ogg":
/*!*******************************!*\
  !*** ./assets/ogg/beat-3.ogg ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/beat-3-1ckg0.ogg";

/***/ }),

/***/ "./assets/ogg/beat-4.ogg":
/*!*******************************!*\
  !*** ./assets/ogg/beat-4.ogg ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/beat-4-1Ug27.ogg";

/***/ }),

/***/ "./assets/ogg/hats-1.ogg":
/*!*******************************!*\
  !*** ./assets/ogg/hats-1.ogg ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/hats-1-1yx3W.ogg";

/***/ }),

/***/ "./assets/ogg/hats-2.ogg":
/*!*******************************!*\
  !*** ./assets/ogg/hats-2.ogg ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/hats-2-3TZvD.ogg";

/***/ }),

/***/ "./assets/ogg/hats-3.ogg":
/*!*******************************!*\
  !*** ./assets/ogg/hats-3.ogg ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/hats-3-pRpFh.ogg";

/***/ }),

/***/ "./assets/ogg/hats-4.ogg":
/*!*******************************!*\
  !*** ./assets/ogg/hats-4.ogg ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/hats-4-3zVU0.ogg";

/***/ }),

/***/ "./assets/ogg/index.js":
/*!*****************************!*\
  !*** ./assets/ogg/index.js ***!
  \*****************************/
/*! exports provided: ogg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ogg", function() { return ogg; });
/* harmony import */ var _beat_1_ogg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./beat-1.ogg */ "./assets/ogg/beat-1.ogg");
/* harmony import */ var _beat_1_ogg__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_beat_1_ogg__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _beat_2_ogg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./beat-2.ogg */ "./assets/ogg/beat-2.ogg");
/* harmony import */ var _beat_2_ogg__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_beat_2_ogg__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _beat_3_ogg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./beat-3.ogg */ "./assets/ogg/beat-3.ogg");
/* harmony import */ var _beat_3_ogg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_beat_3_ogg__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _beat_4_ogg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./beat-4.ogg */ "./assets/ogg/beat-4.ogg");
/* harmony import */ var _beat_4_ogg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_beat_4_ogg__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _hats_1_ogg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hats-1.ogg */ "./assets/ogg/hats-1.ogg");
/* harmony import */ var _hats_1_ogg__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_hats_1_ogg__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _hats_2_ogg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hats-2.ogg */ "./assets/ogg/hats-2.ogg");
/* harmony import */ var _hats_2_ogg__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_hats_2_ogg__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _hats_3_ogg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./hats-3.ogg */ "./assets/ogg/hats-3.ogg");
/* harmony import */ var _hats_3_ogg__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_hats_3_ogg__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _hats_4_ogg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./hats-4.ogg */ "./assets/ogg/hats-4.ogg");
/* harmony import */ var _hats_4_ogg__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_hats_4_ogg__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _bass_1_ogg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./bass-1.ogg */ "./assets/ogg/bass-1.ogg");
/* harmony import */ var _bass_1_ogg__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_bass_1_ogg__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _bass_2_ogg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./bass-2.ogg */ "./assets/ogg/bass-2.ogg");
/* harmony import */ var _bass_2_ogg__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_bass_2_ogg__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _bass_3_ogg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./bass-3.ogg */ "./assets/ogg/bass-3.ogg");
/* harmony import */ var _bass_3_ogg__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_bass_3_ogg__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _bass_4_ogg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./bass-4.ogg */ "./assets/ogg/bass-4.ogg");
/* harmony import */ var _bass_4_ogg__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_bass_4_ogg__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _tema_1_ogg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./tema-1.ogg */ "./assets/ogg/tema-1.ogg");
/* harmony import */ var _tema_1_ogg__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_tema_1_ogg__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _tema_2_ogg__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./tema-2.ogg */ "./assets/ogg/tema-2.ogg");
/* harmony import */ var _tema_2_ogg__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_tema_2_ogg__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _tema_3_ogg__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./tema-3.ogg */ "./assets/ogg/tema-3.ogg");
/* harmony import */ var _tema_3_ogg__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_tema_3_ogg__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _tema_4_ogg__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./tema-4.ogg */ "./assets/ogg/tema-4.ogg");
/* harmony import */ var _tema_4_ogg__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_tema_4_ogg__WEBPACK_IMPORTED_MODULE_15__);
















const ogg = {
  beat1: (_beat_1_ogg__WEBPACK_IMPORTED_MODULE_0___default()),
  beat2: (_beat_2_ogg__WEBPACK_IMPORTED_MODULE_1___default()),
  beat3: (_beat_3_ogg__WEBPACK_IMPORTED_MODULE_2___default()),
  beat4: (_beat_4_ogg__WEBPACK_IMPORTED_MODULE_3___default()),
  hats1: (_hats_1_ogg__WEBPACK_IMPORTED_MODULE_4___default()),
  hats2: (_hats_2_ogg__WEBPACK_IMPORTED_MODULE_5___default()),
  hats3: (_hats_3_ogg__WEBPACK_IMPORTED_MODULE_6___default()),
  hats4: (_hats_4_ogg__WEBPACK_IMPORTED_MODULE_7___default()),
  bass1: (_bass_1_ogg__WEBPACK_IMPORTED_MODULE_8___default()),
  bass2: (_bass_2_ogg__WEBPACK_IMPORTED_MODULE_9___default()),
  bass3: (_bass_3_ogg__WEBPACK_IMPORTED_MODULE_10___default()),
  bass4: (_bass_4_ogg__WEBPACK_IMPORTED_MODULE_11___default()),
  tema1: (_tema_1_ogg__WEBPACK_IMPORTED_MODULE_12___default()),
  tema2: (_tema_2_ogg__WEBPACK_IMPORTED_MODULE_13___default()),
  tema3: (_tema_3_ogg__WEBPACK_IMPORTED_MODULE_14___default()),
  tema4: (_tema_4_ogg__WEBPACK_IMPORTED_MODULE_15___default())
};

/***/ }),

/***/ "./assets/ogg/tema-1.ogg":
/*!*******************************!*\
  !*** ./assets/ogg/tema-1.ogg ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/tema-1-1z8Ce.ogg";

/***/ }),

/***/ "./assets/ogg/tema-2.ogg":
/*!*******************************!*\
  !*** ./assets/ogg/tema-2.ogg ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/tema-2-1eSgW.ogg";

/***/ }),

/***/ "./assets/ogg/tema-3.ogg":
/*!*******************************!*\
  !*** ./assets/ogg/tema-3.ogg ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/tema-3-31DxM.ogg";

/***/ }),

/***/ "./assets/ogg/tema-4.ogg":
/*!*******************************!*\
  !*** ./assets/ogg/tema-4.ogg ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/tema-4-1sMcq.ogg";

/***/ }),

/***/ "./src/App.jsx":
/*!*********************!*\
  !*** ./src/App.jsx ***!
  \*********************/
/*! exports provided: App */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Dashboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Dashboard */ "./src/components/Dashboard.jsx");
/* harmony import */ var _components_SoundManager_SoundManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/SoundManager/SoundManager */ "./src/components/SoundManager/SoundManager.jsx");



class App extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_SoundManager_SoundManager__WEBPACK_IMPORTED_MODULE_2__["SoundManager"], null), react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_Dashboard__WEBPACK_IMPORTED_MODULE_1__["Dashboard"], null));
  }

}

/***/ }),

/***/ "./src/analytics.js":
/*!**************************!*\
  !*** ./src/analytics.js ***!
  \**************************/
/*! exports provided: GAGameStart, GAStartRecord, GAStopRecord, GAInteractTrack, GAInteractZag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GAGameStart", function() { return GAGameStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GAStartRecord", function() { return GAStartRecord; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GAStopRecord", function() { return GAStopRecord; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GAInteractTrack", function() { return GAInteractTrack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GAInteractZag", function() { return GAInteractZag; });
const GAME_NAME = 'rap_game';

const GAGameStart = () => {
  if (window.ga) {
    const isRepeatStartGame = !!localStorage.getItem('isRepeatStartGame');

    if (!isRepeatStartGame) {
      window.ga('send', 'event', GAME_NAME, 'unique_start_game');
    }

    window.ga('send', 'event', GAME_NAME, 'start_game');
    localStorage.setItem('isRepeatStartGame', '1');
  } else {
    console.error('No GA in WINDOW');
  }
};

let isFirstStart = true;

const GAStartRecord = () => {
  if (window.ga) {
    window.ga('send', 'event', GAME_NAME, 'start_record');

    if (isFirstStart) {
      window.ga('send', 'event', GAME_NAME, 'first_start_record');
      isFirstStart = false;
    }
  } else {
    console.error('No GA in WINDOW');
  }
};

let isFirstStop = true;

const GAStopRecord = () => {
  if (window.ga) {
    window.ga('send', 'event', GAME_NAME, 'stop_record');

    if (isFirstStop) {
      window.ga('send', 'event', GAME_NAME, 'first_stop_record');
      isFirstStop = false;
    }
  } else {
    console.error('No GA in WINDOW');
  }
};

let isFirstInteractTrack = true;

const GAInteractTrack = track => {
  if (window.ga) {
    window.ga('send', 'event', GAME_NAME, 'interact_track', track);

    if (isFirstInteractTrack) {
      window.ga('send', 'event', GAME_NAME, 'first_interact_track', track);
      isFirstInteractTrack = false;
    }
  } else {
    console.error('No GA in WINDOW');
  }
};

let isFirstInteractZag = true;

const GAInteractZag = zag => {
  if (window.ga) {
    window.ga('send', 'event', GAME_NAME, 'interact_zag', zag);

    if (isFirstInteractZag) {
      window.ga('send', 'event', GAME_NAME, 'first_interact_zag', zag);
      isFirstInteractZag = false;
    }
  } else {
    console.error('No GA in WINDOW');
  }
};



/***/ }),

/***/ "./src/components/Dashboard.css":
/*!**************************************!*\
  !*** ./src/components/Dashboard.css ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"dashboard":"dashboard--12uZ6","triggers":"triggers--pD_vy","loopsContainer":"loopsContainer--qiYwQ"};

/***/ }),

/***/ "./src/components/Dashboard.jsx":
/*!**************************************!*\
  !*** ./src/components/Dashboard.jsx ***!
  \**************************************/
/*! exports provided: DashboardComponent, Dashboard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dashboard", function() { return Dashboard; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _ducks_categories__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ducks/categories */ "./src/ducks/categories.js");
/* harmony import */ var _LoopsCategory_LoopCategory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LoopsCategory/LoopCategory */ "./src/components/LoopsCategory/LoopCategory.jsx");
/* harmony import */ var _News_NewsContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./News/NewsContainer */ "./src/components/News/NewsContainer.jsx");
/* harmony import */ var _Player_Player__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Player/Player */ "./src/components/Player/Player.jsx");
/* harmony import */ var _ducks_playback__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ducks/playback */ "./src/ducks/playback.js");
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../consts */ "./src/consts.js");
/* harmony import */ var _TitlePage_TitlePage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./TitlePage/TitlePage */ "./src/components/TitlePage/TitlePage.jsx");
/* harmony import */ var _analytics__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../analytics */ "./src/analytics.js");
/* harmony import */ var _Dashboard_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Dashboard.css */ "./src/components/Dashboard.css");
/* harmony import */ var _Dashboard_css__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_Dashboard_css__WEBPACK_IMPORTED_MODULE_10__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












class DashboardComponent extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "percentUpdateTimer", void 0);

    _defineProperty(this, "startGame", () => {
      _analytics__WEBPACK_IMPORTED_MODULE_9__["GAGameStart"]();
      this.setState(() => ({
        isStart: true
      }));
    });

    this.percentUpdateTimer = null;
    this.state = {
      playbackPercent: 0,
      isStart: false
    };
  }

  render() {
    const {
      categories
    } = this.props;
    const {
      isStart
    } = this.state;

    if (!isStart) {
      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_TitlePage_TitlePage__WEBPACK_IMPORTED_MODULE_8__["TitlePage"], {
        startGame: this.startGame
      });
    }

    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
      className: _Dashboard_css__WEBPACK_IMPORTED_MODULE_10__["dashboard"]
    }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Player_Player__WEBPACK_IMPORTED_MODULE_5__["Player"], null), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
      className: _Dashboard_css__WEBPACK_IMPORTED_MODULE_10__["triggers"]
    }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
      className: _Dashboard_css__WEBPACK_IMPORTED_MODULE_10__["loopsContainer"]
    }, categories.map(category => this.renderLoopCategory(category))), react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_News_NewsContainer__WEBPACK_IMPORTED_MODULE_4__["NewsContainer"], null)));
  }

  renderLoopCategory(category) {
    const {
      id,
      name,
      color
    } = category;
    const {
      playbackPercent
    } = this.state;
    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_LoopsCategory_LoopCategory__WEBPACK_IMPORTED_MODULE_3__["LoopCategory"], {
      key: id,
      id: id,
      title: name,
      color: color,
      playbackPercent: playbackPercent
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.playback.timestamp !== this.props.playback.timestamp) {
      this.setPercent(0);

      if (this.percentUpdateTimer !== null) {
        clearInterval(this.percentUpdateTimer);
      }

      if (this.props.playback.timestamp !== null) {
        this.percentUpdateTimer = setInterval(() => {
          this.setPercent();
        }, 100);
      }
    }
  }

  componentWillUnmount() {
    if (this.percentUpdateTimer !== null) {
      clearInterval(this.percentUpdateTimer);
    }
  }

  setPercent(percent) {
    if (percent !== undefined) {
      this.setState({
        playbackPercent: percent
      });
    } else {
      const playbackPercent = Math.min((Date.now() - (this.props.playback.timestamp !== null ? this.props.playback.timestamp : 0)) / 1000 / _consts__WEBPACK_IMPORTED_MODULE_7__["LOOP_DURATION_SEC"], 1);
      this.setState({
        playbackPercent
      });
    }
  }

}

const mapStateToProps = state => {
  return {
    categories: Object(_ducks_categories__WEBPACK_IMPORTED_MODULE_2__["selectState"])(state),
    playback: Object(_ducks_playback__WEBPACK_IMPORTED_MODULE_6__["selectState"])(state)
  };
};

const Dashboard = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps)(DashboardComponent);

/***/ }),

/***/ "./src/components/Loop/Loop.css":
/*!**************************************!*\
  !*** ./src/components/Loop/Loop.css ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"loop":"loop--2DJRX","background":"background--3SZdO","indicator":"indicator--2PWg2","name":"name--2PFDj","loading":"loading--3OSge","nextOn":"nextOn--A0q1J","blinkOn":"blinkOn--3icSU","nextOff":"nextOff--3vO3o","blinkOff":"blinkOff--WxXvt","active":"active--2pwVi"};

/***/ }),

/***/ "./src/components/Loop/Loop.jsx":
/*!**************************************!*\
  !*** ./src/components/Loop/Loop.jsx ***!
  \**************************************/
/*! exports provided: Loop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Loop", function() { return Loop; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Progress_ProgressCircle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Progress/ProgressCircle */ "./src/components/Progress/ProgressCircle.jsx");
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../consts */ "./src/consts.js");
/* harmony import */ var _analytics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../analytics */ "./src/analytics.js");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../data */ "./src/data.js");
/* harmony import */ var _Loop_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Loop.css */ "./src/components/Loop/Loop.css");
/* harmony import */ var _Loop_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_Loop_css__WEBPACK_IMPORTED_MODULE_6__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








class Loop extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onClick", () => {
      _analytics__WEBPACK_IMPORTED_MODULE_4__["GAInteractTrack"](this.props.id);
      this.props.onClick(this.props.id);
    });
  }

  render() {
    const {
      name,
      state,
      playbackPercent
    } = this.props;
    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", {
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(_Loop_css__WEBPACK_IMPORTED_MODULE_6__["loop"], {
        [_Loop_css__WEBPACK_IMPORTED_MODULE_6__["loading"]]: state === _consts__WEBPACK_IMPORTED_MODULE_3__["LoopState"].Loading,
        [_Loop_css__WEBPACK_IMPORTED_MODULE_6__["nextOn"]]: state === _consts__WEBPACK_IMPORTED_MODULE_3__["LoopState"].NextOn,
        [_Loop_css__WEBPACK_IMPORTED_MODULE_6__["active"]]: state === _consts__WEBPACK_IMPORTED_MODULE_3__["LoopState"].Active,
        [_Loop_css__WEBPACK_IMPORTED_MODULE_6__["nextOff"]]: state === _consts__WEBPACK_IMPORTED_MODULE_3__["LoopState"].NextOff
      }),
      onClick: this.onClick
    }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
      className: _Loop_css__WEBPACK_IMPORTED_MODULE_6__["background"]
    }), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
      className: _Loop_css__WEBPACK_IMPORTED_MODULE_6__["indicator"]
    }), react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Progress_ProgressCircle__WEBPACK_IMPORTED_MODULE_2__["Progress"], {
      radius: 15,
      stroke: 3,
      percent: state !== _consts__WEBPACK_IMPORTED_MODULE_3__["LoopState"].Off ? playbackPercent : 0
    }), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
      className: _Loop_css__WEBPACK_IMPORTED_MODULE_6__["name"]
    }, name));
  }

}

/***/ }),

/***/ "./src/components/LoopsCategory/LoopCategory.css":
/*!*******************************************************!*\
  !*** ./src/components/LoopsCategory/LoopCategory.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"category":"category--kKB6F","label":"label--5tnx5","list":"list--1wuFM"};

/***/ }),

/***/ "./src/components/LoopsCategory/LoopCategory.jsx":
/*!*******************************************************!*\
  !*** ./src/components/LoopsCategory/LoopCategory.jsx ***!
  \*******************************************************/
/*! exports provided: LoopCategoryComponent, LoopCategory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoopCategoryComponent", function() { return LoopCategoryComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoopCategory", function() { return LoopCategory; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _Loop_Loop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Loop/Loop */ "./src/components/Loop/Loop.jsx");
/* harmony import */ var _ducks_loops__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../ducks/loops */ "./src/ducks/loops.js");
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../consts */ "./src/consts.js");
/* harmony import */ var _LoopCategory_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./LoopCategory.css */ "./src/components/LoopsCategory/LoopCategory.css");
/* harmony import */ var _LoopCategory_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_LoopCategory_css__WEBPACK_IMPORTED_MODULE_5__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







class LoopCategoryComponent extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onClick", loopId => {
      const loop = this.props.loops.find(({
        id
      }) => id === loopId);

      if (loop === undefined) {
        return;
      }

      const groupId = loop.groupId;
      const currentLoop = this.props.loops.find(loop => loop.groupId === groupId && (loop.state === _consts__WEBPACK_IMPORTED_MODULE_4__["LoopState"].Active || loop.state === _consts__WEBPACK_IMPORTED_MODULE_4__["LoopState"].NextOn)); // switch off current loop from the same group

      let switchOffLoop = [];

      if (currentLoop && currentLoop !== loop) {
        let currentLoopNextState;

        if (currentLoop.state === _consts__WEBPACK_IMPORTED_MODULE_4__["LoopState"].Active) {
          currentLoopNextState = _consts__WEBPACK_IMPORTED_MODULE_4__["LoopState"].NextOff;
        } else {
          currentLoopNextState = _consts__WEBPACK_IMPORTED_MODULE_4__["LoopState"].Off;
        }

        switchOffLoop.push({
          id: currentLoop.id,
          state: currentLoopNextState
        });
      }

      let newState = _consts__WEBPACK_IMPORTED_MODULE_4__["LoopState"].Off;

      if (loop.state === _consts__WEBPACK_IMPORTED_MODULE_4__["LoopState"].Off) {
        newState = _consts__WEBPACK_IMPORTED_MODULE_4__["LoopState"].NextOn;
      } else if (loop.state === _consts__WEBPACK_IMPORTED_MODULE_4__["LoopState"].NextOn) {
        newState = _consts__WEBPACK_IMPORTED_MODULE_4__["LoopState"].Off;
      } else if (loop.state === _consts__WEBPACK_IMPORTED_MODULE_4__["LoopState"].NextOff) {
        newState = _consts__WEBPACK_IMPORTED_MODULE_4__["LoopState"].Active;
      } else if (loop.state === _consts__WEBPACK_IMPORTED_MODULE_4__["LoopState"].Active) {
        newState = _consts__WEBPACK_IMPORTED_MODULE_4__["LoopState"].NextOff;
      }

      this.props.setLoopState([...switchOffLoop, {
        id: loopId,
        state: newState
      }]);
    });
  }

  render() {
    const {
      title,
      color,
      loops,
      playbackPercent
    } = this.props;
    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
      className: _LoopCategory_css__WEBPACK_IMPORTED_MODULE_5__["category"],
      style: {
        color
      }
    }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
      className: _LoopCategory_css__WEBPACK_IMPORTED_MODULE_5__["list"]
    }, loops.map((loop, index) => react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Loop_Loop__WEBPACK_IMPORTED_MODULE_2__["Loop"], {
      key: loop.id,
      id: loop.id,
      name: `${title} ${index + 1}`,
      state: loop.state,
      playbackPercent: playbackPercent,
      onClick: this.onClick
    }))));
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    loops: Object(_ducks_loops__WEBPACK_IMPORTED_MODULE_3__["selectLoopsByCategory"])(state, ownProps.id)
  };
};

const mapDispatchToProps = {
  setLoopState: _ducks_loops__WEBPACK_IMPORTED_MODULE_3__["setLoopState"]
};
const LoopCategory = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(LoopCategoryComponent);

/***/ }),

/***/ "./src/components/News/News.css":
/*!**************************************!*\
  !*** ./src/components/News/News.css ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"news":"news--pQJ6h","link":"link--2bJcb","progress":"progress--31uJ0"};

/***/ }),

/***/ "./src/components/News/News.jsx":
/*!**************************************!*\
  !*** ./src/components/News/News.jsx ***!
  \**************************************/
/*! exports provided: News */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "News", function() { return News; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Progress_ProgressBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Progress/ProgressBar */ "./src/components/Progress/ProgressBar.jsx");
/* harmony import */ var _News_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./News.css */ "./src/components/News/News.css");
/* harmony import */ var _News_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_News_css__WEBPACK_IMPORTED_MODULE_2__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class News extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onClick", event => {
      const target = event.target;

      if (!(target instanceof window.HTMLAnchorElement)) {
        this.props.onClick(this.props.id);
      }
    });
  }

  render() {
    const {
      link,
      text,
      progress
    } = this.props;
    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
      className: _News_css__WEBPACK_IMPORTED_MODULE_2__["news"],
      onClick: this.onClick
    }, text, "\xA0[", react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", {
      className: _News_css__WEBPACK_IMPORTED_MODULE_2__["link"],
      href: link,
      target: "_blank"
    }, "\u0441\u0441\u044B\u043B\u043A\u0430"), "]", react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
      className: _News_css__WEBPACK_IMPORTED_MODULE_2__["progress"]
    }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Progress_ProgressBar__WEBPACK_IMPORTED_MODULE_1__["Progress"], {
      percent: progress
    })));
  }

}

/***/ }),

/***/ "./src/components/News/NewsContainer.css":
/*!***********************************************!*\
  !*** ./src/components/News/NewsContainer.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"newsContainer":"newsContainer--2ZRnq"};

/***/ }),

/***/ "./src/components/News/NewsContainer.jsx":
/*!***********************************************!*\
  !*** ./src/components/News/NewsContainer.jsx ***!
  \***********************************************/
/*! exports provided: NewsContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewsContainer", function() { return NewsContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _ducks_news__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ducks/news */ "./src/ducks/news.js");
/* harmony import */ var _reader_Reader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../reader/Reader */ "./src/reader/Reader.js");
/* harmony import */ var _News__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./News */ "./src/components/News/News.jsx");
/* harmony import */ var _ducks_record__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../ducks/record */ "./src/ducks/record.js");
/* harmony import */ var _analytics__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../analytics */ "./src/analytics.js");
/* harmony import */ var _NewsContainer_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./NewsContainer.css */ "./src/components/News/NewsContainer.css");
/* harmony import */ var _NewsContainer_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_NewsContainer_css__WEBPACK_IMPORTED_MODULE_7__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










class NewsContainerComponent extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "readTimeoutsQueue", void 0);

    _defineProperty(this, "newsReader", void 0);

    _defineProperty(this, "onClickNews", id => {
      const {
        news
      } = this.props;
      const selectedNews = news.find(news => news.id === id);

      if (selectedNews) {
        this.newsReader.read(selectedNews.text, selectedNews.id);
        _analytics__WEBPACK_IMPORTED_MODULE_6__["GAInteractZag"](selectedNews.text);

        if (this.props.isRecording) {
          const startTimestamp = this.props.startTimestamp !== null ? this.props.startTimestamp : 0;
          this.props.addNewsToRecord({
            id,
            timestamp: Date.now() - startTimestamp
          });
        }
      }
    });

    _defineProperty(this, "onProgress", (id, progress) => {
      this.setState({
        currentNews: {
          id,
          progress
        }
      });
    });

    _defineProperty(this, "onEnd", () => {
      this.setState({
        currentNews: null
      });
    });

    this.readTimeoutsQueue = [];
    this.state = {
      currentNews: null
    };
    this.newsReader = new _reader_Reader__WEBPACK_IMPORTED_MODULE_3__["Reader"]({
      onReady: voices => undefined,
      onProgress: this.onProgress,
      onEnd: this.onEnd
    });
  }

  render() {
    const {
      news
    } = this.props;
    const {
      currentNews
    } = this.state;
    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
      className: _NewsContainer_css__WEBPACK_IMPORTED_MODULE_7__["newsContainer"]
    }, news.map(({
      id,
      link,
      text
    }) => {
      return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_News__WEBPACK_IMPORTED_MODULE_4__["News"], {
        key: id,
        id: id,
        link: link,
        text: text,
        progress: currentNews && currentNews.id === id ? currentNews.progress : 0,
        onClick: this.onClickNews
      });
    }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isPlayingRecord !== this.props.isPlayingRecord) {
      if (this.props.isPlayingRecord) {
        this.readTimeoutsQueue = this.props.recordNews.reduce((timeouts, recordNews) => {
          const news = this.props.news.find(({
            id
          }) => recordNews.id === id);

          if (news) {
            timeouts.push(setTimeout(() => {
              this.newsReader.read(news.text, news.id);
            }, recordNews.timestamp));
          }

          return timeouts;
        }, []);
      } else {
        this.newsReader.stop();

        for (const timeout of this.readTimeoutsQueue) {
          clearTimeout(timeout);
        }

        this.readTimeoutsQueue = [];
      }
    }
  }

}

const mapStateToProps = state => {
  return {
    news: Object(_ducks_news__WEBPACK_IMPORTED_MODULE_2__["selectState"])(state),
    isRecording: Object(_ducks_record__WEBPACK_IMPORTED_MODULE_5__["selectIsRecording"])(state),
    isPlayingRecord: Object(_ducks_record__WEBPACK_IMPORTED_MODULE_5__["selectIsPlayingRecord"])(state),
    startTimestamp: Object(_ducks_record__WEBPACK_IMPORTED_MODULE_5__["selectStartTimestamp"])(state),
    recordNews: Object(_ducks_record__WEBPACK_IMPORTED_MODULE_5__["selectRecordNews"])(state)
  };
};

const mapDispatchToProps = {
  addNewsToRecord: _ducks_record__WEBPACK_IMPORTED_MODULE_5__["addNews"]
};
const NewsContainer = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(NewsContainerComponent);

/***/ }),

/***/ "./src/components/Player/Player.css":
/*!******************************************!*\
  !*** ./src/components/Player/Player.css ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"player":"player--B75zn","button":"button--uYpn-","share":"share--3i9u0","shareLabel":"shareLabel--322f4","active":"active--2PqyO","shareDisabled":"shareDisabled--1U3KU","icon":"icon--fDLiq","blink":"blink--3HMbw","recButton":"recButton--1eX8w","playButton":"playButton--2RIbq","shareButton":"shareButton--3eXo2","shareLink":"shareLink--1PjFd","playTitleAdd":"playTitleAdd--3FFP9"};

/***/ }),

/***/ "./src/components/Player/Player.jsx":
/*!******************************************!*\
  !*** ./src/components/Player/Player.jsx ***!
  \******************************************/
/*! exports provided: PlayerComponent, Player */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerComponent", function() { return PlayerComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Player", function() { return Player; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ducks_record__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../ducks/record */ "./src/ducks/record.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "./src/components/Player/utils.js");
/* harmony import */ var _ducks_loops__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../ducks/loops */ "./src/ducks/loops.js");
/* harmony import */ var _ducks_playback__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../ducks/playback */ "./src/ducks/playback.js");
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../consts */ "./src/consts.js");
/* harmony import */ var _Player_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Player.css */ "./src/components/Player/Player.css");
/* harmony import */ var _Player_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_Player_css__WEBPACK_IMPORTED_MODULE_8__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










class PlayerComponent extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "refLink", void 0);

    _defineProperty(this, "onClickRecord", () => {
      if (this.props.isRecording) {
        this.props.setIsRecording(false);
        this.setState({
          shareLink: this.generateLink()
        });
        var url = 'http://localhost:8080/api/rap_rec';
        var dataJSON = {
          data: this.generateLink(),
          r: 'ls'
        };
        fetch(url, {
          method: 'POST',
          // or 'PUT'
          body: JSON.stringify(dataJSON),
          // data can be `string` or {object}!
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(async res => {
          const data = await res.json();
          console.log(data);
        });
        fetch(url + `?rec=1540988048541-4x/kavr`, {
          method: 'GET',
          // or 'PUT'
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(async res => {
          const data = await res.json();
          console.log(data);
        });
      } else {
        this.props.setIsRecording(true);
      }
    });

    _defineProperty(this, "onClickPlay", () => {
      this.props.stopAllLoops();

      if (this.props.isPlayingRecord) {
        this.props.setIsPlayingRecord(false);
      } else {
        this.props.setIsPlayingRecord(true);
        this.setNextLoops(0);
      }
    });

    _defineProperty(this, "onClickLink", () => {
      const input = this.refLink.current;

      if (input !== null) {
        input.focus();
        input.select();
      }

      try {
        const successful = document.execCommand("copy");

        if (!successful) {
          throw new Error("");
        }
      } catch (err) {
        console.error("Не скопировалось :(");
      }
    });

    this.state = {
      shareLink: this.generateLink()
    };
    this.refLink = react__WEBPACK_IMPORTED_MODULE_0__["createRef"]();
  }

  shouldComponentUpdate(prevProps) {
    return prevProps.allLoaded !== this.props.allLoaded || prevProps.isRecording !== this.props.isRecording || prevProps.recordLoops !== this.props.recordLoops || prevProps.isPlayingRecord !== this.props.isPlayingRecord || prevProps.playback !== this.props.playback;
  }

  render() {
    const {
      isRecording,
      isPlayingRecord,
      recordLoops,
      allLoaded
    } = this.props;
    const hasRecord = !isRecording && recordLoops.length !== 0 && allLoaded;
    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
      className: _Player_css__WEBPACK_IMPORTED_MODULE_8__["player"]
    }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", {
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(_Player_css__WEBPACK_IMPORTED_MODULE_8__["button"], _Player_css__WEBPACK_IMPORTED_MODULE_8__["recButton"], {
        [_Player_css__WEBPACK_IMPORTED_MODULE_8__["active"]]: isRecording
      }),
      disabled: isPlayingRecord || !allLoaded,
      onClick: this.onClickRecord
    }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", {
      className: _Player_css__WEBPACK_IMPORTED_MODULE_8__["icon"]
    }, "\u25CF"), "Rec"), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", {
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(_Player_css__WEBPACK_IMPORTED_MODULE_8__["button"], _Player_css__WEBPACK_IMPORTED_MODULE_8__["playButton"], {
        [_Player_css__WEBPACK_IMPORTED_MODULE_8__["active"]]: isPlayingRecord
      }),
      disabled: !hasRecord,
      onClick: this.onClickPlay
    }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", {
      className: _Player_css__WEBPACK_IMPORTED_MODULE_8__["icon"]
    }, "\u25B6"), "\u0418\u0433\u0440\u0430\u0442\u044C", react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", {
      className: _Player_css__WEBPACK_IMPORTED_MODULE_8__["playTitleAdd"]
    }, "\xA0\u0437\u0430\u043F\u0438\u0441\u044C")), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", {
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(_Player_css__WEBPACK_IMPORTED_MODULE_8__["button"], _Player_css__WEBPACK_IMPORTED_MODULE_8__["shareButton"]),
      disabled: !hasRecord,
      onClick: this.onClickLink
    }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", {
      className: _Player_css__WEBPACK_IMPORTED_MODULE_8__["icon"]
    }, "\u21EB"), "\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F"), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", {
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(_Player_css__WEBPACK_IMPORTED_MODULE_8__["share"], {
        [_Player_css__WEBPACK_IMPORTED_MODULE_8__["shareDisabled"]]: !hasRecord
      }),
      onClick: this.onClickLink,
      title: hasRecord ? "Копировать" : null
    }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", {
      className: _Player_css__WEBPACK_IMPORTED_MODULE_8__["shareLabel"]
    }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", {
      className: _Player_css__WEBPACK_IMPORTED_MODULE_8__["icon"]
    }, "\u21EB"), "\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F:"), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", {
      className: _Player_css__WEBPACK_IMPORTED_MODULE_8__["shareLink"],
      type: "text",
      placeholder: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u043A\u043D\u043E\u043F\u043A\u0443 Rec, \u0447\u0442\u043E\u0431\u044B \u0437\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0441\u0432\u043E\u0439 \u0442\u0440\u0435\u043A",
      readOnly: true,
      value: this.state.shareLink,
      ref: this.refLink
    })));
  }

  componentDidUpdate(prevProps) {
    const {
      allLoaded,
      isPlayingRecord,
      playback,
      recordLoops
    } = this.props; // auto play on load

    if (prevProps.allLoaded !== allLoaded && allLoaded && recordLoops.length !== 0) {
      this.onClickPlay();
    }

    if (isPlayingRecord) {
      if (prevProps.playback.cursor !== playback.cursor && playback.cursor !== null) {
        this.setNextLoops(playback.cursor + 1);
      }
    }
  }

  setNextLoops(cursor) {
    const {
      recordLoops
    } = this.props;
    const newLoopStates = []; // schedule stop

    if (recordLoops[cursor - 1]) {
      for (const prevLoopId of recordLoops[cursor - 1]) {
        if (!recordLoops[cursor] || !recordLoops[cursor].includes(prevLoopId)) {
          newLoopStates.push({
            id: prevLoopId,
            state: _consts__WEBPACK_IMPORTED_MODULE_7__["LoopState"].NextOff
          });
        }
      }
    } // schedule play


    if (recordLoops[cursor]) {
      for (const loopId of recordLoops[cursor]) {
        if (!recordLoops[cursor - 1] || !recordLoops[cursor - 1].includes(loopId)) {
          newLoopStates.push({
            id: loopId,
            state: _consts__WEBPACK_IMPORTED_MODULE_7__["LoopState"].NextOn
          });
        }
      }
    }

    this.props.setLoopState(newLoopStates);
  }

  generateLink() {
    const {
      recordLoops: loops,
      recordNews: news,
      startTimestamp
    } = this.props;

    if (loops.length || news.length) {
      const urlHash = encodeURIComponent(Object(_utils__WEBPACK_IMPORTED_MODULE_4__["generateShareHash"])({
        loops,
        news,
        startTimestamp
      }));
      return `${location.origin}${location.pathname}?r=${urlHash}`;
    } else {
      return "";
    }
  }

}

const mapStateToProps = state => ({
  allLoaded: Object(_ducks_loops__WEBPACK_IMPORTED_MODULE_5__["selectAllLoaded"])(state),
  isRecording: Object(_ducks_record__WEBPACK_IMPORTED_MODULE_3__["selectIsRecording"])(state),
  isPlayingRecord: Object(_ducks_record__WEBPACK_IMPORTED_MODULE_3__["selectIsPlayingRecord"])(state),
  startTimestamp: Object(_ducks_record__WEBPACK_IMPORTED_MODULE_3__["selectStartTimestamp"])(state),
  recordLoops: Object(_ducks_record__WEBPACK_IMPORTED_MODULE_3__["selectRecordLoops"])(state),
  recordNews: Object(_ducks_record__WEBPACK_IMPORTED_MODULE_3__["selectRecordNews"])(state),
  playback: Object(_ducks_playback__WEBPACK_IMPORTED_MODULE_6__["selectState"])(state)
});

const mapDispatchToProps = {
  setIsRecording: _ducks_record__WEBPACK_IMPORTED_MODULE_3__["setIsRecording"],
  setIsPlayingRecord: _ducks_record__WEBPACK_IMPORTED_MODULE_3__["setIsPlayingRecord"],
  stopAllLoops: _ducks_loops__WEBPACK_IMPORTED_MODULE_5__["stopAllLoops"],
  setLoopState: _ducks_loops__WEBPACK_IMPORTED_MODULE_5__["setLoopState"]
};
const Player = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(PlayerComponent);

/***/ }),

/***/ "./src/components/Player/utils.js":
/*!****************************************!*\
  !*** ./src/components/Player/utils.js ***!
  \****************************************/
/*! exports provided: validateLoopId, generateShareHash, generatePlayList, randomInRange, getRecordFromUrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateLoopId", function() { return validateLoopId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateShareHash", function() { return generateShareHash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generatePlayList", function() { return generatePlayList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomInRange", function() { return randomInRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRecordFromUrl", function() { return getRecordFromUrl; });
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../consts */ "./src/consts.js");

const loopIdRegExp = /^[a-z]+\d*$/;
const addSeparator = "*";
const removeSeparator = "-";
const loopNamesSeparator = ".";
const chunksSeparator = "_";
const loopsNewsSeparator = "!";
const loopChunkRegExp = /^(\d+)(?:\*([^-]+))?(?:-(.+))?$/;
function validateLoopId(id) {
  if (!loopIdRegExp.test(id)) {
    throw `Invalid loop id ${id}. Loop id should satisfy ${loopIdRegExp.toString()} regular expression.`;
  }
}
function generateShareHash({
  startTimestamp,
  loops,
  news
}) {
  const loopChunks = [];
  let previousLoops = [];

  for (let i = 0; i < loops.length; i++) {
    const addedLoops = [];
    const removedLoops = [];
    let loopChunk = "";

    for (const loopId of loops[i]) {
      if (!previousLoops.includes(loopId)) {
        addedLoops.push(loopId);
      }
    }

    for (const prevLoopId of previousLoops) {
      if (!loops[i].includes(prevLoopId)) {
        removedLoops.push(prevLoopId);
      }
    }

    if (addedLoops.length !== 0 || removedLoops.length !== 0) {
      loopChunk = String(i);

      if (addedLoops.length !== 0) {
        loopChunk += `${addSeparator}${addedLoops.join(loopNamesSeparator)}`;
      }

      if (removedLoops.length !== 0) {
        loopChunk += `${removeSeparator}${removedLoops.join(loopNamesSeparator)}`;
      }
    }

    if (loopChunk) {
      loopChunks.push(loopChunk);
    }

    previousLoops = loops[i];
  }

  const newsChunks = [];

  for (const _ref of news) {
    const {
      timestamp,
      id
    } = _ref;
    newsChunks.push(`${timestamp}${addSeparator}${id}`);
  } // i.e. 0*bt1.h1_1*b1_2-bt1_3-h1.b1!0*0_1000*1


  const hash = `${loopChunks.join(chunksSeparator)}${loopsNewsSeparator}${newsChunks.join(chunksSeparator)}`;
  return btoa(hash);
}
function generatePlayList(hash) {
  try {
    const decodedHash = atob(hash);
    const [loopPart, newsPart] = decodedHash.split(loopsNewsSeparator);
    const loopChunks = loopPart.split(chunksSeparator);
    const loops = [];
    let loopsCursor = 0;

    for (const loopChunk of loopChunks) {
      const match = loopChunk.match(loopChunkRegExp);

      if (!match) {
        continue;
      }

      let [_, turnNumber, addedLoops = "", removedLoops = ""] = match;
      turnNumber = Number(turnNumber); // fill same turns

      for (let i = loopsCursor; i < turnNumber; i++) {
        loops[i] = loops[i - 1];
      } // build new turn


      addedLoops = addedLoops ? addedLoops.split(loopNamesSeparator) : [];
      removedLoops = removedLoops ? removedLoops.split(loopNamesSeparator) : [];
      loops[turnNumber] = (loops[turnNumber - 1] || []).concat(addedLoops).filter(id => !removedLoops.includes(id));
      loopsCursor = turnNumber + 1;

      if (loopsCursor > _consts__WEBPACK_IMPORTED_MODULE_0__["MAXIMUM_RECORD_TURNS"]) {
        break;
      }
    }

    const news = [];
    const newsChunks = newsPart.split(chunksSeparator);

    for (let i = 0; i < newsChunks.length && i < _consts__WEBPACK_IMPORTED_MODULE_0__["MAXIMUM_NEWS_READ"]; i++) {
      let [timestamp, id] = newsChunks[i].split(addSeparator);
      news.push({
        timestamp: Number(timestamp),
        id
      });
    }

    return {
      loops,
      news
    };
  } catch (e) {
    console.error("Wrong record hash format");
    return null;
  }
}
function randomInRange(min, max) {
  return min + Math.random() * (max - min);
}
function getRecordFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("r");
}

/***/ }),

/***/ "./src/components/Progress/Progress.css":
/*!**********************************************!*\
  !*** ./src/components/Progress/Progress.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"circle":"circle--ziIVg","barContainer":"barContainer--3lRfl","bar":"bar--2QdWn","active":"active--3cioK"};

/***/ }),

/***/ "./src/components/Progress/ProgressBar.jsx":
/*!*************************************************!*\
  !*** ./src/components/Progress/ProgressBar.jsx ***!
  \*************************************************/
/*! exports provided: Progress */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Progress", function() { return Progress; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Progress_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Progress.css */ "./src/components/Progress/Progress.css");
/* harmony import */ var _Progress_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Progress_css__WEBPACK_IMPORTED_MODULE_2__);



function Progress(props) {
  const {
    percent
  } = props;
  return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(_Progress_css__WEBPACK_IMPORTED_MODULE_2__["barContainer"], {
      [_Progress_css__WEBPACK_IMPORTED_MODULE_2__["active"]]: percent > 0 && percent < 0.9
    })
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
    className: _Progress_css__WEBPACK_IMPORTED_MODULE_2__["bar"],
    style: {
      width: `${percent * 100}%`
    }
  }));
}

/***/ }),

/***/ "./src/components/Progress/ProgressCircle.jsx":
/*!****************************************************!*\
  !*** ./src/components/Progress/ProgressCircle.jsx ***!
  \****************************************************/
/*! exports provided: Progress */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Progress", function() { return Progress; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Progress_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Progress.css */ "./src/components/Progress/Progress.css");
/* harmony import */ var _Progress_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Progress_css__WEBPACK_IMPORTED_MODULE_1__);


function Progress(props) {
  const {
    radius,
    stroke,
    percent
  } = props;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const offset = circumference * (1 - percent);
  return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", {
    width: radius * 2,
    height: radius * 2
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("circle", {
    stroke: "#000000",
    strokeWidth: stroke,
    fill: "transparent",
    r: radius - stroke / 2,
    cx: radius,
    cy: radius,
    opacity: 0.3
  }), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("circle", {
    className: _Progress_css__WEBPACK_IMPORTED_MODULE_1__["circle"],
    stroke: "#ffffff",
    strokeWidth: stroke,
    strokeDasharray: `${circumference} ${circumference}`,
    strokeDashoffset: offset,
    fill: "transparent",
    r: radius - stroke / 2,
    cx: radius,
    cy: radius
  }));
}

/***/ }),

/***/ "./src/components/Share/Share.css":
/*!****************************************!*\
  !*** ./src/components/Share/Share.css ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"share":"share--D4_en","title":"title--mbvkR","shareIcons":"shareIcons--1EqgV"};

/***/ }),

/***/ "./src/components/Share/Share.jsx":
/*!****************************************!*\
  !*** ./src/components/Share/Share.jsx ***!
  \****************************************/
/*! exports provided: Share */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Share", function() { return Share; });
/* harmony import */ var _Share_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Share.css */ "./src/components/Share/Share.css");
/* harmony import */ var _Share_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Share_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../icons */ "./src/components/icons.jsx");



function Share(props) {
  const {
    link
  } = props;
  return react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
    className: _Share_css__WEBPACK_IMPORTED_MODULE_0__["share"]
  }, react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("p", {
    className: _Share_css__WEBPACK_IMPORTED_MODULE_0__["title"]
  }, "\u043F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F"), react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
    className: _Share_css__WEBPACK_IMPORTED_MODULE_0__["shareIcons"]
  }, react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("a", {
    href: `http://vk.com/share.php?url=${link}`
  }, react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_icons__WEBPACK_IMPORTED_MODULE_2__["Vk"], null)), react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("a", {
    href: `https://twitter.com/intent/tweet?text==${link}`
  }, react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_icons__WEBPACK_IMPORTED_MODULE_2__["Tw"], null)), react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("a", {
    href: `https://www.facebook.com/dialog/share?app_id=1727953450799543&display=popup&href=${link}`
  }, react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_icons__WEBPACK_IMPORTED_MODULE_2__["Fb"], null)), react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("a", {
    href: `https://connect.ok.ru/offer?url=${link}`
  }, react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_icons__WEBPACK_IMPORTED_MODULE_2__["Ok"], null)), react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("a", {
    href: `https://t.me/share/url?url=${link}`
  }, react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_icons__WEBPACK_IMPORTED_MODULE_2__["Tg"], null))));
}

/***/ }),

/***/ "./src/components/SoundManager/SoundManager.jsx":
/*!******************************************************!*\
  !*** ./src/components/SoundManager/SoundManager.jsx ***!
  \******************************************************/
/*! exports provided: SoundManagerComponent, SoundManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SoundManagerComponent", function() { return SoundManagerComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SoundManager", function() { return SoundManager; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var howler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! howler */ "./node_modules/howler/dist/howler.js");
/* harmony import */ var howler__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(howler__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ducks_loops__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../ducks/loops */ "./src/ducks/loops.js");
/* harmony import */ var _ducks_record__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../ducks/record */ "./src/ducks/record.js");
/* harmony import */ var _ducks_playback__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../ducks/playback */ "./src/ducks/playback.js");
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../consts */ "./src/consts.js");
/* harmony import */ var _assets__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../assets */ "./assets/index.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









const checkLoopEndTimeMs = 40;
const scheduleAheadTimeSec = 0.01;
class SoundManagerComponent extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "ctxCurrentTime", void 0);

    _defineProperty(this, "isPlaying", void 0);

    _defineProperty(this, "howls", void 0);

    _defineProperty(this, "checkInterval", void 0);

    _defineProperty(this, "checkLoopEnd", () => {
      if (this.ctxCurrentTime + _consts__WEBPACK_IMPORTED_MODULE_6__["LOOP_DURATION_SEC"] < howler__WEBPACK_IMPORTED_MODULE_2__["Howler"].ctx.currentTime + scheduleAheadTimeSec) {
        this.playNextLoops();
      }
    });

    this.ctxCurrentTime = null;
    this.isPlaying = false;
    this.howls = {};

    for (const loop of this.props.loops) {
      this.howls[loop.id] = new howler__WEBPACK_IMPORTED_MODULE_2__["Howl"]({
        src: [_assets__WEBPACK_IMPORTED_MODULE_7__["ogg"][loop.src], _assets__WEBPACK_IMPORTED_MODULE_7__["mp3"][loop.src]],
        preload: true,
        onload: () => {
          this.props.setLoopState([{
            id: loop.id,
            state: _consts__WEBPACK_IMPORTED_MODULE_6__["LoopState"].Off
          }]);
        }
      });
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.loops !== this.props.loops;
  }

  componentWillUnmount() {
    clearInterval(this.checkInterval);

    for (const loopId of Object.keys(this.howls)) {
      this.howls[loopId].unload();
    }
  }

  render() {
    return null;
  }

  componentDidUpdate(prevProps) {
    if (this.props.loops !== prevProps.loops) {
      if (this.isPlaying) {
        const hasActiveLoops = this.props.loops.some(loop => loop.state === _consts__WEBPACK_IMPORTED_MODULE_6__["LoopState"].Active || loop.state === _consts__WEBPACK_IMPORTED_MODULE_6__["LoopState"].NextOn || loop.state === _consts__WEBPACK_IMPORTED_MODULE_6__["LoopState"].NextOff);

        if (!hasActiveLoops) {
          this.stop();
        }
      } else {
        const hasActiveLoops = this.props.loops.some(loop => loop.state === _consts__WEBPACK_IMPORTED_MODULE_6__["LoopState"].NextOn);

        if (hasActiveLoops) {
          this.play();
        }
      }
    }
  }

  play() {
    if (this.isPlaying) {
      return;
    }

    this.isPlaying = true;
    this.ctxCurrentTime = howler__WEBPACK_IMPORTED_MODULE_2__["Howler"].ctx.currentTime;
    this.checkInterval = setInterval(this.checkLoopEnd, checkLoopEndTimeMs);
    this.playNextLoops();
  }

  stop() {
    if (!this.isPlaying) {
      return;
    }

    clearInterval(this.checkInterval);

    for (const loopId of Object.keys(this.howls)) {
      this.howls[loopId].stop();
    }

    this.isPlaying = false;
    this.props.setCursor(null);
    this.props.setIsPlayingRecord(false);
  }

  playNextLoops() {
    const {
      loops,
      isRecording,
      playback
    } = this.props;
    const loopsForPlay = [];
    const loopsForRecord = [];
    const newLoopStates = [];

    for (const loop of loops) {
      // loops which must play next
      if (loop.state === _consts__WEBPACK_IMPORTED_MODULE_6__["LoopState"].Active || loop.state === _consts__WEBPACK_IMPORTED_MODULE_6__["LoopState"].NextOn) {
        loopsForPlay.push(loop.id);

        if (loop.state === _consts__WEBPACK_IMPORTED_MODULE_6__["LoopState"].NextOn) {
          newLoopStates.push({
            id: loop.id,
            state: _consts__WEBPACK_IMPORTED_MODULE_6__["LoopState"].Active
          });
        }

        loopsForRecord.push(loop.id); // loops which must stop now
      } else if (loop.state === _consts__WEBPACK_IMPORTED_MODULE_6__["LoopState"].NextOff) {
        newLoopStates.push({
          id: loop.id,
          state: _consts__WEBPACK_IMPORTED_MODULE_6__["LoopState"].Off
        });
      }
    }

    this.ctxCurrentTime = howler__WEBPACK_IMPORTED_MODULE_2__["Howler"].ctx.currentTime;

    for (const loopId of loopsForPlay) {
      this.howls[loopId].play();
    }

    if (isRecording) {
      this.props.addLoopsToRecord(loopsForRecord);
    }

    if (newLoopStates.length) {
      this.props.setLoopState(newLoopStates);
    } // cursor may have already updated because of the previous call to `setLoopState`


    if (this.isPlaying) {
      const newCursor = playback.cursor !== null ? playback.cursor + 1 : 0;

      if (newCursor === Number.MAX_SAFE_INTEGER) {
        this.stop();
      } else {
        this.props.setCursor(newCursor);
      }
    }
  }

}

const mapStateToProps = state => {
  return {
    loops: Object(_ducks_loops__WEBPACK_IMPORTED_MODULE_3__["selectState"])(state),
    isRecording: Object(_ducks_record__WEBPACK_IMPORTED_MODULE_4__["selectIsRecording"])(state),
    playback: Object(_ducks_playback__WEBPACK_IMPORTED_MODULE_5__["selectState"])(state)
  };
};

const mapDispatchToProps = {
  setLoops: _ducks_loops__WEBPACK_IMPORTED_MODULE_3__["setLoops"],
  setLoopState: _ducks_loops__WEBPACK_IMPORTED_MODULE_3__["setLoopState"],
  setCursor: _ducks_playback__WEBPACK_IMPORTED_MODULE_5__["setCursor"],
  addLoopsToRecord: _ducks_record__WEBPACK_IMPORTED_MODULE_4__["addLoops"],
  setIsPlayingRecord: _ducks_record__WEBPACK_IMPORTED_MODULE_4__["setIsPlayingRecord"]
};
const SoundManager = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(SoundManagerComponent);

/***/ }),

/***/ "./src/components/TitlePage/TitlePage.css":
/*!************************************************!*\
  !*** ./src/components/TitlePage/TitlePage.css ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"titlePage":"titlePage--CYPUO","body":"body--cdy6P","title":"title--3X7t-","description":"description--zFqla","startGame":"startGame--1AWjW"};

/***/ }),

/***/ "./src/components/TitlePage/TitlePage.jsx":
/*!************************************************!*\
  !*** ./src/components/TitlePage/TitlePage.jsx ***!
  \************************************************/
/*! exports provided: TitlePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TitlePage", function() { return TitlePage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _TitlePage_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TitlePage.css */ "./src/components/TitlePage/TitlePage.css");
/* harmony import */ var _TitlePage_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_TitlePage_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Share_Share__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Share/Share */ "./src/components/Share/Share.jsx");



let PAGE_URL = "http://localhost:8080/games/rap_game";

if (PAGE_URL === null) {
  PAGE_URL = 'http://localhost:8081/';
}

function TitlePage(props) {
  const {
    startGame
  } = props;
  let link = "";
  if (typeof PAGE_URL === "string") link = encodeURIComponent(PAGE_URL);
  return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
    className: _TitlePage_css__WEBPACK_IMPORTED_MODULE_1__["titlePage"]
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", {
    className: _TitlePage_css__WEBPACK_IMPORTED_MODULE_1__["body"]
  }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h2", {
    className: _TitlePage_css__WEBPACK_IMPORTED_MODULE_1__["title"]
  }, "\u0420\u044D\u043F\u0447\u0438\u043A \u043E\u0442 \u041C\u0435\u0434\u0438\u0430\u0437\u043E\u043D\u044B"), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", {
    className: _TitlePage_css__WEBPACK_IMPORTED_MODULE_1__["description"]
  }, "\u041F\u0440\u043E\u0441\u043D\u0443\u0432\u0448\u0438\u0441\u044C \u043E\u0434\u043D\u0430\u0436\u0434\u044B \u0443\u0442\u0440\u043E\u043C \u043F\u043E\u0441\u043B\u0435 \u0431\u0435\u0441\u043F\u043E\u043A\u043E\u0439\u043D\u043E\u0433\u043E \u0441\u043D\u0430, \u0432\u044B \u0440\u0435\u0448\u0438\u043B\u0438 \u0441\u0442\u0430\u0442\u044C \u043C\u0443\u043D\u0438\u0446\u0438\u043F\u0430\u043B\u044C\u043D\u044B\u043C \u0434\u0435\u043F\u0443\u0442\u0430\u0442\u043E\u043C \u0432 \u041C\u043E\u0441\u043A\u0432\u0435. \u0412\u044B\u0431\u043E\u0440\u044B \u0431\u0443\u0434\u0443\u0442 \u0432 \u0441\u0435\u043D\u0442\u044F\u0431\u0440\u0435, \u043F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u0432\u0430\u0448\u0443 \u0433\u043E\u0442\u043E\u0432\u043D\u043E\u0441\u0442\u044C \u043A \u043D\u0438\u043C \u0443\u0436\u0435 \u0441\u0435\u0439\u0447\u0430\u0441 \u043F\u043E\u043C\u043E\u0436\u0435\u0442 \u0438\u0433\u0440\u0430 \xAB\u041C\u0435\u0434\u0438\u0430\u0437\u043E\u043D\u044B\xBB \u0438 \u0428\u0442\u0430\u0431\u0430 \u043D\u0435\u0437\u0430\u0432\u0438\u0441\u0438\u043C\u043E\u0439 \u043C\u0443\u043D\u0438\u0446\u0438\u043F\u0430\u043B\u044C\u043D\u043E\u0439 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438."), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", {
    onClick: startGame,
    className: _TitlePage_css__WEBPACK_IMPORTED_MODULE_1__["startGame"]
  }, "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0441\u0432\u043E\u0439 \u0442\u0440\u0435\u043A")), react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Share_Share__WEBPACK_IMPORTED_MODULE_2__["Share"], {
    link: link
  }));
}

/***/ }),

/***/ "./src/components/icons.jsx":
/*!**********************************!*\
  !*** ./src/components/icons.jsx ***!
  \**********************************/
/*! exports provided: Vk, Tg, Ok, Fb, Tw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vk", function() { return Vk; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tg", function() { return Tg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ok", function() { return Ok; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Fb", function() { return Fb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tw", function() { return Tw; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const Vk = () => react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "40",
  height: "40",
  viewBox: "0 0 40 40"
}, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", {
  fill: "none",
  fillRule: "evenodd"
}, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", {
  width: "40",
  height: "40",
  fill: "#507299",
  rx: "20"
}), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
  fill: "#FFF",
  fillRule: "nonzero",
  d: "M28.889 24.837c-.026-.055-.05-.1-.072-.137-.364-.657-1.06-1.463-2.088-2.42l-.022-.022-.01-.01-.011-.012h-.011c-.467-.445-.762-.744-.886-.898-.226-.292-.277-.587-.153-.887.087-.226.415-.704.984-1.434.299-.387.535-.697.71-.93 1.261-1.68 1.808-2.753 1.64-3.22l-.065-.11c-.043-.065-.156-.126-.338-.18-.183-.055-.416-.064-.7-.028l-3.15.022a.408.408 0 0 0-.218.006l-.142.033-.055.027-.044.033a.486.486 0 0 0-.12.115.752.752 0 0 0-.109.191 17.894 17.894 0 0 1-1.17 2.464c-.27.453-.517.845-.744 1.178a5.663 5.663 0 0 1-.568.733 3.968 3.968 0 0 1-.416.378c-.124.095-.218.135-.284.12a8.001 8.001 0 0 1-.186-.043.728.728 0 0 1-.246-.269 1.203 1.203 0 0 1-.125-.427 4.716 4.716 0 0 1-.039-.443 9.28 9.28 0 0 1 .006-.526c.007-.226.01-.38.01-.46 0-.277.006-.579.017-.903l.027-.772c.008-.19.011-.391.011-.603 0-.211-.013-.377-.038-.498a1.706 1.706 0 0 0-.114-.35.59.59 0 0 0-.225-.263 1.262 1.262 0 0 0-.366-.148c-.386-.088-.878-.135-1.476-.142-1.356-.015-2.227.073-2.613.262-.153.08-.292.19-.416.329-.13.16-.15.248-.054.263.437.065.747.222.929.47l.066.132c.05.095.102.263.153.504.05.24.084.507.098.799.036.533.036.99 0 1.369-.036.38-.07.675-.104.887a1.778 1.778 0 0 1-.147.515c-.066.13-.11.211-.132.24a.188.188 0 0 1-.054.055.818.818 0 0 1-.296.055c-.102 0-.226-.051-.371-.153a2.625 2.625 0 0 1-.454-.422 5.636 5.636 0 0 1-.53-.75c-.197-.321-.401-.7-.613-1.139l-.175-.318c-.109-.204-.258-.502-.448-.892s-.357-.769-.503-1.134a.722.722 0 0 0-.262-.35l-.055-.033a.748.748 0 0 0-.175-.093 1.159 1.159 0 0 0-.251-.071l-2.996.022c-.306 0-.514.07-.623.208l-.044.066a.355.355 0 0 0-.033.175c0 .08.022.179.066.295.437 1.03.913 2.023 1.426 2.98.514.955.96 1.726 1.34 2.31.379.584.765 1.135 1.159 1.653.393.518.654.85.781.997.128.146.228.255.301.328l.274.263c.175.175.431.385.77.63.34.244.715.485 1.127.722.412.238.89.431 1.437.58.547.15 1.08.21 1.597.182h1.257c.255-.023.448-.103.58-.241l.043-.055a.727.727 0 0 0 .082-.203c.026-.09.038-.191.038-.3a3.614 3.614 0 0 1 .071-.85c.055-.251.117-.441.186-.569a1.4 1.4 0 0 1 .422-.482.713.713 0 0 1 .087-.038c.175-.058.38-.002.618.17.237.172.459.383.667.635.208.252.457.535.749.849.291.314.546.547.765.7l.219.132c.146.088.335.168.568.241.233.073.437.091.613.055l2.799-.044c.276 0 .492-.046.645-.137.153-.091.244-.192.273-.301a.85.85 0 0 0 .006-.373 1.376 1.376 0 0 0-.077-.29z"
})));
const Tg = () => react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "40",
  height: "40",
  viewBox: "0 0 40 40"
}, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", {
  fill: "none",
  fillRule: "evenodd"
}, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", {
  width: "40",
  height: "40",
  fill: "#32A6E1",
  rx: "20"
}), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
  fill: "#FFF",
  fillRule: "nonzero",
  d: "M9.353 19.632l4.609 1.773 1.783 5.911a.536.536 0 0 0 .862.268l2.569-2.159a.748.748 0 0 1 .934-.026l4.633 3.466c.32.24.771.059.851-.338l3.394-16.825c.088-.434-.326-.796-.727-.636L9.348 18.585c-.467.185-.463.866.005 1.047zm6.105.83l9.006-5.717c.162-.103.329.123.19.256l-7.433 7.12c-.261.25-.43.586-.478.95l-.253 1.934c-.033.258-.385.283-.454.034l-.974-3.527a.948.948 0 0 1 .396-1.05z"
})));
const Ok = () => react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "40",
  height: "40",
  viewBox: "0 0 40 40"
}, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", {
  fill: "none",
  fillRule: "evenodd"
}, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", {
  width: "40",
  height: "40",
  fill: "#FA931F",
  rx: "20"
}), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", {
  fill: "#FFF"
}, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
  d: "M19.016 23.483c-1.549-.157-2.946-.526-4.142-1.431-.148-.113-.301-.221-.437-.347-.523-.486-.576-1.044-.162-1.618.355-.491.95-.623 1.568-.34.12.054.233.122.343.196 2.229 1.482 5.29 1.523 7.528.066.221-.164.458-.298.733-.367.534-.132 1.032.058 1.318.51.328.516.323 1.02-.08 1.42-.619.615-1.363 1.06-2.19 1.37-.781.293-1.637.44-2.485.539.128.135.188.2.268.279 1.15 1.118 2.307 2.233 3.454 3.355.39.382.472.856.257 1.301-.235.486-.762.806-1.278.772-.327-.022-.583-.18-.81-.4-.868-.846-1.752-1.676-2.603-2.538-.248-.25-.367-.203-.585.015-.874.87-1.762 1.727-2.655 2.579-.4.382-.878.451-1.343.233-.495-.232-.81-.72-.785-1.211.017-.332.186-.586.421-.813 1.139-1.1 2.274-2.204 3.41-3.306.076-.073.146-.151.255-.264z"
}), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
  d: "M19.965 19.6c-2.627-.009-4.78-2.183-4.765-4.81A4.81 4.81 0 0 1 20.022 10c2.658.007 4.791 2.178 4.778 4.862-.014 2.622-2.182 4.747-4.835 4.738zm2.387-4.804a2.34 2.34 0 0 0-2.349-2.344 2.343 2.343 0 0 0-2.354 2.372 2.34 2.34 0 0 0 2.367 2.326 2.334 2.334 0 0 0 2.336-2.354z"
}))));
const Fb = () => react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "40",
  height: "40",
  viewBox: "0 0 40 40"
}, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", {
  fill: "none",
  fillRule: "evenodd"
}, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", {
  width: "40",
  height: "40",
  fill: "#3C5A98",
  rx: "20"
}), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
  fill: "#FFF",
  fillRule: "nonzero",
  d: "M16.964 14.672v2.61h-1.933v3.193h1.933v9.486h3.97v-9.486H23.6s.25-1.53.37-3.204h-3.02v-2.183c0-.326.434-.765.862-.765h2.163V11h-2.941c-4.167 0-4.069 3.195-4.069 3.672z"
})));
const Tw = () => react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "40",
  height: "40",
  viewBox: "0 0 40 40"
}, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", {
  fill: "none",
  fillRule: "evenodd"
}, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", {
  width: "40",
  height: "40",
  fill: "#1DA1F2",
  rx: "20"
}), react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", {
  fill: "#FFF",
  fillRule: "nonzero",
  d: "M29 14.772a7.24 7.24 0 0 1-2.12.595 3.783 3.783 0 0 0 1.623-2.09 7.339 7.339 0 0 1-2.347.918A3.642 3.642 0 0 0 23.461 13c-2.039 0-3.692 1.693-3.692 3.78 0 .297.032.586.095.862-3.068-.158-5.789-1.663-7.61-3.95a3.822 3.822 0 0 0-.5 1.9c0 1.312.653 2.47 1.643 3.147a3.627 3.627 0 0 1-1.673-.475v.047c0 1.832 1.274 3.36 2.962 3.708-.31.086-.636.133-.973.133-.238 0-.47-.024-.695-.07.47 1.503 1.833 2.596 3.448 2.626A7.298 7.298 0 0 1 11 26.272a10.26 10.26 0 0 0 5.66 1.701c6.793 0 10.505-5.761 10.505-10.758l-.012-.49A7.474 7.474 0 0 0 29 14.772z"
})));

/***/ }),

/***/ "./src/consts.js":
/*!***********************!*\
  !*** ./src/consts.js ***!
  \***********************/
/*! exports provided: LoopState, MAXIMUM_RECORD_TURNS, MAXIMUM_NEWS_READ, BPM, BEATS_IN_LOOP, LOOP_DURATION_SEC */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoopState", function() { return LoopState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAXIMUM_RECORD_TURNS", function() { return MAXIMUM_RECORD_TURNS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAXIMUM_NEWS_READ", function() { return MAXIMUM_NEWS_READ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BPM", function() { return BPM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BEATS_IN_LOOP", function() { return BEATS_IN_LOOP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOOP_DURATION_SEC", function() { return LOOP_DURATION_SEC; });
const LoopState = {
  Off: "off",
  Loading: "loading",
  NextOn: "nextOn",
  NextOff: "nextOff",
  Active: "active"
};
const MAXIMUM_RECORD_TURNS = 32;
const MAXIMUM_NEWS_READ = 15;
const BPM = 90;
const BEATS_IN_LOOP = 16;
const LOOP_DURATION_SEC = BEATS_IN_LOOP / (BPM / 60);

/***/ }),

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
/*! exports provided: categories, loops, news */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "categories", function() { return categories; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loops", function() { return loops; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "news", function() { return news; });
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ "./src/consts.js");

const categories = [{
  id: "beats",
  name: "Бит",
  color: "#af5c14"
}, {
  id: "hihats",
  name: "Хай-хэт",
  color: "#be8b1a"
}, {
  id: "bass",
  name: "Бас",
  color: "#3462c3"
}, {
  id: "tune",
  name: "Синт",
  color: "#7b45af"
}];
const loops = [{
  id: "bt1",
  categoryId: "beats",
  groupId: "beats",
  src: "beat1",
  state: _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Loading
}, {
  id: "bt2",
  categoryId: "beats",
  groupId: "beats",
  src: "beat2",
  state: _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Loading
}, {
  id: "bt3",
  categoryId: "beats",
  groupId: "beats",
  src: "beat3",
  state: _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Loading
}, {
  id: "bt4",
  categoryId: "beats",
  groupId: "beats",
  src: "beat4",
  state: _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Loading
}, {
  id: "h1",
  categoryId: "hihats",
  groupId: "hihats",
  src: "hats1",
  state: _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Loading
}, {
  id: "h2",
  categoryId: "hihats",
  groupId: "hihats",
  src: "hats2",
  state: _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Loading
}, {
  id: "h3",
  categoryId: "hihats",
  groupId: "hihats",
  src: "hats3",
  state: _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Loading
}, {
  id: "h4",
  categoryId: "hihats",
  groupId: "hihats",
  src: "hats4",
  state: _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Loading
}, {
  id: "b1",
  categoryId: "bass",
  groupId: "bass",
  src: "bass1",
  state: _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Loading
}, {
  id: "b2",
  categoryId: "bass",
  groupId: "bass",
  src: "bass2",
  state: _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Loading
}, {
  id: "b3",
  categoryId: "bass",
  groupId: "bass",
  src: "bass3",
  state: _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Loading
}, {
  id: "b4",
  categoryId: "bass",
  groupId: "bass",
  src: "bass4",
  state: _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Loading
}, {
  id: "t1",
  categoryId: "tune",
  groupId: "tune",
  src: "tema1",
  state: _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Loading
}, {
  id: "t2",
  categoryId: "tune",
  groupId: "tune",
  src: "tema2",
  state: _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Loading
}, {
  id: "t3",
  categoryId: "tune",
  groupId: "tune",
  src: "tema3",
  state: _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Loading
}, {
  id: "t4",
  categoryId: "tune",
  groupId: "tune",
  src: "tema4",
  state: _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Loading
}];
const news = [{
  id: "0",
  link: "https://zona.media/news/2018/10/14/free",
  text: "Навальный вышел на свободу после 50 суток ареста"
}, {
  id: "1",
  link: "https://zona.media/news/2018/10/13/fire",
  text: "В Москве подожгли храм и воскресную школу"
}, {
  id: "2",
  link: "https://zona.media/news/2018/10/08/masha",
  text: "В Красноярском крае пенсионерку обязали выплатить 160 тысяч рублей за продажу односельчанам самодельных «Маши и медведя»"
}, {
  id: "3",
  link: "https://zona.media/news/2018/10/09/school",
  text: "В новосибирской школе девятиклассник напал с ножом на сверстника"
}, {
  id: "4",
  link: "https://zona.media/news/2018/10/05/mailru-jokes",
  text: "Вице-президент Mail.ru предложил создать орган, проверяющий шутки на экстремизм"
}, {
  id: "5",
  link: "https://zona.media/news/2018/10/03/shagdarov",
  text: "В Забайкалье следователя заподозрили в хищении вещдоков по делу о хищении вещдоков"
}, {
  id: "6",
  link: "https://zona.media/news/2018/10/01/policemen",
  text: "В Москве двое полицейских задержаны за стрельбу из травматического пистолета по прохожему"
}, {
  id: "7",
  link: "https://zona.media/news/2018/09/19/karaoke",
  text: "Троих жителей Чебоксар заподозрили в нападении на полицейских после драки в караоке"
}, {
  id: "8",
  link: "https://zona.media/news/2018/09/18/hm",
  text: "В Брянской области пресвитера адвентистов оштрафовали после жалобы православной местной жительницы"
}, {
  id: "9",
  link: "https://zona.media/news/2018/09/11/hutorok",
  text: "В Краснодаре после конфликта лесоруба и местной жительницы, выступающей против вырубки леса, один судья осудил обоих"
}, {
  id: "10",
  link: "https://zona.media/news/2018/09/07/sledovatel-bik",
  text: "Волгоградского следователя, пообещавшего разбить голову пожилой потерпевшей, заподозрили в превышении полномочий"
}, {
  id: "11",
  link: "https://zona.media/news/2018/09/06/90s",
  text: "В Подмосковье пятерых человек арестовали по обвинению в похищении предпринимателей"
}];

/***/ }),

/***/ "./src/ducks/categories.js":
/*!*********************************!*\
  !*** ./src/ducks/categories.js ***!
  \*********************************/
/*! exports provided: SET_CATEGORIES, setCategories, categoriesReducer, selectState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_CATEGORIES", function() { return SET_CATEGORIES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCategories", function() { return setCategories; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "categoriesReducer", function() { return categoriesReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectState", function() { return selectState; });
const SET_CATEGORIES = "categories/SET_CATEGORIES";
const initialState = [];
function setCategories(categories) {
  return {
    type: SET_CATEGORIES,
    payload: categories
  };
}
function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      {
        const newState = [...state];

        for (const category of action.payload) {
          if (!newState.some(({
            id
          }) => id === category.id)) {
            newState.push(category);
          }
        }

        return newState;
      }

    default:
      return state;
  }
}
function selectState(rootState) {
  return rootState.categories;
}

/***/ }),

/***/ "./src/ducks/index.js":
/*!****************************!*\
  !*** ./src/ducks/index.js ***!
  \****************************/
/*! exports provided: combinedReducers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "combinedReducers", function() { return combinedReducers; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _categories__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./categories */ "./src/ducks/categories.js");
/* harmony import */ var _loops__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loops */ "./src/ducks/loops.js");
/* harmony import */ var _record__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./record */ "./src/ducks/record.js");
/* harmony import */ var _news__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./news */ "./src/ducks/news.js");
/* harmony import */ var _playback__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./playback */ "./src/ducks/playback.js");






const reducers = {
  categories: _categories__WEBPACK_IMPORTED_MODULE_1__["categoriesReducer"],
  loops: _loops__WEBPACK_IMPORTED_MODULE_2__["loopsReducer"],
  news: _news__WEBPACK_IMPORTED_MODULE_4__["newsReducer"],
  record: _record__WEBPACK_IMPORTED_MODULE_3__["recordReducer"],
  playback: _playback__WEBPACK_IMPORTED_MODULE_5__["playbackReducer"]
};
const combinedReducers = Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(reducers);

/***/ }),

/***/ "./src/ducks/loops.js":
/*!****************************!*\
  !*** ./src/ducks/loops.js ***!
  \****************************/
/*! exports provided: SET_LOOPS, SET_LOOP_STATE, STOP_ALL_LOOPS, setLoops, setLoopState, stopAllLoops, loopsReducer, selectState, selectLoopsByCategory, selectAllLoaded */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_LOOPS", function() { return SET_LOOPS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_LOOP_STATE", function() { return SET_LOOP_STATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STOP_ALL_LOOPS", function() { return STOP_ALL_LOOPS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLoops", function() { return setLoops; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLoopState", function() { return setLoopState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stopAllLoops", function() { return stopAllLoops; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loopsReducer", function() { return loopsReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectState", function() { return selectState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectLoopsByCategory", function() { return selectLoopsByCategory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectAllLoaded", function() { return selectAllLoaded; });
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../consts */ "./src/consts.js");

const SET_LOOPS = "loops/SET_LOOPS";
const SET_LOOP_STATE = "loops/SET_LOOP_STATE";
const STOP_ALL_LOOPS = "loops/STOP_ALL_LOOPS";
const initialState = [];
function setLoops(loops) {
  return {
    type: SET_LOOPS,
    payload: loops
  };
}
function setLoopState(newLoopStates) {
  return {
    type: SET_LOOP_STATE,
    payload: newLoopStates
  };
}
function stopAllLoops() {
  return {
    type: STOP_ALL_LOOPS
  };
}
function loopsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOOPS:
      return [...action.payload];

    case SET_LOOP_STATE:
      {
        const payload = action.payload;
        return state.reduce((result, loop) => {
          const newState = payload.find(({
            id
          }) => loop.id === id);

          if (newState !== undefined) {
            loop.state = newState.state;
          }

          result.push(loop);
          return result;
        }, []);
      }

    case STOP_ALL_LOOPS:
      {
        return state.map(loop => {
          loop.state = _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Off;
          return loop;
        });
      }

    default:
      return state;
  }
}
function selectState(rootState) {
  return rootState.loops;
}
function selectLoopsByCategory(rootState, categoryId) {
  return selectState(rootState).filter(loop => loop.categoryId === categoryId);
}
function selectAllLoaded(rootState) {
  const loops = selectState(rootState);
  return Boolean(loops.length) && loops.every(loop => loop.state !== _consts__WEBPACK_IMPORTED_MODULE_0__["LoopState"].Loading);
}

/***/ }),

/***/ "./src/ducks/news.js":
/*!***************************!*\
  !*** ./src/ducks/news.js ***!
  \***************************/
/*! exports provided: SET_NEWS, setNews, newsReducer, selectState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_NEWS", function() { return SET_NEWS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setNews", function() { return setNews; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "newsReducer", function() { return newsReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectState", function() { return selectState; });
const SET_NEWS = "news/SET_NEWS";
const initialState = [];
function setNews(news) {
  return {
    type: SET_NEWS,
    payload: news
  };
}
function newsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NEWS:
      return [...action.payload];

    default:
      return state;
  }
}
function selectState(rootState) {
  return rootState.news;
}

/***/ }),

/***/ "./src/ducks/playback.js":
/*!*******************************!*\
  !*** ./src/ducks/playback.js ***!
  \*******************************/
/*! exports provided: SET_CURSOR, setCursor, playbackReducer, selectState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_CURSOR", function() { return SET_CURSOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCursor", function() { return setCursor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playbackReducer", function() { return playbackReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectState", function() { return selectState; });
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const SET_CURSOR = "playback/SET_CURSOR";
const initialState = {
  timestamp: null,
  cursor: null
};
function setCursor(value) {
  return {
    type: SET_CURSOR,
    payload: value
  };
}
function playbackReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURSOR:
      return _objectSpread({}, state, {
        timestamp: action.payload !== null ? Date.now() : null,
        cursor: action.payload
      });

    default:
      return state;
  }
}
function selectState(rootState) {
  return rootState.playback;
}

/***/ }),

/***/ "./src/ducks/record.js":
/*!*****************************!*\
  !*** ./src/ducks/record.js ***!
  \*****************************/
/*! exports provided: SET_IS_RECORDING, SET_IS_PLAYING_RECORD, ADD_LOOPS, ADD_NEWS, setIsRecording, setIsPlayingRecord, addLoops, addNews, recordReducer, selectState, selectIsRecording, selectIsPlayingRecord, selectStartTimestamp, selectRecordLoops, selectRecordNews */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_IS_RECORDING", function() { return SET_IS_RECORDING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_IS_PLAYING_RECORD", function() { return SET_IS_PLAYING_RECORD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_LOOPS", function() { return ADD_LOOPS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_NEWS", function() { return ADD_NEWS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setIsRecording", function() { return setIsRecording; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setIsPlayingRecord", function() { return setIsPlayingRecord; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addLoops", function() { return addLoops; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addNews", function() { return addNews; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recordReducer", function() { return recordReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectState", function() { return selectState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectIsRecording", function() { return selectIsRecording; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectIsPlayingRecord", function() { return selectIsPlayingRecord; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectStartTimestamp", function() { return selectStartTimestamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectRecordLoops", function() { return selectRecordLoops; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectRecordNews", function() { return selectRecordNews; });
/* harmony import */ var _analytics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../analytics */ "./src/analytics.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const SET_IS_RECORDING = "record/SET_IS_RECORDING";
const SET_IS_PLAYING_RECORD = "record/SET_IS_PLAYING_RECORD";
const ADD_LOOPS = "record/ADD_LOOPS";
const ADD_NEWS = "record/ADD_NEWS";
const initialState = {
  startTimestamp: null,
  isRecording: false,
  isPlayingRecord: false,
  loops: [],
  news: []
};
function setIsRecording(value) {
  return {
    type: SET_IS_RECORDING,
    payload: value
  };
}
function setIsPlayingRecord(value) {
  return {
    type: SET_IS_PLAYING_RECORD,
    payload: value
  };
}
function addLoops(loops) {
  return {
    type: ADD_LOOPS,
    payload: loops
  };
}
function addNews({
  id,
  timestamp
}) {
  return {
    type: ADD_NEWS,
    payload: {
      id,
      timestamp
    }
  };
}
function recordReducer(state = initialState, action) {
  switch (action.type) {
    case SET_IS_RECORDING:
      {
        if (action.payload) {
          _analytics__WEBPACK_IMPORTED_MODULE_0__["GAStartRecord"]();
          return _objectSpread({}, initialState, {
            isRecording: true
          });
        } else {
          _analytics__WEBPACK_IMPORTED_MODULE_0__["GAStopRecord"]();
          return _objectSpread({}, state, {
            isRecording: false
          });
        }
      }

    case SET_IS_PLAYING_RECORD:
      {
        return _objectSpread({}, state, {
          isPlayingRecord: action.payload
        });
      }

    case ADD_LOOPS:
      {
        return _objectSpread({}, state, {
          startTimestamp: state.startTimestamp === null ? Date.now() : state.startTimestamp,
          loops: [...state.loops, action.payload]
        });
      }

    case ADD_NEWS:
      {
        return _objectSpread({}, state, {
          news: [...state.news, action.payload]
        });
      }

    default:
      return state;
  }
}
function selectState(rootState) {
  return rootState.record;
}
function selectIsRecording(state) {
  return selectState(state).isRecording;
}
function selectIsPlayingRecord(state) {
  return selectState(state).isPlayingRecord;
}
function selectStartTimestamp(state) {
  return selectState(state).startTimestamp;
}
function selectRecordLoops(state) {
  return selectState(state).loops;
}
function selectRecordNews(state) {
  return selectState(state).news;
}

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"rootContainer":"rootContainer--1fTVW"};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _ducks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ducks */ "./src/ducks/index.js");
/* harmony import */ var _ducks_loops__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ducks/loops */ "./src/ducks/loops.js");
/* harmony import */ var _ducks_categories__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ducks/categories */ "./src/ducks/categories.js");
/* harmony import */ var _ducks_news__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ducks/news */ "./src/ducks/news.js");
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./App */ "./src/App.jsx");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./data */ "./src/data.js");
/* harmony import */ var _components_Player_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/Player/utils */ "./src/components/Player/utils.js");
/* harmony import */ var _ducks_record__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ducks/record */ "./src/ducks/record.js");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./index.css */ "./src/index.css");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_12__);













const store = Object(redux__WEBPACK_IMPORTED_MODULE_3__["createStore"])(_ducks__WEBPACK_IMPORTED_MODULE_4__["combinedReducers"]); // valid ids are required to be able to create a share link

_data__WEBPACK_IMPORTED_MODULE_9__["loops"].forEach(({
  id
}) => Object(_components_Player_utils__WEBPACK_IMPORTED_MODULE_10__["validateLoopId"])(id)); // set initial store

store.dispatch(Object(_ducks_categories__WEBPACK_IMPORTED_MODULE_6__["setCategories"])(_data__WEBPACK_IMPORTED_MODULE_9__["categories"]));
store.dispatch(Object(_ducks_loops__WEBPACK_IMPORTED_MODULE_5__["setLoops"])(_data__WEBPACK_IMPORTED_MODULE_9__["loops"]));
store.dispatch(Object(_ducks_news__WEBPACK_IMPORTED_MODULE_7__["setNews"])(_data__WEBPACK_IMPORTED_MODULE_9__["news"])); // check if there's a record in the url query parameter

const recordHash = Object(_components_Player_utils__WEBPACK_IMPORTED_MODULE_10__["getRecordFromUrl"])();

if (recordHash !== null) {
  const playlist = Object(_components_Player_utils__WEBPACK_IMPORTED_MODULE_10__["generatePlayList"])(recordHash);

  if (playlist) {
    playlist.loops.forEach(recordedLoops => {
      store.dispatch(Object(_ducks_record__WEBPACK_IMPORTED_MODULE_11__["addLoops"])(recordedLoops));
    });
    playlist.news.forEach(recordedNews => {
      store.dispatch(Object(_ducks_record__WEBPACK_IMPORTED_MODULE_11__["addNews"])(recordedNews));
    });
  }
}

let rootNode = document.getElementById("rap_root");

if (!rootNode) {
  rootNode = document.createElement("div");
  rootNode.className = _index_css__WEBPACK_IMPORTED_MODULE_12__["rootContainer"];
  const body = document.body;

  if (body !== null) {
    body.appendChild(rootNode);
  }
}

const renderApp = Component => {
  if (rootNode) {
    Object(react_dom__WEBPACK_IMPORTED_MODULE_1__["render"])(react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_redux__WEBPACK_IMPORTED_MODULE_2__["Provider"], {
      store: store
    }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"](Component, null)), rootNode);
  }
};

renderApp(_App__WEBPACK_IMPORTED_MODULE_8__["App"]);

if (module.hot !== undefined) {
  module.hot.accept(/*! ./App */ "./src/App.jsx", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _App__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./App */ "./src/App.jsx");
(() => {
    renderApp(_App__WEBPACK_IMPORTED_MODULE_8__["App"]);
  })(__WEBPACK_OUTDATED_DEPENDENCIES__); });
}

/***/ }),

/***/ "./src/reader/Reader.js":
/*!******************************!*\
  !*** ./src/reader/Reader.js ***!
  \******************************/
/*! exports provided: Reader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Reader", function() { return Reader; });
/* harmony import */ var _components_Player_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/Player/utils */ "./src/components/Player/utils.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class Reader {
  constructor({
    onReady,
    onProgress,
    onEnd
  }) {
    _defineProperty(this, "isReady", void 0);

    _defineProperty(this, "newsProgressInterval", void 0);

    _defineProperty(this, "onProgress", void 0);

    _defineProperty(this, "onEnd", void 0);

    _defineProperty(this, "synth", void 0);

    _defineProperty(this, "voices", void 0);

    this.isReady = false;
    this.newsProgressInterval = null;
    this.onProgress = onProgress;
    this.onEnd = onEnd;
    this.synth = window.speechSynthesis;
    this.voices = this.getRussianVoices();

    if (!this.voices.length) {
      this.synth.addEventListener("voiceschanged", () => {
        // this check is needed because "voiceschanged" is fired several times
        if (!this.isReady) {
          this.voices = this.getRussianVoices();
          this.isReady = true;
          onReady(this.getVoicesMap());
        }
      });
    } else {
      this.isReady = true;
      onReady(this.getVoicesMap());
    }
  }

  read(text, id) {
    if (!this.isReady) {
      console.error("Reader is not ready yet");
      return;
    }

    const voiceName = this.voices[Math.round(Object(_components_Player_utils__WEBPACK_IMPORTED_MODULE_0__["randomInRange"])(0, this.voices.length - 1))].name;
    const pitch = Object(_components_Player_utils__WEBPACK_IMPORTED_MODULE_0__["randomInRange"])(0.7, 1.1);
    const rate = Object(_components_Player_utils__WEBPACK_IMPORTED_MODULE_0__["randomInRange"])(0.9, 1);
    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.voice = this.voices.find(voice => voice.name === voiceName) || this.voices[0];
    utterance.pitch = pitch;
    utterance.rate = rate;
    this.stop();
    this.synth.speak(utterance);
    const approximateDurationMS = text.length * 40;
    const intervalDuration = 100;
    let progressIterationIndex = 0;
    this.newsProgressInterval = setInterval(() => {
      progressIterationIndex += 1;
      const progress = Math.min(1, progressIterationIndex * intervalDuration / approximateDurationMS);

      if (progress === 1) {
        this.endProgress();
      } else {
        this.onProgress(id, progress);
      }
    }, intervalDuration);
  }

  stop() {
    this.synth.cancel();
    this.endProgress();
  }

  endProgress() {
    if (this.newsProgressInterval !== null) {
      clearInterval(this.newsProgressInterval);
    }

    this.onEnd();
  }

  getRussianVoices() {
    return this.synth.getVoices().filter(voice => voice.lang.startsWith("ru") && voice.localService);
  }

  getVoicesMap() {
    return this.voices.map(voice => ({
      name: voice.name,
      lang: voice.lang
    }));
  }

}

/***/ })

/******/ });