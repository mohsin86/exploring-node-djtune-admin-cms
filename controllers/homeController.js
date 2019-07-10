const global = require('./globalController');


var home = (req, res, next) =>{
    res.render("home",{SITE_URL:global.SITE_URL} );
}


module.exports = home;