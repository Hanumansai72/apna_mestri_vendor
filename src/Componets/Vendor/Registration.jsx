import React, { useState } from 'react';
import "./Registration.css";

function Registration() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    businessName: "",
    location: "",
    password: "",
    businessCategory: "",
    subCategory: ""
  });

  const subCategories = {
    "Technical": [
      "Architects", "Civil Engineer", "Site Supervisor", "Survey Engineer", "MEP Consultant",
      "Structural Engineer", "Project Manager", "HVAC Engineer", "Safety Engineer",
      "Contractor", "Interior Designer", "WaterProofing Consultant", "Acoustic Consultants"
    ],
    "Non-Technical": [
      "EarthWork Labour", "Civil Mason", "Shuttering/Centring Labour", "Plumber", "Electrician",
      "Painter", "Carpenter", "Flooring Labour", "False Ceiling Worker"
    ],
    "Products": [
      "Bricks / Block", "Cement / Adhesives", "Aggregate vendors", "Steel", "Stone / Tiles", "Paints",
      "Electrical wires & fixtures", "Plumbing pipes & fixtures", "Civil products (All handy tools for civil works)",
      "Glass", "Doors & Windows", "Wood and Hardware", "Fabricators", "Waterproofing products",
      "Landscape products", "Lights", "Electrical", "Carpenter", "Flooring and Dado", "Wall papers",
      "False Ceiling", "Glass work", "Cleaning products", "Furniture", "Blinds and Curtains", "Acoustics"
    ]
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setFormData({ ...formData, businessCategory: category, subCategory: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const today = new Date();
    const currentDate = today.toISOString().split('T')[0]; // "YYYY-MM-DD"
  
    const finalData = {
      ...formData,
      registrationDate: currentDate,
    };
  
    await fetch('https://backend-d6mx.vercel.app/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalData),
    });
  };
  

  return (
    <div>
      <div className="TOP-Container text-center my-4">
        <h2 className="TOP-Heading">Register as a Service or Product Provider</h2>
        <span className="Sub-Heading">Join our marketplace and start selling your products or services</span>
      </div>

      <div className="form-section container">
        <h2 className="form-title mb-4">Basic Information</h2>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Full Name</label>
            <input type="text" name="fullName" className="form-control" onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label>Phone Number</label>
            <input type="text" name="phoneNumber" className="form-control" onChange={handleChange} />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Email Address</label>
            <input type="email" name="email" className="form-control" onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label>Business Name</label>
            <input type="text" name="businessName" className="form-control" onChange={handleChange} />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Location</label>
            <input type="text" name="location" className="form-control" onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label>Password</label>
            <input type="password" name="password" className="form-control" onChange={handleChange} />
          </div>
        </div>

        <h2 className="form-title mt-5 mb-3">Business Category</h2>
        <div className="row mb-4">
          {["Technical", "Non-Technical", "Products"].map((cat, idx) => (
            <div className="col-md-4 mb-2" key={idx}>
              <button
                type="button"
                className={`btn w-100 d-flex align-items-center justify-content-center gap-2 ${
                  cat === "Technical" ? "btn-primary" : cat === "Non-Technical" ? "btn-success" : "btn-warning"
                }`}
                onClick={() => handleCategoryClick(cat)}
              >
                <i className={`bi ${
                  cat === "Technical" ? "bi-building" :
                  cat === "Non-Technical" ? "bi-person-workspace" :
                  "bi-box-seam"
                }`}></i> {cat}
              </button>
            </div>
          ))}
        </div>

        {selectedCategory && (
          <div className="row mb-4">
            <div className="col-md-6">
              <label htmlFor="subCategory">Specialization</label>
              <select
                className="form-select"
                name="subCategory"
                id="subCategory"
                onChange={handleChange}
              >
                <option value="">Select...</option>
                {subCategories[selectedCategory].map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="row mb-4">
          <div className="col-md-6">
            <label>Certificate Upload</label>
            <div className="document12">
              <div className="upload-container123">
                <i className="bi bi-cloud-arrow-up upload-icon"></i>
                <span className="text123">Drag and drop your images here or</span>
                <input type="file" name="certificate" id="file" className="file-input" />
                <label htmlFor="file" className="custom-file-label">Upload Document</label>
              </div>
            </div>
          </div>
        </div>

        <div className="Register-Button">
          <button type="button" className="btn btn-primary btn-load" onClick={handleSubmit}>
            Register Now <i className="bi bi-arrow-right right"></i>
          </button>
          <div className="Span-a">
            <span>Already registered? <a href="/">Sign in</a></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
