const   express = require('express'),
        hbs = require('hbs'),
        path = require('path'),
        bodyParser = require('body-parser'),
        cookieParser = require('cookie-parser');

require('./models/db');

const port = process.env.PORT || 3000;

const app = express();
var routes = require('./routes/index');
// https://www.youtube.com/watch?v=1srD3Mdvf50
//for using static file
app.use(express.static(path.join(__dirname,'assets')));

//this required before view engine setup
hbs.registerPartials(path.join(__dirname,'/views/partials')); // include all partials


// view engine setup
app.set('views',path.join(__dirname,'views'))// set views directory with path module
app.set("view engine",'hbs') // set view engine as handlbars as a template Engine 


// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// To use cookies with Express, we need the cookie-parser middleware.
app.use(cookieParser());


// app.get('/', function(req, res){
//    res.render("index", { title: 'exploring ....', condition:false, anyArray:[1,2,3] } );  
// });

// app.get('/home/usesr/:ssname', function(req, res, next){
//     console.log(req.params)
//     res.render("home",{SITE_URL: "http://localhost:3000/"} );
// });



// for different routes
app.use('/',routes);


app.listen(port,()=>console.log('server running on http://localhost:'+port));
