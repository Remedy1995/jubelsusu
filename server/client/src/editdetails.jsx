import React, { useState }  from "react";
// import swal from 'sweetalert';
import './app.css';
import Sidebar from "./sidebar";
import {useParams} from 'react-router-dom';
import AdminHeader from "./adminheader";
import { useMediaQuery } from 'react-responsive'
function EditDetails(){
	const [show,setShow]=useState(true);
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 738px)' })

	
	function OpenSidebar(){
		setShow(!show)
		
	  }
	const {id} = useParams();
	const [usern,setUser]=useState("");
	const [useErr,setUserErr]=useState(false);
	const [acc,setAcc]=useState("");
	const [accErr,setAccErr]=useState(false);
	const [first,setfirst]=useState("");
	const [firstErr,setFirErr]=useState(false);
	const [dat,setdat]=useState("");
	const [datErr,setdatErr]=useState(false);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
         
	function dateHandler(e){
		let item=e.target.value;
		if(item.length<4){
			setdatErr(true)
		}else{
			setdatErr(false)
		}
		setdat(item)
	}


	    function userHandler(e){
		let item=e.target.value;
		if(item.length<4){
			setUserErr(true)
		}else{
			setUserErr(false)
		}
		setUser(item)
	}
	function firstHandler(e){
		let item=e.target.value;
		if(item.length<4){
			setFirErr(true)
		}else{
			setFirErr(false)
		}
		setfirst(item)
	}


	function accHandler(e){
		let item=e.target.value;
		if(item.length<1){
			setAccErr(true)
		}else{
			setAccErr(false)
		}
		setAcc(item)
	}
    function handleSubmit(e) {
    if(usern.length<1||first.length<1||acc.length<1||dat.length<1){
		alert("please fill all spaces required");
	}
 else{
      e.preventDefault()
      //insert username
      const {username} = e.target.elements
     const user= {username:username.value};
     const inputusername=user.username;
    //insert amount to deposit
    const {lastname} = e.target.elements
    const last= {lastname:lastname.value};
    const inputlastname=last.lastname;
     //insert date
     const {date} = e.target.elements
     const da= {date:date.value};
     const inputdate=da.date;
	 //insert firstname
	 const {firstname} = e.target.elements
     const firstn= {firstname:firstname.value};
     const inputfirstname=firstn.firstname;
	 //insert email address
	 const {email} = e.target.elements
     const emai= {email:email.value};
     const inputemail=emai.email;
	 //insert phone
	 const {phone} = e.target.elements
     const phon= {phone:phone.value};
     const inputphone=phon.phone;
      var raw = JSON.stringify({
        "username":inputusername,
		"firstname":inputfirstname,
		"lastname":inputlastname,
		 "email":inputemail,
        "phone":inputphone,
        "date":inputdate
      
      });
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
    fetch(`edit/edit${id}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    
    e.target.reset();
	// swal("Withdrawal!", "You have successfully made withdrawal!", "success");
 }

    }
return(
	<div>


 <AdminHeader/>
 <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#collapseExample" style={{background:"black"}} onClick={OpenSidebar} >
                    <span className="sr-only" style={{color:"yellowgreen"}}>Toggle navigation</span>
                    <span className="icon-bar" ></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
				{show? <Sidebar/>:null}
        
				{show && isTabletOrMobile ?"" :  <div id="page-wrapper" className="gray-bg dashbard-1">
       <div className="content-main" style={{background:"white"}}>
 
  			
		    <div className="banner">
		   
				<h2>
			
				<i className="fa fa-angle-right"></i>
				<span>Edit Customer Details</span>
				</h2>
		    </div>
		
            <div className="panel-body">
					<form  className="form-horizontal" onSubmit={handleSubmit}>
						<div className="form-group">
							<label className="col-md-2 control-label" id="lab">User Name</label>
							<div className="col-md-8">
								<div className="input-group">							
									<span className="input-group-addon" id="checkin">
										<i className="fa fa-envelope-o"></i>
									</span>
									<input  style={{position:"relative",top:"40px",left:"-30px"}} type="text" className="form-control1" placeholder="User Name" id="username" onChange={userHandler}/>
								</div>
								<div style={{color:"red",position:"relative",top:"30px"}}>{useErr?"username should be more than 5 letters":null}</div>
							</div>
						</div>
                        <div className="form-group">
							<label className="col-md-2 control-label" id="lab">First Name</label>
							<div className="col-md-8">
								<div className="input-group">							
									<span className="input-group-addon" id="checkin">
										<i className="fa fa-envelope-o"></i>
									</span>
									<input type="text" className="form-control1" placeholder="First Name" id="firstname" name="firstname" onChange={firstHandler}/>
								</div>
								<div style={{color:"red",position:"relative",top:"30px"}}>{firstErr?"firstname should be more than 5 letters":null}</div>
							</div>
						</div>
						<div className="form-group">
							<label className="col-md-2 control-label" id="lab">Last Name </label>
							<div className="col-md-8">
								<div className="input-group input-icon right">
									<span className="input-group-addon" id="checkin">
										<i className="fa fa-envelope-o"></i>
									</span>
									<input type="text"  className="form-control1"   id="lastname" placeholder="Lastname" name="lastname" onChange={accHandler}/>
								</div>
								<div style={{color:"red",position:"relative",top:"30px"}}>{accErr?"Enter Amount":null}</div>
							</div>
							
						</div>
						<div className="form-group">
							<label className="col-md-2 control-label" id="lab">Email Address</label>
							<div className="col-md-8">
								<div className="input-group input-icon right">
									<span className="input-group-addon" id="checkin">
										<i className="fa fa-key"></i>
									</span>
									<input type="email"  className="form-control1"  id="email" placeholder="email" onChange={dateHandler} />
								</div>
								<div style={{color:"red",position:"relative",top:"30px"}}>{datErr?"input email address":null}</div>
							</div>
							
						</div>
						<div className="form-group">
							<label className="col-md-2 control-label" id="lab">Phone</label>
							<div className="col-md-8">
								<div className="input-group input-icon right">
									<span className="input-group-addon" id="checkin">
										<i className="fa fa-key"></i>
									</span>
									<input type="number"  className="form-control1"  id="phone" placeholder="phone" onChange={dateHandler} />
								</div>
								<div style={{color:"red",position:"relative",top:"30px"}}>{datErr?"input phone":null}</div>
							</div>
							
						</div>
						
                        <div className="form-group">
							<label className="col-md-2 control-label" id="lab"> Date Of Birth</label>
							<div className="col-md-8">
								<div className="input-group input-icon right">
									<span className="input-group-addon" id="checkin">
										<i className="fa fa-key"></i>
									</span>
									<input type="date"  className="form-control1"  id="date" onChange={dateHandler} />
								</div>
								<div style={{color:"red",position:"relative",top:"30px"}}>{datErr?"Select date":null}</div>
							</div>
							
						</div>
				<button className="btn-primary btn" value="Edit Customer Details" >Edit Customer Details</button>
					</form>
	</div>
	
	
  
		


		
		

		</div>
	
       </div>
    
}
</div>
);
}
export default EditDetails;