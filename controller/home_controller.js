
const Post= require('../models/post');
module.exports.home=function(req,res)
{

    Post.find({}).populate('user').exec()
    .then(posts=>{
        return res.render('home',{
            title:" homepage",
            posts: posts
        })
    }).catch(err=>{


        console.log(" error to populating to user ", err);
    })

    
    
}