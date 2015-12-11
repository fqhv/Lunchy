var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');

var router = express.Router();

router.get('/', function(req, res, next) {
    
    //IF SESSION STARTED -> HOME
    //ELSE -> login
  res.render('login');
});
router.get('/registration', function(req, res, next){
    res.render('registration');
});

router.get('/home', function(req, res, next){
    res.render('home');
});

router.get('/luncher', function(req, res, next){
    res.render('luncher');
});

router.get('/api/*', function(req, res, next){
    res.render('luncher');
    //use api router
});
router.get('*', function(req, res, next) {  
 res.redirect('/');
});

module.exports = router;