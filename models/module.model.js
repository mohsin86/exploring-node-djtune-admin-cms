var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

var moduleSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    desc:{
      type:String
    },
    status:{
        type:Boolean
    }
}, {timestamps: true});


var modulesModel = mongoose.model('Modules', rolesSchema);


module.exports = {
    modulesModel,
    moduleSchema
};
