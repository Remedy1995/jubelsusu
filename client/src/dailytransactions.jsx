/* eslint-disable jsx-a11y/no-distracting-elements */
import React,{useState}  from "react";
import axios from 'axios';
import './app.css';
import swal from 'sweetalert';
import {Switch,Link} from 'react-router-dom';
import Sidebar from "./sidebar";
import { useMediaQuery } from 'react-responsive'
import AdminHeader from "./adminheader";

function DailyTransactions(){
  const [show,setShow]=useState(true);
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 738px)' })

	
	function OpenSidebar(){
		setShow(!show)
		
	  }
 

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
 const [fullname,setFullname]=useState("");
  
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const saveFullname = (e) => {
		setFullname(e.target.value);
	
	  };

  const uploadFile = async (e) => {
    if(fileName===""){
      swal("Upload!", "Please upload your file", "success");
    }
    else if(fullname===""){
      swal("Upload!", "Please insert your fullname", "success");
    }
    else{
      swal("Upload!", "Uploaded successful", "success");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fullname", fullname);
    formData.append("fileName", fileName);
    const res=await axios.post("https://jubelsusu.herokuapp.com/upload/upload",formData)
        console.log(res)
      
    }
    
  }
return(
	<div>


 <AdminHeader/>
 <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#collapseExample"  onClick={OpenSidebar} >
                    <span className="sr-only" style={{color:"yellowgreen"}}>Toggle navigation</span>
                    <span className="icon-bar" ></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                {show? <Sidebar/>:null}
        
                {show && isTabletOrMobile ?"" :  <div id="page-wrapper" className="gray-bg dashbard-1">
       <div className="content-main" style={{background:"white"}}>
 
  			
		    <div className="banner">
		   
				<h2>
				<Switch><React.Fragment><Link to="/dashboard">Home</Link></React.Fragment></Switch>
				<i className="fa fa-angle-right"></i>
				<span>Record Daily Transactions</span><marquee>make sure your time and date is up to date before you register </marquee>
				</h2>
		    </div>
		

            <div className="panel-body">
              <form>
              <div className="form-group">
						
							<div className="col-md-8">
								<div className="input-group">
								
									<input type="text" className="form-control4" id="fullname" name="fullname" placeholder="fullname" onChange={saveFullname}  />
								</div>
							</div>
						</div>
            <input type="file" onChange={saveFile} name="file" className="saveFile" id="dailysave"/>
          <button  onClick={uploadFile} className="btn-primary btn" value="Upload  Daily Transactions" >Upload Daily Transactions</button>
          </form> 
	</div>
	
	
  
		


		
		

		</div>
                
       </div>
}

</div>
);
}
export default DailyTransactions;