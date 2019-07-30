var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

var djsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    shortBio:{
        type:String
    },
    longBio:{
       type:String
    },
    photo:{
        type:String,
    },
    social:[
        {
            name:{type:String},
            link:{type:String}
        }
    ],
    designation:{
      type:String
    },
    featuredDj:{
      type:Boolean
    },
    status:{
        type:Boolean
    }
}, {timestamps: true});


var djsModel = mongoose.model('DjsList', djsSchema);


module.exports = {
    djsModel,
    djsSchema
};
