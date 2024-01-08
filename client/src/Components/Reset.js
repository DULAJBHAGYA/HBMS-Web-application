import React, { useState } from 'react';

function Reset() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    fetch('http://localhost:8000/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, 'userRegister');
        alert(data.status);
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      });
  };
  

  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: '#C4D1F7',
        width: '500px',
        height: '300px',
        borderRadius: '20px',
        marginTop: '200px',
      }}
    >
      <form onSubmit={handleSubmit}>
        <h3 style={{ color: '#0A244B', fontWeight: 'bold' }}>
          Forgot Password
        </h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            style={{ width: '400px' }}
            type="email"
            className="form-control"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>

        <p className="forgot-password text-right">
          <a href="/adminsignin" style={{textDecoration:'none'}}>Login</a>
        </p>
      </form>
    </div>
  );
}

export default Reset;
