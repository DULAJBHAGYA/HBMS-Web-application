import React, { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AdminImg from '../Images/AdminImg.png';
import app from './firebase_config/firebase_config';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';



function AdminReg() {
  
  const auth = getAuth(app);

  const [emailError, setEmailError] = useState('');

  const [state, setState] = useState({
    fullName: '',
    userName: '',
    email: '',
    mobile: '',
    password: '',
    verifyButton: false,
    verifyOTP: false,
    otp: '',
    verified:false,
  });
  

  const initialValues = {
    fullName: '',
    userName: '',
    mobile:'',
    email: '',
    password: '',
    confirmPassword: '',
  };

  function onCaptchVerify() {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        onSignInSubmit();
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
      },
    }, auth);
  }

  function onSignInSubmit(){
    onCaptchVerify();
    const phoneNumber = "+94" + state.mobile;
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      alert("OTP sended");
      setState({verifyOTP:true});
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      // ...
    });
  }

  function verifyCode() {
      window.confirmationResult.confirm(state.otp).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(user);
      alert("Verification Done");
      setState({
        verified:true,
        verifyOTP:false,
      })
      // ...
    }).catch((error) => {
      alert("Invalid OTP");
      // User couldn't sign in (bad verification code?)
      // ...
    });
    
  }
  



  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full name is required'),
    userName: Yup.string()
      .matches(/^[a-z0-9]{6,}$/, 'Username must be at least 6 characters long and consist only of lowercase letters and numbers')
      .required('Username is required'),
    email: Yup.string().email('Invalid E-mail').required('E-mail is required'),
    mobile: Yup.string()
      .matches(/^\d{10}$/, 'Invalid Mobile number') // Adjust the regular expression to match the desired format for mobile numbers
      .required('Mobile number is required'),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number'
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(state.verified){
      const { fullName, userName, email, mobile, password } = state;
    console.log(fullName, userName, email, mobile, password);
    fetch("http://localhost:8000/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        fullName,
        userName,
        email,
        mobile,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "usRegister");
  
        if (data.error) {
          // Handle the error response
          if (data.error.email) {
            setEmailError(data.error.email);
          } else {
            setEmailError('');
          }
          if (data.error.userName) {
            formik.setFieldError("userName", data.error.userName);
          }
          if (data.error.mobile) {
            formik.setFieldError("mobile", data.error.mobile);
          }
        } else if (data.status === "ok") {
          // Registration success, navigate to another component
          navigate("/adminsignin");
        }
      })
      .catch((error) => {
        console.log(error);
        // Handle any network or server errors
      });
    }else{
      alert("Please Verify Mobile");
    }   
  };

  function changeMobile(e) {
    const mobile = e.target.value;
    setState((prevState) => ({
      ...prevState,
      mobile,
      verifyButton: mobile.length === 10, // Update the verifyButton value based on the mobile length
    }));
  };
  
  
  

  const navigate = useNavigate();


  const onSubmit = (values) => {
    // Handle form submission
    console.log(values);
    // Navigate to another component
    navigate('/adminsignin');
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  

  return (
    <MDBContainer fluid className="p-3 container-left" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <MDBRow>
        <MDBCol col="10" md="6">
          <Link to="/chooseaccount" className="position-absolute top-0 start-0 mt-3 ms-3">
            <MDBIcon icon="arrow-left" size="lg" title="Go back" />
          </Link>
          <img src={AdminImg} className="img-fluid image-right" alt="Admin image" style={{ width: '600px' }} />
        </MDBCol>
        <MDBCol col="4" md="5" style={{ marginTop: '0' }}>
          <h1 className="righthead" style={{ fontWeight: 'bold', color: '#0A244B', marginBottom: '0px' }}>
            Signup as Admin
          </h1>

          <form onSubmit={formik.handleSubmit}>
          <div id='recaptcha-container'></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label htmlFor="fullName" style={{ fontWeight: 'bold', color: '#0A244B' }}>
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formik.values.fullName}
                  onBlur={formik.handleBlur}
                  style={{ borderRadius: '5px', height: '50px', width: '600px' }}
                  onChange={(e) => {
                  formik.handleChange(e);
                  setState({ ...state, fullName: e.target.value });
                  }}
                />
                {formik.touched.fullName && formik.errors.fullName && <small>{formik.errors.fullName}</small>}
              </div>

              <div>
                <label htmlFor="userName" style={{ fontWeight: 'bold', color: '#0A244B' }}>
                  Username
                </label>
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  value={formik.values.userName}
                  onBlur={formik.handleBlur}
                  style={{ borderRadius: '5px', height: '50px', width: '600px' }}
                  onChange={(e) => {
                  formik.handleChange(e);
                  setState({ ...state, userName: e.target.value });
                  }}
                />
                {formik.touched.userName && formik.errors.userName && <small>{formik.errors.userName}</small>}
              </div>
              
              <div>
                <label htmlFor="email" style={{ fontWeight:'bold', color: '#0A244B' }}>
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  style={{ borderRadius: '5px', height: '50px', width: '600px' }}
                  onChange={(e) => {
                  formik.handleChange(e);
                  setState({ ...state, email: e.target.value });
                  }}
                />
                {formik.touched.email && formik.errors.email && <small>{formik.errors.email}</small>}
                {emailError && <small className="error-message">{emailError}</small>}
              </div>

              <div>
                <label htmlFor="mobile" style={{ fontWeight: 'bold', color: '#0A244B' }}>
                Mobile Number
                </label>
                  <input
                  id="mobile"
                  name="mobile"
                  type="tel" // Change the input type to "tel" for mobile number
                  value={formik.values.mobile}
                  onBlur={formik.handleBlur}
                  style={{ borderRadius: '5px', height: '50px', width: '600px' }} // Adjust the width as needed
                  onChange={(e) => {
                  formik.handleChange(e);
                  changeMobile(e);
                  }}
                />

                {state.verifyButton && (
                  <input
                    type="button"
                    value={state.verified? "Verified" : "Verify" }
                    onClick={onSignInSubmit}
                    style={{
                      background: "#224567",
                      width: "600px",
                      padding: 8,
                      color: "white",
                      borderRadius: "10px",
                      marginTop: "10px",
                    }}
                  />
                )}
              
                {formik.touched.mobile && formik.errors.mobile && <small>{formik.errors.mobile}</small>}
              </div>

              {state.verifyOTP?
              <div>
                <label htmlFor="mobile" style={{ fontWeight: 'bold', color: '#0A244B' }}>
                OTP
                </label>
                  <input
                  id="otp"
                  name="otp"
                  type="number"
                  value={formik.values.otp} // Update the value to formik.values.otp
                  onBlur={formik.handleBlur}
                  style={{ borderRadius: '5px', height: '50px', width: '600px' }}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setState({ ...state, otp: e.target.value }); // Update the otp value in the state
                  }}
                />
                <input type='button' value="OTP"
                onClick={verifyCode}
                 style={{background:"#224567", width:'600px',padding:8, color:'white', borderRadius:'10px',marginTop:'10px'}}/>                  
              </div>:null}


              <div style={{ position: 'relative' }}>
                <label htmlFor="password" style={{ fontWeight: 'bold', color: '#0A244B' }}>
                Password
                </label>
                <input
                id="password"
                name="password"
                type={formik.values.showPassword ? 'text' : 'password'}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onCopy={(e) => e.preventDefault()}
                style={{ borderRadius: '5px', height: '50px', width: '600px' }}
                onChange={(e) => {
                  formik.handleChange(e);
                  setState({ ...state, password: e.target.value });
                  }}
                />
              <i
              className={`far ${formik.values.showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
              style={{
              position: 'absolute',
              top: '70%',
              right: '20px',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
            }}
            onClick={() => formik.setFieldValue('showPassword', !formik.values.showPassword)}
            />
          {formik.touched.password && formik.errors.password && <small>{formik.errors.password}</small>}
        </div>

<div style={{ position: 'relative' }}>
  <label htmlFor="confirmPassword" style={{ fontWeight: 'bold', color: '#0A244B' }}>
    Confirm Password
  </label>
  <input
    id="confirmPassword"
    name="confirmPassword"
    type={formik.values.showConfirmPassword ? 'text' : 'password'}
    value={formik.values.confirmPassword}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    onCopy={(e) => e.preventDefault()}
    style={{ borderRadius: '5px', height: '50px', width: '600px' }}
  />
  <i
    className={`far ${formik.values.showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}
    style={{
      position: 'absolute',
      top: '70%',
      right: '20px',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
    }}
    onClick={() => formik.setFieldValue('showConfirmPassword', !formik.values.showConfirmPassword)}
  />
  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
    <small>{formik.errors.confirmPassword}</small>
  )}
</div>


              <p className="text-center ">
                Already have an account?{' '}
                <Link to="/adminsignin" style={{ textDecoration: 'none' }}>
                  Signin
                </Link>
              </p>
              <MDBBtn onClick={handleSubmit} className=" w-100" size="lg" type="submit" disabled={!formik.isValid}>
                Signup
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default AdminReg;

