/*
 * @Descripttion: 基础工具方法模块
 * @Author: xutao
 * @Date: 2019-09-15 18:00:05
 * @LastEditors: xutao
 * @LastEditTime: 2019-09-18 20:05:38
 */
namespace core{
    export module util {
        export function isFunction(data): boolean{
            return Object.prototype.toString.call(data) === "[object Function]";
        }
    }
}