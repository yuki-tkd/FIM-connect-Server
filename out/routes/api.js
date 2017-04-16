"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var api = express_1.Router();
/* GET sensor status. */
api.get('/mat/:id', function (req, res, next) {
    res.send('This method returns sensor value');
});
/* Register sensor */
api.post('/mat/:id', function (req, res, next) {
    console.log(req.params.id);
    console.log(req.query.hospitalName);
    res.status(200).send();
});
/* Update sensor status. */
api.put('/mat/:id', function (req, res, next) {
    console.log(req.params.id);
    console.log(req.query.status);
    res.status(200).send();
});
exports.default = api;
//# sourceMappingURL=api.js.map