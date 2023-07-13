// start the express 

const express= require('express');
const app= express();
const port=8000;

// use express router
app.use('/', require('./routes'));



// setting up our view engine ejs
app.set('view engine', 'ejs');
app.set('views','./views');



app.listen(port, function(err)
{
    if(err)
    {
        console.log(`error ocurrs running on port: ${port}`);
    }

    console.log(` Server succesfully running on port: ${port}`);
})