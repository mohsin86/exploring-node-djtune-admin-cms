const global = require('./globalController');
const crypto = require('crypto');

const UserModel = require('../models/users.model').UserModel;
// https://medium.com/quick-code/handling-authentication-and-authorization-with-node-7f9548fedde8
var session;

var login = (req, res, next) =>{
    res.render("login",{SITE_URL:global.SITE_URL} );
}

var loginCheck = (req, res) =>{
    const userName = req.body.username.toLowerCase();
    const password = req.body.password;

    //return this.hash === hash;
    UserModel.findOne({$or:[{username: userName},{email: userName}]}).then((userData) =>{
        const loginUser = new UserModel(userData);
       // console.log("final user =",finalUser);
        if(!loginUser.validatePassword(password)){
            throw new Error('password mis matched');
        }else{
            session = req.session;
            session.user = userData;
            return res.redirect('/');
        }
      //  const hash = crypto.pbkdf2Sync(password, userData.salt, 10000, 512, 'sha512').toString('hex');
        //console.log(user.salt);
        // if(userData.hash ===hash){
        //     throw new Error('password mis matched');
        // }

    }).catch(err =>{
        console.log(err);
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