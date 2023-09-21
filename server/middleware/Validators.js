
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




module.exports = { DepositValidator, LoginValidator };