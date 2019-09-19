/*
 * @Descripttion: UI管理器
 * @Author: xutao
 * @Date: 2019-09-18 18:58:14
 * @LastEditors: xutao
 * @LastEditTime: 2019-09-19 19:54:55
 */
/// <reference path="../ui/BaseUI.ts" />
namespace core {
    interface UICacheInerface {
        uiClass: any,
        node: core.BaseUI,
        parentNode: core.BaseUI
    }
    export class UIMgr {
        private static _instance: UIMgr;
        public static get instance(): UIMgr {
            return this._instance || (this._instance = new UIMgr);
        }
        private constructor() { }
        private _cache: Object = {};
        /**
         * 打开ui
         * @param uiName 
         * @param uiClass 
         * @param isCache 
         */
        public openUI<T extends core.BaseUI>(uiName: string, uiClass: new () => T, parentNode: core.BaseUI, isCache: boolean = false): T {
            let node: T = this._cache[uiName] && this._cache[uiName]['node'] || new uiClass();
            parentNode.addChild(node);
            if (isCache) {
                this._cache[uiName] = {
                    node,
                    uiClass,
                    parentNode
                };
            }
            return node;
        }

        /**
         * 关闭ui
         * @param uiName ui名称
         * @param isDestroy 是否销毁
         */
        public closeUI(uiName: string, isDestroy: boolean = false) {
            let cacheObj = this._cache[uiName];
            if (cacheObj == undefined) {
                core.logUtil.warn('UIMgr closeUI: 没有对应的ui对象');
                return;
            }
            let node: core.BaseUI = cacheObj.node;
            let parentNode: core.BaseUI = cacheObj.parentNode;

            parentNode.removeChild(node);

            if(isDestroy){
                this._cache[uiName] = null;
            }
        }
    }
}