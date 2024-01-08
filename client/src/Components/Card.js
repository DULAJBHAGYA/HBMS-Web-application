import React from "react";

function Card({ imageSrc, title, description }) {
  return (
    <div className="card" style={{ width: "97%", height:'450px', margin:'20px', borderRadius:'20px', border: '20px solid #C4D1F7' }}>
      <div className="row no-gutters">
        <div className="col-sm-5" style={{borderRadius:'20px'}}>
        <img className="card-img" src={imageSrc} alt={title} style={{ width: '300px', borderRadius: 
        '20px', marginLeft: '50px', marginTop: '50px'}}/>
        </div>
        <div className="col-sm-7">
          <div className="card-body">
            <h5 className="card-title" style={{paddingTop:'60px', fontSize:'70px'}}>{title}</h5>
            <p className="card-text" style={{paddingTop:'20px', fontSize:'30px'}}>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
