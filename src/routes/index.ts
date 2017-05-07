import { Router } from 'express';
const index: Router = Router();

/* GET home page. */
index.get('/', (req, res, next) => {
  res.render('index', { title: 'FIMconnect' });
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
