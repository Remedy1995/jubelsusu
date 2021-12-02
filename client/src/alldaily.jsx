
import React,{useState}  from "react";
import './app.css';
import Sidebar from "./sidebar";
import {Switch,Link} from 'react-router-dom';
import AdminHeader from "./adminheader";
import { useMediaQuery } from 'react-responsive'

function AllDaily(){
  const [data, setData] = React.useState(null);
  const [data1, setData1] = React.useState(null);
  const [fullname,setfullname]=useState("");
  const [show,setShow]=useState(true);
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 738px)' })

	
	function OpenSidebar(){
		setShow(!show)
		
	  }
  function userHandler(e){
    setfullname(e.target.value)
  }
  
  React.useEffect(() => {
    fetch("/alldaily/alldaily")
      .then((res) => res.json()).then((data) => setData(data))
  }, []);
  

    
  function handleSubmit(e){
  
    e.preventDefault();

    if(fullname.length<1){
      alert("search fullname")
    }else{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const {fullname} = e.target.elements
  const full= {fullname:fullname.value};
  const inputfullname=full.fullname;
    var raw = JSON.stringify({
      "fullname": inputfullname
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("/uploadtransactionsearch/uploadtransactionsearch", requestOptions)
    .then((res) => res.json()).then((data1) => setData1(data1))
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
}  


return (

    <div>
   
 <AdminHeader/>
 <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#collapseExample" style={{background:"black"}} onClick={OpenSidebar} >
                    <span className="sr-only" style={{color:"yellowgreen"}}>Toggle navigation</span>
                    <span className="icon-bar" ></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                {show?<Sidebar/>:null}
        
                {show && isTabletOrMobile ?"" :    <div id="page-wrapper" className="gray-bg dashbard-1">
       <div className="content-main" style={{background:"white"}}>
       
  			
		    <div className="banner">
		   
				<h2>
                    <p></p>
                    <Switch><React.Fragment><Link to="/dashboard">Home</Link></React.Fragment></Switch>
				<i className="fa fa-angle-right"></i>
				<span>All Uploaded Transactions</span>
				</h2>
		    </div>
            <div>

            <div className="input-group" style={{height:"10px"}}>	
            <form  className="form-horizontal" onSubmit={handleSubmit}>						
        <input type="text" className="searchfullname" placeholder=" Search Fullname" id="fullname" name="fullname" onChange={userHandler}  />
        </form>
        </div>
            <table className="table">
  <thead>
    <tr className="details">
    {!data ? "" :(<div>
      <th className="trans">Transaction Date<span className="file">File</span>
     <span className="FullName"> Fullname</span></th>
     </div>)
}
    </tr>
  </thead>        
  <tbody>
    
   <tr className="details1"><td>
     
     
   {!data1 ? "" : data1.map(num=>(<tr style={{border:"1px solid #ddd",background:"burlywood"}}><td>{num.date}</td><td>{num.lastname}</td><td>
     
   <Switch><React.Fragment><Link to={num.image} color="transparent"
      target="_blank"
      download><img src={num.image} height="50" width="50" alt=""></img>
      </Link></React.Fragment></Switch>
     </td>
   <td>
   {num.fullname}</td>
                <td>  <td>
            {

 } </td></td></tr>))}
     
     {!data ? "Loading..." : data.map(num=>(<tr style={{border:"1px solid #ddd"}}><td>{num.date}</td><td>{num.lastname}</td><td> <Switch><React.Fragment><Link to={num.image} color="transparent"
      target="_blank"
      download><img src={num.image} height="50" width="50" alt=""></img>
      </Link></React.Fragment></Switch></td>
   <td>
   {num.fullname}</td>
                <td>  <td>
            {

 } </td></td></tr>))}</td>
   
   </tr>
   
   
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



export default AllDaily;