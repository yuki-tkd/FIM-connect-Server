DROP TABLE IF EXISTS Room;
CREATE TABLE Room (
  `id`            INTEGER AUTO_INCREMENT,
  `name`          TEXT,
  `gatewayId`     INTEGER,
  `updated`       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
);

DROP TABLE IF EXISTS Resident;
CREATE TABLE Resident (
  `id`            INTEGER AUTO_INCREMENT,
  `name`          TEXT,
  `roomId`        INTEGER,
  `sex`           ENUM('Male', 'Female'),
  `birth`         TIMESTAMP,
  `updated`       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
);

DROP TABLE IF EXISTS Incident;
CREATE TABLE Incident (
  `id`            INTEGER AUTO_INCREMENT,
  `gatewayId`     INTEGER,
  `moduleId`      INTEGER,
  `status`        ENUM('Fall', 'Active', 'Normal'),
  `updated`       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
);
