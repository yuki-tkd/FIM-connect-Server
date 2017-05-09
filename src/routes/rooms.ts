import { Router } from 'express';
import * as DB from '../model/db';
import * as WebSocket from '../www';

const rooms: Router = Router();

//TODO: lodash入れること
rooms.get('/', (req, res, next) => {
  DB.Room.findAll().then( (rows) => {
    console.log(rows[0].dataValues);
    res.render('rooms', {
      page_scope: 'Rooms'
      title: 'HelloWorld'
    });
  });
});

rooms.get('/:roomNumber', (req, res, next) => {
  const roomNumber = req.query.roomNumber;
  DB.Room.findOne({where: { id: id }).then( (row) => {
    if(!row) {
      res.status(404).send();
    }
    res.render('room', {
      roomNumber: roomNumber,
      incidents: [{
          Updated: '2017/5/10 10:30',
          Type: 'Fall'
        }, {
          Updated: '2017/5/9 8:20',
          Type: 'Fall'
        }]
    });
  });
});

export default rooms;
