import { Router } from 'express';
import passport = require('passport');
import ensure = require('connect-ensure-login');

const alerts: Router = Router();

/* GET home page. */
alerts.get('/', 
  ensure.ensureLoggedIn(),
  function(req, res, next) {
  res.render('alerts', { title: 'HelloWorld' });
});

export default alerts;
