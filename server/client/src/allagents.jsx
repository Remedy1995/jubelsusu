
import React, { useState }  from "react";
import './app.css';
import Sidebar from "./sidebar";
import { useParams} from 'react-router-dom';
import {Switch,Link} from 'react-router-dom';
import AdminHeader from "./adminheader";

import Swal from 'sweetalert';
 function AllAgents(){
  // const history = useHistory();
  const [username,setusername]=useState("");

function userHandler(e){
  setusername(e.target.value)
}




  function check(){
    Swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        Swal("Poof! You have successfully deleted the user!", {
          icon: "success",

        
        });
        window.location = "/allagents";
      } else {
        Swal("Your imaginary file is safe!");
      }
    });
  };


  const [data, setData] = React.useState(null);
  const [data1, setData1] = React.useState(null);
  React.useEffect(() => {
    fetch("/allsusuagents/allsusuagents")
      .then((res) => res.json()).then((data) => setData(data))
  }, []);
  const {id} = useParams();
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
   fetch(`/agentdelete/agentdelete${id}`, requestOptions)
  .then(res=>{
    if(res.status===200){
      console.log("okay done")
     
    }
    else{
     console.log("error")
    }
    })


    function handleSubmit(e){
  
      e.preventDefault();
  
      if(username.length<1){
        alert("insert")
      }else{
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const {username} = e.target.elements
    const user= {username:username.value};
    const inputusername=user.username;
      var raw = JSON.stringify({
        "username": inputusername
      });
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      fetch("/agentsearch/agentsearch", requestOptions)
      .then((res) => res.json()).then((data1) => setData1(data1))
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
  }  


  
 console.log(id)
return (

    <div>
   
 <AdminHeader/>
		 <Sidebar/>
        
        <div id="page-wrapper" className="gray-bg dashbard-1">
       <div className="content-main" style={{background:"white"}}>
       
  			
		    <div className="banner">
		   
				<h2>
                    <p></p>
                 <Switch><React.Fragment><Link to="/dashboard">Home</Link></React.Fragment></Switch>
				<i className="fa fa-angle-right"></i>
				<span>All Customers</span>
				</h2>
		    </div>
            <div>
          
            <div className="col-md-8">
          
            <form  className="form-horizontal" onSubmit={handleSubmit}>
        <div className="input-group" style={{height:"10px"}}>							
        <input type="text" className="form-control1" placeholder=" Search username" id="username1" name="username" onChange={userHandler} />
        </div>
    </form>
      </div>


            <table className="table">
  <thead>

    <tr className="details">
      
      <th  className="adminfirstname">Firstname</th>
      <th className="adminlastname" >Lastname</th>
      <th className="adminusername" >Username</th>
      <th className="adminedit">Edit</th>
      <th className="adminview">View</th>
      <th className="admindelete">Delete</th>
      <th className="adminupload">Upload ID</th>
    </tr>
  </thead>  
    
  <tbody >
    
   
  {!data1?"":data1.map(num=>(<tr key={num._id} style={{background:"burlywood"}}><td key={num._id} className="smallinfo">{num.firstname}</td><td key={num.id} className="smallinfo">{num.lastname}</td><td key={num.id} className="smallinfo">{num.username}</td><td key={num.id} className="smallinfo"><button className="btn-primary btn" id="btn-c" ><Switch><React.Fragment><Link  className=" hvr-bounce-to-right"  to={{
                    pathname: `/agentedit${num._id}`,
                    state: num
                }}><i>Edit</i></Link></React.Fragment></Switch></button></td><td key={num.id}> <button className="btn-primary btn" id="btn-c" ><Switch><React.Fragment><Link  className=" hvr-bounce-to-right"  to={{
                  pathname: `/agentview${num._id}`,
                  state: num
              }}><i>View</i></Link></React.Fragment></Switch></button></td>
                <td key={num.id}> <button className="btn-primary btn" id="btn-c" onClick={check} ><Switch><React.Fragment><Link  className=" hvr-bounce-to-right"  to={{
                    pathname: `/agentdelete${num._id}`,
                    state: num
                }}><i>Delete</i></Link></React.Fragment></Switch></button>
         
                </td> <td key={num.id}> <button className="btn-primary btn" id="btn-c"><Switch><React.Fragment><Link  className=" hvr-bounce-to-right"  to={{
                    pathname: `/uploadagentid${num._id}`,
                    state: num
                }}><i>Upload ID</i></Link></React.Fragment></Switch></button>
         
                </td></tr>))}
    
    
    
    
    
    
    
    
    
    
    
    {data?data.map(num=>(<tr key={num._id}><td key={num._id}>{num.firstname}</td><td key={num.id}>{num.lastname}</td><td key={num.id}>{num.username}</td><td key={num.id}><button className="btn-primary btn" id="btn-b" ><Switch><React.Fragment><Link  className=" hvr-bounce-to-right"  to={{
                    pathname: `/agentedit${num._id}`,
                    state: num
                }}><i>Edit</i></Link></React.Fragment></Switch></button></td><td key={num.id}> <button className="btn-primary btn" id="btn-b" ><Switch><React.Fragment><Link  className=" hvr-bounce-to-right"  to={{
                  pathname: `/agentview${num._id}`,
                  state: num
              }}><i>View</i></Link></React.Fragment></Switch></button></td>
                <td key={num.id}> <button className="btn-primary btn" id="btn-b" onClick={check} ><Switch><React.Fragment><Link  className=" hvr-bounce-to-right"  to={{
                    pathname: `/agentdelete${num._id}`,
                    state: num
                }}><i>Delete</i></Link></React.Fragment></Switch></button>
         
                </td> <td key={num.id}> <button className="btn-primary btn" id="btn-b"><Switch><React.Fragment><Link  className=" hvr-bounce-to-right"  to={{
                    pathname: `/uploadagentid${num._id}`,
                    state: num
                }}><i>Upload ID</i></Link></React.Fragment></Switch></button>
         
                </td></tr>)):null}
   
  </tbody>
</table>
	          	</div>	
	</div>
		</div>
		<div className="clearfix"> </div>
       </div>
);

}



export default AllAgents;