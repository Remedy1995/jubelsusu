import React,{useState}  from "react";
import './app.css';
import Header from "./header";
import {Link,Switch} from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'
import AgentSidebar from "./agentsidebar";
import { useMediaQuery } from 'react-responsive'
function AgentMakeDeposit(){
	const [show,setShow]=useState(true);
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 738px)' })

	
	function OpenSidebar(){
		setShow(!show)
		
	  }
	const [data, setData] = React.useState(null);
	const [username,setusername]=useState("");
	const [useErr,setUseErr]=useState(false);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
       
	
	const [amoun,setamount]=useState("");
	const [accoun,setAccount]=useState("");
	const [agen,setAgent]=useState("");
	function checkAmount(e){
		setamount(e.target.value)
	}
	
	
	function checkAccount(e){
		setAccount(e.target.value)
	}
	
	
	function checkAgent(e){
		setAgent(e.target.value)
	}
	
	
	
	
	function userHandler(e){
		let item=e.target.value;
		if(item.length<4){
		  setUseErr(true);
		}
		else{
		  setUseErr(false)
		}
		setusername(item)
	  }

	function SearchSubmit(e){
  
		e.preventDefault();
	
		if(username.length<1){
		  alert("insert")
		}else{
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		const {username} = e.target.elements
		const user= {username:username.value};
		const inputusername=user.username;
		var raw = JSON.stringify({
		  "username": inputusername
		});
		
		var requestOptions = {
		  method: 'POST',
		  headers: myHeaders,
		  body: raw,
		  redirect: 'follow'
		};
		
		fetch("/accountinfo/accountinfo", requestOptions)
		.then((res) => res.json()).then((data) => setData(data))
		  .then(result => console.log(result))
		  .catch(error => console.log('error', error));

		
	  }
	 
	}

     function handleSubmit(e) {
    
	   if(amoun===""){
		   alert("please enter amount");
	   }
	   else if(accoun===""){
		   alert("please enter your account number before deposit")
	   }
	   else if(agen===""){
		alert("please enter your agent name")
	}
	   else{
      //insert accountnumber
	  alert("You have successfully made deposit")
      const {accountnumber} = e.target.elements
     const account= {accountnumber:accountnumber.value};
      const inputaccountnumber=account.accountnumber;
     //insert amount to deposit
     const {amount} = e.target.elements
     const amo= {amount:amount.value};
     const inputamount=amo.amount;
    
	 const {agentname} = e.target.elements
     const agentn= {agentname:agentname.value};
     const inputagent=agentn.agentname;
      var raw = JSON.stringify({
         "accountnumber":inputaccountnumber,
         "amount":inputamount,
          "agentname":inputagent
       });
       var requestOptions = {
         method: 'POST',
         headers: myHeaders,
         body: raw,
         redirect: 'follow'
       };
      
     fetch("/agentdeposit/agentdeposit", requestOptions)
     .then(response => response.text())
     .then(result => console.log(result))
     .catch(error => console.log('error', error));
    
     e.target.reset();
     }
	}
return(
	<div>


 <Header/><button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#collapseExample" style={{background:"black"}} onClick={OpenSidebar} >
                    <span className="sr-only" style={{color:"yellowgreen"}}>Toggle navigation</span>
                    <span className="icon-bar" ></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
				{show? <AgentSidebar/>:null}
        
				{show && isTabletOrMobile ?"" :<div id="page-wrapper" className="gray-bg dashbard-1">
       <div className="content-main" style={{background:"white"}}>
 
  			
		    <div className="banner">
		   
				<h2>
				<Switch><React.Fragment><Link to="/dashboard">Home</Link></React.Fragment></Switch>
				<i className="fa fa-angle-right"></i>
				<span>Make A Deposit</span>
				</h2>

				
	
		    </div>
		
            <div className="panel-body">


			<form  className="form-horizontal" onSubmit={SearchSubmit}>
     


	 <div className="form-group">
		 
					 
	 <label className="col-md-2 control-label" id="lab"></label>
	 <div className="col-md-8">
	   <div className="input-group" style={{height:"10px"}}>							
		 <input type="text" className="form-control1" placeholder=" Search Account Number with username" id="searchusername" name="username" onChange={userHandler} />
		 </div>
		 <div style={{color:"red"}}>{useErr?<span id="error">username should be 5 or more characters</span>:null}</div>
	   </div>
   
	   </div>
	  
	   </form>

		<div id="spinner">{!data ?<Spinner animation="grow" /> : data.map(num=>(<h2 key={num._id} >Account Number : {num.accountnumber}</h2>))}</div>
					<form  className="form-horizontal" onSubmit={handleSubmit}>




					<div className="form-group">
							<label className="col-md-2 control-label" id="lab">Agent Name</label>
							<div className="col-md-8">
								<div className="input-group">							
									<span className="input-group-addon" id="checkin">
										<i className="fa fa-envelope-o"></i>
									</span>
									<input  type="text" className="form-control1" placeholder="Agent Name" id="agentname" 
									 onChange={checkAgent}/>
								


								
								
								</div>
							</div>
						</div>





						<div className="form-group">
							<label className="col-md-2 control-label" id="lab">Account Number</label>
							<div className="col-md-8">
								<div className="input-group">							
									<span className="input-group-addon" id="checkin">
										<i className="fa fa-envelope-o"></i>
									</span>
									<input type="text" className="accoun" placeholder="Account Number" id="accountnumber" 
									 onChange={checkAccount}/>
								


								
								
								</div>
							</div>
						</div>
                      
						<div className="form-group">
							<label className="col-md-2 control-label" id="lab">Amount </label>
							<div className="col-md-8">
								<div className="input-group input-icon right">
									<span className="input-group-addon" id="checkin">
										<i className="fa fa-envelope-o"></i>
									</span>
									<input type="number"  className="form-control1"   id="amount" placeholder="Amount to Deposit" onChange={checkAmount} step="0.01"/>
								</div>
							</div>
							
						</div>
				<button className="btn-primary btn" value="Make Deposit" >Make Deposit</button>
					</form>
	</div>
	
	
  
		


		
		

		</div>
	
       </div>
}

</div>
);

}
export default AgentMakeDeposit;