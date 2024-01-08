import React, { Component } from 'react';
import AdminImg from '../Images/Admin.JPG';
import AuthorityImg from '../Images/Authority.JPG';
import { Link } from 'react-router-dom';

export default class Cards extends Component {
  render() {
    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60vh',
            gap: '50px'
          }}
        >
            <Link to="/adminsignin" style={{textDecoration: 'none'}}>
            <div
              className="card"
              style={{
                width: '18rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '5px solid #0A244B'
              }}
            >
              <img src={AdminImg} className="card-img-top" alt="Admin" />
              <div className="card-body" style={{ textAlign: 'center' }}>
                <h5 className="card-title" style={{ fontFamily: 'Poppins, sans-serif', color: '#0A244B', textDecoration:'none',fontSize:'40px' }}>Admin</h5>
              </div>
            </div>
            </Link>
         

          <Link to="/authsignin" style={{textDecoration: 'none'}}>
            <div
              className="card"
              style={{
                width: '18rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '5px solid #0A244B'
              }}
            >
              <img src={AuthorityImg} className="card-img-top" alt="Authority" />
              <div className="card-body" style={{ textAlign: 'center' }}>
                <h5 className="card-title" style={{ fontFamily: 'Poppins, sans-serif', color: '#0A244B', textDecoration:'none',fontSize:'40px' }}>Authority</h5>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
