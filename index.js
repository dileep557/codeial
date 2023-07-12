// start the express 

const express= require('express');
const app= express();
const port=8000;

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