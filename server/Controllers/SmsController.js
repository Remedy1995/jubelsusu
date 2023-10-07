const axios = require('axios');
const ErrorResponse = require('../init/Response');
require('dotenv').config();

const PhoneNumberVerification = async (req, res) => {
    const { phone, sender_id } = req.body;

    const data = {
        expiry: 5,
        length: 6,
        medium: 'sms',
        message: `This is OTP from ${sender_id} please do not share with anyone, %otp_code%`,
        number: phone,
        sender_id: sender_id,
        type: 'numeric',
    };
    const headers = {
        'api-key': process.env.SMS_SCECRET
    }

    try {
        const response = await axios.post('https://sms.arkesel.com/api/otp/generate', data, { headers });
        if (response) {
            console.log('my response', response.data)
            return res.status(200).json(response.data);
        }
    }
    catch (error) {
        console.log(error)
        const dbError = new ErrorResponse(500, " Error", error.message);
        return res.status(500).json(dbError.errorObject());
    }




}

const VerifyOTP = async (req, res) => {
    const { phone, otp_code } = req.body;

    const data = {
        api_key: process.env.SMS_SCECRET,
        code: otp_code,
        number: phone
    };
    const headers = {
        'api-key': process.env.SMS_SCECRET,
    }

try {
const response = await axios.post('https://sms.arkesel.com/api/otp/verify', data, { headers });

if (response){
    return res.status(200).json(response.data);
}
}

catch(error){
  const dbError = new ErrorResponse(500, " Error", error.message);
    return res.status(500).json(dbError.errorObject());
}


}


const SendMessage = async(req,res)=>{
const {message,reciepient_phone,sender_id} = req.body;
try{
const response = await axios.get(`https://sms.arkesel.com/sms/api?action=send-sms&api_key=${process.env.SMS_SCECRET}&to=${reciepient_phone}&from=${sender_id}&sms=${message}`)
if (response) {
    console.log('my response', response.data)
    return res.status(200).json(response.data);
}
}catch (error){
    const dbError = new ErrorResponse(500, " Error", error.message);
    return res.status(500).json(dbError.errorObject());
}
}
    module.exports = { PhoneNumberVerification,VerifyOTP,SendMessage};