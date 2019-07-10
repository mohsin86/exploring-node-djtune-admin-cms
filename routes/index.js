var express = require('express');
var routers = express.Router();

var homeController = require('../controllers/homeController');
var loginController = require('../controllers/loginController');
//var registerController = require('../controllers/registerController');
var userController = require('../controllers/userController');


const script = {

}

// routers.get('/', function(req, res, next){
//     res.render("home");  
//  });
 // routers.get('/login', function(req, res, next){
 //    res.render("login" );
 // });

routers.get('/home', homeController);
routers.get('/', homeController);
routers.get('/user', userController.user);

routers.get('/register', userController.register);
routers.post('/register', userController.addUser);

routers.get('/login', loginController);



routers.get('/404', function(req, res, next){
    res.render("404");
});


module.exports = routers;
