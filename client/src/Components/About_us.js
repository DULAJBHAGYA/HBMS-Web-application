import React from "react";
import '../Styles/About_us.css';
import Circles from "./Circles";
import Navbar1 from "./Navbar1";

const About_us=()=>{
    return(
        <>
        <div className="aboutpage">
            <Navbar1/> 
            <div className="about_us_body">
                <div className="about_us_body_head">
            <h1>About us</h1>
            </div>
    

            <div className="about_us_body_para1">
            <p>This is the official web page of the HBMS Sri Lanka<br/>
           mobile application. </p>
           </div>
           <div className="about_us_body_para2">
            <p>The aim is to provide you with an easy and efficient highway <br/>
            bus service through our mobile application. We introduced <br/>
             our mobile application in 2023. </p>
                </div>
                
                </div>
                <div className="about_us_uspart">
                    <h2>Our team</h2>
                    
                </div>
                <Circles/>
        </div>
        </>
    )
}

export default About_us;