const express=require('express');
const router=express.Router();
const path=require('path');
const multer=require("multer");
const CreateAgent=require('../models/createsusuagents');//models to create a user
const countcustomer=require('../models/count/countcustomers');
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
 

router.post('/uploadagentid:id', upload.single('file'),async function(req,res){
    var id=req.params.id;

    if (!req.file) {
        console.log("No file upload");
        res.status(400).json({error: 'Please select file' })
    }
else{
    var imgsrc = '/images/' + req.file.filename
   const file1=imgsrc;
 console.log(file1)
   CreateAgent.findByIdAndUpdate(id, { file1:file1},
    function (err, docs) {                          
if (err){ 
console.log(err) 
} 
else{ 
console.log("idcard successfully updated");
} 
})
}
})


module.exports=router;