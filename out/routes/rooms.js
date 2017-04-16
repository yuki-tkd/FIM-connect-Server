"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var rooms = express_1.Router();
/* GET home page. */
rooms.get('/', function (req, res, next) {
    res.render('rooms', { title: 'HelloWorld' });
});
/* GET home page. */
rooms.get('/:roomNumber', function (req, res, next) {
    res.render('room', {
        roomNumber: req.params.roomNumber
    });
});
exports.default = rooms;
//# sourceMappingURL=rooms.js.map