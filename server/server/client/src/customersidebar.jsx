import React,{useState}  from "react";
import {Switch,Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faHistory,faKey,faPowerOff } from '@fortawesome/free-solid-svg-icons';
function CustomerSidebar(){
    const  history = useHistory();
	const [data,setdata]=useState(null);
	React.useEffect(() => {
		fetch('/changeuserpassword/changeuserpassword').then((res) => res.json()).then((data) => setdata(data))
	  }, []);
	   console.log(!data?"":data)
	    var id=!data?"":data;

        function logout(event) {
            event.preventDefault(); // prevent page transition
            fetch("/logout").then({
        })
        history.replace("/")

    }
    return(
        <div>
               <div className="navbar-default sidebar" role="navigation">
                <div className="sidebar-nav navbar-collapse">
                <ul className="nav" id="side-menu">
				
                    <li>
                       
             <Switch><React.Fragment>
            <Link className=" hvr-bounce-to-right" to="/customerdashboard" ><FontAwesomeIcon icon={faHome}  className="fonta"/><span className="nav-label">Home</span></Link>
           </React.Fragment> </Switch>
                    </li>
                   
                    <li>


          
                        <ul className="nav nav-second-level">
                            
            <li>
                <Switch><React.Fragment>
            <Link className=" hvr-bounce-to-right" to="/customertransaction" ><FontAwesomeIcon icon={faHistory}  className="fonta"/><span className="nav-label">Transaction History</span></Link>
          </React.Fragment>  </Switch>
            <Switch><React.Fragment>
            <Link className=" hvr-bounce-to-right" to="/customerbalance" ><FontAwesomeIcon icon={faHistory}  className="fonta"/><span className="nav-label">Check Customer Balance</span></Link>
          </React.Fragment>  </Switch>
            </li>		        
            <li>
              <Switch><React.Fragment><Link className=" hvr-bounce-to-right"  to={{pathname: `/changeuserpassword${id}`,state: id}} ><FontAwesomeIcon icon={faKey}  className="fonta"/><span className="nav-label">Change User Password</span></Link>
          </React.Fragment></Switch></li>
            <li><Switch><React.Fragment>
            <Link className=" hvr-bounce-to-right" to="/logout" onClick={logout} ><FontAwesomeIcon icon={faPowerOff}  className="fonta"/><span className="nav-label">Logout</span></Link>
          </React.Fragment>  </Switch></li>
						
					   </ul>
                    </li>
                </ul>
            </div>
			</div>
        </div>
    )
}

export default CustomerSidebar;