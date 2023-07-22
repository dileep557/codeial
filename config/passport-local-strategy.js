// const passport= require('passport');

// const LocalStrategy= require('passport-local').Strategy;

// const User= require('../models/user');

// // setup passport strategy
// passport.use(new LocalStrategy
// ({
//     usernameFeild: 'email'
//     },
//     function(email, password, done) {
//       User.findOne({ email: email }, function (err, user) {
//         if (err) { return done(err); }
//         if (!user) { return done(null, false); }
//         if (user.password!=password) { return done(null, false); }
//         return done(null, user);
//       });
//     }
// ));


// // serializing user to decide which key kept in cookies
//   passport.serializeUser(function(user, done)
//   {
//    done(null, user.id);
//   });


// // deserilizing the user key on cookies.
// passport.deserializeUser(function(id, done)
// {
//   User.findById(id, function(err, user){
//     if(err){
//       console.log("error finding in passport");
//       done(err);
//     }

//     return done(null, user);
//   });
// });


// module.exports= passport;

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')

passport.use(new LocalStrategy({
  usernameField: 'email',
  passReqToCallback: true
},
  async function (req, email, password, done) {
    try {
      let user = await User.findOne({ email: email })
      if (!user) {
        req.flash('error', 'invalid username // password');
        return done(null, false);
      }
      if (user.password != password) {
       // req.flash('error', 'invalid password');
        return done(null, false);
      }

      return done(null, user);
    } catch (err) {
   //   req.flash('error', err);
      return done(err);
    }

  }));

passport.serializeUser(function (user, done) 
{
  done(null, user.id);
});


passport.deserializeUser(async function (id, done) {
  try {
    let user = await User.findById(id);
    if (!user) 
    {
      return done(null, false)
    }
    return done(null, user);
    } catch (error) {
    done(err);
    }
});

passport.checkAuthentication = function (req, res, next) 
{
  // if the user is signed in then pass on the request to the next function  controller action 
  if (req.isAuthenticated()) {
    return next();
  }
  //req.flash('error', 'You are not Authorize plz sign in !');
  return res.redirect('/users/sign_in');
}



passport.setAuthenticatedUser = function (req, res, next) 
{
    if (req.isAuthenticated())
    {
      // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
      res.locals.user = req.user;
    }
    next();
}

module.exports = passport;


