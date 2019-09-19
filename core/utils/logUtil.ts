/*
 * @Descripttion: 日志工具方法模块
 * @Author: xutao
 * @Date: 2019-09-12 17:55:58
 * @LastEditors: xutao
 * @LastEditTime: 2019-09-18 20:05:59
 */
namespace core{
    export module logUtil {
        export function log(message?: any, ...optionalParams: any[]){
            console.log(message, ...optionalParams);
        }

        export function error(message?: any, ...optionalParams: any[]){
            console.error(message, ...optionalParams);
        }

        export function warn(message?: any, ...optionalParams: any[]){
            console.warn(message, ...optionalParams);
        }
    }
}