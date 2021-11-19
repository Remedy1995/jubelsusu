const express=require('express');
const router=express.Router();
const path=require('path');
const multer=require("multer");
const CreateAgent=require('../models/createsusuagents');//models to create a user
const countcustomer=require('../models/count/countcustomers');
const md5=require('md5');
const bodyparser = require('body-parser');
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
 

router.post('/createagent', upload.single('file'),async function(req,res){
   

    if (!req.file) {
        console.log("No file upload");
        res.status(400).json({error: 'Please select file' })
    }
else{
    var imgsrc = '/images/' + req.file.filename
   const firstname=req.body.firstname;
   const lastname=req.body.lastname;
   const username=req.body.username;
   const email=req.body.email;
   const phone=req.body.phone;
   const date=req.body.date;
   const password=md5(req.body.password);
   const file=imgsrc;
   console.log(firstname)
   console.log(lastname);
    
    const createuser= await new CreateAgent(
        {
             firstname:firstname,
             lastname:lastname,
             username:username,
             email:email,
             phone:phone,
             date:date,
             password:password,
             file:file
        }
    )
   const submit= createuser.save();
   if(submit){
       console.log("agent has been created successfully");
      
   }
   else{
       console.log("error occured in creating the agent");
   }
}
})


module.exports=router;