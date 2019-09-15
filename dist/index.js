/// <reference path="./event/EventEmitter.ts" />
var core;
(function (core) {
    function init() {
        core.EventEmitter.on('test', function () {
        });
    }
    core.init = init;
})(core || (core = {}));
