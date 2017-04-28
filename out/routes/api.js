"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var IncidentModel = require("../model/incident");
var api = express_1.Router();
/* GET sensor status. */
api.get('/incident/:id', function (req, res, next) {
    var residentId = req.params.id;
    IncidentModel.getAllIncidentsByResidentId(residentId).then(function (row) {
        if (!row) {
            res.status(404);
            send();
        }
        else {
            res.send(row);
        }
    });
});
/* Register sensor */
api.post('/incident/:id/:type', function (req, res, next) {
    var sensorId = req.params.id;
    var incidentType = req.params.type;
    IncidentModel.addIncident(sensorId, incidentType).then(function (row) {
        if (!row) {
            res.status(404);
            send();
        }
        else {
            res.status(200).send('id = ' + row);
        }
    });
});
exports.default = api;
//# sourceMappingURL=api.js.map