
const dotenv=require('dotenv')
dotenv.config();
const twillo=require('twilio')

// Twillo credentials from env
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid=process.env.TWILIO_SERVICE_SID;    

const client = twillo(accountSid, authToken);

// send otp message
const sendOtpToPhoneNumber=async(phoneNumber,otp)=>{
    try{
        console.log('sending otp to this number',phoneNumber);
        if(!phoneNumber){
            console.log('phone number not found');
            return;
        }
      const response=await client.verify.v2.services(serviceSid).verifications.create({to:`${phoneNumber}`,channel:'sms'});
      console.log(response);
      return response
    }catch(err){
        console.log(err);
        throw new Error('faild to send otp to phone number');
    }
}

const verifyPhoneNumber=async(phoneNumber,otp)=>{
    try{
      const response=await client.verify.v2.services(serviceSid).verificationChecks.create({to:`${phoneNumber}`,code:otp});
      console.log(response);
      return response
    }catch(err){
        console.log(err);
        throw new Error('faild to verify otp to phone number');
    }
}

module.exports={sendOtpToPhoneNumber,verifyPhoneNumber}