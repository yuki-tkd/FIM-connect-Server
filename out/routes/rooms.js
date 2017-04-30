"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var IncidentModel = require("../model/incident");
var rooms = express_1.Router();
/* GET home page. */
rooms.get('/', function (req, res, next) {
    res.render('rooms', { title: 'HelloWorld' });
});
/* GET home page. */
rooms.get('/:roomNumber', function (req, res, next) {
    IncidentModel.getAllIncidents().then(function (rows) {
        if (!rows) {
            res.status(404).send();
        }
        else {
            rows.forEach(function (v, k) {
                v.Updated = formatDate(v.Updated, "YYYY/MM/DD hh:mm:ss");
            });
            res.render('room', {
                roomNumber: req.params.roomNumber,
                incidents: rows
            });
        }
    });
});
function formatDate(date, format) {
    if (!format)
        format = 'YYYY-MM-DD hh:mm:ss.SSS';
    format = format.replace(/YYYY/g, date.getFullYear());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
    format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
    if (format.match(/S/g)) {
        var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
        var length = format.match(/S/g).length;
        for (var i = 0; i < length; i++)
            format = format.replace(/S/, milliSeconds.substring(i, i + 1));
    }
    return format;
}
;
exports.default = rooms;
//# sourceMappingURL=rooms.js.map