/*
 * @Descripttion: 
 * @version: 
 * @Author: xutao
 * @Date: 2019-09-15 20:09:03
 * @LastEditors: xutao
 * @LastEditTime: 2019-09-19 17:10:52
 */

/// <reference path="./core/core.ts" />
/// <reference path="./core/event/EventEmitter.ts" />
/// <reference path="./core/manager/UIMgr.ts" />
/// <reference path="./core/define/UIType.ts" />

import FirstUI from './FirstUI';
core.init();
core.UIMgr.instance.openUI(core.UIType.FIRST_UI, FirstUI);