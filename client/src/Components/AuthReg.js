import React from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import {  Link } from 'react-router-dom';
import { useFormik,Formik,Form,Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';

import AdminImg from '../Images/AdminImg.png';

function AuthReg() {
  const initialValues = {
    fullName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full name is required'),
    userName: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid').required('required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const onSubmit = (values) => {
    // Handle form submission
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
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
        <MDBCol col='4' md='5' style={{ marginTop: '5px' }}>
          <h1 className='righthead' style={{ fontWeight: 'bold', color: '#0A244B', marginBottom:'30px' }}>
            Signup as Authority
          </h1>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {(formik)=>(
            <Form>
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <div>
      <label htmlFor="fullName" style={{fontWeight:'bold', color:'#0A244B'}}>Full Name</label>
      <Field
        name="fullName"
        style={{ borderRadius: '5px', height: '50px', width: '600px' }}
      />
      <ErrorMessage name="fullName" component="small" />
    </div>
    <div>
      <label htmlFor="userName" style={{fontWeight:'bold', color:'#0A244B'}}>Username</label>
      <Field
        name="userName"
        style={{ borderRadius: '5px', height: '50px', width: '600px' }}
      />
      <ErrorMessage name="userName" component="small" />
    </div>
    <div>
      <label htmlFor="email" style={{fontWeight:'bold', color:'#0A244B'}}>Email</label>
      <Field
        name="email"
        style={{ borderRadius: '5px', height: '50px', width: '600px' }}
      />
      <ErrorMessage name="email" component="small" />
    </div>
    <div>
      <label htmlFor="password" style={{fontWeight:'bold', color:'#0A244B'}}>Password</label>
      <Field
        name="password"
        type="password"
        style={{ borderRadius: '5px', height: '50px', width: '600px' }}
      />
      <ErrorMessage name="password" component="small" />
    </div>
    <div>
      <label htmlFor="confirmPassword" style={{fontWeight:'bold', color:'#0A244B'}}>Confirm Password</label>
      <Field
        name="confirmPassword"
        type="password"
        style={{ borderRadius: '5px', height: '50px', width: '600px' }}
      />
      <ErrorMessage name="confirmPassword" component="small" />
    </div>
    <p className="text-center m-0">
      Already have an account?{' '}
      <Link to="/authsignin" style={{ textDecoration: 'none' }}>
        Signin
      </Link>
    </p>
    <MDBBtn className="mb-2 w-100" size="lg" type="submit" disabled={!formik.isValid}>
      Signup
    </MDBBtn>
  </div>
</Form>

            
          )}
         
          </Formik>

          </MDBCol>
      </MDBRow>
    </MDBContainer>
    
  );
}

export default AuthReg;