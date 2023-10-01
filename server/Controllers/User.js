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
        DeleteImage(imgsrc);
        return result.url;
      }
      else {
        DeleteImage(imgsrc);
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

module.exports = { UserLogin, UserImageUpload };