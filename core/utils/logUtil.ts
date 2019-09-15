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