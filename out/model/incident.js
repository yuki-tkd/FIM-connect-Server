"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DB = require("./db");
function getAllIncidents() {
    return new Promise(function (resolve, reject) {
        var q = "SELECT * FROM Incident";
        DB.findAll(q, [], function (rows) {
            resolve(rows);
        });
    });
}
exports.getAllIncidents = getAllIncidents;
function getAllIncidentsByResidentId(rid) {
    return new Promise(function (resolve, reject) {
        var q = "SELECT * FROM Incident WHERE ResidentId = ?";
        DB.findAll(q, [rid], function (rows) {
            resolve(rows);
        });
    });
}
exports.getAllIncidentsByResidentId = getAllIncidentsByResidentId;
function addIncident(id, type) {
    return new Promise(function (resolve, reject) {
        var data = { SensorId: id, Type: type };
        DB.insert("Incident", data, function (result) {
            console.log("Added " + result);
            resolve(result);
        });
    });
}
exports.addIncident = addIncident;
//# sourceMappingURL=incident.js.map