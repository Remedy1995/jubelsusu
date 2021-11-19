const mongoose = require('mongoose');
const CreateAgentSchema={
    firstname:String,
    lastname:String,
    username:String,
     email:String,
    phone:String,
    date:String,
    password:String,
    file:String,
    file1:String
}
const CreateAgent=mongoose.model("createagent",CreateAgentSchema);
module.exports=CreateAgent;
