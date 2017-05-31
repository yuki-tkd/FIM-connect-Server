(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
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

},{}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}
exports.timeConverter = timeConverter;
function prependChild(p, c) {
    p.insertBefore(c, p.firstChild);
}
exports.prependChild = prependChild;

},{}],3:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Router = require("./common/router");
var Index = require("./view/index");
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

},{"./common/router":1,"./view/index":4}],4:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Util = require("../common/util");
function init() {
    var alertManager = new AlertManager(document.querySelector('#alert-list'));
    var addr = 'ws://' + location.host;
    var websocket = new WebSocket(addr, ['json']);
    websocket.onopen = function () {
    };
    // Log errors
    websocket.onerror = function (error) {
        console.log('WebSocket Error ' + error);
    };
    // Log messages from the server
    websocket.onmessage = function (e) {
        var data = JSON.parse(e.data);
        data.forEach(function (val, index, arr) {
            var alert = alertManager.createAlert(val);
            alertManager.addAlert(alert);
        });
    };
}
exports.init = init;
var AlertManager = (function () {
    function AlertManager(alertList) {
        this.alertList = alertList;
    }
    AlertManager.prototype.createAlert = function (val) {
        return new Alert(val.id, val.roomNumber, val.name, val.date, val.priority);
    };
    AlertManager.prototype.addAlert = function (alert) {
        var dom = alert.createDOM();
        Util.prependChild(this.alertList, dom);
    };
    AlertManager.prototype.updateOrCreate = function (alert) {
        var target;
        alerts.forEach(function (val) {
            if (val.id == alert.id) {
                target = alert;
                updateDOM(alert);
            }
        });
        if (target == null) {
        }
    };
    AlertManager.prototype.create = function (alert) {
    };
    return AlertManager;
}());
var Alert = (function () {
    function Alert(id, roomNumber, name, date, priority) {
        this.id = id;
        this.roomNumber = roomNumber;
        this.name = name;
        this.date = date;
        this.setTimer(this.date);
        this.priority = priority;
    }
    Alert.prototype.setTimer = function (date) {
        var d = new Date();
        this.timer = window.setTimeout(this.removeDOM.bind(this), 10000);
    };
    Alert.prototype.clearTimer = function () {
        clearTimeout(this.timer);
    };
    Alert.prototype.createDOM = function () {
        var alertTmpl = document.querySelector('#incident-template');
        var clone = document.importNode(alertTmpl.content, true);
        var alert = clone.querySelector('.alert');
        var incident = clone.querySelector('.incident');
        var roomNumber = clone.querySelector('.room-number');
        alert.setAttribute('data-incident-id', String(this.id));
        if (this.priority == 1) {
            incident.className = "incident red darken-4";
        }
        else if (this.priority == 2) {
            incident.className = "incident red lighten-1";
        }
        else if (this.priority == 3) {
            incident.className = "incident pink lighten-3";
        }
        else {
            incident.className = "incident red darken-1";
        }
        roomNumber.textContent = this.roomNumber;
        return clone;
    };
    Alert.prototype.updateDOM = function () {
        var p = document.querySelector('#alert-list');
        var clone = p.querySelector('[data-incident-id="' + alert.id + '"]');
        var alert = clone.querySelector('.alert');
        var incident = clone.querySelector('.incident');
        var roomNumber = clone.querySelector('.room-number');
        alert.setAttribute('data-incident-id', String(this.id));
        if (this.priority == 1) {
            incident.className = "incident red darken-4";
        }
        else if (this.priority == 2) {
            incident.className = "incident red lighten-1";
        }
        else if (this.priority == 3) {
            incident.className = "incident pink lighten-3";
        }
        else {
            incident.className = "incident red darken-1";
        }
        roomNumber.textContent = this.roomNumber;
        return clone;
    };
    Alert.prototype.removeDOM = function () {
        var p = document.querySelector('#alert-list');
        var me = p.querySelector('[data-incident-id="' + this.id + '"]');
        p.removeChild(me);
    };
    return Alert;
}());

},{"../common/util":2}]},{},[3]);
