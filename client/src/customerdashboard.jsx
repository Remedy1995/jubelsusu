import React, { useState }  from "react";
import './app.css';
import na from './images/na.jpg';
import Slider from './slider';
import CustomerSidebar from "./customersidebar";
import CustomerHeader from "./customerheader";
 function  CustomerDashboard(){
	const [data,setdata]=useState(null);
	React.useEffect( () => {
	 fetch("/getusername/getusername").then((res) => res.json()).then((data) => setdata(data))}, []);
	   
	 console.log(!data?"":data)
	   
	 var username=!data?"":data;


return(
	<div>
<div id="wrapper">

 <CustomerHeader/>
		 <CustomerSidebar/>
        
        <div id="page-wrapper" className="gray-bg dashbard-1">
       <div className="content-main" style={{background:"white"}}>
 
  			
		    <div className="banner">
		   
				<h2>
				
				<i className="fa fa-angle-right"></i>
				<span>Dashboard </span>
				</h2>
		    </div>
		
		<div className="content-top">
			
		<h4 className="welcome" style={{color:"blueviolet",marginLeft:"20px",fontFamily:"system-ui"}}>Welcome!!! {username}</h4>
			<div className="col-md-4 ">
				<div className="content-top-1">
				<div className="col-md-6 top-content">
					<h5>Check</h5>
					<label style={{color:"white"}}>Account </label>
				</div>
				<div className="col-md-6 top-content1">	   
					<div id="demo-pie-1" className="pie-title-center" data-percent="25"> <span className="pie-value"></span> </div>
				</div>
				 <div className="clearfix"> </div>
				</div>
				<div className="content-top-a">
				<div className="col-md-6 top-content">
					<h5  >Check</h5>
					<label style={{color:"white"}} >Transactions</label>
				</div>
				<div className="col-md-6 top-content1">	   
					<div id="demo-pie-2" className="pie-title-center" data-percent="50"> <span className="pie-value"></span> </div>
				</div>
				 <div className="clearfix"> </div>
				</div>
				<div className="content-top-b">
				<div className="col-md-6 top-content">
					<h5>Update</h5>
					<label style={{color:"white"}}>Information</label>
				</div>
				<div className="col-md-6 top-content1">	   
					<div id="demo-pie-3" className="pie-title-center" data-percent="75"> <span className="pie-value"></span> </div>
				</div>
				 <div className="clearfix"> </div>
				</div>
			</div>
		
		<div className="clearfix"> </div>
		</div>

	
  
		<div className="content-mid">
			
			<div className="col-md-5">
				
			<div className="card">
  <img src={na} className="card-img-top" alt="dashboard"/>
  <div className="card-body">
    <p className="card-text">Number One App For All Your Financial Needs..</p>
  </div>
</div>
		
			</div>
			<div className="col-md-7 mid-content-top">
				<div className="middle-content">
					
          <Slider/>
		</div>
	
		
			</div>
			<div className="clearfix"> </div>
		</div>
		
{/* <Footer/> */}
		</div>
		<div className="clearfix"> </div>
       </div>
     </div>

</div>
);
}
export default CustomerDashboard;