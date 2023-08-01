
const Post= require('../models/post');
const User= require('../models/user');
module.exports.home=function(req,res)
{

    Post.find({}).populate('user')
    .populate({

        path: 'comments',
        populate: {
            path: 'user'
            
        }



    }).exec()
    .then(posts=>{

        User.find({}).then(users=>{
            return res.render('home',{
                title:" homepage",
                posts: posts,
                all_users: users
            })

        }).catch(err=>{
            console.log('error to find all the user ',err);
        });

       
    }).catch(err=>{


        console.log(" error to populating to user ", err);
    })

    
    
}