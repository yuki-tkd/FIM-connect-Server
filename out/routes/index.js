"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var index = express_1.Router();
/* GET home page. */
index.get('/', function (req, res, next) {
    res.render('index', {
        page_scope: 'index',
        title: 'FIMconnect'
    });
});
index.get("/login", function (req, res) {
    res.render('login', {});
});
index.post('/login', function (req, res) {
    res.redirect('/');
});
index.get('/logout', function (req, res) {
    res.redirect('/');
});
index.get('/profile', function (req, res) {
    res.render('rooms');
});
exports.default = index;
