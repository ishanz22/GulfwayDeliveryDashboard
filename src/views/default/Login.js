import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser } from 'actions/auth';
import { useDispatch, connect } from 'react-redux';

import DeliveryLogo from '../../assets/Delivery.png'; // Import your DeliveryLogo image

const Login = (props) => {
  const title = 'Login';
  const description = 'Login Page';
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, error, isAuthenticated, loading } = props;
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().min(6, 'Must be at least 6 chars!').required('Password is required'),
  });
  const initialValues = { email: '', password: '' };
  const onSubmit = (values) => {
    console.log('submit form', values);
  };
  const [loginError, setLoginError] = useState(null);

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, values, touched, errors } = formik;

  const onClickLogin = (e) => {
    e.preventDefault();
    if (formik.isValid) {
      const { email, password } = values;
      if (email && password) {
        dispatch(loginUser({ email, password }));
      }
    }
  };

  useEffect(() => {
    if (error) {
      // Show a toast message with the error message
      toast.error(error, {
        position: 'top-right', // You can change the position
        autoClose: 3000, // Close the toast after 3 seconds (adjust as needed)
      });
    }
    if (isAuthenticated) {
      localStorage.setItem('token', user.token);
      history.push('/');
    }
  }, [error, isAuthenticated, user]);

  console.log(user);

  const leftSide = (
    <div className="min-h-100 d-flex align-items-center">
      <div className="w-100 w-lg-75 w-xxl-50">
        <div>
          <div className="mb-5">
            <h1 className="display-3 text-white">Multiple Niches</h1>
            <h1 className="display-3 text-white">Ready for Your Project</h1>
          </div>
          <p className="h6 text-white lh-1-5 mb-5">
            Dynamically target high-payoff intellectual capital for customized technologies. Objectively integrate emerging core competencies before
            process-centric communities...
          </p>
          <div className="mb-5">
            <Button size="lg" variant="outline-white" href="/">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const rightSide = (
    <div className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border">
      <div className="sw-lg-50 px-5">
        <div className="sh-11">
          <NavLink to="/">{/* <div className="logo-default" /> */}</NavLink>
        </div>
        <div className="mb-5">
          <NavLink to="/">
            <div style={{ width: '170px', paddingBottom: '20px' }}>
              <img src={DeliveryLogo} alt="Delivery Logo" style={{ width: '100%', height: '100%' }} />
            </div>
          </NavLink>

          <h2 className="cta-1 mb-0 text-primary">Welcome,</h2>
          <h2 className="cta-1 text-primary">let's get started!</h2>
        </div>
        <div className="mb-5">
          <p className="h6">Please use your credentials to login.</p>
         
        </div>
        <div>
          <form id="loginForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="email" />
              <Form.Control type="text" name="email" placeholder="Email" value={values.email} onChange={handleChange} />
              {errors.email && touched.email && <div className="d-block invalid-tooltip">{errors.email}</div>}
            </div>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="lock-off" />
              <Form.Control type="password" name="password" onChange={handleChange} value={values.password} placeholder="Password" />
              <NavLink className="text-small position-absolute t-3 e-3" to="/forgot-password">
                Forgot?
              </NavLink>
              {errors.password && touched.password && <div className="d-block invalid-tooltip">{errors.password}</div>}
            </div>
            <Button onClick={onClickLogin} size="lg" type="submit">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <HtmlHead title={title} description={description} />
      <LayoutFullpage left={leftSide} right={rightSide} />
    </>
  );
};

function mapStateToProps(state) {
  console.log(state.auth);
  return {
    user: state.auth.user,
    error: state.auth.error,
    loading: state.auth.loading,
    isAuthenticated: state.auth.isAuthenticated,
  };
}
export default connect(mapStateToProps)(Login);
