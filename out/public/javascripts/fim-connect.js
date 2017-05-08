"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require("./common/router");
var Index = require("./view/index.ts");
Router.connect('Index', Index.init);
function dispatch() {
    var html = document.documentElement;
    var scope = html.getAttribute('data-page-scope');
    Router.dispatch(scope);
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', dispatch);
}
else {
    dispatch();
}
