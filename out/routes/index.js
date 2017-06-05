"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var index = express_1.Router();
/* GET home page. */
index.get('/', function (req, res, next) {
    res.render('index', {
        page_scope: 'Index',
        title: 'FIMconnect'
    });
});
index.get('/demo', function (req, res, next) {
    res.render('random', {
        page_scope: 'Random',
        title: 'FIMconnect'
    });
});
exports.default = index;
