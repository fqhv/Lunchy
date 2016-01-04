var express = require('express');
var passport = require('passport');
var jwt = require('express-jwt');

var router = express.Router();
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

var mongoose = require('mongoose');
var User = mongoose.model('User');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/register', function(req, res, next){
    if(!req.body.username || !req.body.password){
        return res.status(400).json({message: 'Please fill out all fields'});
    }
    var user = new User();
   
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.username = req.body.username;
    user.setPassword(req.body.password)
    user.email = req.body.email;
    user.number = req.body.number;
    
    user.save(function(err){
        if(err) {return next(err);}
        
        return res.json({token: user.generateJWT()})
    });
});

module.exports = router;