"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var alerts = express_1.Router();
/* GET home page. */
alerts.get('/', function (req, res, next) {
    res.render('alerts', { title: 'HelloWorld' });
});
exports.default = alerts;
