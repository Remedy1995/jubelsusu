import React from "react";

function Footer(){
        function GetDate(){
        var d = new Date();
        var n = d.getFullYear();
         return n;
        }

    return(<div>

<div className="copy">
            <p > &copy; {GetDate()} RemedyTech All Rights Reserved | Design by  RemedyTech </p>
	    </div>
    </div>)
}

export default Footer;