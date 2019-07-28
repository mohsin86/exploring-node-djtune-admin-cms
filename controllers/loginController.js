const global = require('./globalController');
const crypto = require('crypto');
const { check, validationResult } = require('express-validator');
const UserModel = require('../models/users.model').UserModel;
// https://medium.com/quick-code/handling-authentication-and-authorization-with-node-7f9548fedde8
var session;

var login = (req, res, next) =>{
    res.render("login",{SITE_URL:global.SITE_URL} );
}

var UserInfo = function (user) {
    this.name = user.name.first+' '+ user.name.last;
    this.username = user.username;
    this.email = user.email;
    this.mobile = user.mobile;
}

/*
 * @ redirect if login successful
 * @ set User Info to session
 *
 */

var loginCheck = async (req, res) =>{
    const userName = req.body.username.toLowerCase();
    const password = req.body.password;
    try{
        validationResult(req).throw();
        let userData = await UserModel.findOne({$or:[{username: userName},{email: userName}]});
        if(userData != null){
            let loginUser = new UserModel(userData);
            if(!loginUser.validatePassword(password) ){
                throw new Error('password mis matched');
            }else{
                let loginUser = new UserInfo(userData);
                session = req.session;
                session.user = userData;
                return res.redirect('/');
            }
        }else{
            throw new Error('User Name and password is wrong, try again');
        }
    }catch(e) {
        if(Object.keys(e).length>0){
            let msgArray = e.array();
            console.log(msgArray);
            msg = msgArray[0].msg;
        }else{
            msg = e;
        }
        res.render("login",{SITE_URL:global.SITE_URL,error:true,msg:msg,userName:userName} );
    }
}

var logout = (req,res)=>{
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });
}

var validate = (method)=>{
    switch (method) {
        case 'loginValidate': {
            return [
                check('username').not().isEmpty().withMessage('User Name is required'),
                check('password').not().isEmpty().withMessage('Password is required')

            ]
        }
    }
}

module.exports = {
    login, loginCheck,logout,validate:validate
};