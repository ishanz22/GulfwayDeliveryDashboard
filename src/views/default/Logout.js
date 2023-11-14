import { logoutUser } from 'actions/auth';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

function Logout(props) {
  const { error, isAuthenticated, success } = props;
  const dispatch = useDispatch();
  console.log('something');
  dispatch(logoutUser({}));
  const history = useHistory();
  if (error) {
    // Show a toast message with the error message
    toast.error(error, {
      position: 'top-right', // You can change the position
      autoClose: 3000, // Close the toast after 3 seconds (adjust as needed)
    });
  }
  if (!isAuthenticated || success) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    history.push('/login');
    window.location.reload();
  }
}

function mapStateToProps(state) {
  console.log(state.auth);
  return {
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    success: state.auth.success,
  };
}

export default connect(mapStateToProps)(Logout);
