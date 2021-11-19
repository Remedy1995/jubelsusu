import React,{useState}  from "react";
import {Switch,Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faUserPlus ,faDollarSign,faHistory,faUpload,faKey,faPowerOff } from '@fortawesome/free-solid-svg-icons';
function AgentSidebar(){
    const  history = useHistory();
	const [data,setdata]=useState(null);
	React.useEffect(() => {
		fetch("/agentchangepassword/agentchangepassword").then((res) => res.json()).then((data) => setdata(data))
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
            <Link className=" hvr-bounce-to-right" to="/agentdashboard" ><FontAwesomeIcon icon={faHome}  className="fonta"/><span className="nav-label">Home</span></Link>
           </React.Fragment> </Switch>
                    </li>
                   
                    <li>

                    <Switch><React.Fragment>
            <Link className=" hvr-bounce-to-right" to="/agentcreateuser" ><FontAwesomeIcon icon={faUserPlus}  className="fonta"/><span className="nav-label"> Register Customers</span></Link>
          </React.Fragment>  </Switch>

          
                        <ul className="nav nav-second-level">
                            <li>
                            <Switch><React.Fragment>
            <Link className=" hvr-bounce-to-right" to="/agentdeposit" ><FontAwesomeIcon icon={faDollarSign}  className="fonta"/><span className="nav-label">Make Deposit</span></Link>
          </React.Fragment>  </Switch>
                            </li>
                          
            <li>
                <Switch><React.Fragment>
            <Link className=" hvr-bounce-to-right" to="/agenttransaction" ><FontAwesomeIcon icon={faHistory}  className="fonta"/><span className="nav-label">Transaction History</span></Link>
          </React.Fragment>  </Switch>
            <Switch><React.Fragment>
            <Link className=" hvr-bounce-to-right" to="/agentcustomerbalance" ><FontAwesomeIcon icon={faHistory}  className="fonta"/><span className="nav-label">Check Customer Balance</span></Link>
          </React.Fragment>  </Switch>
            </li>		
            <li><Switch><React.Fragment>
            <Link className=" hvr-bounce-to-right" to="/agentdailytransactions" ><FontAwesomeIcon icon={faUpload}  className="fonta"/><span className="nav-label">Upload Transactions</span></Link>
           </React.Fragment> </Switch></li>
         
            <li>
              <Switch><React.Fragment><Link className=" hvr-bounce-to-right"  to={{pathname: `/agentchangepassword${id}`,state: id}} ><FontAwesomeIcon icon={faKey}  className="fonta"/><span className="nav-label">Change User Password</span></Link>
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

export default AgentSidebar;