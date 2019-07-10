const global = require('./globalController');

var login = (req, res, next) =>{
    res.render("login",{SITE_URL:global.SITE_URL} );
}


module.exports = login;