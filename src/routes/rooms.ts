import { Router } from 'express';

const rooms: Router = Router();

/* GET home page. */
rooms.get('/', 
  function(req, res, next) {
  res.render('rooms', { title: 'HelloWorld' });
});

/* GET home page. */
rooms.get('/:roomNumber',
  function(req, res, next) {
  res.render('room', { 
    roomNumber: req.params.roomNumber
    });
});

export default rooms;
