/* eslint-disable react/jsx-no-target-blank */
import React ,{useState} from "react";
import './app.css';
import Sidebar from "./sidebar";
import {useParams} from 'react-router-dom';
import {Link,Switch} from 'react-router-dom';
import AdminHeader from "./adminheader";
import { useMediaQuery } from 'react-responsive'

function AgentView(){
	const {id} = useParams();
	
    
    const [data, setData] = React.useState(null);
	const [show,setShow]=useState(true);
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 738px)' })

	
	function OpenSidebar(){
		setShow(!show)
		
	  }

  var myHeaders = new Headers();
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch('agentview/agentview'+id, requestOptions)
  .then((res) => res.json()).then((data) => setData(data))
  
  var firstname=!data?"":data.firstname;
  var lastname=!data?"":data.lastname;
  var username=!data?"":data.username;
  var dob=!data?"":data.date;
  var email=!data?"":data.email;
  var phone=!data?"":data.phone;
  var image=!data?"":data.file;
  var downloadlink=!data?"":data.file_url;
  var downloadlink1=!data?"":data.file1_url;










return(
	<div>


 <AdminHeader/><button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#collapseExample"  onClick={OpenSidebar} >
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
			
				<i className="fa fa-angle-right"></i>
                <Switch><React.Fragment><Link to="/dashboard">Home</Link></React.Fragment></Switch>
				<span>View Customer Details</span>
				</h2>
		    </div>
		
            <div className="panel-body">
			
		 <div id="page-wrapper" className="gray-bg dashbard-1">
		<div className="profile-bottom">
			<h3><i className="fa fa-user"></i>Profile</h3>
			<div className="profile-bottom-top">
			<div className="col-md-4 profile-bottom-img">
				<img src={image} className="pro" alt=""/>
			</div>
			<div className="col-md-8 profile-text">
				<h6>{firstname} {lastname}</h6>
				<table>
				<tr><td>Email</td>  
				<td>:</td>  
				<td>{email}</td></tr>
				
				<tr>
				<td>Phone</td>
				<td> :</td>
				<td>{phone}</td>
				</tr>
				<tr>
				<td>Date Of Birth</td>
				<td> :</td>
				<td>{dob}</td>
				</tr>
				<tr>
				<td>Username</td>
				<td>:</td>
				<td style={{fontWeight:"bolder"}}>{username}</td>
				</tr>
				</table>
			</div>
			<div className="clearfix"></div>
			</div>
			<div className="profile-bottom-bottom">
			<div className="col-md-4 profile-fo">
				
			<Switch><React.Fragment><a href={downloadlink1} color="transparent"
      target="_blank"
      download>Download ID Card</a></React.Fragment></Switch>
			</div>
			<div className="col-md-4 profile-fo">
				
				<Switch><React.Fragment><a href={downloadlink} color="transparent"
      target="_blank"
      download>Download Image</a></React.Fragment></Switch>
			</div>
			
			<div className="clearfix"></div>
			</div>
			<div className="profile-btn">

            
           <div className="clearfix"></div>
			</div>
			 
			
		</div>
    </div>
    </div>
    </div>
				
    </div>
}
    </div>

    
);
}
export default AgentView;