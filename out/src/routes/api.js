"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var IncidentModel = require("../model/incident");
var api = express_1.Router();
/* GET sensor status. */
api.get('/incident/:id', function (req, res, next) {
    var rows = IncidentModel.getAllIncidentsByResidentId(0);
    res.send('This method returns sensor value');
});
/* Register sensor */
api.post('/incident/:id', function (req, res, next) {
    var sensorId = req.params.id;
    res.status(200).send();
});
exports.default = api;
//# sourceMappingURL=api.js.map