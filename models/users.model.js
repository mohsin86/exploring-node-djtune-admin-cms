var mongoose = require('mongoose');
const ObjectId = new mongoose.Types.ObjectId();

var userSchema = new mongoose.Schema({
    _id: ObjectId,
    fullName:{
        type:string,
        required: true
    },
    username: {
        type:string,
        required: true,
        unique: true,
    },
    email:{
        type:string,
        required: true,
        unique: true,
    },
    address:{
        type:string
    },
    password:{
      type:string,
      required:true
    },
    entrydate: { type: Date, default: Date.now },
    role:{
       type: string,
    },
    disable: Boolean,

});