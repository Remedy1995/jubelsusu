const Deposit = require('../models/deposit');
const ErrorResponse = require('../init/Response');
const { TransactionHistory, TotalDeposits } = require('./Transactions');

async function DepositController(req, res) {
    const accountnumber = req.body.accountnumber.trim();
    const amount = req.body.amount.trim();
    try {
        const docs = await Deposit.find({ 'accountnumber': new RegExp(accountnumber, 'i') });
        //if accountnumber has not made any deposits 
        if (docs.length < 1) {
            const depositAccount = new Deposit({
                accountnumber: accountnumber,
                amount: amount,
                date: new Date()
            });

            try {
                const deposit = await depositAccount.save();
                if (deposit) {
                    //record total deposits
                      TotalDeposits(parseFloat(amount));
                    //record the transaction in the transactions history
                    TransactionHistory(accountnumber, amount, " deposited ");
                    return res.status(201).json({ message: "Deposit has been made successfully and your new balance is GHC" +amount.concat(".00"), new_balance: "GHC".concat(amount).concat(".00") });
                }
            } catch (error) {
                console.error(error);
                const dbError = new ErrorResponse(500, "Database Error", "There was an error processing your request");
                return res.status(500).json(dbError.errorObject());
            }
        } else {
            //if accountnumber has deposit information take the initial deposit value add with the new amount and update the database
            const totalPreviousDeposits = docs.reduce((total, deposit) => total + deposit.amount, 0);
            const new_amount = parseFloat(totalPreviousDeposits) + parseFloat(amount);
            const query = { accountnumber: accountnumber };
            const data = { amount: new_amount };
            try {
                const updatedDeposit = await Deposit.updateOne(query, data);
                if (updatedDeposit.acknowledged) {
                     //record total deposits
                      TotalDeposits(parseFloat(amount));
                    //record the transaction in the transactions history
                    TransactionHistory(accountnumber, amount, " deposited ");
                    return res.status(201).json({ message: "Deposit has been made successfully and your new balance is GHC" +new_amount.toFixed(2), new_balance:  "GHC".concat(new_amount).concat(".00") });
                } else {
                    const dbError = new ErrorResponse(500, "Database Error", "There was an error processing your request");
                    return res.status(500).json(dbError.errorObject());
                }
            } catch (error) {
                console.error(error);
                const dbError = new ErrorResponse(500, "Database Error", "There was an error processing your request");
                return res.status(500).json(dbError.errorObject());
            }
        }

    } catch (error) {
        console.error(error);
        const dbError = new ErrorResponse(500, "Database Error", "There was an error processing your request");
        return res.status(500).json(dbError.errorObject());
    }

}



module.exports = DepositController;