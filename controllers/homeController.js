const global = require('./globalController');
var data = {};

var home = (req, res, next) =>{
    session = req.session;
    data.logInuserInfo = session.user;
    res.render("home",{SITE_URL:global.SITE_URL,data:data} );
}


module.exports = home;