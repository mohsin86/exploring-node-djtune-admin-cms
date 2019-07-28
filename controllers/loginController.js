const global = require('./globalController');
const crypto = require('crypto');

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

var loginCheck = (req, res) =>{
    const userName = req.body.username.toLowerCase();
    const password = req.body.password;

    UserModel.findOne(
            {$or:[{username: userName},{email: userName}]},
            (err,userData)=>{
        console.log("final user =",err);
        try{
            if(err != null){
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
        }catch (e) {
            console.log('err',e);
            res.status(500).send(e);
        }
    });
}

var logout = (req,res)=>{
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });
}

module.exports = {
    login, loginCheck,logout
};