const OtpGenerate = require("../utils/otpGenerator");
const User = require("../models/user");
const response = require("../utils/responsehandler");

// send-1 send otp
const sendOtp=async(req,res)=>{
    const {phoneNumber,phoneSuffix,email}=req.body;
    const otp=OtpGenerate();
    const expiry=new Date(Date.now()+5*60*1000);

    let user;
    try{
        if(email){
            user=await User.findOne({email});
            if(!user){
                user=await User.create({email});
            }
            user.emailOtp=otp;
            user.emailOtpExpiry=expiry;
            await user.save();

            response(res,{email},200,"Otp sent successfully");
        }
        if(!phoneNumber || !phoneSuffix){
            return response(res,null,400,"Please enter phone number and suffix");
        }
        const fullphoneNumber=`${phoneSuffix}${phoneNumber}`;
        user=await User.findOne({phoneNumber});
        if(!user){
            user=await User.create({phoneNumber,phoneSuffix});
        }
        
        await user.save();

        response(res,user,200,"Otp sent successfully");
    }catch(err){
        console.log(err);
        return response(res,null,400,"Something went wrong");
    }
    
}


