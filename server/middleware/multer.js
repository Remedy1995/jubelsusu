const multer=require('multer');
const path =require('path');
const storage=require('../middleware/cloudinary')
// var storage = multer.diskStorage({
//     destination: (req, file, callBack) => {
//         callBack(null, './client/public/images/')     // './public/images/' directory name where save the file
//     },
//     filename: (req, file, callBack) => {
//         callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })
 
const upload = multer({
    storage: storage
});
 

module.exports=upload;