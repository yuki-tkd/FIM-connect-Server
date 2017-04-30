"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var IncidentModel = require("../model/incident");
var WebSocket = require("../www");
var api = express_1.Router();
/* GET sensor status. */
api.get('/sensor/:id/:status', function (req, res, next) {
    var id = req.params.id;
    var status = req.params.status;
    WebSocket.sendAllClients(id, status);
    IncidentModel.addIncident(id, status).then(function (row) {
        if (!row) {
            res.status(404).send();
        }
        else {
            res.status(200).send('ok');
        }
    });
});
/* GET sensor status. */
api.get('/incident/:id', function (req, res, next) {
    //const residentId = req.params.id;
    //IncidentModel.getAllIncidentsByResidentId(residentId).then( (row) => {
    //  if(!row) { res.status(404)send(); }
    //  else {
    //    res.send(row);
    //  }
    //});
});
/* Register sensor */
api.post('/incident/:id/:type', function (req, res, next) {
    //const sensorId = req.params.id;
    //const incidentType = req.params.type;
    //IncidentModel.addIncident(sensorId, incidentType).then( (row) => {
    //  if(!row) { res.status(404)send(); }
    //  else {
    //    res.status(200).send('id = ' + row);
    //  }
    //});
});
exports.default = api;
//# sourceMappingURL=api.js.map