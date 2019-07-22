const global = require('./globalController');
const rolesController = require('./rolesController');

const UserModel = require('../models/users.model').UserModel;
const roleModel = require('../models/roles.model').rolesModel;

var userList = (req, res, next) =>{
    // UserModel.find().then(function (users) {
    //     console.log('users', users);
    //     res.status(200).send(users);
    //     //res.render("user/user",{ SITE_URL:global.SITE_URL, users:users } );
    // });

    UserModel.find().
    populate('role').
    exec(function (err, all) {
        if (err){
            console.log(err);
            res.send(500).send(err);
        }else{
            console.log(all);
           // res.send(200).send(all);
            res.render("user/user",{ SITE_URL:global.SITE_URL, allRoles:all } );
        }
    });
}

var addUser = async (req, res) =>{
    //console.log('User post data',req.body);
    let User = new UserModel();
    User.name.first = req.body.firstName;
    User.name.last = req.body.lastName;
    User.username = req.body.username;
    User.password = req.body.password;
    User.email = req.body.email;
//    User.role = req.body.rolesId;
        roleModel.findById(req.body.rolesId).then((result)=>{
                User.role = result;
                return User;
        }).then((User)=>{
            console.log(User);
            User.save((errr,doc)=>{
                if(errr){
                    console.log('user error',errr);
                    res.status(500).send(errr);
                }else{
                    res.redirect('/user');
                }
            });
        })
            .catch($err=>{
            console.log('error',err);
            res.status(500).send(err);
        });

    //Array.prototype.push.apply(User.role, req.body.rolesId); ;


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
