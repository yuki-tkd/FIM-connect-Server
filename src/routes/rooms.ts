import { Router } from 'express';
import * as DB from '../model/db';
import * as WebSocket from '../www';

const rooms: Router = Router();

/* GET home page. */
rooms.get('/', (req, res, next) => {
  DB.Room.findAll().then( (rows) => {
    console.log(rows);
    res.render('rooms', { title: 'HelloWorld' });
  });
});

/* GET home page. */
rooms.get('/:roomNumber', (req, res, next) => {
  res.render('room', {
    roomNumber: req.params.roomNumber,
    incidents: [{
        Updated: '2017/5/10 10:30',
        Type: 'Fall'
      }, {
        Updated: '2017/5/9 8:20',
        Type: 'Fall'
      }]
  });
});

export default rooms;
