const   express = require('express'),
        exphbs  = require('express-handlebars'),
        path = require('path'),
        bodyParser = require('body-parser'),
        expressValidator = require('express-validator'),
        session = require('express-session'),
        cookieParser = require('cookie-parser');

require('./models/db');


//**** Configure isProduction variable, checking is it production or development
const isProduction = process.env.NODE_ENV === 'production';

const port = process.env.PORT || 8000;

const skip_login = process.env.SKIP_LOGIN || 'false';
console.log('skip login',process.env.SKIP_LOGIN);

const app = express();

var routes = require('./routes/index');
//*** https://www.youtube.com/watch?v=1srD3Mdvf50

//*** for using static file
app.use(express.static(path.join(__dirname,'assets')));


/******* Template view engine setup  ************/
app.set('views',path.join(__dirname,'views')) // set views directory with path module
app.engine('.hbs', exphbs({
                            extname: '.hbs',
                            layoutsDir: "views/",
                            defaultLayout: null,
                            partialsDir: "views/partials/",
                            helpers: require('./helpers/handlebars-helpers').helpers
}));
app.set('view engine', '.hbs');
//********   End view engine sttup *********//

//**** support parsing of application/json type post data
app.use(bodyParser.json());

//***** support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

//***** To use cookies with Express, we need the cookie-parser middleware.
app.use(cookieParser());

//****** add & configure session middleware
app.use(session({
    secret: 'someSecretForThisApp',
    resave: false,
    saveUninitialized: false,
    cookie: {
         expires: new Date(Date.now() + (60 * 1000 * 60 * 60 * 3)) , // 60minutes  // expires means when the session gonna expire
      //  maxAge  : new Date(Date.now() + (60 * 1000 * 60 * 3)) //  maxAge means how long the session lasts // set for 3 hour
    }
}));

//******* for different routes
app.use('/',routes);

//********
app.listen(port,()=>console.log('server running on http://localhost:'+port));
