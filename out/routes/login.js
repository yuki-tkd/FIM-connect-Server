"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var login = express_1.Router();
/* GET home page. */
login.get('/', function (req, res, next) {
    res.render('login', { title: 'HelloWorld' });
});
exports.default = login;
//# sourceMappingURL=login.js.map