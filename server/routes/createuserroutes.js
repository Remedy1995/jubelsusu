const express=require('express');
const router=express.Router();
const path=require("path");
const multer = require("multer");
const md5=require('md5');
const countcustomer=require('../models/count/countcustomers');
const AddUser=require('../models/createuser');//models to create a user
const bodyparser = require('body-parser');
const customtemplate=require('../countcustomertemplate');
router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());

var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './client/public/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
 
var upload = multer({
    storage: storage
});
 

router.post('/user',upload.single('file'), async function(req,res){

    if (!req.file) {
        console.log("No file upload");
        res.status(400).json({error: 'Please select file' })
    }
else{





var imgsrc = '/images/' + req.file.filename
console.log(imgsrc)

   const agentname=req.body.agentname;
   const firstname=req.body.firstname;
   const lastname=req.body.lastname;
   const username=req.body.username;
   const email=req.body.email;
   const phone=req.body.phone;
   const date=req.body.date;
   const password=md5(req.body.password);
   const file=imgsrc;

   //generate account numbers for the newly created customers
   //get only the first character from the customer firstname;
   let trimfirst=firstname;
    trimmedfirstname=trimfirst.charAt(0)
   //get the last character from the customer lastname;
   let trimlast=lastname;
   trimmedlastname=trimlast.charAt(0);

   //now let generate 4 random numbers
   var random = Math.floor(1000 + Math.random() * 9000);
    
   //we now have to cocatenate all our variables

   let accountnumber=trimmedfirstname+trimmedlastname+random;


    const adduser= await new AddUser(
        {
            agentname:agentname,
             firstname:firstname,
             lastname:lastname,
             username:username,
             email:email,
             phone:phone,
             date:date,
             password:password,
             file:file,
             accountnumber:accountnumber
        }
    )
   const submit= adduser.save();
   if(submit){
       res.send("data has been submitted successfully");
    //update the count field in the database when a customer is registered
    customtemplate();//function for the recording of customers

}
   else{
       res.send("error in sending data");
   }
}
})


module.exports=router;