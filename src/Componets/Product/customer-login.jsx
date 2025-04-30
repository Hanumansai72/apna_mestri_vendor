import React from 'react';
import "./login-customer.css";

function Customerlogin() {
    return (
        <div>
            <div className='main-login-container'>
                <div className='Rightside-login'>
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/a200b2ef9c-8078324fa5b90e3c1c7c.png" alt="" srcset="" />
                    <h2>Welcome to Apna Mestri</h2>
                    <span>Connect with skilled professionals or find new clients for your services.</span>
                    <div className="trust-box">
      <p>
        Join thousands of users who trust <strong>Apna Mestri</strong> to find the best
        construction professionals in their area.
      </p>
    </div>
                </div>
                <div className='Leftside-login'>
                <div className="login-container">
      <form className="login-form">
        <label>Email or Phone</label>
        <input type="text" placeholder="Enter your email or phone number" />

        <div className="password-section">
          <label>Password</label>
          <a href="/" className="forgot-link">Forgot Password?</a>
        </div>
        <input type="password" placeholder="Enter your password" />

        <button type="submit" className="login-button">Login</button>

        <div className="divider"><span>OR</span></div>

        <div className="social-login">
          <button className="google">G Google</button>
          <button className="facebook">f Facebook</button>
        </div>

        <p className="signup-text">
          Don't have an account? <a href="/">Sign up</a>
        </p>
      </form></div>
                </div>
            </div>
            
        </div>
    );
}

export default Customerlogin;