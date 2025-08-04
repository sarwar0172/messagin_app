const OtpGenerate = require("../utils/otpGenerator");
const User = require("../models/user");
const response = require("../utils/responsehandler");
const twilloService = require("../services/twilloService");
const generateToken = require("../utils/generateToken");
const { sendOtpTopEmail } = require("../services/emailservice");


// send-1 send otp
const sendOtp=async(req,res)=>{
    const {phoneNumber,phoneSuffix,email}=req.body;
    const otp=OtpGenerate();
    const expiry=new Date(Date.now()+5*60*1000);

    
    try{
        if(email){
            let user=await User.findOne({email});
            if(!user){
                user=await User.create({email});
            }
            user.emailOtp=otp;
            user.emailOtpExpiry=expiry;
            await user.save();
            await sendOtpTopEmail(email,otp);

            return response(res,{email},200,"Otp sent successfully");
        }
        if(!phoneNumber || !phoneSuffix){
            return response(res,null,400,"Please enter phone number and suffix");
        }
        const fullphoneNumber=`${phoneSuffix}${phoneNumber}`;
       let user=await User.findOne({phoneNumber});
        if(!user){
            user=await User.create({phoneNumber,phoneSuffix});
        }
        
        await user.save();
        twilloService.sendOtpToPhoneNumber(fullphoneNumber,otp);
        response(res,user,200,"Otp sent successfully");
    }catch(err){
        console.log(err);
        return response(res,null,400,"Something went wrong");
    }
    
}


// verify otp
const verifyOtp=async(req,res)=>{
    const {phoneNumber,phoneSuffix,email,otp}=req.body;
    let user;
    try{
        if(email){
             user=await User.findOne({email});
            if(!user){
                return response(res,null,400,"User not found");
            }
            if(user.emailOtp!==otp || user.emailOtpExpiry<new Date()){
                return response(res,null,400,"Invalid otp");
            }
            user.emailOtp=null;
            user.emailOtpExpiry=null;
            user.isVerfied=true;
            await user.save();
            response(res,user,200,"Email verified successfully");
        }else{
        if(!phoneNumber || !phoneSuffix){
            return response(res,null,400,"Please enter phone number and suffix");
        }
        const fullphoneNumber=`${phoneSuffix}${phoneNumber}`;
         user=await User.findOne({phoneNumber});
        if(!user){
            return response(res,null,400,"User not found");
        }
        const isValid=await twilloService.verifyPhoneNumber(fullphoneNumber,otp);
        if(!isValid){
            return response(res,null,400,"Invalid otp");
        }
        user.isVerfied=true;
        await user.save();
    }

    const token=generateToken(user?._id);
    res.cookie("token",token,{httpOnly:true});

   return response(res,{token,user},200,"Phone number verified successfully");
    }catch(err){
        console.log(err);
        return response(res,null,400,"Something went wrong while verifying otp");
    }
}


module.exports={
    sendOtp,
    verifyOtp
}