import React from "react";
import logo from '../Images/Logo.png';

const List=()=>{
    return(
        <>
    <header>
        <div className="list container container-flex">
            <div>
                <img src={logo} alt="logo"/>
            </div>
        </div>
    </header>
        </>
    )
}

export default List;