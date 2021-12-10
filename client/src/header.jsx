import React,{useState} from "react";


function  Header(){

	const [data,setdata]=useState(null);
	
	const [image,setImage]=useState(null);
	React.useEffect(() => {
		fetch("/getusername/getusername").then((res) => res.json()).then((data) => setdata(data));
	  }, []);

	React.useEffect(() => {
		fetch("/getimage/getimage").then((res) => res.json()).then((image) => setImage(image));
	  }, []);


	   console.log(!data?"":data)
	 var username=!data?"":data;
	 var userimage=!image?"":image;
    const Webname="JubelSusu";
    return (  
               <div>
               <nav className="navbar-default navbar-static-top" role="navigation" style={{background: "rgb(212 215 85 / 70%)"}}>
             <div className="navbar-header">
                {/* <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button> */}
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
		              <p className="dropdown-toggle dropdown-at" data-toggle="dropdown"><span className=" name-caret" style={{color:"darkorchid",fontWeight:"bold"}}> Logged As {username}<i className="caret"></i></span><img src={userimage} width="70" st alt=""/></p>
		            
		            </li>
		           
		        </ul>
		     </div>
			<div className="clearfix">
       
     </div>
     </nav>
    </div>)
}

export default Header;