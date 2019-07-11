const global = require('./globalController');

var roles = (req, res, next) =>{
    res.render("user/roles",{SITE_URL:global.SITE_URL} );
}

var addRolesTodb = (req, res) =>{
    console.log(req.body);
    res.redirect('user/roles');
}

var registerRolesPages = (req, res, next) =>{
    res.render("user/addRoles" ,{SITE_URL:global.SITE_URL});
}

module.exports = {
    roles:roles,
    addRolesTodb: addRolesTodb,
    addroles:registerRolesPages
};