const express= require('express');
const passport = require('passport');

const router= express.Router();
const userController= require('../controller/user_controller');



//console.log("router is loaded");

router.get('/profile',passport.checkAuthentication, userController.profile);
router.get('/sign_up', userController.sign_up);
router.get('/sign_in', userController.sign_in);
router.post('/create', userController.create);


//use passport as middlewhere to authenticate

// router.post('/create-session', passport.authenticate(
//     'local',
//     {
//       successRedirect: '/users/profile'
//     },
//       {  failureRedirect: '/users/sign_in' }
// )  , userController.createSession);

router.post('/create-session', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/sign_in',
  })(req, res, next);
}, userController.createSession);


router.get('/sign-out', userController.destroySession);





module.exports= router;