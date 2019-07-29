var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

var djsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    shortDesc:{
        type:String
    },
    longDesc:{
       type:String
    },
    image:{
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
