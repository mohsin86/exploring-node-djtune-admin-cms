var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var validator = require('validator');

var rolesSchema = require('./roles.model').rolesSchema;

mongoose.set('useCreateIndex', true);

const ObjectId = new mongoose.Types.ObjectId();

var userSchema = new mongoose.Schema({
   // _id: ObjectId,
    name:{
        first: String,
        last:String
    },
    username: {
        type:String,
        unique: true,
        lowercase: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: true //  index: true options to username and email to optimize queries that use these fields.
    },
    email:{
        type:String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true,
        validate: (value) => {
            return validator.isEmail(value)
        }

    },
    address:{
        type:String
    },
    image: String,
    isLoggedIn:Boolean,
    role:String,
    password:{
        type:String,
        required:true
    },
    status: String,
    hash: String,
    salt: String,

}, {timestamps: true});

//The {timestamps: true} option creates a createdAt and updatedAt field on our models that contain timestamps
// which will get automatically updated when our model changes.
// https://thinkster.io/tutorials/node-json-api/creating-the-user-model
// https://www.geeksforgeeks.org/node-js-password-hashing-crypto-module/

// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator);

var UserModel = mongoose.model('User', userSchema);

module.exports = {
    UserModel
};
