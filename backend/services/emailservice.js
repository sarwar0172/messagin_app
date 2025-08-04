const dotenv=require('dotenv')
dotenv.config();   
const nodeMailer=require('nodemailer');

const transporter=nodeMailer.createTransport({
    service:'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

transporter.verify((error,success)=>{
    if(error){
        console.log('Gmail services sms failed');
    }else{
        console.log('Gmail configured properly and ready to send email');
    }
});

const sendOtpTopEmail=async(email,otp)=>{
    const html=`<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h2 style="color: #075e54;">🔐 WhatsApp Web Verification</h2>
      
      <p>Hi there,</p>
      
      <p>Your one-time password (OTP) to verify your WhatsApp Web account is:</p>
      
      <h1 style="background: #e0f7fa; color: #000; padding: 10px 20px; display: inline-block; border-radius: 5px; letter-spacing: 2px;">
        ${otp}
      </h1>

      <p><strong>This OTP is valid for the next 5 minutes.</strong> Please do not share this code with anyone.</p>

      <p>If you didn’t request this OTP, please ignore this email.</p>

      <p style="margin-top: 20px;">Thanks & Regards,<br/>WhatsApp Web Security Team</p>

      <hr style="margin: 30px 0;" />

      <small style="color: #777;">This is an automated message. Please do not reply.</small>
    </div>`
    await transporter.sendMail({
        from:`whatsapp web security team <${process.env.EMAIL_USER}`,
        to:email,
        subject:'WhatsApp Web Verification OTP',
        html
    });
}

module.exports={sendOtpTopEmail};