const global = require('./globalController');

var user = (req, res, next) =>{
    res.render("user/user",{SITE_URL:global.SITE_URL} );
}

var addUser = (req, res) =>{
    console.log(req.body);
    res.redirect('user/user');
}

var register = (req, res, next) =>{
    res.render("user/register" ,{SITE_URL:global.SITE_URL});
}

module.exports = {
    user:user,
    addUser: addUser,
    register:register
};