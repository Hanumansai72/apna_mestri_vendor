import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer text-white py-5 px-4">
      <div className="container">
        <div className="row gy-4">
          <div className="col-md-4">
            <h5 className="brand mb-3">
              Apna<span className="text-primary">Mestri</span>
            </h5>
            <p className="small">
              Your one-stop solution for all construction and service needs. We connect trusted professionals with customers for quality service delivery.
            </p>
            <div className="d-flex gap-3">
              <i className="bi bi-facebook fs-5"></i>
              <i className="bi bi-twitter fs-5"></i>
              <i className="bi bi-instagram fs-5"></i>
              <i className="bi bi-linkedin fs-5"></i>
            </div>
          </div>

          {/* Column 2 */}
          <div className="col-md-2">
            <h6 className="mb-3">Quick Links</h6>
            <ul className="list-unstyled small">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Products</a></li>
              <li><a href="#">Become a Vendor</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="col-md-3">
            <h6 className="mb-3">Support</h6>
            <ul className="list-unstyled small">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Safety Center</a></li>
              <li><a href="#">Community Guidelines</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="col-md-3">
            <h6 className="mb-3">Legal</h6>
            <ul className="list-unstyled small">
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">Accessibility</a></li>
              <li><a href="#">Sitemap</a></li>
            </ul>
            <select className="form-select form-select-sm mt-2" style={{ width: 'auto' }}>
              <option>English</option>
              <option>Hindi</option>
              <option>Telugu</option>
            </select>
          </div>
        </div>

        <hr className="my-4 border-light" />
        <p className="text-center small mb-0">&copy; 2025 Apna Mestri. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
