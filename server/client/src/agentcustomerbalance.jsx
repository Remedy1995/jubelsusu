import React,{useState} from "react";
import './withdrawalcustomer.jsx';
import { SpinnerRoundOutlined } from 'spinners-react';
import AgentSidebar from "./agentsidebar";
import Header from "./header.jsx";
import { useMediaQuery } from 'react-responsive'
function AgentDepositorinfo(){
  const [show,setShow]=useState(true);
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 738px)' })

	
	function OpenSidebar(){
		setShow(!show)
		
	  }
  
	
	
	const [data, setData] = React.useState(null);
  const [useErr,setUseErr]=useState(false);
  const [accountnumber,setaccountnumber]=useState("");
 
  function userHandler(e){
    let item=e.target.value;
    if(item.length<4){
      setUseErr(true);
    }
    else{
      setUseErr(false)
    }
    setaccountnumber(item)
    
  
  }
 
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
    
    fetch("/depositorinfo/depositorinfo", requestOptions)
    .then((res) => res.json()).then((data) => setData(data))
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
 
}
    return (
        <div>
  

 <Header/>
 <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#collapseExample" style={{background:"black"}} onClick={OpenSidebar} >
                    <span className="sr-only" style={{color:"yellowgreen"}}>Toggle navigation</span>
                    <span className="icon-bar" ></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                {show? <AgentSidebar/>:null}
        
                {show && isTabletOrMobile ?"" :  <div id="page-wrapper" className="gray-bg dashbard-1">
       <div className="content-main">
 
  			
		    <div className="banner">
		   
				<h2>
				
				<i className="fa fa-angle-right"></i>
				<span>Depositor Information</span>
				</h2>
                {!data ? "Loading Available Balance..." :null}
		    </div>
            <div className=" profile">
      
     
<div className="profile-bottom">

  
    <h3><i className="fa fa-user"></i>Search User Balance</h3>



    <form  className="form-horizontal" onSubmit={handleSubmit}>
     


    <div className="form-group">
		
					
    <label className="col-md-2 control-label" id="lab"></label>
    <div className="col-md-8">
      <div className="input-group" style={{height:"10px"}}>							
        <input type="text" className="depositorcheck" placeholder=" Search Account number" id="accountnumber" name="accountnumber" onChange={userHandler} />
        </div>
        <div style={{color:"red",position:"relative",top: "-155px",left:"121px"}}>{useErr?<span>username should be 5 or more characters</span>:null}</div>
      </div>
  
      </div>
     
      </form>
						
                
    <div className="profile-bottom-top">
    <div className="col-md-4 profile-bottom-img">
      
    </div>
    <div className="col-md-8 profile-text">
          {!data ? <SpinnerRoundOutlined size="100"/> : data.map(num=>(<h2 key={num._id} style={{marginLeft:"50px",color:"yellowgreen"}} >{num.accountnumber}</h2>))}
        <table>
          <tbody>
        <tr>
        </tr>
        
        <tr>
        <th></th>
     
        </tr>
        <tr>
        </tr>
        <tr>
        <th>Balance</th>
        <th>:</th>
        <th>{!data ? "Loading..." : data.map(num=>(<h6 className="amo" key={num._id} style={{marginLeft:"10px",color:"#9f32d5"}}>GHC {num.amount}</h6>))}</th>
        </tr>
        </tbody>
        </table>
    </div>
    <div className="clearfix"></div>
    </div>
    <div className="profile-bottom-bottom">
    
    
    
    <div className="clearfix"></div>
    </div>
   
    
</div>
</div>

          
	
  
		
		
{/* <Footer/> */}
		</div>
		<div className="clearfix"> </div>
       </div>

    }

        </div>
    )
}

export default AgentDepositorinfo;