// start the express 

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const port  =8000;
const app = express();
const db = require('./config/mongoose');
const User = require('./models/user');
const session = require('express-session');
const passport= require('passport');
const passportLocal= require('./config/passport-local-strategy');
const MongoStore= require('connect-mongodb-session')(session); // import mongo session 
// store session-cookie  in mongodatabase 
var store = new MongoStore(
    {
      uri: 'mongodb://127.0.0.1:27017/codeial_development',
      databaseName: 'codeial_development',
      collection: 'User'
    },
    function(error) {
      // Should have gotten an error
      console.log(error);
    });
  
  // Catch errors
  store.on('error', function(error) {
    console.log(error);
  });


app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(express.static('./assets'));


app.use(expressLayouts);





app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// setting up our view engine ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// User({
    

//     email: "yadavdileep557@gmail.com",
//     password: "Dkyp12@@",
//     name:" dileep yadav"




// }).save();


app.use(session({

    name: 'codeial',   
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (100*60*100)

    },
    store: store,
   

    

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


// use express router
app.use('/', require('./routes'));

app.listen(port, function(err)
{
    if(err)
    {
        console.log(`error ocurrs running on port: ${port}`);
    }

    console.log(` Server succesfully running on port: ${port}`);
})