
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAlignRight } from '@fortawesome/free-solid-svg-icons';
// import { faSearch} from '@fortawesome/free-solid-svg-icons';
// import Search from './search';
import {Carousel} from 'react-bootstrap';
import na1 from './images/na1.jpg';
import na from './images/na.jpg';
import na2 from './images/na2.jpg';
import {Button} from 'react-bootstrap';


import {Animated} from "react-animated-css";



function Slider(){



    const custom={

        fontSize: "18px",
        lineHeight: "18px",
        fontWeight: "750",
        transition: "0.3s ease-in",
        borderRadius: "var(--border-radius)",
        backgroundColor: "#00a63f",
        borderColor: "#00a63f",
        padding: "15px 50px",
        position:"relative",
        right:"450px",
        top:"300px"
    
      }
      // const headingStyle={
      //   color:"white",
      //   fontSize:"55px",
      // position:"relative",
      // top:"300px"
      // }
    
      // const subHeading={
      //   color:"white",
      //   fontSize:"20px",
      // position:"relative",
      // top:"300px"
      // }
    
    return <div> <Carousel>
   
    <Carousel.Item>
    
      <img
       
        src={na1}
        alt="First slide"
      />
      <Carousel.Caption  className="hero-overlay" style={{left:"0px",zIndex:"0"}}>
      <Animated  animationIn="flipInX" animationOutDelay={1000} animationInDuration={2000} isVisible={true} >
      <div>
          {/* <h1 style={headingStyle} >Web Development,Software And Mobile App Development</h1> */}
      </div>
  </Animated>
  <Animated  animationIn="fadeInDown" animationOutDelay={2000} animationInDuration={1500} isVisible={true}>
      <div> 
        
      </div>
  </Animated>
   <Animated  animationIn="fadeInDown" animationOutDelay={3000} animationInDuration={3000}  isVisible={true} >
  
  <Button variant="success" style={custom}>Learn More</Button>
                  
  </Animated>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
   
      <img
        src={na}
        alt="Second slide"
      />
  
      <Carousel.Caption  className="hero-overlay" style={{left:"0px",zIndex:"0"}}>
      <Animated  animationIn="fadeInUp" animationOutDelay={1000} animationInDuration={2000} isVisible={true} >
      <div>
       
      </div>
  </Animated>
  <Animated  animationIn="fadeInDown" animationOutDelay={2000} animationInDuration={1500} isVisible={true} >
      <div>
   
      </div>
  </Animated>
   <Animated  animationIn="fadeInDown" animationOutDelay={3000} animationInDuration={3000}  isVisible={true} >
  
  <Button variant="success" style={custom}>Learn More</Button>
                  
  </Animated>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item >
    
      <img
       
        src={na2}
        alt="Third slide"
      />
  
      <Carousel.Caption  className="hero-overlay" style={{left:"0px",zIndex:"0"}}>
      <Animated  animationIn="fadeInDown" animationOutDelay={1000} animationInDuration={2000} isVisible={true} >
      <div>
        
      </div>
  </Animated>
  <Animated  animationIn="fadeInDown" animationOutDelay={2000} animationInDuration={1500} isVisible={true} >
      <div> 
         
      </div>
     
  </Animated>
  <Animated  animationIn="fadeInDown" animationOutDelay={3000} animationInDuration={3000}  isVisible={true} >
  
  <Button variant="success" style={custom}>Learn More</Button>
                  
  </Animated>
   
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
     </div>
}


export default Slider;