"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getCaretakerById(id) {
    var q = "SELECT * FROM Caretaker WHERE Id = ?";
    db.find(q, id, function (row) {
        console.log(row);
        return row;
    });
}
exports.getCaretakerById = getCaretakerById;
//# sourceMappingURL=caretaker.js.map