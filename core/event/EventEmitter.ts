/*
 * @Descripttion: 事件管理器
 * @Author: xutao
 * @Date: 2019-07-23 10:38:09
 * @LastEditors: xutao
 * @LastEditTime: 2019-09-12 17:17:32
 */
/// <reference path="../utils/util.ts" />
/// <reference path="../utils/logUtil.ts" />
namespace core {
    interface eventInfo {
        name: string,
        args: any[]
    }
    export class EventEmitter {

        private static _events = {};
        private static _eventsCache: eventInfo[];
        /**
         * 延迟事件最大执行时间
         * 单位：毫秒
         */
        private static maxWaitEventTime: number = 16;

        static on(name: string, fn: Function) {

            if (core.util.isFunction(fn)) {
                core.logUtil.warn('EventEmitter on: fn should be Function');
                return;
            }

            this._events[name] || (this._events[name] = []);
            let cbs: Function[] = this._events[name];
            if (cbs.indexOf(fn) === -1) {
                this._events[name].push(fn);
            }
        }

        static off(name: string, fn?: Function) {
            let cbs: Function[] = this._events[name];
            if (!cbs) {
                return;
            }
            if (fn == null) {
                this._events[name] = [];
                return;
            }
            for (let len = cbs.length, i = len - 1; i >= 0; i--) {
                if (cbs[i] === fn) {
                    cbs.splice(i, 1);
                    break;
                }
            }
        }

        static emit(name: string, ...args: any[]) {
            let cbs: Function[] = this._events[name];
            if (!cbs) {
                return;
            }
            for (let len = cbs.length, i = len - 1; i >= 0; i--) {
                let cb = cbs[i];
                try {
                    if(core.util.isFunction(cb)){
                        cb(args);
                    }
                } catch (e) {
                    core.logUtil.error(e);
                }
            }
        }

        static sendEvent(name: string, ...args: any[]) {
            (this._eventsCache || (this._eventsCache = [])).push(<eventInfo>{
                name,
                args
            });
        }

        static flushEvents() {
            let date1 = new Date().getTime();
            for (let i = 0, len = this._eventsCache.length; i < len; i++) {
                let waitEvent: eventInfo = this._eventsCache[i];
                this.emit(waitEvent.name, waitEvent.args);
                let date2 = new Date().getTime();
                // 超过最大时间暂停事件执行
                if (date2 - date1 >= this.maxWaitEventTime) {
                    this._eventsCache.splice(0, i);
                    core.logUtil.warn(`EventEmitter clearEvents: 超过事件执行时间限制${this.maxWaitEventTime}`);
                    return;
                }
            }

            this._eventsCache = [];

        }
    }
}
