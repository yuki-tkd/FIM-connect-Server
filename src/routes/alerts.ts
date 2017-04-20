import { Router } from 'express';

const alerts: Router = Router();

/* GET home page. */
alerts.get('/', 
  function(req, res, next) {
  res.render('alerts', { title: 'HelloWorld' });
});

export default alerts;
