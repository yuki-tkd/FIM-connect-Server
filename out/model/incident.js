"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DB = require("./db");
function getAllIncidentsByResidentId(rid) {
    var q = "SELECT * FROM Incident WHERE ResidentId = ?";
    DB.findAll(q, [rid], function (rows) {
        console.log(rows);
        return rows;
    });
}
exports.getAllIncidentsByResidentId = getAllIncidentsByResidentId;
//# sourceMappingURL=incident.js.map