import React from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import AdminImg from '../Images/AdminImg.png';
import { Link } from 'react-router-dom';
import { useFormik,Formik,Form,Field } from 'formik';



function AuthLogin() {

  const onSubmit = (values) => {
    // Handle form submission
    console.log(values);
  };

  const formik = useFormik({
    onSubmit
  });



  return (
    <MDBContainer fluid className="p-3 container-left" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <MDBRow>
        <MDBCol col='10' md='6'>
        <Link to="/chooseaccount" className="position-absolute top-0 start-0 mt-3 ms-3">
            <MDBIcon icon="arrow-left" size="lg" title="Go back" />
          </Link>
          <img
            src={AdminImg}
            className="img-fluid image-right"
            alt="Admin image"
            style={{ width: '600px' }} 
          />
        </MDBCol>
        <MDBCol col='4' md='5' style={{ marginTop:'100px' }}>
        <h1 className='righthead' style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', color: '#0A244B' }}>
  Signin as Authority
</h1>


<Formik onSubmit={onSubmit}>
          {(formik)=>(
            <Form>
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    
    <div>
      <label htmlFor="email" style={{fontWeight:'bold', color:'#0A244B'}}>Email</label>
      <Field
        name="email"
        style={{ borderRadius: '5px', height: '50px', width: '600px' }}
      />
    </div>
    <div>
      <label htmlFor="password" style={{fontWeight:'bold', color:'#0A244B'}}>Password</label>
      <Field
        name="password"
        type="password"
        style={{ borderRadius: '5px', height: '50px', width: '600px' }}
      />
    </div>
    
    <p className="text-center m-0">
      Don't have an account?{' '}
      <Link to="/authsignup" style={{ textDecoration: 'none' }}>
        Signup
      </Link>
    </p>
    <Link to="/authdash" style={{ textDecoration: 'none' }}>
    <MDBBtn className="mb-2 w-100" size="lg" type="submit" disabled={!formik.isValid}>
      Signin
    </MDBBtn>
    </Link>
  </div>
</Form>

            
          )}
         
          </Formik>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default AuthLogin;
