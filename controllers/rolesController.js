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

var AddEditRolesPages = async (req, res, nex) =>{
    let rolesData = {
        _id:'',
        rolesName:'',
        roleStatus:true,
    };

    if(req.params.rolesid){
        let id = req.params.rolesid;
        console.log(id)
        RolesModel.findById(id,function (err,doc) {
            //console.log(doc.rolesName);
             rolesData._id = doc._id;
             rolesData.rolesName = doc.rolesName;
             rolesData.roleStatus = doc.roleStatus;
             console.log(rolesData);
            res.render("user/addRoles" ,{SITE_URL:global.SITE_URL, rolesData: rolesData});
        });
    }else
        res.render("user/addRoles" ,{SITE_URL:global.SITE_URL, rolesData: rolesData});
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
    addroles:AddEditRolesPages,
    deleteRoles:deleteRoles
};

