import { Router } from 'express';

import * as WebSocket from '../www';

let api: Router = Router();

/* Update sensor status. */
api.get('/sensor/:gatewayId/:moduleId', function(req, res, next) {
  



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
});

//TODO: 発生から5分以内のIncident一覧を返す
api.get('/incidents', (req, res, next) => {
  
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
