import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { connect, useDispatch } from 'react-redux';
import { resetPasswordToken } from 'actions/auth';
import { toast } from 'react-toastify';

import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';
import DeliveryLogo from '../../assets/Delivery.png';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = (props) => {
  const title = 'Reset Password';
  const description = 'Reset Password Page';
  const dispatch = useDispatch();
  const { token } = useParams();
  const { user, error, success } = props;
  const validationSchema = Yup.object().shape({
    password: Yup.string().min(6, 'Must be at least 6 chars!').required('Password is required'),
    passwordConfirm: Yup.string()
      .required('Password Confirm is required')
      .oneOf([Yup.ref('password'), null], 'Must be same with password!'),
  });
  const initialValues = { password: '', passwordConfirm: '' };
  const onSubmit = (values) => console.log('submit form', values);

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, values, touched, errors } = formik;

  useEffect(() => {
    console.log(error);
    if (error) {
      toast.error(error, {
        autoClose: 3000,
      });
    }

    if (success) {
      toast.success('Reset Password Successfully', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  }, [error, user, success]);

  const onClick = (e) => {
    e.preventDefault();

    if (formik.isValid) {
      const { password } = values;
      console.log(token, password);
      if (password) {
        dispatch(resetPasswordToken({ token, password }));
      }
    }
  };
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
          <div style={{ width: '170px', paddingBottom: '20px' }}>
            <img src={DeliveryLogo} alt="Delivery Logo" style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
        <div className="mb-5">
          <h2 className="cta-1 mb-0 text-primary">Password trouble?</h2>
          <h2 className="cta-1 text-primary">Renew it here!</h2>
        </div>
        <div className="mb-5">
          <p className="h6">Please use below form to reset your password.</p>
          <p className="h6">
            If you are a member, please <NavLink to="/login">login</NavLink>.
          </p>
        </div>
        <div>
          <form id="resetForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
            <div className="mb-3 filled">
              <CsLineIcons icon="lock-off" />
              <Form.Control type="password" name="password" onChange={handleChange} value={values.password} placeholder="Password" />
              {errors.password && touched.password && <div className="d-block invalid-tooltip">{errors.password}</div>}
            </div>
            <div className="mb-3 filled">
              <CsLineIcons icon="lock-on" />
              <Form.Control type="password" name="passwordConfirm" onChange={handleChange} value={values.passwordConfirm} placeholder="Verify Password" />
              {errors.passwordConfirm && touched.passwordConfirm && <div className="d-block invalid-tooltip">{errors.passwordConfirm}</div>}
            </div>
            <Button size="lg" type="submit" onClick={onClick}>
              Reset Password
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
    success: state.auth.success,
    error: state.auth.error,
  };
}
export default connect(mapStateToProps)(ResetPassword);
