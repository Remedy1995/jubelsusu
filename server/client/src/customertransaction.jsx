
import React,{useState}  from "react";
import './app.css';
import {useParams} from 'react-router-dom';
import {Switch,Link} from 'react-router-dom';
import CustomerSidebar from "./customersidebar";
import CustomerHeader from "./customerheader";
import { useMediaQuery } from 'react-responsive'
// import Swal from 'sweetalert';
function AllCustomerTransactions(){
  const [show,setShow]=useState(true);
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 738px)' })

	
	function OpenSidebar(){
		setShow(!show)
		
	  }
  // function check(){
  //   Swal({
  //     title: "Are you sure?",
  //     text: "Once deleted, you will not be able to recover this imaginary file!",
  //     icon: "warning",
  //     buttons: true,
  //     dangerMode: true,
  //   })
  //   .then((willDelete) => {
  //     if (willDelete) {
  //       Swal("Poof! Your imaginary file has been deleted!", {
  //         icon: "success",

        
  //       });
  //       window.location = "/delete";
  //     } else {
  //       Swal("Your imaginary file is safe!");
  //     }
  //   });
  // };


  const [data, setData] = React.useState(null);
 
  React.useEffect(() => {
    fetch('/customertransaction/customertransaction')
      .then((res) => res.json()).then((data) => setData(data))
  }, []);
  //  var name=!data?"":data.map(num=>(num.firstname));
  //  var password=!data?"":data.map(num=>(num.password));
  
  

  const {id} = useParams();
 


  // var requestOptions = {
  //   method: 'GET',
  //   redirect: 'follow'
  // };
  
  // fetch(`delete/delete${id}`, requestOptions)
  //   .then(response => response.text())
  //   .then(result => console.log(result))
  //   .catch(error => console.log('error', error));













  
    
 console.log(id)
return (

    <div>
   
 <CustomerHeader/>
 <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#collapseExample" style={{background:"black"}} onClick={OpenSidebar} >
                    <span className="sr-only" style={{color:"yellowgreen"}}>Toggle navigation</span>
                    <span className="icon-bar" ></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
		{show?<CustomerSidebar/>:null}
        
    {show && isTabletOrMobile ?"" :   <div id="page-wrapper" className="gray-bg dashbard-1">
       <div className="content-main" style={{background:"white"}}>
       
  			
		    <div className="banner">
		   
				<h2>
                    <p></p>
                    <Switch><React.Fragment><Link to="/dashboard">Home</Link></React.Fragment></Switch>
				<i className="fa fa-angle-right"></i>
				<span>All Transactions</span>
				</h2>
		    </div>
            <div>
            <table className="table">
  <thead>
    <tr className="details">
      
      
      <th className="tranuser" ></th>
      <th className="tranamo">Amount</th>
      <th className="trandate">Date</th>
      <th className="transaction">Transaction History</th>
      
    </tr>
  </thead>        
  <tbody>
    
   {data ?data.map(num=>(<tr  style={{border:"1px solid #ddd"}} key={num._id}><td key={num.id}>{num.username}</td><td style={{fontWeight:"bolder"}}>GHC{num.amount}</td><td>{num.date}</td><td>{num.transactiondetails}</td>
     {/* <button className="btn-primary btn" id="btn-a" ><Switch><Link  className=" hvr-bounce-to-right"  to={{
                    pathname: `/edit${num._id}`,
                    state: num
                }}><i>delete</i></Link></Switch></button> */}
                <td> </td></tr>)):null} 
  </tbody>
</table>
	          	</div>	
	</div>
	
	
  
		
		
{/* <Footer/> */}
		</div>
}
		<div className="clearfix"> </div>
       </div>
    


);

}



export default AllCustomerTransactions;