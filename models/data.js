const mongoose=require('mongoose');// require library

const contactSchema= new mongoose.Schema({// create db schema


    name: {
        type: String,
        required: true
        
    },
    mobile:
    {
        type: Number,
        required: true
    }
});

const Data= mongoose.model('Data', contactSchema);

module.exports=Data;// export the module for another modules;