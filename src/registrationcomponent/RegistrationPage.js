import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegistrationPage.css';

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [user_password, setUser_Password] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    if (!validatePhoneNumber(phone)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    try {
      const response = await axios.post('/register', { name, email, phone, user_password });
      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error
    }
  };

  const validatePhoneNumber = (number) => {
    const digitsOnly = number.replace(/\D/g, '');

    // Check if the resulting string has exactly 10 digits
    return digitsOnly.length === 10;
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Registration</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleRegistration}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name:</label>
              <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone Number:</label>
              <input type="tel" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input type="password" className="form-control" id="password" value={user_password} onChange={(e) => setUser_Password(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
            {error && <p className="text-danger mt-3">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
