INSERT INTO Room (`name`, `gatewayId`) VALUES ('1-101', 11);
INSERT INTO Room (`name`, `gatewayId`) VALUES ('1-102', 12);
INSERT INTO Room (`name`, `gatewayId`) VALUES ('1-103', 13);
INSERT INTO Room (`name`, `gatewayId`) VALUES ('1-104', 14);

INSERT INTO Resident (`name`, `sex`) VALUES ('Hoge Piyo', 'Male');
INSERT INTO Resident (`name`, `sex`) VALUES ('Hoge Fuga', 'Male');
INSERT INTO Resident (`name`, `sex`) VALUES ('Foo bar', 'Female');

INSERT INTO Incident(`gatewayId`, `moduleId`, `status`) VALUES (11, 12, 'Fall');
INSERT INTO Incident(`gatewayId`, `moduleId`, `status`) VALUES (12, 8, 'Fall');
INSERT INTO Incident(`gatewayId`, `moduleId`, `status`) VALUES (13, 1, 'Fall');
INSERT INTO Incident(`gatewayId`, `moduleId`, `status`) VALUES (14, 2, 'Fall');
