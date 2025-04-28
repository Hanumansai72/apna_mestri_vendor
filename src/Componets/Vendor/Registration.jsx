import React, { useState } from 'react';

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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const today = new Date();
    const currentDate = today.toISOString().split('T')[0];

    const finalData = { ...formData, registrationDate: currentDate };

    await fetch('https://backend-d6mx.vercel.app/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalData),
    });
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h2>Register as a Service or Product Provider</h2>
        <p className="text-muted">Join our marketplace and start selling your products or services</p>
      </div>

      <form className="card p-4 shadow" onSubmit={handleSubmit}>
        <h4 className="mb-4">Basic Information</h4>

        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="fullName" className="form-label">Full Name</label>
            <input type="text" className="form-control" id="fullName" name="fullName" onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
            <input type="text" className="form-control" id="phoneNumber" name="phoneNumber" onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input type="email" className="form-control" id="email" name="email" onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="businessName" className="form-label">Business Name</label>
            <input type="text" className="form-control" id="businessName" name="businessName" onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="location" className="form-label">Location</label>
            <input type="text" className="form-control" id="location" name="location" onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" onChange={handleChange} />
          </div>
        </div>

        <h4 className="mt-5 mb-4">Business Category</h4>
        <div className="row g-3 text-center">
          {["Technical", "Non-Technical", "Products"].map((category, idx) => (
            <div className="col-md-4" key={idx}>
              <button
                type="button"
                className={`btn w-100 ${
                  category === "Technical" ? "btn-primary" : category === "Non-Technical" ? "btn-success" : "btn-warning"
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            </div>
          ))}
        </div>

        {selectedCategory && (
          <div className="mt-4">
            <label htmlFor="subCategory" className="form-label">Specialization</label>
            <select
              className="form-select"
              id="subCategory"
              name="subCategory"
              onChange={handleChange}
            >
              <option value="">Select...</option>
              {subCategories[selectedCategory].map((item, idx) => (
                <option key={idx} value={item}>{item}</option>
              ))}
            </select>
          </div>
        )}

        <h4 className="mt-5 mb-3">Certificate Upload</h4>
        <div className="mb-4">
          <label htmlFor="certificate" className="form-label">Upload your Certificate</label>
          <input type="file" className="form-control" id="certificate" name="certificate" />
        </div>

        <div className="d-grid mb-3">
          <button type="submit" className="btn btn-primary">
            Register Now <i className="bi bi-arrow-right"></i>
          </button>
        </div>

        <div className="text-center">
          <p>Already registered? <a href="/">Sign in</a></p>
        </div>
      </form>
    </div>
  );
}

export default Registration;
