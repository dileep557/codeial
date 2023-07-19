
// const User= require('../models/user');

// // render profile page controller
// module.exports.profile= function (req,res){
//     return res.render('profile')

    
// };

// ///render singn- up page
// module.exports.sign_up= function (req,res){
//     return res.render('user_signup');

    
// } 

// //render signin page
// module.exports.sign_in= function (req,res){
//     return res.render('user_signin');

    
// }


// module.exports.create=function(req, res){

//     if(req.body.password!=req.body.confirm_password)
//     {
//         return res.redirect('back');
//     }

//     User.findOne({email: req.body.email}, function(err, user){
//         if(err){
//             console.log(" find error to finding email while signup");
//             return;
//         }

//         if(!user)
//         {
//             User.create(req.body, function(err, user){
//                 if(err){ console.log(" find error to finding email while creating user"); return;}

//                 return res.redirect('/users/sign_in');
//             })
//         }

//         else{
//             return res.redirect('back');

//         }

//     });

// }




// module.exports.createSession=function(req, res){
    
// }


const User = require('../models/user');

module.exports.profile = function (req, res) {
   if(req.cookies.user_id)
   {
    User.findById(req.cookies.user_id).exec()
    .then(user=>{
        if(user)
        {
           return res.render('profile',{
            user:user

          });
        }
        // else{
        //   console.log("user does not exist go to sing-up");
        //   return res.redirect('/users/sign_in');
        //   //console.log("user does not exist go to sing-up");
        // }


    }).catch(err=>{
      console.log("error finding in user on profile page", err);
    });

   }
   else{
    return res.redirect('/users/sign_in');
   }

};

module.exports.sign_up = function (req, res) {
  return res.render('user_signup');
};

module.exports.sign_in = function (req, res) {
  return res.render('user_signin');
};

module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect('back');
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return User.create(req.body);
      }
      throw new Error('User already exists');
    })
    .then(user => {
      return res.redirect('/users/sign_in');
    })
    .catch(err => {
      console.error(err);
      return res.redirect('back');
    });
};
// Implement the logic for creating a session
module.exports.createSession = function (req, res) {
    // steps to authenticate
    // find user
 
    User.findOne({ email: req.body.email })
    .exec() // Ensure that the query returns a promise
    .then(user => {
      if (user) {
        if (user.password !== req.body.password) {
          return res.redirect('back');
        
        }
        res.cookie('user_id', user.id);
        
       
        
        return res.redirect('/users/profile');
      } else {
        return res.redirect('back');
        
      }
    })
    .catch(err => {
      console.error('Error in finding user during sign-in:', err);
      return res.redirect('back');
    });
};
