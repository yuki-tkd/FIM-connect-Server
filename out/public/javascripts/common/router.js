"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var routes = [];
var Route = (function () {
    function Route(scope, handler) {
        this.scope = scope;
        this.handler = handler;
    }
    return Route;
}());
function connect(scope, handler) {
    routes.push(new Route(scope, handler));
}
exports.connect = connect;
function dispatch(scope) {
    routes.forEach(function (r) {
        if (r.scope == scope)
            r.handler();
    });
}
exports.dispatch = dispatch;
