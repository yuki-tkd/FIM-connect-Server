"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ensure = require("connect-ensure-login");
var alerts = express_1.Router();
/* GET home page. */
alerts.get('/', ensure.ensureLoggedIn(), function (req, res, next) {
    res.render('alerts', { title: 'HelloWorld' });
});
exports.default = alerts;
//# sourceMappingURL=alerts.js.map