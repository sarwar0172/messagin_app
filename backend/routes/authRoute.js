
const express=require('express');
const router=express.Router();
const authController=require('../controller/authController');


router.post('/sendOtp',authController.sendOtp);
router.post('/verifyOtp',authController.verifyOtp);


module.exports=router;