const addhistory = function AddHistory(username,action , amount, date) {

    return username + action + "GHC".concat(amount).concat(".00") + " on " + date;
}

module.exports = addhistory;

