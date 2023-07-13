const express= require('express');

const router= express.Router();
const userController= require('../controller/user_controller');



//console.log("router is loaded");

router.get('/profile', userController.profile);


module.exports= router;