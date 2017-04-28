import { Router } from 'express';

import * as IncidentModel from '../model/incident';
import * as WebSocket from '../www';

let api: Router = Router();

/* GET sensor status. */
api.get('/sensor/:id/:status', function(req, res, next) {
  const id = req.params.id;
  const status = req.params.status;
  WebSocket.sendAllClients(id, status);

  res.status(200).send('test');
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
