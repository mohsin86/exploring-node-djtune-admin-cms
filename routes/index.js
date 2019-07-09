var express = require('express');
var routers = express.Router();

var loginController = require('../controllers/loginController');
var registerController = require('../controllers/registerController');


const script = {

}

routers.get('/', function(req, res, next){
    res.render("home");  
 });

 // routers.get('/login', function(req, res, next){
 //    res.render("login" );
 // });

routers.get('/login', loginController);
routers.get('/register', registerController);

 module.exports = routers;
