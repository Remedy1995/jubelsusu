import React,{useState}  from "react";
import './app.css';
import Sidebar from "./sidebar";
import {Link,Switch} from 'react-router-dom';
import swal from "sweetalert";
import axios from "axios";
import {useHistory} from 'react-router-dom';
import AdminHeader from "./adminheader";
import { useMediaQuery } from 'react-responsive'
function Registercustomer(){
	let history=useHistory();
	const [file, setFile] = useState();
	const [fileName, setFileName] = useState("");
	const [firstname, setFirstname] = useState("");
	const [username,setUsername]=useState("");
	const [lastname,setLastname]=useState("");
	const [email,setEmail]=useState("");
	const [password,setPassword]=useState("");
	const [date,setDate]=useState("");
	const [phone,setPhone] =useState("");
	const [agentname,setAgentname]=useState("");

	const [show,setShow]=useState(true);
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 738px)' })

	
	function OpenSidebar(){
		setShow(!show)
		
	  }
	const saveFirstname = (e) => {
		e.preventDefault();
		setFirstname(e.target.value);
	
	  };
	
	  const saveLastname = (e) => {
		setLastname(e.target.value);
	
	  };

	  const saveEmail = (e) => {
		setEmail(e.target.value);
	
	  };


	  const savePhone= (e) => {
		setPhone(e.target.value);
	
	  };

	const savePassword = (e) => {
		setPassword(e.target.value);
	
	  };

	  const saveDate = (e) => {
		setDate(e.target.value);
	
	  };

	  const saveAgentname = (e) => {
		setAgentname(e.target.value);
	
	  };

	  const saveUsername = (e) => {
		setUsername(e.target.value);
	
	  };

	const saveFile = (e) => {
	  setFile(e.target.files[0]);
	  setFileName(e.target.files[0].name);
	};
  
	const uploadFile = async (e) => {
	
	  if(fileName===""){
		swal("Upload!", "Please upload your file", "success");
		
	  }
	  else if(firstname===""){
		swal("Upload!", "Please enter your firstname", "success");  
	  }
	  else if(lastname===""){
		swal("Upload!", "Please enter your lastname", "success");  
	  }
	  else if(username===""){
		swal("Upload!", "Please enter your username", "success");
	  }
	  else if(date===""){
		swal("Upload!", "Please enter your date of birth", "success"); 
	  }
	 else if(password===""){
		swal("Upload!", "Please enter your password", "success");  
	  }
	  else if(agentname===""){
		swal("Upload!", "Please select agent name", "success"); 

	  }
	 else if(email===""){
		swal("Upload!", "Please enter your email", "success"); 
	  }
	 else if(phone===""){
		swal("Upload!", "Please enter your phone number", "success"); 
	  }
	  else{
		setFirstname("");
		swal("Upload!", "You have successfully registered a customer", "success").then(function() {
			history.push("/register")
		});
	  const formData = new FormData();
	  formData.append("file", file);
	  formData.append("agentname",agentname);
	  formData.append("firstname",firstname);
	  formData.append("lastname",lastname);
	  formData.append("username",username);
	  formData.append("date",date);
	  formData.append("email",email);
	  formData.append("phone",phone);
	  formData.append("fileName", fileName);
	  formData.append("password",password);
	  const res=await axios.post(
		  "http://jubelsusu.herokuapp.com/createuser/user",
		  formData)
		  console.log(res)
	
	  }
	 
	}
//let get the current username
const [data,setdata]=useState(null);
	React.useEffect( () => {
	 fetch("/getusername/getusername").then((res) => res.json()).then((data) => setdata(data))}, []);
	   
	 console.log(!data?"":data)
	   
	 var agentdata=!data?"":data;

