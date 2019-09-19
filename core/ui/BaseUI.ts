/*
 * @Descripttion: UI基类
 * @Author: xutao
 * @Date: 2019-09-18 18:50:58
 * @LastEditors: xutao
 * @LastEditTime: 2019-09-19 20:33:20
 */
/// <reference path="../define/CustomEventID.ts" />
/// <reference path="../event/EventEmitter.ts" />
/// <reference path="../define/EventData.ts" />
namespace core {
    class Component {
        public addChild(node: Component){};
        public removeChild(node: Component){};
    }
    export class BaseUI extends Component {
        constructor() {
            super();
            this.addEventListeners();
        }
        public onCreate() {

        }
        public onShow() {

        }
        public onHide() {

        }
        public onClose() {

        }

        

        /**
         * 添加自定义事件
         */
        protected addEventListeners() {
            let eventIds: core.CustomEventID[] = this.getInterests();
            eventIds.forEach((id: core.CustomEventID) => {
                core.EventEmitter.on(id, this.onEvent);
            });
        }

        /**
         * 移除全部的自定义事件
         */
        protected removeAllEventListeners() {
            let eventIds: core.CustomEventID[] = this.getInterests();
            eventIds.forEach((id: core.CustomEventID) => {
                core.EventEmitter.off(id, this.onEvent);
            })
        }

        /**
         * 注册事件
         */
        public getInterests(): core.CustomEventID[] {
            return [];
        }

        /**
         * 事件监听器
         * @param eventData {core.EventData}
         */
        public onEvent(eventData: core.EventData) {
            switch (eventData.customID) {
                default:
                    break;
            }
        }
    }
}