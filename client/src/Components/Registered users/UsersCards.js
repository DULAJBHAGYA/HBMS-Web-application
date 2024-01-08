import React from 'react';
import '../../Styles/UserCards.css';
import User1 from '../../Images/User1.jpg';

const UsersCards = () => {
  return (
    <div className="usercard">
      <div className="usercard-row">

        <div className="usercard-column">
          <div className="usercard-section">
            <h1 style={{color:'#0A244B', fontWeight:'700'}}>0001p</h1>
          </div>
        </div>

        <div className="usercard-column">
          <div className="usercard-section">
            <p>Darshana Wijebahu</p>
          </div>
        </div>

        <div className="usercard-column">
          <div className="usercard-section">
          <p>0713456789</p>
          </div>
        </div>

        
      </div>

      <div className="usercard-row">
        
      <div className="usercard-column">
          <div className="usercard-section">
            <p>No:22/1<br/>Main rd.<br/>Rikillagaskada</p>
            </div>
        </div>

        <div className="usercard-column">
          <div className="usercard-section">
          <p>199819701125</p>
          </div>
        </div>

        <div className="usercard-column">
          <div className="usercard-section">
          <p>darshanawijebahu@gmail.com</p>
          </div>
        </div>

        <div className="usercard-column">
          <div className="usercard-section"></div>
        </div>

      </div>
    </div>
  );
}

export default UsersCards;
