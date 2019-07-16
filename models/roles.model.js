var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

var rolesSchema = new mongoose.Schema({
    // _id: ObjectId,
    rolesName:{
        type:String
    },
    privileges:[
        {
            module: String,
            access: {
                insert:Boolean,
                update:Boolean,
                remove:Boolean,
                view:Boolean,
            }

        }],
    roleStatus:{
        type:Boolean
    }
}, {timestamps: true});


var rolesModel = mongoose.model('Roles', rolesSchema);


module.exports = {
    rolesModel,
    rolesSchema
};