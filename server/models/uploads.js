const mongoose = require('mongoose');
const uploadsSchema = {
    name : String,
    uri : String,
    suri: String,
    type : String,

}
const Upload = mongoose.model("uploads",uploadsSchema);
module.exports  = Upload;
