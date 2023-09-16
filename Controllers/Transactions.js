const Deposit = require('../models/deposit');
const totaldeposit = require('../models/count/totaldeposit');
const Allwithdrawal = require('../models/count/totalwithdrawal');
const Message = require('../helpers/HistoryMessage');
const Transaction = require('../models/transactionhistory');
//compute all total deposits made 
const TotalDeposits = async (amount) => {
  try {
    const allDeposits = await totaldeposit.find({});
    const sumDeposits = allDeposits.reduce((initialamount, deposit) => initialamount + deposit.total, 0);
    const new_totalDeposits = parseFloat(sumDeposits) + parseFloat(amount);
    const query = { id: '64ded2206d3c3166050aa5b0' };
    const data = { total: new_totalDeposits };

    try {
      const updatedTotalDeposit = await totaldeposit.updateOne(query, data);
      if (updatedTotalDeposit.acknowledged) {
        console.log('New deposits has been added to the total deposits', updatedTotalDeposit);
      } else {
        console.log('Error occured');
      }
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.log(error);
  }

}



//calculate totoal withdrawals that has been made
const TotalWithdrawals = async (amount) => {
  try {
    const withdrawals = await Allwithdrawal.find({});
    console.log('with', withdrawals);
    const sumWithdrawals = withdrawals.reduce((initialamount, withdraw) => initialamount + withdraw.total, 0);

    const new_totalWithdrawals = parseFloat(sumWithdrawals) + parseFloat(amount);
    const query = { id: '64ded24e6d3c3166050aa5b1' };
    const data = { total: new_totalWithdrawals };

    try {
      const updatedTotalWithdraw = await Allwithdrawal.updateOne(query, data);
      if (updatedTotalWithdraw.acknowledged) {
        console.log('New withdrawals has been added to the total withdrawals', updatedTotalWithdraw);
      } else {
        console.log('Error occured');
      }
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.log(error);
  }

}




//record Transaction history of all deposits made 
const TransactionHistory = (accountnumber, amount, action) => {
  try {
    const history = new Transaction(
      {
        amount: amount,
        date: new Date(),
        transactiondetails: Message(accountnumber, action, amount, new Date()),
        accountnumber: accountnumber,
      }
    )
    history.save().then(res => {
      if (res) {
        console.log("successful recorded transaction");
      } else {
        console.log("error occured while recording transaction");
      }
    })
  } catch (error) {
    console.log('error', error);
  }
}








module.exports = { TotalDeposits, TransactionHistory, TotalWithdrawals };