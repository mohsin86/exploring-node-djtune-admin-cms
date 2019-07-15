var express = require('express');
var routers = express.Router();

var homeController = require('../controllers/homeController');
var loginController = require('../controllers/loginController');
//var registerController = require('../controllers/registerController');
var userController = require('../controllers/userController');
var rolesController = require('../controllers/rolesController');


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

routers.get('/adduser', userController.userAddPage);
routers.post('/adduser', userController.addUser); // post method to add user

routers.get('/roles', rolesController.roles);
routers.get('/addroles', rolesController.addroles);
routers.get('/roles/addedit/:rolesid', rolesController.addroles);
routers.post('/roles', rolesController.addRolesTodb); // post method to add user
routers.post('/delroles', rolesController.deleteRoles); // post method to add user


routers.get('/login', loginController);



routers.get('/404', function(req, res, next){
    res.render("404");
});


module.exports = routers;
