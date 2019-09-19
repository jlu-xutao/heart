/*
 * @Descripttion: 基础工具方法模块
 * @Author: xutao
 * @Date: 2019-09-15 18:00:05
 * @LastEditors: xutao
 * @LastEditTime: 2019-09-18 20:05:38
 */
var core;
(function (core) {
    var util;
    (function (util) {
        function isFunction(data) {
            return Object.prototype.toString.call(data) === "[object Function]";
        }
        util.isFunction = isFunction;
    })(util = core.util || (core.util = {}));
})(core || (core = {}));
/*
 * @Descripttion: 日志工具方法模块
 * @Author: xutao
 * @Date: 2019-09-12 17:55:58
 * @LastEditors: xutao
 * @LastEditTime: 2019-09-18 20:05:59
 */
var core;
(function (core) {
    var logUtil;
    (function (logUtil) {
        function log(message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            console.log.apply(console, [message].concat(optionalParams));
        }
        logUtil.log = log;
        function error(message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            console.error.apply(console, [message].concat(optionalParams));
        }
        logUtil.error = error;
        function warn(message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            console.warn.apply(console, [message].concat(optionalParams));
        }
        logUtil.warn = warn;
    })(logUtil = core.logUtil || (core.logUtil = {}));
})(core || (core = {}));
/*
 * @Descripttion: 事件管理器
 * @Author: xutao
 * @Date: 2019-07-23 10:38:09
 * @LastEditors: xutao
 * @LastEditTime: 2019-09-18 20:15:58
 */
/// <reference path="../utils/util.ts" />
/// <reference path="../utils/logUtil.ts" />
var core;
(function (core) {
    var EventEmitter = /** @class */ (function () {
        function EventEmitter() {
        }
        EventEmitter.on = function (name, fn) {
            if (core.util.isFunction(fn)) {
                core.logUtil.warn('EventEmitter on: fn should be Function');
                return;
            }
            this._events[name] || (this._events[name] = []);
            var cbs = this._events[name];
            if (cbs.indexOf(fn) === -1) {
                this._events[name].push(fn);
            }
        };
        EventEmitter.off = function (name, fn) {
            var cbs = this._events[name];
            if (!cbs) {
                return;
            }
            if (fn == null) {
                this._events[name] = [];
                return;
            }
            for (var len = cbs.length, i = len - 1; i >= 0; i--) {
                if (cbs[i] === fn) {
                    cbs.splice(i, 1);
                    break;
                }
            }
        };
        EventEmitter.emit = function (name) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var cbs = this._events[name];
            if (!cbs) {
                return;
            }
            for (var len = cbs.length, i = len - 1; i >= 0; i--) {
                var cb = cbs[i];
                try {
                    if (core.util.isFunction(cb)) {
                        cb(args);
                    }
                }
                catch (e) {
                    core.logUtil.error(e);
                }
            }
        };
        EventEmitter.sendEvent = function (name) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            (this._eventsCache || (this._eventsCache = [])).push({
                name: name,
                args: args
            });
        };
        EventEmitter.flushEvents = function () {
            var date1 = new Date().getTime();
            for (var i = 0, len = this._eventsCache.length; i < len; i++) {
                var waitEvent = this._eventsCache[i];
                this.emit(waitEvent.name, waitEvent.args);
                var date2 = new Date().getTime();
                // 超过最大时间暂停事件执行
                if (date2 - date1 >= this.maxWaitEventTime) {
                    this._eventsCache.splice(0, i);
                    core.logUtil.warn("EventEmitter clearEvents: \u8D85\u8FC7\u4E8B\u4EF6\u6267\u884C\u65F6\u95F4\u9650\u5236" + this.maxWaitEventTime);
                    return;
                }
            }
            this._eventsCache = [];
        };
        EventEmitter._events = {};
        /**
         * 延迟事件最大执行时间
         * 单位：毫秒
         */
        EventEmitter.maxWaitEventTime = 16;
        return EventEmitter;
    }());
    core.EventEmitter = EventEmitter;
})(core || (core = {}));
/*
 * @Descripttion:
 * @Author: xutao
 * @Date: 2019-09-12 17:19:56
 * @LastEditors: xutao
 * @LastEditTime: 2019-09-18 20:06:42
 */
