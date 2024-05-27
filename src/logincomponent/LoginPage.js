// LoginPage.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Store/PassengerSlice';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css';



const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.passenger);
  const flightIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="24" height="24">
      <path d="M24,13.5A2.5,2.5,0,0,1,21.5,16H17.464l-4.226,6.487A2.973,2.973,0,0,1,10.633,24a2.629,2.629,0,0,1-2.462-3.553L10.019,16H6a4,4,0,0,1-3.473-2.015L.2,10.16a1.443,1.443,0,0,1,.525-2,1.412,1.412,0,0,1,1.652.25L3.794,9.828A4,4,0,0,0,6.622,11H21.5A2.5,2.5,0,0,1,24,13.5ZM17.731,9l-4.5-7.487A2.972,2.972,0,0,0,10.629,0,2.63,2.63,0,0,0,8.167,3.553L10.285,9Z"/>
    </svg>
  );

  const handleLogin = ({ email, user_password }) => {
    // Dispatch login action
    dispatch(loginUser({ email, user_password })).then((result) => {
      if (result.payload) {
        navigate('/dashboard');
      }
    });
  };

  return (
    
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">
              <div className="flight-icon-container">{flightIcon}</div>
              Flight Tracker</h2>
              <LoginForm onSubmit={handleLogin} loading={loading} error={error} />
              <p className="text-center">Don't have an account? <Link to="/registration">Create one</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
