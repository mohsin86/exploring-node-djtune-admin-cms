const global = require('./globalController');
const rolesController = require('./rolesController');


var user = (req, res, next) =>{
    res.render("user/user",{SITE_URL:global.SITE_URL} );
}

var addUser = (req, res) =>{
    console.log(req.body);
    res.redirect('user/user');
}

var userAddPage = async (req, res, next) =>{

    let data  = {
        allRoles: {}
    }
    if(!req.params._id){
        rolesController.allRoles().then((result)=>{
            data.allRoles = result;
            console.log(data.allRoles);
            res.render("user/user-add-edit" ,{SITE_URL:global.SITE_URL, data:data});
        }).catch((err)=>{
            res.status(500).send(err);
        });
    }



}

module.exports = {
    user:user,
    addUser: addUser,
    userAddPage:userAddPage
};