/// <reference path="./event/EventEmitter.ts" />
var core;
(function (core) {
    function init() {
    }
    core.init = init;
})(core || (core = {}));
/*
 * @Descripttion: 自定义事件枚举
 * @Author: xutao
 * @Date: 2019-09-18 19:30:48
 * @LastEditors: xutao
 * @LastEditTime: 2019-09-18 20:04:46
 */
var core;
(function (core) {
    var CustomEventID;
    (function (CustomEventID) {
    })(CustomEventID = core.CustomEventID || (core.CustomEventID = {}));
})(core || (core = {}));
/*
 * @Descripttion: 事件数据
 * @Author: xutao
 * @Date: 2019-09-18 20:08:28
 * @LastEditors: xutao
 * @LastEditTime: 2019-09-19 17:06:59
 */
var core;
(function (core) {
    var EventData = /** @class */ (function () {
        function EventData() {
        }
        return EventData;
    }());
    core.EventData = EventData;
})(core || (core = {}));
/*
 * @Descripttion:
 * @Author: xutao
 * @Date: 2019-09-18 19:02:47
 * @LastEditors: xutao
 * @LastEditTime: 2019-09-19 17:03:59
 */
var core;
(function (core) {
    var UIType = /** @class */ (function () {
        function UIType() {
        }
        UIType.FIRST_UI = 'FIRST_UI';
        return UIType;
    }());
    core.UIType = UIType;
})(core || (core = {}));
/*
 * @Descripttion: UI基类
 * @Author: xutao
 * @Date: 2019-09-18 18:50:58
 * @LastEditors: xutao
 * @LastEditTime: 2019-09-19 16:57:14
 */
/// <reference path="../define/CustomEventID.ts" />
/// <reference path="../event/EventEmitter.ts" />
/// <reference path="../define/EventData.ts" />
var core;
(function (core) {
    var BaseUI = /** @class */ (function () {
        function BaseUI() {
            this.addEventListeners();
        }
        BaseUI.prototype.onCreate = function () {
        };
        BaseUI.prototype.onShow = function () {
        };
        BaseUI.prototype.onHide = function () {
        };
        BaseUI.prototype.onClose = function () {
        };
        /**
         * 添加自定义事件
         */
        BaseUI.prototype.addEventListeners = function () {
            var _this = this;
            var eventIds = this.getInterests();
            eventIds.forEach(function (id) {
                core.EventEmitter.on(id, _this.onEvent);
            });
        };
        /**
         * 移除全部的自定义事件
         */
        BaseUI.prototype.removeAllEventListeners = function () {
            var _this = this;
            var eventIds = this.getInterests();
            eventIds.forEach(function (id) {
                core.EventEmitter.off(id, _this.onEvent);
            });
        };
        /**
         * 注册事件
         */
        BaseUI.prototype.getInterests = function () {
            return [];
        };
        /**
         * 事件监听器
         * @param eventData {core.EventData}
         */
        BaseUI.prototype.onEvent = function (eventData) {
            switch (eventData.customID) {
                default:
                    break;
            }
        };
        return BaseUI;
    }());
    core.BaseUI = BaseUI;
})(core || (core = {}));
/*
 * @Descripttion: UI管理器
 * @Author: xutao
 * @Date: 2019-09-18 18:58:14
 * @LastEditors: xutao
 * @LastEditTime: 2019-09-19 17:22:08
 */
/// <reference path="../ui/BaseUI.ts" />
var core;
(function (core) {
    var UIMgr = /** @class */ (function () {
        function UIMgr() {
            this._cache = {};
        }
        Object.defineProperty(UIMgr, "instance", {
            get: function () {
                return this._instance || (this._instance = new UIMgr);
            },
            enumerable: true,
            configurable: true
        });
        UIMgr.prototype.openUI = function (uiName, uiClass, isCache) {
            if (isCache === void 0) { isCache = false; }
            var baseUI = this._cache[uiName] || new uiClass();
            return baseUI;
        };
        UIMgr.prototype.closeUI = function () {
        };
        return UIMgr;
    }());
    core.UIMgr = UIMgr;
})(core || (core = {}));
//# sourceMappingURL=index.js.map