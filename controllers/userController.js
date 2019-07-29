const common = require('./commonController');
const rolesController = require('./rolesController');
const { check, validationResult } = require('express-validator');

const UserModel = require('../models/users.model').UserModel;
const roleModel = require('../models/roles.model').rolesModel;
var data = {};
var userList = (req, res, next) =>{
    UserModel.find().
    populate('role').
    exec(function (err, all) {
        if (err){
            console.log(err);
            res.send(500).send(err);
        }else{
          //  console.log(all);
           // res.send(200).send(all);
            res.render("user/user",{ SITE_URL:common.SITE_URL, users:all } );
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
   // User.password = req.body.password;
    User.email = req.body.email;
    User.setPassword(req.body.password);

    try {
        validationResult(req).throw();
        roleModel.findById(req.body.rolesId).then((result)=>{
            User.role = result;
            return User;
        }).then((User)=>{
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
        //*** IF ERROR, RETURN ALL THE ROLES AND ERROR OBJECT
        rolesController.allRoles().then((result)=>{
            data.allRoles = result;
            data.user = User;
            let index = '';

            // conveting array to object for better controll on view template
            let errData = err.array().reduce(function(TmpObject, item) {
                 index  = item.param ;
               let IndexIsAvailable = index in TmpObject;
                if(IndexIsAvailable == false){
                    TmpObject[index] = item; //a, b, c
                    return TmpObject;
                }else
                    return TmpObject;

            }, {}) //watch out the empty {}, which is passed as "result"

        //    console.log(err.array());
            res.render("user/user-add-edit" ,{
                    SITE_URL:common.SITE_URL,
                    data:data,errors:errData
                    });
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
            res.render("user/user-add-edit" ,{
                SITE_URL:common.SITE_URL, data:data
            });
        }).catch((err)=>{
            res.status(500).send(err);
        });
    }
}
profileView =   async (req,res,next)=>{
    session = req.session;
    data.logInuserInfo = session.user;
    console.log(data);
    res.render('user/profile',{data:data});
}

var validate = (method)=>{
    switch (method) {
        case 'createUser': {
            return [
                check('lastName').not().isEmpty().withMessage('The Last name is required'),
                check('username').not().isEmpty().withMessage('User Name is required'),
                check('rolesId', "roles needs to be selected").exists(),
                check('email', 'Invalid email').exists().isEmail(),
                check('password').isLength({ min: 5 })
                                    .withMessage('must be at least 5 chars long')
                                    .matches(/\d/).withMessage('must contain a number')
                                    .not().isIn(['123', 'password', 'god']).withMessage('Do not use a common word as the password')
                                   // .matches('confirmPassword')
                                    .custom((value, {req}) => (value === req.body.confirmPassword)).withMessage("Passwords don't match."),

                check('confirmPassword')
                    .isLength({ min: 1 })
                    .withMessage('Confirm password is required.')
                    .custom((value, {req}) => (value === req.body.password))
                    .withMessage('Confirm Passwords must match.')

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
    validate:validate,
    profileView:profileView
};
