
const ErrorResponse = require('../init/Response');

const DepositValidator = (req, res, next) => {
  const { accountnumber, amount } = req.body;
  if (!accountnumber) {
    const error = new ErrorResponse(400, "Invalid Request", "Account number field is mandatory");
    return res.status(400).json(error.errorObject());
  }
  if (!amount) {
    const error = new ErrorResponse(400, "Invalid Request", "Amount field is mandatory");
    return res.status(400).json(error.errorObject());
  }

  next();
}

const LoginValidator = (req, res, next) => {
  const { body } = req;
  if (!body.phone || !body.password) {
    const error = new ErrorResponse(400, "Invalid Request", "Sorry either the phone or password does not exist");
    res.status(400).json(error.errorObject());
    return false;
  }
  next();
}


const MomoValidator = (req, res, next) => {
  const { body } = req;
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var regExp = /[a-zA-Z]/g;
  if (!body.email || !body.amount) {
    const error = new ErrorResponse(400, "Invalid Request", "Sorry either the email or amount does not exist");
    res.status(400).json(error.errorObject());
    return false;
  }
  if (!body.email.match(validRegex)) {
    const error = new ErrorResponse(400, "Invalid Request", "Sorry Invalid Email Address Provided");
    res.status(400).json(error.errorObject());
    return false;
  }
  if (body.amount.match(regExp) || isNaN(body.amount)) {
    const error = new ErrorResponse(400, "Invalid Request", "Sorry Invalid Amount Provided");
    res.status(400).json(error.errorObject());
    return false;
  }
  next();
}



const OtpValidator = (req, res, next) => {
  const { body } = req;
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var regExp = /[a-zA-Z]/g;
  if (!body.otp || !body.reference) {
    const error = new ErrorResponse(400, "Invalid Request", "Sorry either the otp code or reference does not exist");
    res.status(400).json(error.errorObject());
    return false;
  }

  if (body.otp.match(regExp)  || body.reference.match(validRegex) || isNaN(body.otp)) {
    const error = new ErrorResponse(400, "Invalid Request", "Sorry Invalid Otp or reference Provided");
    res.status(400).json(error.errorObject());
    return false;
  }
  next();
}


const VerificationValidator = (req, res, next) => {
  const { body } = req;
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var regExp = /[a-zA-Z]/g;
  if (!body.reference) {
    const error = new ErrorResponse(400, "Invalid Request", "Sorry reference does not exist");
    res.status(400).json(error.errorObject());
    return false;
  }

  if (body.reference.match(validRegex)) {
    const error = new ErrorResponse(400, "Invalid Request", "Sorry Invalid reference Provided");
    res.status(400).json(error.errorObject());
    return false;
  }
  next();
}

const SendSMSValidator = (req, res, next) => {
  const { body } = req;
  if (!body.message || !body.reciepient_phone || !body.sender_id) {
    const error = new ErrorResponse(400, "Invalid Request", "Sorry either message,reciepient_phone or sender_id does not exist");
    res.status(400).json(error.errorObject());
    return false;
  }
next();
}
module.exports = { DepositValidator, LoginValidator, MomoValidator,OtpValidator,VerificationValidator,SendSMSValidator };