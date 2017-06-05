import { Router } from 'express';
import * as WebSocket from '../www';
import * as DB from '../model/db';

let api: Router = Router();

api.get('/sensor/:room_number/:status/:priority', (req, res, next) => {
  const room_number = Number(req.params.room_number);
  const status = req.params.status;
  const priority = req.params.priority;

  const room_data = {
    101: "Hanako Yamada",
    102: "Sachiko Takada"
  };

  const data = [{
    id: room_number,
    room_number: room_number,
    name: room_data[room_number],
    date: "1494143497",
    priority: priority,
    status: status
  }];

  WebSocket.sendAllClients(JSON.stringify(data));
  res.status(200).send();
});



/* Update sensor status. */
api.get('/sensor/:gatewayId/:moduleId/:status/:priority', function(req, res, next) {
  const gatewayId = req.params.gatewayId;
  const moduleId = req.params.moduleId;
  const status = req.params.status;
  const priority = req.params.priority;

  DB.Incident.create({
    gatewayId: gatewayId,
    moduleId: moduleId,
    status: status,
    priority: priority
  }).then( (r) => {
    //TODO: Check status
    const data = r.dataValues;

    const dummy = [{
      id: 0,
      roomNumber: 101,
      name: "Hanako Yamada",
      date: "1494143497",
      priority: priority
    }];

    WebSocket.sendAllClients(JSON.stringify(dummy));
    res.status(200).send(); 
  });
});

//TODO: 発生から5分以内のIncident一覧を返す
api.get('/incidents', (req, res, next) => {
  let data = [{
    id: 0,
    roomNumber: 101,
    name: "John doe",
    date: "1494143497"
  }, {
    id: 1,
    roomNumber: 102,
    name: "John Maeda",
    date: "1494143797"
  }, {
    id: 3,
    roomNumber: 103,
    name: "Test Maeda",
    date: "1494143797"
  }];
  WebSocket.sendAllClients(JSON.stringify(data));

  const json = JSON.stringify(data);
  res.status(200).send(json); 
});

/* GET sensor status. */
api.get('/incident/:id', function(req, res, next) {
  //const residentId = req.params.id;
  //IncidentModel.getAllIncidentsByResidentId(residentId).then( (row) => {
  //  if(!row) { res.status(404)send(); }
  //  else {
  //    res.send(row);
  //  }
  //});
});

/* Register sensor */
api.post('/incident/:id/:type', function(req, res, next) {
  //const sensorId = req.params.id;
  //const incidentType = req.params.type;
  //IncidentModel.addIncident(sensorId, incidentType).then( (row) => {
  //  if(!row) { res.status(404)send(); }
  //  else {
  //    res.status(200).send('id = ' + row);
  //  }
  //});
});

export default api;
