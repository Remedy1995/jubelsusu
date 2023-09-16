import React,{useState}  from "react";
import './app.css';
import Sidebar from "./sidebar";
import { Switch,Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
import AdminHeader from "./adminheader";

function ResetUserPassword(){
	const [show,setShow]=useState(true);
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 738px)' })
	function OpenSidebar(){
		setShow(!show)
		
	  }
  
	
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    function handleSubmit(e) {
      e.preventDefault()
      //insert old password
     const {password} = e.target.elements
     const pass= {password:password.value};
     const passw=pass.password;
     //insert new password
     const {username} = e.target.elements
     const user= {username:username.value};
     const usern=user.username;

      var raw = JSON.stringify({
        "username":usern,
        "password":passw,
		
	
      });
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
    fetch(`resetuserpassword/resetuserpassword`, requestOptions)
	.then(res=>{
		if(res.status===200){
			alert("Great you have sucessfully changed your password")
		}
		else if(res.status===401){
			alert("enter your new password")
		}
		else{
		  alert("The password does not exist please try again");
		}
	  })
    e.target.reset();
    }
return(
	<div>


 <AdminHeader/>
 <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#collapseExample"  onClick={OpenSidebar} >
                    <span className="sr-only" style={{color:"yellowgreen"}}>Toggle navigation</span>
                    <span className="icon-bar" ></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
		{show?<Sidebar/>:null}
        
		{show && isTabletOrMobile ?"" :<div id="page-wrapper" className="gray-bg dashbard-1">
       <div className="content-main" style={{background:"white"}}>
 
  			
		    <div className="banner">
		   
				<h2>
				<Switch><React.Fragment><Link to="/dashboard">Home</Link></React.Fragment></Switch>
				<i className="fa fa-angle-right"></i>
				<span>Reset User Password</span>
				</h2>
		    </div>
		
            <div className="panel-body">
					<form  className="form-horizontal" onSubmit={handleSubmit}>
                           <div className="form-group">
							<label className="col-md-2 control-label" id="lab">Username</label>
							<div className="col-md-8">
								<div className="input-group input-icon right">
									<span className="input-group-addon" id="checkin">
										<i className="fa fa-key"></i>
									</span>
									<input type="text"  className="form-control1" id="username" placeholder="Username"/>
								</div>
							</div>
							
						</div>
                        <div className="form-group">
							<label className="col-md-2 control-label" id="lab">Password</label>
							<div className="col-md-8">
								<div className="input-group input-icon right">
									<span className="input-group-addon" id="checkin">
										<i className="fa fa-key"></i>
									</span>
									<input type="password"  className="form-control1"  id="password" placeholder="password" required/>
								</div>
							</div>
							
						</div>
				<button className="btn-primary btn" value="Reset User Password" >Reset User Password</button>
					</form>
	</div>
	
	
  
		
		
{/* <Footer/> */}
		</div>
		<div className="clearfix"> </div>
       </div>
    
}
</div>
);
}
export default ResetUserPassword;