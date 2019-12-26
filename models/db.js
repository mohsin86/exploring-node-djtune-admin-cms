const mongoose = require('mongoose');
const mongodb = process.env.MONGODB_URI || 'mongodb://localhost:27017/butler-nde' ;

mongoose.connect(mongodb, {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
});

mongoose.set('useFindAndModify', false);

//require('./users.model');
