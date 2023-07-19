const express= require('express');

const router= express.Router();
const userController= require('../controller/user_controller');



//console.log("router is loaded");

router.get('/profile', userController.profile);
router.get('/sign_up', userController.sign_up);
router.get('/sign_in', userController.sign_in);
router.post('/create', userController.create);
router.post('/create-session', userController.createSession);
router.get('/sign_out', userController.sign_out);




module.exports= router;