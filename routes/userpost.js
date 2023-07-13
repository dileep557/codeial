const express= require('express');

const router= express.Router();
const postController= require('../controller/userpost_controller');



//console.log("router is loaded");

router.get('/post', postController.post);


module.exports= router;