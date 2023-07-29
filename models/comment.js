const mongoose=require('mongoose');// require library

const commentSchema= new mongoose.Schema({// create db schema
   

    content:{

       type: String,
       required: true,
       

    },

   user:{

    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'

    },
    Post: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'


    }

   
},
{
    timestamps: true

});
const Comment= mongoose.model('Comment', commentSchema);

module.exports=Comment;// export the module for another modules;