return(
	<div>


 <AdminHeader/>
 <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#collapseExample" style={{background:"black"}} onClick={OpenSidebar} >
                    <span className="sr-only" style={{color:"yellowgreen"}}>Toggle navigation</span>
                    <span className="icon-bar" ></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
				{show?<Sidebar/>:null}
        
		 {show && isTabletOrMobile ?"" :   <div id="page-wrapper" className="gray-bg dashbard-1">
       <div className="content-main" style={{background:"white"}}>
 
  			
		    <div className="banner">
		   
				<h2>
				<Switch><React.Fragment><Link to="/dashboard">Home</Link></React.Fragment></Switch>
				<i className="fa fa-angle-right"></i>
				<span>Create New Customer Account</span>
				</h2>
		    </div>
		
            <div className="panel-body">
					<form  className="form-horizontal">

					


					<div className="form-group">
							<label className="col-md-2 control-label" id="lab">Agent Name</label>
							<div className="col-md-8">
								<div className="input-group">							
									
					<div id="choose">	
             <select class="form-control" id="agentnam" onChange={saveAgentname}>
                 <option selected>Choose Agent Name</option>
                <option value={agentdata}>{agentdata}</option>
      </select></div>
								</div>
							</div>
						</div>






						<div className="form-group">
							<label className="col-md-2 control-label" id="lab">First Name</label>
							<div className="col-md-8">
								<div className="input-group">							
									<span className="input-group-addon" id="checkin">
										<i className="fa fa-envelope-o"></i>
									</span>
									<input type="text" className="form-control1" placeholder="First Name" id="firstname" name="firstname" onChange={saveFirstname} />
								</div>
							</div>
						</div>

						<div className="form-group">
							<label className="col-md-2 control-label" id="lab">Last Name</label>
							<div className="col-md-8">
								<div className="input-group">
									<span className="input-group-addon" id="checkin">
										<i className="fa fa-key"></i>
									</span>
									<input type="text" className="form-control1" id="lastname" name="lastname" placeholder="Last Name" onChange={saveLastname}/>
								</div>
							</div>
						</div>
						<div className="form-group">
							<label className="col-md-2 control-label" id="lab">User Name</label>
							<div className="col-md-8">
								<div className="input-group">							
									<span className="input-group-addon" id="checkin">
										<i className="fa fa-envelope-o"></i>
									</span>
									<input  type="text" className="form-control1" placeholder="User Name" id="username" onChange={saveUsername} name="username"/>
								</div>
							</div>
						</div>
						<div className="form-group">
							<label className="col-md-2 control-label" id="lab">Email Address</label>
							<div className="col-md-8">
								<div className="input-group input-icon right">
									<span className="input-group-addon" id="checkin">
										<i className="fa fa-envelope-o"></i>
									</span>
									<input type="email"  className="form-control1"   id="email" placeholder="Email Address" name="email" onChange={saveEmail}/>
								</div>
							</div>
							
						</div>
						<div className="form-group">
							<label className="col-md-2 control-label" id="lab">Phone Number</label>
							<div className="col-md-8">
								<div className="input-group input-icon right">
									<span className="input-group-addon" id="checkin">
										<i className="fa fa-key"></i>
									</span>
									<input type="phone"  className="form-control1" id="phone" placeholder="Phone Number" name="phone" onChange={savePhone}/>
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
									<input type="password"  className="form-control1" id="password" placeholder="Password" name="password" onChange={savePassword}/>
								</div>
							</div>
							
						</div>
                        <div className="form-group">
							<label className="col-md-2 control-label" id="lab">Date Of Birth</label>
							<div className="col-md-8">
								<div className="input-group input-icon right">
									<span className="input-group-addon" id="checkin">
										<i className="fa fa-key"></i>
									</span>
									<input type="date"  className="form-control1"  id="date"  name="date" onChange={saveDate}/>
								</div>
							</div>
							
						</div>
						<div class="imageupload">Upload Image</div>
						<div className="form-group">
					
							<div className="col-md-8">
								<div className="input-group">							
							
									<input type="file" id="file" onChange={saveFile} name="file" className="saveFile"/>
								</div>
							</div>
						</div>
					
			
	
				<button className="btn-primary btn" value="Create Customer Account" id="create_customer" onClick={uploadFile} >Create Customer Account</button>
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
export default Registercustomer;