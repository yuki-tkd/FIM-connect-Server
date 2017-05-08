"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sequelize = require("sequelize");
var Seq = new Sequelize('tim', 'tim', 'tim', {
    host: 'localhost',
    port: 3306
});
var Room = Seq.define('Room', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: Sequelize.STRING,
    gatewayId: Sequelize.INTEGER,
    updated: Sequelize.DATE
}, {
    timestamps: false,
    freezeTableName: true
});
exports.Room = Room;
var Resident = Seq.define('Resident', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: Sequelize.STRING,
    roomId: Sequelize.INTEGER,
    sex: Sequelize.ENUM('Male', 'Female'),
    birth: Sequelize.DATE,
    updated: Sequelize.DATE
}, {
    timestamps: false,
    freezeTableName: true
});
exports.Resident = Resident;
var Incident = Seq.define('Incident', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    gatewayId: Sequelize.INTEGER,
    moduleId: Sequelize.INTEGER,
    status: Sequelize.ENUM('Fall', 'Active', 'Normal'),
    updated: Sequelize.DATE
}, {
    timestamps: false,
    freezeTableName: true
});
exports.Incident = Incident;
