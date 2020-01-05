const mongoose = require('mongoose');
//const mongodb = process.env.MONGODB_URI || 'mongodb://localhost:27017/djtune' ;
const mongodb = process.env.MONGODB_URI || '' ;

mongoose.connect(mongodb, {useNewUrlParser: true});

var db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

mongoose.set('useFindAndModify', false);

//require('./users.model');
