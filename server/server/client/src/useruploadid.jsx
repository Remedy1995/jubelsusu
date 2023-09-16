/* eslint-disable jsx-a11y/no-distracting-elements */
import React, { useState }  from "react";
// import swal from 'sweetalert';
import './app.css';
import Sidebar from "./sidebar";
import {useParams} from 'react-router-dom';
import AdminHeader from "./adminheader";
import swal from "sweetalert";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
function UserUploadId(){
  const [show,setShow]=useState(true);
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 738px)' })

	
	function OpenSidebar(){
		setShow(!show)
		
	  }
    let history = useHistory();
	const {id} = useParams();

    const [file, setFile] = useState();
	const [fileName, setFileName] = useState("");

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
      };

    const uploadFile = async (e) => {
	
        if(fileName===""){
          swal("Upload!", "Please upload your file", "success");
          
        }
        else{
         
          swal("Upload!", "You have successfully registered a customer", "success").then(function() {
              history.push("/allagents")
          });
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        const res=await axios.post(`https://jubelsusu.herokuapp.com/useruploadid/useruploadid${id}`,
            formData)
            console.log(res)
    e.target.reset();
 
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
        
                {show && isTabletOrMobile ?"" :   <div id="page-wrapper" className="gray-bg dashbard-1">
       <div className="content-main" style={{background:"white"}}>
 
  			
		    <div className="banner">
		   
				<h2>
			
				<i className="fa fa-angle-right"></i>
				<span>Upload Customer ID</span><marquee>make sure your time and date is up to date before you register </marquee>
				</h2>
		    </div>
		
            <div className="panel-body">
					<form  className="form-horizontal" >

                    			<div className="form-group">
					<label className="col-md-2 control-label" id="lab"></label>
							<div className="col-md-8">
								<div className="input-group">							
							
									<input type="file" id="uploadid" onChange={saveFile} name="file" className="saveFile"/>
								</div>
							</div>
						</div>
	
				<button className="btn-primary btn" value="Upload User ID" onClick={uploadFile} >Upload User ID</button>
					</form>
	</div>
	
	
  
		


		
		

		</div>
	
       </div>
    
}
</div>
);
}
export default  UserUploadId;