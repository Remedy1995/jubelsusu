import React,{useState}  from "react";
import axios from 'axios';
import './app.css';
import swal from 'sweetalert';
import {Switch,Link} from 'react-router-dom';
// import Footer from "./footer";
import Header from "./header";
import AgentSidebar from "./agentsidebar";

function AgentDailyTransactions(){
  const stylefirstname={
    width: 400,
    position: "relative",
    top: -5,
    left: 150
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
    }else if(fullname===""){
      swal("Upload!", "Please insert your fullname", "success");
    }
    else{
      swal("Upload!", "Uploaded successful", "success");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("fullname", fullname);
    const res=await axios.post(
        "https://jubelsusu.herokuapp.com/upload/upload",
        formData)
        console.log(res)
      
    }
    e.target.reset()
  }
return(
	<div>


 <Header/>
		 <AgentSidebar/>
        
        <div id="page-wrapper" className="gray-bg dashbard-1">
       <div className="content-main" style={{background:"white"}}>
 
  			
		    <div className="banner">
		   
				<h2>
				<Switch><React.Fragment><Link to="/dashboard">Home</Link></React.Fragment></Switch>
				<i className="fa fa-angle-right"></i>
				<span>Record Daily Transactions</span>
				</h2>
		    </div>
		

            <div className="panel-body">
              <form>

              <div className="col-md-8">
								<div className="input-group">
								
									<input type="text" className="form-control1" id="fullname" name="fullname" placeholder="fullname" onChange={saveFullname} style={stylefirstname} />
								</div>
							</div>
            <input type="file" onChange={saveFile} name="file" className="saveFile"/>
          <button  onClick={uploadFile} className="btn-primary btn" value="Upload  Daily Transactions" >Upload Daily Transactions</button>
          </form> 
	</div>
	
	
  
		


		
		

		</div>
	
       </div>
    

</div>
);
}
export default AgentDailyTransactions;