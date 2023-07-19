// start the express 

const express= require('express');
const cookieParser= require('cookie-parser');
const bodyParser= require('body-parser');
const path = require('path');
const expressLayouts= require('express-ejs-layouts');
const port=8000;
const app= express();
const db= require('./config/mongoose');
const User= require('./models/user');


app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(express.static('./assets'));


app.use(expressLayouts);



// use express router
app.use('/', require('./routes'));

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







app.listen(port, function(err)
{
    if(err)
    {
        console.log(`error ocurrs running on port: ${port}`);
    }

    console.log(` Server succesfully running on port: ${port}`);
})