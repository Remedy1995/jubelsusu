const express=require('express');
const router=express.Router();
const Daily_Transaction=require('../models/dailytransactions');
const multer = require("multer");
const path = require('path')
const Checkdate=require('../date')
const bodyParser = require('body-parser');
const cors = require("cors");
router.use(cors());
router.use(express.static("./public"))
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
 

//! Use of Multer
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
 
//@type   POST
//route for post data
router.post("/upload", upload.single('file'), (req, res) => {
    const fullname=req.body.fullname;
    console.log(fullname)
    if (!req.file) {
        console.log("No file upload");
        res.status(400).json({error: 'Please select file' })
    } else {
       
        var imgsrc = '/images/' + req.file.filename
        console.log(imgsrc)
      const upload=new Daily_Transaction({
          image:imgsrc,
          fullname:fullname,
          date:Checkdate()
      })
      const up=upload.save();
      if(up){
          console.log("successfully uploaded the transaction")
      }
    }
});
 

console.log(Checkdate())



module.exports=router;