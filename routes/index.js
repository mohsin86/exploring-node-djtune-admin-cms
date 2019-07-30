var express = require('express');
var routers = express.Router();

var homeController = require('../controllers/homeController');
var loginController = require('../controllers/loginController');
//var registerController = require('../controllers/registerController');
var userController = require('../controllers/userController');
var rolesController = require('../controllers/rolesController');
var settingsController = require('../controllers/settingsController');
var modulesController = require('../controllers/modulesController');
var ourDjsController = require('../controllers/ourDjsController');


const script = {

}


// routers.get('/', function(req, res, next){
//     res.render("home");  
//  });
 // routers.get('/login', function(req, res, next){
 //    res.render("login" );
 // });

function isLoggedIn(req, res, next){
    //console.log("User login session from route",req.session.user);
    const skip_login = process.env.SKIP_LOGIN || 'false';
    if (req.session.user || skip_login ==='true')
        return next();
    else
        res.redirect('/login')

    //return next();
}


routers.get('/home',isLoggedIn, homeController);
routers.get('/',isLoggedIn, homeController);

/*
 * User Module
 */
routers.get('/user',isLoggedIn, userController.user);
routers.get('/adduser', isLoggedIn, userController.userAddPage);
routers.post('/adduser',userController.validate('createUser'), userController.addUser); // post method to add user


routers.get('/roles',isLoggedIn, rolesController.roles);
routers.get('/addroles', isLoggedIn, rolesController.addroles);
routers.get('/roles/addedit/:rolesid',isLoggedIn, rolesController.addroles);
routers.post('/roles',isLoggedIn, rolesController.addRolesTodb); // post method to add user
routers.post('/delroles',isLoggedIn, rolesController.deleteRoles); // post method to add user

routers.get('/modules',isLoggedIn, modulesController);

/*
 * Autenticaiton
 */
routers.get('/login', loginController.login);
routers.post('/login',loginController.validate('loginValidate'), loginController.loginCheck);
routers.get('/logout', loginController.logout);

routers.get('/profile',isLoggedIn, userController.profileView);
routers.get('/settings',isLoggedIn, settingsController);

/*
 * Djs or Artist List
 */
routers.get('/our-djs',isLoggedIn, ourDjsController.index);
routers.get('/add-djs',isLoggedIn, ourDjsController.djsAddPage);
routers.post('/creat-djs',ourDjsController.validate('validateReques'), ourDjsController.create);

//The 404 Route (ALWAYS Keep this as the last route)
routers.get('*', function(req, res, next){
    res.render("404");
});


module.exports = routers;
