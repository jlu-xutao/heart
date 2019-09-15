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
