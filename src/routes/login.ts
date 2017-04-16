import { Router } from 'express';

const login: Router = Router();

/* GET home page. */
login.get('/', function(req, res, next) {
  res.render('login', { title: 'HelloWorld！！！' });
});

export default login;
