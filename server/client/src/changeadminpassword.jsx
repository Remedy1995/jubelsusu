import React,{useState}  from "react";
import './app.css';
import Sidebar from "./sidebar";
import { Switch,Link } from "react-router-dom";
import {useParams} from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'
import AdminHeader from "./adminheader";

function ChangeAdminPassword(){
	const [show,setShow]=useState(true);
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 738px)' })
	function OpenSidebar(){
		setShow(!show)
		
	  }
  
	const {id} = useParams();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    function handleSubmit(e) {
      e.preventDefault()
      //insert old password
     const {oldpassword} = e.target.elements
     const old= {oldpassword:oldpassword.value};
     const inputold=old.oldpassword;
     //insert new password
     const {newpassword} = e.target.elements
     const newp= {newpassword:newpassword.value};
     const inputnew=newp.newpassword;

      var raw = JSON.stringify({
        "oldpassword":inputold,
        "newpassword":inputnew,
		
	
      });
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
    fetch(`changeadminpassword/changeadminpassword${id}`, requestOptions)
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
				<span>Change Admin Password</span>
				</h2>
		    </div>
		
            <div className="panel-body">
					<form  className="form-horizontal" onSubmit={handleSubmit}>
                           <div className="form-group">
							<label className="col-md-2 control-label" id="lab">Old Password</label>
							<div className="col-md-8">
								<div className="input-group input-icon right">
									<span className="input-group-addon" id="checkin">
										<i className="fa fa-key"></i>
									</span>
									<input type="password"  className="form-control1" id="oldpassword" placeholder="Password"/>
								</div>
							</div>
							
						</div>
                        <div className="form-group">
							<label className="col-md-2 control-label" id="lab">New Password</label>
							<div className="col-md-8">
								<div className="input-group input-icon right">
									<span className="input-group-addon" id="checkin">
										<i className="fa fa-key"></i>
									</span>
									<input type="password"  className="form-control1"  id="newpassword" placeholder="new password" required/>
								</div>
							</div>
							
						</div>
				<button className="btn-primary btn" value="Change User Password" >Change User Password</button>
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
export default ChangeAdminPassword;