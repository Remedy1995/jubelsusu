import React,{useState} from "react";
import admin from '../src/images/admin.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
function  AdminHeader(){

	const [data,setdata]=useState(null);
	
	React.useEffect(() => {
		fetch("/getusername/getusername").then((res) => res.json()).then((data) => setdata(data));
	  }, []);

	// React.useEffect(() => {
	// 	fetch("/adminimage").then((res) => res.json()).then((image) => setImage(image));
	//   }, []);


	   console.log(!data?"":data)
	 var username=!data?"":data;
	 
    const Webname="JubelSusu";
    return (  
               <div>
               <nav className="navbar-default navbar-static-top" role="navigation" style={{background: "rgb(212 215 85 / 70%)"}}>
             <div className="navbar-header">
               
               <h1> <p id="jubel">{Webname}</p></h1>         
			   </div>
			 <div className=" border-bottom">
        	<div className="full-left">
        	  <section className="full-top">
				
			</section>
			
            <div className="clearfix"> </div>
           </div>
           </div>
		    <div className="drop-men" >
		        <ul className=" nav_1">
		           
		    		<li className="dropdown at-drop">
		            
		              <ul className="dropdown-menu menu1 " role="menu">
		                
		               
		                
		              
		              </ul>
		            </li>
					<li className="dropdown">
		              <p className="dropdown-toggle dropdown-at" data-toggle="dropdown"><span className=" name-caret" style={{color:"darkorchid",fontWeight:"bold"}}> Logged As {username}<i className="caret"></i></span><img src={admin} width="70" st alt=""/></p>
		            
		            </li>
		           
		        </ul>
		     </div>
			<div className="clearfix">
       
     </div>
     </nav>
    </div>)
}

export default AdminHeader;