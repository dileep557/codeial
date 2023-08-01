const User = require('../models/user');

module.exports.profile = function (req, res) {

  User.findById(req.params.id).then(user=>{
    return res.render('profile', {
      title : 'profile page',
      user_profile: user
    });

  }).catch(err=>{
    console.log("error show profile in list",err);
  });
 
};



// module.exports.update= function(req,res)
// {
//   if(req.user.id==req.params.id)
//   { 

//     User.findByIdAndDelete(req.params.id , req.body).then(user).catch(err)
//       return res.redirect('back')
    


//   }
//   else{
//     return res.status(401).send('unathorised');
//   }



// }

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


exports.destroySession = function (req, res) {
  // Code to handle user logout and destroy the session goes here
  // For example:
  req.logout(function(err) {
    if (err) { return next(err); }
  });
  return res.redirect('/'); // Redirect to the home page or any other page after logout
};





