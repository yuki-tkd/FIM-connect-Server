import { Router } from 'express';
import passport = require('passport');
import ensure = require('connect-ensure-login');

const rooms: Router = Router();

/* GET home page. */
rooms.get('/', 
  ensure.ensureLoggedIn('/login'),
  function(req, res, next) {
  res.render('rooms', { title: 'HelloWorld' });
});

/* GET home page. */
rooms.get('/:roomNumber',
  ensure.ensureLoggedIn('/login'),
  function(req, res, next) {
  res.render('room', { 
    roomNumber: req.params.roomNumber
    });
});

export default rooms;
