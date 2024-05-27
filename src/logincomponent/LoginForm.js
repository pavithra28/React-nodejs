// LoginForm.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const LoginForm = ({ onSubmit, loading, error }) => {
  const [email, setEmail] = useState('');
  const [user_password, setUser_Password] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    const errors = {};
    if (!email) errors.email = 'Email is required';
    if (!user_password) errors.user_password = 'Password is required';
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      onSubmit({ email, user_password });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className={`form-control ${errors.user_password ? 'is-invalid' : ''}`}
          value={user_password}
          onChange={(e) => setUser_Password(e.target.value)}
        />
        {errors.user_password && <div className="invalid-feedback">{errors.user_password}</div>}
      </div >
      <div className="text-center">
      <button type="submit" className="btn btn-primary btn-block" disabled={loading}>{loading ? 'Loading...' : 'Login'}</button>
      {error && <div className="text-danger mt-3">{error}</div>}
    </div>
    </form>
  );
};

export default LoginForm;
