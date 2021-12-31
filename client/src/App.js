import React from 'react';
import Dashboard  from './dashboard.jsx';
import Depositorinfo from './depositorinfo.jsx';
import Registercustomer from './registercustomer.jsx';
import AllUsers from './allusers.jsx';
import MakeDeposit from './makedeposit.jsx';
import { BrowserRouter ,Route,Switch } from 'react-router-dom';
import MakeWithdrawal from './withdrawalcustomer.jsx';
import EditDetails from './editdetails.jsx';
import HomeLogin from './homelogin.jsx';
import AllTransactions from './transaction.jsx';
import ChangeUserPassword from './changeuserpassword.jsx';
import DailyTransactions from './dailytransactions.jsx';
import AllDaily from './alldaily.jsx';
import ViewUser from './viewuser.jsx';
import CreateAgents from './susuagents.jsx';
import AllAgents from './allagents.jsx';
import AgentLogin from './agentlogin.jsx';
import AgentDashboard from './agentdashboard.jsx';
// import AgentRegister from './agentregister.jsx';
import AgentMakeDeposit from './agentdeposit.jsx';
import AgentDepositorinfo from './agentcustomerbalance.jsx';
import AgentChangePassword from './agentchangepassword.jsx';
import AgentAllTransactions from './agenttransaction.jsx';
import AgentDailyTransactions from './agentupload.jsx';
import CustomerDashboard from './customerdashboard.jsx';
import CustomerLogin from './customerlogin.jsx';
import ChangeAdminPassword from './changeadminpassword.jsx';
import AllCustomerTransactions from './customertransaction.jsx';
import Customerbalance from './customerbalance.jsx';
import ChangeCustomerPassword from './customerchangepassword.jsx';
import AgentView from './agentview.jsx';
import AgentEditDetails from './agentedit.jsx';
import UploadAgentId from './uploadagentid.jsx';
import UserUploadId from './useruploadid.jsx';
import AgentCreateUser from './agentcreateuser.jsx';
import ResetUserPassword from './resetuserpassword.jsx';
function App(){
//    const [data,setdata]=useState(null);
 
//  React.useEffect( () => {
//    fetch("/username").then((res) => res.json()).then((data) => setdata(data))}, []);
     
//    console.log(!data?"":data)
     
//    var username=!data?"":data;


return(
    <div>
<BrowserRouter>

<Switch>

<Route path="/" exact>
  
<HomeLogin />

   </Route>



   
   {/* <Route path="/logout">
  
<HomeLogin />

   </Route> */}
<Route path="/dashboard" >
<Dashboard/>
   
   </Route>


   <Route path="/customerlogin" >
<CustomerLogin/>
   </Route>

   <Route path="/agenttransaction" >
<AgentAllTransactions/>
   </Route>


   <Route path="/agentlogin" >
<AgentLogin/>
   </Route>
   <Route path="/agentdashboard">
<AgentDashboard/>
   </Route>
   <Route path="/agentregister">
      <CreateAgents/>
   </Route>
   <Route path="/agentcreateuser">
      <AgentCreateUser/>
   </Route>

   <Route path="/customerdashboard">
<CustomerDashboard/>
   </Route>
   <Route path="/customertransaction">
<AllCustomerTransactions/>
   </Route>
   <Route path="/customerbalance">
<Customerbalance/>
   </Route>


   <Route path="/agentdeposit">
<AgentMakeDeposit/>
   </Route>
   <Route path="/agentcustomerbalance">
<AgentDepositorinfo/>
   </Route>
<Route path="/allusers">
<AllUsers/>
   </Route>
   <Route path="/changeuserpassword:id">
<ChangeUserPassword/>
   </Route>
   <Route path="/changeuserpassword">
<ChangeUserPassword/>
   </Route>
   <Route path="/changeadminpassword:id">
<ChangeAdminPassword/>
   </Route>
   <Route path="/changeadminpassword">
<ChangeAdminPassword/>
   </Route>
   <Route path="/customerchangepassword:id">
<ChangeCustomerPassword/>
   </Route>
   <Route path="/customerchangepassword">
<ChangeCustomerPassword/>
   </Route>
   <Route path="/agentchangepassword">
<AgentChangePassword/>
   </Route>
   <Route path="/agentchangepassword:id">
<AgentChangePassword/>
   </Route>
   <Route path="/dailytransactions">
<DailyTransactions/>
   </Route>
   <Route path="/agentdailytransactions">
<AgentDailyTransactions/>
   </Route>
   <Route path="/alldaily">
<AllDaily/>
   </Route>
   <Route path="/transaction">
<AllTransactions/>
   </Route>
   <Route path="/deposit">
<MakeDeposit/>
   </Route>
   <Route path="/withdrawal">
<MakeWithdrawal/>
   </Route>
   <Route path="/register">
<Registercustomer/>
   </Route>
   <Route path="/depositorinfo">
<Depositorinfo/>
   </Route>
   <Route path="/edit:id">
<EditDetails/>
   </Route>

   <Route path="/agentedit:id">
<AgentEditDetails/>
   </Route>
   <Route path="/delete:id">
<AllUsers/>
   </Route>
   <Route path="/agentdelete:id">
<AllAgents/>
   </Route>
   <Route path="/viewuser:id">
<ViewUser/>
   </Route>

   <Route path="/agentview:id">
<AgentView/>
   </Route>


   <Route path="/allagents">
<AllAgents/>
   </Route>
  
   <Route path="/createagent">
<CreateAgents/>
   </Route>

   <Route path="/useruploadid:id">
<UserUploadId/>
   </Route>

   <Route path="/uploadagentid:id">
<UploadAgentId/>
   </Route>

  <Route path="/resetuserpassword">
<ResetUserPassword/>
   </Route>
   </Switch>
 
 </BrowserRouter>



    </div>
  )
} 

export default App;