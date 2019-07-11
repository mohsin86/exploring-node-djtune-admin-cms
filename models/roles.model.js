var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

var rolesSchema = new mongoose.Schema({
    // _id: ObjectId,
    role:{
        type:String
    },
}, {timestamps: true});


var rolesModel = mongoose.model('Roles', rolesSchema);


module.exports = {
    rolesModel,
    rolesSchema
};