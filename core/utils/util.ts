namespace core{
    export module util {
        export function isFunction(data): boolean{
            return Object.prototype.toString.call(data) === "[object Function]";
        }
    }
}