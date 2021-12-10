import React, { useState }  from "react";
import './app.css';
// import Footer from "./footer";
import Header from "./header";
import na from './images/na.jpg';
import Slider from './slider';
import { useMediaQuery } from 'react-responsive'
import AgentSidebar from "./agentsidebar";
 function  AgentDashboard(){
	const [show,setShow]=useState(true);
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 738px)' })
	function OpenSidebar(){
		setShow(!show)
		
	  }
	const [data,setdata]=useState(null);
	const [total,settotal]=useState(null);
	const [deposit,setdeposit]=useState(null);
	React.useEffect( () => {
	 fetch("/getusername/getusername").then((res) => res.json()).then((data) => setdata(data))}, []);
	   
	 console.log(!data?"":data)
	   
	 var username=!data?"":data;

	 React.useEffect(() => {
		fetch("/countallagentcustomers/countallagentcustomers")
		  .then((res) => res.json()).then((total) => settotal(total))
	  }, []);
	   var totalcustomer=!total?"":total;
	
	//record all agent deposit made
	
	React.useEffect(() => {
		fetch("/countagentdeposit/countagentdeposit")
		  .then((res) => res.json()).then((deposit) => setdeposit(deposit))
	  }, []);

	  var totaldeposit=!deposit?"":deposit;

return(
	<div>
<div id="wrapper">

 <Header/>
 <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#collapseExample"  onClick={OpenSidebar} >
                    <span className="sr-only" style={{color:"yellowgreen"}}>Toggle navigation</span>
                    <span className="icon-bar" ></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
		{show?<AgentSidebar/>:null}
        
		{show && isTabletOrMobile ?"" : <div id="page-wrapper" className="gray-bg dashbard-1">
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
					<h5> Customers</h5>
					<label style={{color:"white"}}>{totalcustomer}</label>
				</div>
				<div className="col-md-6 top-content1">	   
					<div id="demo-pie-1" className="pie-title-center" data-percent="25"> <span className="pie-value"></span> </div>
				</div>
				 <div className="clearfix"> </div>
				</div>
				<div className="content-top-2">
				<div className="col-md-6 top-content">
					<h5  > Deposits</h5>
					<label style={{color:"white"}} >GHC{totaldeposit}</label>
				</div>
				<div className="col-md-6 top-content1">	   
					<div id="demo-pie-2" className="pie-title-center" data-percent="50"> <span className="pie-value"></span> </div>
				</div>
				 <div className="clearfix"> </div>
				</div>
				<div className="content-top-3">
				<div className="col-md-6 top-content">
					<h5>Commissions</h5>
					<label style={{color:"white"}}></label>
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
 }
     </div>
 
</div>
);
}
export default AgentDashboard;