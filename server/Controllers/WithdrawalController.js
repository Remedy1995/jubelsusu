const Deposit = require('../models/deposit');
const ErrorResponse = require('../init/Response');
const { TransactionHistory , TotalWithdrawals} = require('./Transactions');

async function WithdrawalController(req, res) {
    const accountnumber = req.body.accountnumber.trim();
    const amount = req.body.amount.trim();
    try {
        const docs = await Deposit.find({ 'accountnumber': new RegExp(accountnumber, 'i') });
        //if accountnumber has not made any deposits or savings
        if (docs.length < 1) {
            const dbError = new ErrorResponse(404, "Invalid Request", "Sorry account number does not exist");
            return res.status(404).json({error : 'Account not found'});
        } else {
            //if account number has savings first check if requested amount is higher than savings
             const searchAccount = docs.find((data)=>data.accountnumber === accountnumber);
             const currentBalance = searchAccount.amount;
            if( parseFloat (currentBalance) <= parseFloat(amount)) {
                const dbError = new ErrorResponse(400, "Invalid Request", "Sorry you have insufficient funds to withdraw");
                return res.status(400).json(dbError.errorObject()); 
            }
            console.log('current balance',currentBalance);
            const balance = parseFloat(currentBalance) - parseFloat(amount);
            const query = { accountnumber: accountnumber };
            const data = { amount: balance };
            try {
                const updatedBalance = await Deposit.updateOne(query, data);
                if (updatedBalance.acknowledged) {
                    //record the transaction in the transactions history
                     TransactionHistory(accountnumber, amount," withdrawn ");
                     //calculate total withdrawals
                     TotalWithdrawals(parseFloat(amount));
                    return res.status(201).json({ message: "Withdrawal has been made successfully and your new balance is GHC" +balance.toFixed(2), new_balance:  "GHC".concat(balance).concat(".00") });
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



module.exports = WithdrawalController;