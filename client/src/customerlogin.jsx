
import React ,{useState} from "react";
import './app.css';
import { Switch,Link } from "react-router-dom";
// import Footer from "./footer";
import { useHistory } from "react-router-dom";
import back from './images/back.jpg';
// import {Animated} from "react-animated-css";
import 'bootstrap/dist/css/bootstrap.min.css';
import SmoothList from 'react-smooth-list';
const loginstyle={
 backgroundImage: `url(${back})`,
 height:'700px'

}
const loginbuttonstyle={
    backgroundColor:"wheat"
}
function CustomerLogin(){
	let history = useHistory();
	// const [data, setData] = React.useState(null);
 const [details,setdetails]=useState({username:"",password:""});
 
 var myHeaders = new Headers();
 myHeaders.append("Content-Type", "application/json");
 const HandleSubmit=e=>{
	e.preventDefault();
	e.target.reset();
    const {password} = e.target.elements
    const pass= {password:password.value};
    const inputpassword=pass.password;
	const {username} = e.target.elements
    const user= {username:username.value};
    const inputusername=user.username;

 var raw = JSON.stringify({
	"username":inputusername,
	"password":inputpassword
  });
  var requestOptions = {
	method: 'POST',
	headers: myHeaders,
	body: raw,
	redirect: 'follow'
  };
  
  fetch("/userlogin/userlogin", requestOptions).then(res=>{
	if(res.status===200){
		console.log("ok")
		history.push('/customerdashboard')
	}
	else{
	  alert("the username or password is incorrect please try again");
	}
  })
 
 }

    return <div>
		


<div className="login" style={loginstyle} >
		<h1><a href="index.html" style={{color:"white"}}> </a></h1>
		<SmoothList  transitionDuration="1000">
		<div className="login-bottom" style={loginbuttonstyle}>
  
			<center><h2 style={{color:"indianred"}}>Jubel SuSu</h2></center>
			<form onSubmit={HandleSubmit}>
			<div className="col-md-6">
				<div className="login-mail">
					<input type="text" placeholder="username" style={
            {
              position:"relative",
              top: "0px",
              left:"0px"
            }
          } id="username" required=""  name="username" onChange={e=>setdetails({...details,username: e.target.value})} value={details.username}/>
					<i className="fa fa-envelope"></i>
 
				</div>
				<div className="login-mail">
					<input type="password" placeholder="Password"  id="password" required="" name="password" onChange={e=>setdetails({...details,password: e.target.value})} value={details.password}/>
					<i className="fa fa-lock"></i>
         
				</div>
				
						 

			
			</div>
			<div className="col-md-6 login-do">
				<label className="hvr-shutter-in-horizontal login-sub">
					<input type="submit"  value=" Customer login"/>
					</label>
                    <p>Go Back?</p>
					<Switch><React.Fragment><Link to="/" className="hvr-shutter-in-horizontal">Back</Link></React.Fragment></Switch>
			</div>
			
			<div className="clearfix"> </div>
			</form>
		</div>
		
		</SmoothList>
	</div>
    {/* <Footer  /> */}


    </div>
}

export default CustomerLogin;