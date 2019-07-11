const global = require('./globalController');

const RolesModel = require('../models/roles.model').rolesModel;

var roles = (req, res, next) =>{
    res.render("user/roles",{SITE_URL:global.SITE_URL} );
}

var addRolesTodb = (req, res) =>{
    let name = req.body.name;
    let status = req.body.status;
    if(name && status){
        saveRolesToDb();
    }
    res.redirect('roles');
}

var registerRolesPages = (req, res, next) =>{
    res.render("user/addRoles" ,{SITE_URL:global.SITE_URL});
}

 const saveRolesToDb = async (name, status) => {
     const saveToDb = new RolesModel({ rolesName: name, roleStatus: status });
     await saveToDb.save();
     let doc = await RolesModel.findOne({ rolesName: name }).lean();
     console.log(doc, "data inserted")
}


module.exports = {
    roles:roles,
    addRolesTodb: addRolesTodb,
    addroles:registerRolesPages
};

