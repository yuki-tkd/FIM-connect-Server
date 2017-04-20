import { Router } from 'express';
import * as IncidentModel from '../model/incident';

let api: Router = Router();

/* GET sensor status. */
api.get('/incident/:id', function(req, res, next) {
  let rows = IncidentModel.getAllIncidentsByResidentId(0);

  res.send('This method returns sensor value');
});

/* Register sensor */
api.post('/incident/:id', function(req, res, next) {
  let sensorId = req.params.id;

  res.status(200).send();
});

export default api;
