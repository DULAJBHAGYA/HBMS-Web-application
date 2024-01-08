import React from 'react';
import '../Styles/Circles.css';

import Hasini from '../Images/Hasini.png'
import Tharushi from '../Images/Tharushi.png';
import Darshana from '../Images/Darshana.png';
import Kaveesha from '../Images/Kaveesha.png';
import Dulaj from '../Images/Dulaj.png';



const Circles = () => {
  return (
    <div className="circlecontainer">
      <div className="circle"><img src={Dulaj} alt="Dulaj" /></div>
      <div className="circle"><img src={Darshana} alt="Darshana" /></div>
      <div className="circle"><img src={Tharushi} alt="Tharushi" /></div>
      <div className="circle"><img src={Hasini} alt="Hasini" /></div>
      <div className="circle"><img src={Kaveesha} alt="Kaveesha" /></div>
    </div>
  );
};

export default Circles;