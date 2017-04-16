import { Router } from 'express';

const api: Router = Router();

/* GET sensor status. */
api.get('/mat/:id', function(req, res, next) {
  res.send('This method returns sensor value');
});

/* Register sensor */
api.post('/mat/:id', function(req, res, next) {
  console.log(req.params.id);
  console.log(req.query.hospitalName);
  res.status(200).send();
});

/* Update sensor status. */
api.put('/mat/:id', function(req, res, next) {
  console.log(req.params.id);
  console.log(req.query.status);
  res.status(200).send();
});

export default api;
