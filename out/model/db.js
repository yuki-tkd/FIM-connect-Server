"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var con = mysql.createConnection({
    host: 'localhost',
    user: 'tim',
    password: 'tim',
    database: 'tim'
});
function find(query, params, cb) {
    con.query(query, params, function (err, rows) {
        if (err)
            throw new Error();
        else
            cb(rows.length < 1 ? null : rows[0]);
    });
}
exports.find = find;
function findAll(query, params, cb) {
    con.query(query, params, function (err, rows) {
        if (err)
            throw new Error();
        else
            cb(rows);
    });
}
exports.findAll = findAll;
function insert(table, data, cb) {
    con.query("INSERT INTO " + table + " SET ?", data, function (err, result, fields) {
        if (err)
            throw new Error();
        else
            cb(result.insertId);
    });
}
exports.insert = insert;
//# sourceMappingURL=db.js.map