import * as Sequelize from 'sequelize';

let Seq = new Sequelize('tim', 'tim', 'tim', {
  host: 'localhost',
  port: 3306
});

let Room = Seq.define('Room', {
    id: {
      type: Sequelize.INTEGER, 
      autoIncrement: true,
      primaryKey: true
    },
    name: Sequelize.STRING,
    gatewayId: Sequelize.INTEGER,
    updated: Sequelize.DATE
}, {
  timestamps     : false,
  freezeTableName: true
});

let Resident = Seq.define('Resident', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: Sequelize.STRING,
    roomId: Sequelize.INTEGER,
    sex: Sequelize.ENUM('Male', 'Female'),
    birth: Sequelize.DATE,
    updated: Sequelize.DATE
}, {
  timestamps     : false,
  freezeTableName: true
});

let Incident = Seq.define('Incident', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    gatewayId: Sequelize.INTEGER,
    moduleId: Sequelize.INTEGER,
    status: Sequelize.ENUM('Fall', 'Active', 'Normal'),
    priority: Sequelize.INTEGER,
    updated: Sequelize.DATE
}, {
  timestamps     : false,
  freezeTableName: true
});

export { Room, Resident, Incident };
