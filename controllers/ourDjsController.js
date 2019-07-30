const common = require('./commonController');
const { check, validationResult } = require('express-validator');
const djsModule = require('../models/ourDjs.model').djsModel;

var data = {};

var index = (req, res, next) =>{
    session = req.session;
    data.logInuserInfo = session.user;
    res.render("ourDjs/djList",{data:data} );
}

djsAddPage = (req, res, next) =>{
    session = req.session;
    data.logInuserInfo = session.user;
    res.render("ourDjs/djs-add-page",{data:data} );
}

createArtist = async (req,res)=>{

    let djs = new djsModule();
    djs.name = req.body.name;
    djs.designation = req.body.designation;
    djs.shortBio = req.body.shortBio;
    djs.longBio = req.body.longBio;
    djs.featuredDj = req.body.featuredDj;
    djs.status = req.body.status;

    try {
        validationResult(req).throw();
        let djsPhoto = req.files.photo;
        let filePath = path.join(__dirname,'assets')+'/djs-image/'.djsPhoto ;
        console.log('file path=',filePath)
        let isFileUpload = await djsPhoto.mv(filePath);
        if(isFileUpload){

        }
        if(req.body._id){

        }

        res.send(req.body);

    }catch (e) {
        data.djs = djs;
        // conveting array to object for better controll on view template
        let errData = e.array().reduce(function(TmpObject, item) {
            index  = item.param ;
            TmpObject[index] = item;
            return TmpObject;
        }, {}) //watch out the empty {}, which is passed as "result"
        console.log(errData);
        res.render("ourDjs/djs-add-page",{data:data,errors:errData} );
    }



}

var validate = (method)=>{
    switch (method) {
        case 'validateReques': {
            return [
                check('name').not().isEmpty().withMessage('Name is required'),
                check('photo').not().isEmpty().withMessage('Photo is required'),
            ]
        }
    }
}
module.exports = {
    index:index,
    djsAddPage:djsAddPage,
    create:createArtist,
    validate:validate
};
