const express = require('express');
const router = express.Router();
const md5 = require('md5');
const countcustomer = require('../models/count/countcustomers');
const cloudinary = require('cloudinary').v2;
const config = require('../config/config');
const AddUser = require('../models/createuser');//models to create a user
const bodyparser = require('body-parser');
const customtemplate = require('../countcustomertemplate');
const upload = require('../middleware/multer');
router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());


router.post('/user', upload.single('file'), async function (req, res) {


    // if (!req.file) {
    //     console.log("No file upload");
    //     res.status(400).json({ error: 'Please select file' })
    // }
    // else {

    //     config();//configuration of the cloudinary apis


    //     var imgsrc = 'client/public/images/' + req.file.filename
    //     console.log(imgsrc)
    //     cloudinary.uploader.upload(imgsrc,
    //         { public_id: req.file.filename },
    //         function (error, result) {
    //             try {
    //                 console.log(result.secure_url);
    //                 console.log(result);
    //                 //create a download url for the image 
    //                 var image_version = result.version;
    //                 var public_id = result.public_id;
    //                 image_version = "fl_attachment/";
    //                 var format = result.format;
    //                 var download_url = 'https://res.cloudinary.com/dtcdazdpk/image/upload/' + image_version + public_id + "." + format;
    //                 console.log(download_url)
    //                 var final_file = result.secure_url;
    //             }
    //             catch (err) {
    //                 console.log("please you have to set your time and date");
    //                 res.status(400).json({ error: 'please you have to set your time and date' })
    //             }

    // const file = imgsrc;
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
            agentname: req.body.agentname,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            date: req.body.date,
            address: req.body.address,
            occupation: req.body.occupation,
            password: md5(req.body.password),
            file: "",
            accountnumber: accountnumber,
            file_url: ""
        }
    )
    try {
        const submit = adduser.save();
        if (submit) {
            res.send("data has been submitted successfully");
            //update the count field in the database when a customer is registered
            customtemplate();//function for the recording of customers
            res.status(201).json({ message: 'You have successfully registered customer' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Sorry an occured in registering customer' });
    }
})


module.exports = router;