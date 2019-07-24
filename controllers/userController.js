const global = require('./globalController');
const rolesController = require('./rolesController');
const { check, validationResult } = require('express-validator');

const UserModel = require('../models/users.model').UserModel;
const roleModel = require('../models/roles.model').rolesModel;

// https://www.freecodecamp.org/news/how-to-make-input-validation-simple-and-clean-in-your-express-js-app-ea9b5ff5a8a7/
// https://express-validator.github.io/docs/custom-validators-sanitizers.html

var userList = (req, res, next) =>{
    UserModel.find().
    populate('role').
    exec(function (err, all) {
        if (err){
            console.log(err);
            res.send(500).send(err);
        }else{
            console.log(all);
           // res.send(200).send(all);
            res.render("user/user",{ SITE_URL:global.SITE_URL, users:all } );
        }
    });
}

var addUser = async (req, res) =>{
    //console.log('User post data',req.body);
    let data  = {
        allRoles: {}
    }
    let User = new UserModel();
    User.name.first = req.body.firstName;
    User.name.last = req.body.lastName;
    User.username = req.body.username;
    User.password = req.body.password;
    User.email = req.body.email;

    try {
        validationResult(req).throw();
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
        }).catch($err=>{
                console.log('error',err);
                res.status(500).send(err);
            });
        // yay! we're good to go

    } catch (err) {
        // Oh noes. This user doesn't have enough skills for this...
        rolesController.allRoles().then((result)=>{
            data.allRoles = result;
            data.user = User;
            //console.log(data.allRoles);
            console.log(err.array());
            res.render("user/user-add-edit" ,{SITE_URL:global.SITE_URL, data:data,errors:err.array()});
        })
           //res.status(400).json(err);
    }

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

var validate = (method)=>{
    switch (method) {
        case 'createUser': {
            return [
                check('lastName', "Last Name should not be Empty").exists(),
                check('username', "userName doesn't exists").exists(),
                check('rolesId', "roles needs to be selected").exists(),
                check('email', 'Invalid email').exists().isEmail(),
                check('password').isLength({ min: 5 })
                                    .withMessage('must be at least 5 chars long')
                                    .matches(/\d/).withMessage('must contain a number')
                                    .not().isIn(['123', 'password', 'god']).withMessage('Do not use a common word as the password')
                                    .matches('confirmPassword')
                                    .withMessage('Passwords and Confirm Password should be match'),
                check('confirmPassword')
                    .isLength({ min: 1 })
                    .withMessage('Confirm password is required.')
                    .matches('password')
                    .withMessage('Passwords must match.')

              //  body('phone').optional().isInt(),
               // body('status').optional().isIn(['enabled', 'disabled'])
            ]
        }
    }
}


module.exports = {
    user:userList,
    addUser: addUser,
    userAddPage:userAddPage,
    validate:validate
};
