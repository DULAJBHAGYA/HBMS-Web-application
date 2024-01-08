import React from "react";
import Button from "./Button";
import Homeimage from '../Images/Web_home.png';
import '../Styles/Home.css';
import Navbar1 from "./Navbar1";

const Home=()=>{
    return(
        <>
        
        <div>
        <div className="home-content">
        <Navbar1 />

        </div>
        <div className="home-img">
        <img src={Homeimage} alt="Homeimage" />
        </div>
        <div className="home-body">

        <h1>Welcome</h1>
        <h2 className="home-sub">To HBMS</h2>
        <h2 className="home-sub-head">Official web page of Highway Bus Management System of Sri Lanka</h2>
        </div>

        <div className="home-bottom">
            <p>Easily search and book your next trip with HBMS app</p>
        </div>
        <div className="home-button">
      <Button  text="Download app" />
      
</div>

    </div>
        </>
    )
}

export default Home;