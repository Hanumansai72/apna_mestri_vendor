import React from 'react';
import Navbar from './navbar';
import './vendor_settings.css';

function VendorProfileSettings() {
  return (
    <div>
      <Navbar
              homeLabel="Home"
              homeUrl="/Product"
              jobsLabel="Products"
              jobsUrl="/Product/order"    
              historyLabel="Orders History"
              historyUrl="/Product/order/history" 
              earningsLabel="Earnings"
              earningsUrl="/vendor/earnings"   
            />
      <div className="container settings_vendor mt-4">
        <h3 className="Settings_Heading mb-4">Account Settings</h3>

        {/* Personal Info */}
        <div className="row mb-4">
          <div className="col-md-6">
            <label>First Name</label>
            <input type="text" className="form-control" value="Alex" />
          </div>
          <div className="col-md-6">
            <label>Last Name</label>
            <input type="text" className="form-control" value="Morgan" />
          </div>
        </div>
        <div className="mb-4">
          <label>Email Address</label>
          <input type="email" className="form-control" value="alex.morgan@example.com" />
        </div>
        <div className="mb-4">
          <label>Phone Number</label>
          <input type="text" className="form-control" value="+1 (555) 123-4567" />
        </div>
        <div className="mb-4">
          <label>Location</label>
          <select className="form-select">
            <option>San Francisco, CA</option>
          </select>
        </div>

        {/* Business Info */}
        <div className="mb-4">
          <h5 className="section-title">Business Information</h5>
        </div>
        <div className="mb-3">
          <label>Business Name</label>
          <input type="text" className="form-control" value="Morgan Technical Services" />
        </div>
        <div className="mb-3">
          <label>Business Description</label>
          <textarea className="form-control" rows="3">
            Providing expert IT infrastructure and networking solutions for businesses of all sizes. Specializing in network security, cloud migration, and system optimization.
          </textarea>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Tax ID / EIN</label>
            <input type="text" className="form-control" value="12-3456789" />
          </div>
          <div className="col-md-6">
            <label>Business Type</label>
            <select className="form-select">
              <option>Sole Proprietorship</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label>Business Address</label>
          <input type="text" className="form-control" value="123 Tech Street, Suite 456" />
        </div>
        <div className="row mb-4">
          <div className="col-md-4">
            <input type="text" className="form-control" value="San Francisco" />
          </div>
          <div className="col-md-4">
            <input type="text" className="form-control" value="CA" />
          </div>
          <div className="col-md-4">
            <input type="text" className="form-control" value="94107" />
          </div>
        </div>

        {/* Notification */}
        <div className="mb-4">
          <h5 className="section-title">Notification Settings</h5>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" id="jobAlerts" defaultChecked />
            <label className="form-check-label" htmlFor="jobAlerts">New Job Alerts</label>
          </div>
        </div>

        <button className="btn btn-primary">Save Changes</button>
      </div>
    </div>
  );
}

export default VendorProfileSettings;
