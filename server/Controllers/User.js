const AddUser = require('../models/createuser');
const md5 = require('md5');

const UserLogin = (req, res, next) => {
  req.session.phone = req.body.phone.trim();
  const phone = req.session.phone;
  req.session.password = req.body.password.trim();
  const password = req.session.password;


  AddUser.findOne({ phone: phone }, function (err, founduser) {
    if (!founduser) {
      console.log("wrong username")
      res.status(400).json({ error: 'this username is not available ' })
    }
    else {

      if (founduser.password != md5(password)) {
        console.log("incorrect password")
        res.status(400).json({ error: 'incorrect password ' })
      }
      else {
        const { username, role, phone } = founduser;
        res.status(200).json({
          message: 'You have logged in successfully',
          status: true,
          data: {
            username: username,
            role: role,
            phone: phone
          }
        })
      }


    }


  })

}

module.exports = { UserLogin };