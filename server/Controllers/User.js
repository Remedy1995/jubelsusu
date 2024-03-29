const AddUser = require('../models/createuser');
const md5 = require('md5');
const cloudinary = require('cloudinary').v2;
const config = require('../config/config');
const ErrorResponse = require('../init/Response');
const fs = require('fs');
const UserLogin = (req, res) => {
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

const UserImageUpload = (req, res) => {
  //if id does not exist only  return the file url 
  const { body } = req;
  if (!req.file) {
    const error = new ErrorResponse(500, "Invalid Request", 'Please upload File does not exist');
    res.status(400).json(error.errorObject());
  }
  if (!body.id) {
    console.log('id does not exist')
    uploadImage(req.file.filename, false).then(data => {
      return data;
    });
  }
  else {
    //if id exists let update the database with that file url 
    console.log('id exists', req.body.id);
    uploadImage(req.file.filename, true).then(data => {
      console.log('data', data);

      AddUser.findByIdAndUpdate(req.body.id, { file: data }).then(user => {
        if (user) {
          return res.status(201).json({ message: "image has been successfully uploaded" });
        }
      }).catch(err => {
        const error = new ErrorResponse(500, "Sorry An Error Occured", err);
        return res.status(500).json(error.errorObject());
      });
    })


  }



  async function uploadImage(imagefile, hasId) {
    config();//configuration of the cloudinary apis
    var imgsrc = 'client/public/images/' + imagefile
    const result = await cloudinary.uploader.upload(imgsrc);
    try {
      if (hasId) {
        //DeleteImage(imgsrc);
        return result.url;
      }
      else {
        ///DeleteImage(imgsrc);
        return res.status(201).json(result);

      }
    }
    catch (err) {
      console.log('my error', err);
      const error = new ErrorResponse(500, "Sorry An Error Occured", err);
      return res.status(500).json(error.errorObject());
    }
  }


  function DeleteImage(filePath) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log('There was a problem in deleting image')
      }
      else {
        console.log('image was successfully deleted')
      }
    })
  }


}




const createNewUser = async (req, res) => {
  const agentname = req.body.agentname;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const username = req.body.username;
  const email = req.body.email;
  const phone = req.body.phone;
  const date = req.body.date;
  const address = req.body.address;
  const occupation = req.body.occupation;
  const password = md5(req.body.password);
  //const file=imgsrc;
  //generate account numbers for the newly created customers
  //get only the first character from the customer firstname;
  let trimfirst = firstname;
  trimmedfirstname = trimfirst.charAt(0)
  //get the last character from the customer lastname;
  let trimlast = lastname;
  trimmedlastname = trimlast.charAt(0);

  //now let generate 4 random numbers
  var random = Math.floor(1000 + Math.random() * 9000);

  //we now have to cocatenate all our variables
  let accountnumber = trimmedfirstname + trimmedlastname + random;
  const adduser = new AddUser(
    {
      agentname: agentname,
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      phone: phone,
      date: date,
      address: address,
      occupation: occupation,
      password: password,
      file: req.body.file,
      accountnumber: accountnumber,
      file_url: req.body.file,
      role: 'customer'
    }
  )
  AddUser.findOne({ $or: [{ username }, { phone }] }).then(async (data) => {
    if (data) {
      res.status(200).json({ message: "Sorry username or phone already exists" })
    }
    else {
      console.log('username and phone does not exist')
      const submit = await adduser.save();
      if (submit) {
        return res.status(201).json({
          subject: "You have successfully registered User",
          body: "User can now log into account with neccessary credentials sent to their sms inbox and change default password",
          data : submit
        })
      }
    }
  }).catch((error) => {
    console.log('there is an error', error)
    const dbError = new ErrorResponse(500, " Error", error.message);
    return res.status(500).json(dbError.errorObject());
  });

}


module.exports = { UserLogin, UserImageUpload, createNewUser };