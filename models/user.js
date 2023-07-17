const mongoose=require('mongoose');// require library

const userSchema= new mongoose.Schema({// create db schema
   

    email:{

       type: String,
       required: true,
       unique: true

    },

   password:{

    type: String,
    required: true

    },
    name: {

        type: String,
        required: true


    }

   
},
{
    timestamps: true

});
const User= mongoose.model('User', userSchema);

module.exports=User;// export the module for another modules;