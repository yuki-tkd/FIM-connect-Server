import { Router } from 'express';

import * as IncidentModel from '../model/incident';
import * as Caratakers from '../model/caretaker';

const index: Router = Router();

/* GET home page. */
index.get('/', function(req, res, next) {
  res.render('index', { title: 'Floor in motion' });
});

index.get("/login", function(req, res){
    res.render('login', { });
});

index.post('/login', 
  function(req, res) {
    res.redirect('/');
});

index.get('/logout',
  function(req, res) {
    res.redirect('/');
});

index.get('/profile',
  function(req, res) {
    res.render('rooms');
});

export default index;
