var validator = require('validator');
var url = require('url');
const common = require('./commonController');

const RolesModel = require('../models/roles.model').rolesModel;

// all roles
var roles = (req, res, next) =>{
    RolesModel.find().then(function (allroles) {
        console.log(allroles);
        res.render("user/roles",{ SITE_URL:common.SITE_URL, allRoles:allroles } );
    });
}

var addRolesTodb = (req, res) =>{
     //console.log(req.params);
    let name = req.body.name;
    let status = req.body.status;
    if(req.body._id){
        if(name && status){
            RolesModel.findByIdAndUpdate(
                         req.body._id,
                        {$set:{rolesName:name,roleStatus:status }},
                        {new:true},
                        (err, doc) => {
                            // Handle any possible database errors
                            if (err) return res.status(500).send(err);
                            res.redirect(
                                url.format({
                                    pathname:"/roles",
                                    query: {
                                        "message": "data Updated successfully",
                                        "type": "update",
                                    }
                                    })
                                );

                        }
                       )
        }
    }else{
        if(name && status){
            saveRolesToDb(name, status);
        }

        res.redirect(
            url.format({
                pathname:"/roles",
                query: {
                    "message": "data Inserted successfully",
                    "type": "insert",
                }
            })
        );
    }


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
            res.render("user/addRoles" ,{SITE_URL:common.SITE_URL, rolesData: rolesData});
        });
    }else
        res.render("user/addRoles" ,{SITE_URL:common.SITE_URL, rolesData: rolesData});
}

var deleteRoles = (req, res, next) =>{
    let id = req.body.rolesId;
    console.log(id);
    RolesModel.remove({ _id: id }, function(err) {
        if (!err) {
            res.redirect(
                url.format({
                    pathname:"/roles",
                    query: {
                        "message": "data deleted successfully",
                        "type": "delete",
                    }
                })
            );
        }
        else {
            res.status(500).send(err);
        }
    });
}

 const saveRolesToDb = async (name, status) => {
     const saveToDb = new RolesModel({ rolesName: name, roleStatus: status });
     await saveToDb.save();
     let doc = await RolesModel.findOne({ rolesName: name }).lean();
     console.log(name, status, "data inserted")
}
  const findAll = async () =>{
      const result = await RolesModel.find().sort({ rolesName: 1 });
     // console.log(result);
      return result
  }


module.exports = {
    roles:roles,
    addRolesTodb: addRolesTodb,
    addroles:AddEditRolesPages,
    deleteRoles:deleteRoles,
    allRoles:findAll
};

