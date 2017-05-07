var addr = 'ws://' + location.host;
var websocket = new WebSocket(addr, ['json']);
var alertManager;
document.addEventListener("DOMContentLoaded", init);
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
function init() {
    alertManager = new AlertManager(document.querySelector('#alert-list'));
}
var AlertManager = (function () {
    function AlertManager(alertList) {
        this.alertList = alertList;
    }
    AlertManager.prototype.createAlert = function (val) {
        return new Alert(val.id, val.roomNumber, val.name, val.date);
    };
    AlertManager.prototype.addAlert = function (alert) {
        var dom = alert.createDOM();
        this.alertList.prependChild(dom);
    };
    return AlertManager;
}());
var Alert = (function () {
    function Alert(id, roomNumber, name, date) {
        this.id = id;
        this.roomNumber = roomNumber;
        this.name = name;
        this.date = date;
        this.setTimer(this.date);
    }
    Alert.prototype.setTimer = function (date) {
        var d = new Date();
        window.setTimeout(this.removeDOM.bind(this), 5000);
    };
    Alert.prototype.createDOM = function () {
        var alertTmpl = document.querySelector('#alert-template');
        var clone = document.importNode(alertTmpl.content, true);
        var alert = clone.querySelector('.alert');
        var name = clone.querySelector('h6');
        var roomNumber = clone.querySelector('.card-title');
        var update = clone.querySelector('.update');
        alert.setAttribute('data-alert-id', this.id);
        name.textContent = this.name;
        roomNumber.textContent = 'Room ' + this.roomNumber;
        update.textContent = timeConverter(this.date);
        return clone;
    };
    Alert.prototype.removeDOM = function () {
        var p = document.querySelector('#alert-list');
        var me = p.querySelector('[data-alert-id="' + this.id + '"]');
        p.removeChild(me);
    };
    return Alert;
}());
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
Node.prototype.prependChild = function (e) { this.insertBefore(e, this.firstChild); };
//# sourceMappingURL=index.js.map