"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var DB = require("../model/db");
var rooms = express_1.Router();
//TODO: lodash入れること
rooms.get('/', function (req, res, next) {
    DB.Room.findAll().then(function (rows) {
        console.log(rows[0].dataValues);
        res.render('rooms', {
            page_scope: 'Rooms',
            title: 'HelloWorld'
        });
    });
});
rooms.get('/:roomNumber', function (req, res, next) {
    var roomNumber = req.query.roomNumber;
    DB.Room.findOne({ where: { id: id } }).then(function (row) {
        if (!row) {
            res.status(404).send();
        }
        res.render('room', {
            roomNumber: roomNumber,
            incidents: [{
                    Updated: '2017/5/10 10:30',
                    Type: 'Fall'
                }, {
                    Updated: '2017/5/9 8:20',
                    Type: 'Fall'
                }]
        });
    });
});
exports.default = rooms;
