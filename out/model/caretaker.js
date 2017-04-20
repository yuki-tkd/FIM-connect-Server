"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DB = require("./db");
function getCaretakerById(id) {
    return new Promise(function (resolve, reject) {
        var q = "SELECT * FROM Caretaker WHERE Id = ?";
        DB.find(q, id, function (row) {
            resolve(row);
        });
    });
}
exports.getCaretakerById = getCaretakerById;
function getCaretakerByName(name) {
    return new Promise(function (resolve, reject) {
        var q = "SELECT * FROM Caretaker WHERE UserName = ?";
        DB.find(q, name, function (row) {
            resolve(row);
        });
    });
}
exports.getCaretakerByName = getCaretakerByName;
//# sourceMappingURL=caretaker.js.map