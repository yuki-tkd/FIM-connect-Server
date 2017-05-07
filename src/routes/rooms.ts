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
  let data = [{
    id: 0,
    roomNumber: 101,
    name: "John doe",
    date: "1494143497"
  }, {
    id: 1,
    roomNumber: 102,
    name: "John Maeda",
    date: "1494143797"
  }, {
    id: 3,
    roomNumber: 103,
    name: "Test Maeda",
    date: "1494143797"
  }];
  WebSocket.sendAllClients(JSON.stringify(data));
  res.status(200).send();
});

export default rooms;
