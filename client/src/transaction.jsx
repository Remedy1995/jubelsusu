
import React ,{useState} from "react";
import './app.css';
import Sidebar from "./sidebar";
import {useParams} from 'react-router-dom';
import {Switch,Link} from 'react-router-dom';
import AdminHeader from "./adminheader";
import { useMediaQuery } from 'react-responsive'
// import Swal from 'sweetalert';
function AllTransactions(){
  const [show,setShow]=useState(true);
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 738px)' })

	
	function OpenSidebar(){
		setShow(!show)
		
	  }
  const [accountnumber,setaccountnumber]=useState("");
  const [data, setData] = React.useState(null);
  const [data1, setData1] = React.useState(null);
  function userHandler(e){
    setaccountnumber(e.target.value)
  }
  

  React.useEffect(() => {
    fetch('/transaction/transaction')
      .then((res) => res.json()).then((data) => setData(data))
  }, []);
  const {id} = useParams();
    
  function handleSubmit(e){
  
    e.preventDefault();

    if(accountnumber.length<1){
      alert("insert")
    }else{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const {accountnumber} = e.target.elements
  const account= {accountnumber:accountnumber.value};
  const inputaccountnumber=account.accountnumber;
    var raw = JSON.stringify({
      "accountnumber": inputaccountnumber
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("/transactionsearch/transactionsearch", requestOptions)
    .then((res) => res.json()).then((data1) => setData1(data1))
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
}  











  
    
 console.log(id)
return (

    <div>
   
 <AdminHeader/>
 <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#collapseExample"  onClick={OpenSidebar} >
                    <span className="sr-only" style={{color:"yellowgreen"}}>Toggle navigation</span>
                    <span className="icon-bar" ></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                {show? <Sidebar/>:null}
                {show && isTabletOrMobile ?"" :<div id="page-wrapper" className="gray-bg dashbard-1">
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

            <div className="col-md-8">
          
          <form  className="form-horizontal" onSubmit={handleSubmit}>
      <div className="input-group" style={{height:"10px"}}>							
      <input type="text" className="accoun1" placeholder=" Search accountnumber" id="accountnumber" name="accountnumber" onChange={userHandler} />
      </div>
  </form>
    </div>
          
            <table className="table">
  <thead>
    <tr className="details">
      
      
      <th className="tranuser1" >Acc.No</th>
      <th className="tranamo">Amount</th>
      <th className="trandate1">Date</th>
      <th className="transaction1">Transaction History</th>
      
    </tr>
  </thead>        
  <tbody>
        
   {!data1?"":data1.map(num=>(<tr  style={{border:"1px solid #ddd",background:"burlywood"}} key={num._id}><td key={num.id}>{num.accountnumber}</td><td style={{fontWeight:"bolder"}}>GHC{num.amount}</td><td>{num.date}</td><td>{num.transactiondetails}</td>
                <td> </td></tr>))} 
   {data ?data.map(num=>(<tr  style={{border:"1px solid #ddd"}} key={num._id}><td key={num.id}>{num.accountnumber}</td><td style={{fontWeight:"bolder"}}>GHC{num.amount}</td><td>{num.date}</td><td>{num.transactiondetails}</td>
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



export default AllTransactions;