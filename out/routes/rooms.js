"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var DB = require("../model/db");
var WebSocket = require("../www");
var rooms = express_1.Router();
/* GET home page. */
rooms.get('/', function (req, res, next) {
    DB.Room.findAll().then(function (rows) {
        console.log(rows);
        res.render('rooms', { title: 'HelloWorld' });
    });
});
/* GET home page. */
rooms.get('/:roomNumber', function (req, res, next) {
    var data = [{
            id: 0,
            roomNumber: 101,
            name: "John doe",
            date: "1494143497"
        }, {
            id: 1,
            roomNumber: 102,
            name: "John Maeda",
            date: "1494143797"
        }, {
            id: 3,
            roomNumber: 103,
            name: "Test Maeda",
            date: "1494143797"
        }];
    WebSocket.sendAllClients(JSON.stringify(data));
    res.status(200).send();
});
exports.default = rooms;
//# sourceMappingURL=rooms.js.map