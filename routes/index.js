var express = require('express');
var routers = express.Router();

const style = {

}

const script = {

}

routers.get('/', function(req, res, next){
    res.render("home");  
 });

 routers.get('/login', function(req, res, next){
    res.render("login" );  
 });

 module.exports = routers;
