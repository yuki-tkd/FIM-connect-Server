import { Router } from 'express';
import passport = require('passport');
import ensure = require('connect-ensure-login');

//import mongoose = require ('mongoose');

const index: Router = Router();

//var UserSchema = new mongoose.Schema({
//  name:  String,
//  point: Number
//});
//var userModel = mongoose.model('User', UserSchema);

// 使用フェーズ
//mongoose.connect('mongodb://localhost/fim_db');


/* GET home page. */
index.get('/', function(req, res, next) {

  //var user = new userModel();
  //user.name  = 'KrdLab';
  //user.point = 777;
  //user.save(function(err) {
  //  if (err) {
  //    console.log(err);
  //  }
  //  console.log('hoge');
  //});
  res.render('index', { title: 'Floor in motion' });
});

index.get("/login", function(req, res){
    res.render('login', { });
});

index.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});

index.get('/logout',
  function(req, res) {
    req.logout();
    res.redirect('/');
});

index.get('/profile',
  ensure.ensureLoggedIn(),
  function(req, res) {
    res.render('rooms');
});

export default index;
