DROP TABLE IF EXISTS Caretaker;
CREATE TABLE Caretaker (
  `Id`            INTEGER AUTO_INCREMENT,
  `UserName`      TEXT,
  `Password`      TEXT,
  `FirstName`     TEXT,
  `LastName`      TEXT,
  `Updated`       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
);

DROP TABLE IF EXISTS Resident;
CREATE TABLE Resident (
  `Id`            INTEGER AUTO_INCREMENT,
  `Name`          TEXT,
  `Sex`           ENUM('Male', 'Female'),
  `Room`          INTEGER,
  `SensorId`      INTEGER,
  `Updated`       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
);

DROP TABLE IF EXISTS Incident;
CREATE TABLE Incident (
  `Id`            INTEGER AUTO_INCREMENT,
  `SensorId`      INTEGER,
  `Type`          TEXT,
  `Updated`       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
);

DROP TABLE IF EXISTS Sensor;
CREATE TABLE Sensor (
  `Id`            INTEGER,
  `Type`          TEXT,
  `Updated`       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
);

