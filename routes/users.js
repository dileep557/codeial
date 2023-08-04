const express= require('express');
const passport = require('passport');

const router= express.Router();
const userController= require('../controller/user_controller');



//console.log("router is loaded");

router.get('/profile/:id',passport.checkAuthentication, userController.profile);
router.post('/update/:id',passport.checkAuthentication, userController.update);


router.get('/sign_up', userController.sign_up);// the first parameter is url path and second is callback to handle to the verious controls
router.get('/sign_in', userController.sign_in);
router.post('/create', userController.create);




router.post('/create-session', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/sign_in',
  })(req, res, next);
}, userController.createSession);


router.get('/sign-out', userController.destroySession);





module.exports= router;