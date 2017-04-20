"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var passport = require("passport");
var ensure = require("connect-ensure-login");
var IncidentModel = require("../model/incident");
var Caratakers = require("./model/caretaker");
var index = express_1.Router();
/* GET home page. */
index.get('/', function (req, res, next) {
    Caratakers.getCaretakerById(1);
    IncidentModel.getAllIncidentsByResidentId(0);
    res.render('index', { title: 'Floor in motion' });
});
index.get("/login", function (req, res) {
    res.render('login', {});
});
index.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function (req, res) {
    res.redirect('/');
});
index.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});
index.get('/profile', ensure.ensureLoggedIn(), function (req, res) {
    res.render('rooms');
});
exports.default = index;
//# sourceMappingURL=index.js.map