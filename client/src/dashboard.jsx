import React, { useState }  from "react";
import './app.css';
import na from './images/na.jpg';
import Sidebar from "./sidebar";
import Slider from './slider';
import AdminHeader from "./adminheader";
import { useMediaQuery } from 'react-responsive'
// import OneButton from "./button";
 function  Dashboard(){
	const [data,setdata]=useState(null);
	const [total,settotal]=useState(null);
	const [deposit,totaldeposit]=useState(null);
	const [withdrawal,totalwithdrawal]=useState(null);
	const [commission,setcommission]=useState(null);
    
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 738px)' })


	React.useEffect( () => {
	 fetch("/getusername/getusername").then((res) => res.json()).then((data) => setdata(data))}, []);
	   
	 console.log(!data?"":data)
	   
	 var username=!data?"":data;

	 React.useEffect(() => {
		fetch("/allcommission/allcommission")
		  .then((res) => res.json()).then((commission) => setcommission(commission))
	  }, []);
	   var totalcom=!commission?"":commission.map(num=>(num.totalcommission));
	



	 React.useEffect(() => {
		fetch("/countallcustomers/countallcustomers")
		  .then((res) => res.json()).then((total) => settotal(total))
	  }, []);
	   var totalcustomer=!total?"":total.map(num=>(num.total));
	
	  //get the totaldeposit

	  React.useEffect( () => {
		fetch("/gettotaldeposit/gettotaldeposit").then((res) => res.json()).then((deposit) => totaldeposit(deposit))}, []);
		var totaldep=!deposit?"":deposit.map(num=>(num.total)); 

      console.log(totaldep)

	  //get the total withdrawal
	  React.useEffect( () => {
		fetch("/gettotalwithdrawal/gettotalwithdrawal").then((res) => res.json()).then((withdrawal) => totalwithdrawal(withdrawal))}, []);
		var totalwith=!withdrawal?"":withdrawal.map(num=>(num.total));
		const [show,setShow]=useState(true);
		
		function OpenSidebar(){
			setShow(!show)
			
		  }
return(
	<div>
<div id="wrapper">

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
				
				<i className="fa fa-angle-right"></i>
				<span>Dashboard </span>
				</h2>
				<h4 className="commission">Commissions : GHC{totalcom}</h4>
		    </div>
		
		<div className="content-top">
			
		<h4 className="welcome" style={{color:"blueviolet",marginLeft:"20px",fontFamily:"system-ui"}}>Welcome!!! {username}</h4>
			<div className="col-md-4 ">
				<div className="content-top-1">
				<div className="col-md-6 top-content">
					<h5> Customers</h5>
					<center><label style={{color:"white"}}>{totalcustomer}</label></center>
				</div>
				<div className="col-md-6 top-content1">	   
					<div id="demo-pie-1" className="pie-title-center" data-percent="25"> <span className="pie-value"></span> </div>
				</div>
				 <div className="clearfix"> </div>
				</div>
				<div className="content-top-2">
				<div className="col-md-6 top-content">
					<h5  > Deposits</h5>
				<center><label style={{color:"white"}} >GHC{totaldep}</label></center>
				</div>
				<div className="col-md-6 top-content1">	   
					<div id="demo-pie-2" className="pie-title-center" data-percent="50"> <span className="pie-value"></span> </div>
				</div>
				 <div className="clearfix"> </div>
				</div>
				<div className="content-top-3">
				<div className="col-md-6 top-content">
					<h5>Withdrawals</h5>
					<label style={{color:"white"}}>GHC{totalwith}</label>
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
export default Dashboard;