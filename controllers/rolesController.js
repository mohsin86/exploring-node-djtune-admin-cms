const global = require('./globalController');

const RolesModel = require('../models/roles.model').rolesModel;

var roles = (req, res, next) =>{
        RolesModel.find().sort({ rolesName: 1 }).then(function (allroles) {
            res.render("user/roles",{ SITE_URL:global.SITE_URL, allRoles:allroles } );
        });
}

var addRolesTodb = (req, res) =>{
    let name = req.body.name;
    let status = req.body.status;
    if(name && status){
        saveRolesToDb(name, status);
    }
    res.redirect('roles');
}

var registerRolesPages = (req, res, next) =>{
    res.render("user/addRoles" ,{SITE_URL:global.SITE_URL});
}

var deleteRoles = (req, res, next) =>{
    let id = req.body;
    console.log(id);
    let messge = 'Successfully deleted ';

    res.redirect('roles');
}

 const saveRolesToDb = async (name, status) => {
     const saveToDb = new RolesModel({ rolesName: name, roleStatus: status });
     await saveToDb.save();
     let doc = await RolesModel.findOne({ rolesName: name }).lean();
     console.log(name, status, "data inserted")
}
  const findAll = async () =>{
      const result = await RolesModel.find({}).sort({ rolesName: 1 });
     // console.log(result);
      return result
  }


module.exports = {
    roles:roles,
    addRolesTodb: addRolesTodb,
    addroles:registerRolesPages,
    deleteRoles:deleteRoles
};

