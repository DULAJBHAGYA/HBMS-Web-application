import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
} from 'mdb-react-ui-kit';
import AdminImg from '../Images/AdminImg.png';

function AdminLogin() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid E-mail').required('E-mail is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const { email, password } = values;
      console.log(email, password);
      fetch("http://localhost:8000/login-user", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userRegister");
          if (data.status === "ok") {
            const token = data.token; // Access the token from the response
            alert("Login successful");
            // Store the token in local storage or state for further use
            localStorage.setItem("token", token);
            navigate('/dashboard');
          } else {
            alert("Login failed");
            console.log("Login failed: ", data.error);
          }
        })
        .catch((error) => {
          // Handle fetch error
          console.log("Error occurred: ", error);
        });
        
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  

  return (
    <MDBContainer
      fluid
      className="p-3 container-left"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <MDBRow>
        <MDBCol col="10" md="6">
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
        <MDBCol col="4" md="5" style={{ marginTop: '100px' }}>
          <h1
            className="righthead"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 'bold',
              color: '#0A244B',
            }}
          >
            Sign in as Admin
          </h1>

          <form onSubmit={handleSubmit}>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              <div>
                <label
                  htmlFor="email"
                  style={{ fontWeight: 'bold', color: '#0A244B' }}
                >
                  Email
                </label>

                <MDBInput
                  id="email"
                  name="email" // Add the name attribute
                  type="email"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  style={{
                    borderRadius: '5px',
                    height: '50px',
                    width: '600px',
                  }}
                  onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email && (
                  <small>{formik.errors.email}</small>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  style={{ fontWeight: 'bold', color: '#0A244B' }}
                >
                  Password
                </label>

                <MDBInput
                  id="password"
                  name="password" // Add the name attribute
                  type="password"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  style={{
                    borderRadius: '5px',
                    height: '50px',
                    width: '600px',
                  }}
                  onChange={formik.handleChange}
                />
                {formik.touched.password && formik.errors.password && (
                  <small>{formik.errors.password}</small>
                )}
              </div>

              <p className="mb-2">
                <Link to="/resetpassword" style={{ textDecoration: 'none' }}>
                  Forgot password?
                </Link>
              </p>

              <p className="m-0">
                Don't have an account?{' '}
                <Link to="/adminsignup" style={{ textDecoration: 'none' }}>
                  Signup
                </Link>
              </p>
              
              <div className="mb-3">
          {/* <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div> */}
        </div>
              <MDBBtn
                onClick={handleSubmit}
                className=" w-100"
                size="lg"
                type="submit"
                disabled={!formik.isValid}
              >
                Signin
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default AdminLogin;

