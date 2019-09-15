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
