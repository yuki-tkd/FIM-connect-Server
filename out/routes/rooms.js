"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var DB = require("../model/db");
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
    res.render('room', {
        roomNumber: req.params.roomNumber,
        incidents: [{
                Updated: '2017/5/10 10:30',
                Type: 'Fall'
            }, {
                Updated: '2017/5/9 8:20',
                Type: 'Fall'
            }]
    });
});
exports.default = rooms;
//# sourceMappingURL=rooms.js.map