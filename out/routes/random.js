"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var random = express_1.Router();
/* GET home page. */
random.get('/', function (req, res, next) {
    res.render('index', {
        page_scope: 'Random',
        title: 'FIMconnect'
    });
});
exports.default = random;
