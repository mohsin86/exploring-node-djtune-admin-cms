const global = require('./globalController');
// https://medium.com/quick-code/handling-authentication-and-authorization-with-node-7f9548fedde8
var login = (req, res, next) =>{
    res.render("login",{SITE_URL:global.SITE_URL} );
}

var loginCheck = (req,res)=>{
    console.log(req.body);
}

module.exports = login;