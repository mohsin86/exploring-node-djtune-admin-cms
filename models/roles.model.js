var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

var rolesSchema = new mongoose.Schema({
    // _id: ObjectId,
    rolesName:{
        type:String
    },
    roleStatus:{
        type:Boolean
    }
}, {timestamps: true});


var rolesModel = mongoose.model('Roles', rolesSchema);


module.exports = {
    rolesModel,
    rolesSchema
};