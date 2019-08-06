const common = require('./commonController');
const { check, validationResult } = require('express-validator');
const djsModule = require('../models/ourDjs.model').djsModel;
const path = require('path');

var data = {};

var index = async (req, res, next) =>{
    session = req.session;
    data.logInuserInfo = session.user;
    data.djLists = await djsModule.find();
   // console.log(data.djLists);
    if(data.djLists){
        res.render("ourDjs/djList",{data:data} );
    }
}

djsAddPage = (req, res, next) =>{
    session = req.session;
    data.logInuserInfo = session.user;
    res.render("ourDjs/djs-add-page",{data:data} );
}

createArtist = async (req,res)=>{
    let Social ={};
    let djs = new djsModule();
    djs.name = req.body.name;
    djs.designation = req.body.designation;
    djs.shortBio = req.body.shortBio;
    djs.longBio = req.body.longBio;
    if(req.body.featured){
        djs.featuredDj =  true;
    }else{
        djs.featuredDj = false;
    }

    djs.status = req.body.status;
    let fblink = req.body.fblink;
    let featuredVideoLink = req.body.featuredVideoLink;
    let youtubeLink = req.body.youtubeLink;
    Social.name='fblink';
    Social.link= fblink;
    djs.social.push(Social);

    Social.name='featuredVideoLink';
    Social.link= featuredVideoLink;
    djs.social.push(Social);

    Social.name='youtubeLink';
    Social.link= youtubeLink;

    djs.social.push(Social);

    console.log(djs);

    try {
       validationResult(req).throw();
      //  console.log(req.files);
        if(req.files){
            let djsPhoto = req.files.photo;
            let photoName = djsPhoto.name;
            let UploadfilePath = upLoadDir+'/djs/'+photoName ;
            let filePath = '/uploads/djs/'+photoName ;
            djs.photo = filePath ;
            //
           djsPhoto.mv(UploadfilePath,(err)=>{
               if(err){
                   if (err) return console.error(err);
               }

               djs.save((err,data)=>{
                   if (err) return console.error(err);
                    res.redirect('/our-djs');
               })
            });
        }
    }catch (e) {
        data.djs = djs;
        //converting array to object for better control on view template
        let errData = e.array().reduce(function(TmpObject, item) {
            index  = item.param ;
            TmpObject[index] = item;
            return TmpObject;
        }, {}) //watch out the empty {}, which is passed as "result"
        res.render("ourDjs/djs-add-page",{data:data,errors:errData} );
    }



}
getdjs = async (req,res)=>{
    let id = req.params.id;
    let userDAta = await djsModule.findById(id);
    if(userDAta){
        res.send(userDAta);
    }
}
updateDjs = async (req,res)=>{
    console.log(req.body);
}
var validate = (method)=>{
    if (method === 'validateReques') {
        {
            return [
                check('name').not().isEmpty().withMessage('Name is required'),
                //check('photo').not().isEmpty().withMessage('Photo is required'),
                check('photo')
                .custom((value, {req}) => {
                    //console.log(`req body ${req.body}`);
                   // console.log('req body', req.files);
                    if(req.files){
                        return true;
                    }else
                        return false;
                }).withMessage('Photo is required')
            ]
        }
    }
}
module.exports = {
    index:index,
    djsAddPage:djsAddPage,
    create:createArtist,
    validate:validate,
    getdjs:getdjs,
    updateDjs:updateDjs
};
