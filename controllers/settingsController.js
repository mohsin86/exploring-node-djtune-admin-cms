const common = require('./commonController');
var data = {};

var index = (req, res, next) =>{
    session = req.session;
    data.logInuserInfo = session.user;
    res.render("settings",{data:data} );
}


module.exports = index;
