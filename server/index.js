const express = require("express");
const PORT = process.env.PORT || 3001;
const session=require("cookie-session");
const MongoDbStore = require('connect-mongo');
const path=require('path');
require('dotenv').config();
const app = express();
const AdminUser=require('../server/models/adminuser');
const AddUser=require('../server/models/createuser');
const CreateAgent=require('../server/models/createsusuagents');
const mongoose=require('mongoose');
const Checkdate=require('../date');
const createroute=require('./routes/createuserroutes');
const agentcreateuser=require('./routes/agentcreateuser');
const createdeposit=require('./routes/makedepositroutes');
const agentdeposit=require('./routes/agentmakedepositroute');//for the agent deposit route
const makewithdrawal=require('./routes/makewithdrawal');
const searchuser=require('./routes/searchall');
const depositorinfo=require('./routes/depositorinfo');
const edit=require('./routes/edit');
const userlogin=require('./routes/userlogin');
const dele=require('./routes/deleteuser');
const transaction=require('./routes/transactionhistory');
const upload=require('./routes/uploadtransactions');
const changeuserpassword=require('./routes/changeuserpassword');
const alldaily=require('./routes/alldaily');
const viewuser=require('./routes/viewuser');
const createagent=require('./routes/createagent');
const allsusuagents=require('./routes/allsusuagents');
const countallcustomers=require('./routes/countallcustomers');
const countallagentcustomers=require('./routes/countallagentcustomers');
const agentlogin=require('./routes/agentlogin');
const cookie=require("cookie-parser");
const accountinfo=require('./routes/accountinformation')
const mongoDB=process.env.MONGO_PASSWORD;
const Getdeposit=require('../server/models/count/totaldeposit');
const Getwithdrawal=require('../server/models/count/totalwithdrawal');
const Getagentdeposit=require('../server/models/count/agenttotaldeposit');
const adminuser=require('../server/routes/adminuserroutes');
const changeadminpassword=require('../server/routes/changeadminpassword');
const agentchangepassword=require('../server/routes/agentchangepassword');
const customertransaction=require('../server/routes/customertransactionhistory');
const agenttransaction=require('../server/routes/agenttransactionhistory');
const agentview=require('../server/routes/agentview');
const agentedit=require('../server/routes/agentedit');
const agentdelete=require('../server/routes/deleteagent');
const uploadagentid=require('../server/routes/uploadagentid');
const useruploadid=require('../server/routes/useruploadid');
const agentsearch=require('../server/routes/agentsearch');
const adminusersearch=require('../server/routes/adminusersearch');
const transactionsearch=require('../server/routes/transactionsearch');
const uploadtransactionsearch=require('../server/routes/uploadtransactionsearch');
const agenttransactionsearch=require('../server/routes/agenttransactionsearch');
const searchcustomertransaction=require('../server/routes/searchcustomertransaction');
const allcommission=require('../server/routes/allcommission');
const getusername=require('../server/routes/getusername');
const gettotaldeposit=require('../server/routes/gettotaldeposit');
const gettotalwithdrawal=require('../server/routes/gettotalwithdrawal');
const countagentdeposit=require('../server/routes/countagentdeposit');
const getimage=require('../server/routes/getimage');
const userimage=require('../server/routes/userimage');
const adminimage=require('../server/routes/adminimage');
const resetuserpassword=require('../server/routes/resetuserpasword');
const mongodb='mongodb+srv://Remedy:Remedy1995@cluster0.swuc4.mongodb.net/susu';
app.set('trust proxy', 1);
app.use(session(
      {
        secret: 'helloworld12345',
        store: MongoStore.create({ 
          mongoUrl: mongodb}),
        
      }));
  app.use(function(req,res,next){
    if(!req.session){
      res.redirect("/")
        return next(new Error('Oh no')) //handle error
    }
    next() //otherwise continue
    });
app.use(cookie());
//routes for actions
app.use('/createuser',createroute);//create a new user 
app.use('/makedeposit',createdeposit);//make deposit
app.use('/searchuser',searchuser);//list all users
app.use('/makewithdrawal',makewithdrawal);//make withdrawal
app.use('/depositorinfo',depositorinfo);//check depositor information
app.use('/edit',edit);
app.use('/userlogin',userlogin);
app.use('/delete',dele);//for deleting the user information
app.use('/transaction',transaction);//for recording transactions of the customer both deposit and withdrawal
app.use('/upload',upload);//for uploading daily transactions 
app.use('/changeuserpassword',changeuserpassword);//change user password
app.use('/alldaily',alldaily);
app.use('/viewuser',viewuser);//view userinformation
app.use('/createagent',createagent);//create the agent route
app.use('/allsusuagents',allsusuagents);//search all the users
app.use('/countallcustomers',countallcustomers);//count all the customers
app.use('/countallagentcustomers',countallagentcustomers);
app.use('/agentlogin',agentlogin);
app.use('/accountinfo',accountinfo);
app.use('/agentcreateuser',agentcreateuser);//the agent can create agent with this endpoint
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.static(path.join(__dirname + '/public/build')));
app.use('/agentdeposit',agentdeposit);
app.use('/adminuser',adminuser);
app.use('/changeadminpassword',changeadminpassword);
app.use('/agentchangepassword',agentchangepassword);
app.use('/customertransaction',customertransaction);
app.use('/agenttransaction',agenttransaction);
app.use('/agentview',agentview);
app.use('/agentedit',agentedit);
app.use('/agentdelete',agentdelete);
app.use('/uploadagentid',uploadagentid);
app.use('/useruploadid',useruploadid);
app.use('/agentsearch',agentsearch);
app.use('/adminusersearch',adminusersearch);
app.use('/transactionsearch',transactionsearch);
app.use('/uploadtransactionsearch',uploadtransactionsearch);
app.use('/agenttransactionsearch',agenttransactionsearch);
app.use('/searchcustomertransaction',searchcustomertransaction);
app.use('/allcommission',allcommission);
app.use('/getusername',getusername);//for the logged user
app.use('/gettotaldeposit',gettotaldeposit);
app.use('/gettotalwithdrawal',gettotalwithdrawal);
app.use('/countagentdeposit',countagentdeposit);
app.use('/getimage',getimage);
app.use('/userimage',userimage);
app.use('/adminimage',adminimage);
app.use('/resetuserpassword',resetuserpassword);
//connection to the database 

mongoose.connect(mongoDB,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>
{
  console.log("successfully connected to the database");
}).catch(err=>{
  console.log("error connecting to the database",err)
});

// console.log(Checkdate())


app.get("/full", (req, res) => { 
    const str=({
        "name":"My name is Adjei"
    })
    console.log(str)
    res.json(str)
  });

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
    const str=({
        "name":"Adjetey Japheth"
    })
    console.log(str)
  });

  app.get('/*', function(req, res) {
    username=req.session.username;
    console.log("you are on the dashboard route")
    
     // if(username){
      res.sendFile(__dirname + '/client/build/index.html');
     
    // }
    // else{
    //   res.redirect("/")
    // }
    })

  app.get("/dashboard",(req,res)=>{
    username=req.session.username;
    console.log("you are on the dashboard route")
    
     if(username){
      res.sendFile(__dirname + '/client/build/index.html');
     
    }
    else{
      res.redirect("/")
    }
   
  })


app.get('/logout',function(req,res){
  const username=req.session.username;
  req.session = null;
  res.json(username)
console.log("logout success")
  
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

