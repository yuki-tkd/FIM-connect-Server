"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DB = require("./db");
function getAllResidents() {
    return new Promise(function (resolve, reject) {
        var q = "SELECT * FROM Resident";
        DB.findAll(q, [], function (rows) {
            resolve(rows);
        });
    });
}
function getAllIncidentsByResidentId(rid) {
    return new Promise(function (resolve, reject) {
        var q = "SELECT * FROM Resident WHERE id = ?";
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
//# sourceMappingURL=resident.js.map