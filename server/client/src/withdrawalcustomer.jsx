import React, { useState }  from "react";
import swal from 'sweetalert';
import AdminHeader from "./adminheader";
import './app.css';
import Sidebar from "./sidebar";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {faFacebook} from "@fortawesome/free-brands-svg-icons";
function MakeWithdrawal(){
	const [usern,setUser]=useState("");
	const [acc,setAcc]=useState("");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
         
	



	

	    function userHandler(e){
	     setUser(e.target.value)
	}


	function accHandler(e){
		setAcc(e.target.value)
	}
    function handleSubmit(e) {
   if(usern===""){
	   alert("please enter the account number")
   }
   else if(acc===""){
	   alert("please enter the amount")
   }
 else{
    
      //insert username
      const {accountnumber} = e.target.elements
     const account= {accountnumber:accountnumber.value};
     const inputaccountnumber=account.accountnumber;
    //insert amount to deposit
    const {amount} = e.target.elements
    const amo= {amount:amount.value};
    const inputamount=amo.amount;
   
	
      var raw = JSON.stringify({
        "accountnumber":inputaccountnumber,
        "amount":inputamount,
        

      });
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
    fetch("/makewithdrawal/makewithdrawal", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    
    e.target.reset();
	swal("Withdrawal!", "You have successfully made withdrawal!", "success");
 }

    }
return(
	<div>


 <AdminHeader/>
		 <Sidebar/>
        
        <div id="page-wrapper" className="gray-bg dashbard-1">
       <div className="content-main" style={{background:"white"}}>
 
  			
		    <div className="banner">
		   
				<h2>
				<a href="index.html">Home</a>
				<i className="fa fa-angle-right"></i>
				<span>Make A Withdrawal</span>
				</h2>
		    </div>
		
            <div className="panel-body">
					<form  className="form-horizontal" onSubmit={handleSubmit}>
						<div className="form-group">
							<label className="col-md-2 control-label" id="lab">Account Number</label>
							<div className="col-md-8">
								<div className="input-group">							
									<span className="input-group-addon" id="checkin">
										<i className="fa fa-envelope-o"></i>
									</span>
									<input type="text" className="accoun" placeholder="Account Number" id="accountnumber" onChange={userHandler}/>
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
									<input type="number"  className="form-control1"   id="amount" placeholder="Amount to Withdraw" name="amount" onChange={accHandler} step="0.01"/>
								</div>
							
							</div>
							
						</div>
				<button className="btn-primary btn" value="Make Withdrawal" >Make Withdrawal</button>
					</form>
	</div>
	
	
  
		


		
		

		</div>
	
       </div>
    

</div>
);
}
export default MakeWithdrawal;