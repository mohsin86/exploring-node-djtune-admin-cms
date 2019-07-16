const global = require('./globalController');
const rolesController = require('./rolesController');

const UserModel = require('../models/users.model').UserModel;

var userList = (req, res, next) =>{
    UserModel.find().then(function (users) {
        console.log(users);
        res.status(200).send(users);
        //res.render("user/user",{ SITE_URL:global.SITE_URL, users:users } );
    });
}

var addUser = (req, res) =>{
    //console.log(req.body);
    let User = new UserModel();
    User.name.first = req.body.firstName;
    User.name.last = req.body.lastName;
    User.username = req.body.username;
    User.password = req.body.password;
    User.email = req.body.email;
    User.role = req.body.rolesId;
    //Array.prototype.push.apply(User.role, req.body.rolesId); ;
    console.log(User);
    User.save((err,doc)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.redirect('/user');
        }
    });

}

var userAddPage = async (req, res, next) =>{

    let data  = {
        allRoles: {}
    }
    if(!req.params._id){
        rolesController.allRoles().then((result)=>{
            data.allRoles = result;
            //console.log(data.allRoles);
            res.render("user/user-add-edit" ,{SITE_URL:global.SITE_URL, data:data});
        }).catch((err)=>{
            res.status(500).send(err);
        });
    }
}

module.exports = {
    user:userList,
    addUser: addUser,
    userAddPage:userAddPage
};
