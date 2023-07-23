
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
  return res.render('profile', {
    title : 'profile page'
  });
};

module.exports.sign_up = function (req, res) {


  if(req.isAuthenticated())
  {
    return res.redirect('/users/profile');
  }

  return res.render('user_signup', {
    title: 'sign-up page'
  });
};

module.exports.sign_in = function (req, res) {


  if(req.isAuthenticated())
  {
    return res.redirect('/users/profile');
  }
  return res.render('user_signin',{
    title : 'sign-in page'
  });
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

module.exports.createSession = function (req, res) {
  // Implement the logic for creating a session

  return res.redirect('/');
};

