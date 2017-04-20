"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var con = mysql.createConnection({
    host: 'localhost',
    user: 'tim',
    password: 'tim',
    database: 'tim'
});
function connect() {
    con.connect();
    console.log('DB Connected!!');
}
exports.connect = connect;
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
//# sourceMappingURL=db.js.map