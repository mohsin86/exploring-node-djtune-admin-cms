var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var validator = require('validator');

//var bcrypt = require('bcrypt');
const crypto = require('crypto');

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
    mobile:{type:String},
    address:{
        type:String,
        trim: true
    },
    image: String,
    isLoggedIn:Boolean,
    role:{
        type: mongoose.Types.ObjectId, // see relation based mongo
        ref: 'Roles',
        required:true
    },
    gender:{type:String},
    status: { type: String, default: "enable"},
    hash: String,
    salt: String,

}, {timestamps: true});



userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;

};

//hashing a password before saving it to the database
// userSchema.pre('save', async function () {
//     var user = this;
// Here I check if the document is new and then user bcrypt to has the password
// if (this.isNew) {
//     try {
//         const hash = await bcrypt.hash(this.password, 10);
//         this.password = hash;
//     } catch (err) {
//         console.log(err);
//     }
// }
// });


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
