var mongoose = require('mongoose');

var rolesSchema = new mongoose.Schema({
    // _id: ObjectId,
    role:{
        type:String
    },
}, {timestamps: true});


var rolesModel = mongoose.model('Roles', rolesSchema);


module.exports = {
    rolesModel
};