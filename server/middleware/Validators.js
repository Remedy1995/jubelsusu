
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


module.exports = DepositValidator;