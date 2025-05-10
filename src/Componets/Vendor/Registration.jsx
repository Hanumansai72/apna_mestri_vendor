import React, { useState } from 'react';

function Registration() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formData, setFormData] = useState({
    Business_Name: "",
    Owner_name: "",
    Email_address: "",
    Phone_number: "",
    Business_address: "",
    Category: "",
    Sub_Category: "",
    Tax_ID: "",
    Password:""
  });

  const subCategories = {
    "Technical": [ "Architects", "Civil Engineer", "Site Supervisor", "Survey Engineer", "MEP Consultant", "Structural Engineer", "Project Manager", "HVAC Engineer", "Safety Engineer", "Contractor", "Interior Designer", "WaterProofing Consultant", "Acoustic Consultants" ],
    "Non-Technical": [ "EarthWork Labour", "Civil Mason", "Shuttering/Centring Labour", "Plumber", "Electrician", "Painter", "Carpenter", "Flooring Labour", "False Ceiling Worker" ],
    "Products": [ "Bricks / Block", "Cement / Adhesives", "Aggregate vendors", "Steel", "Stone / Tiles", "Paints", "Electrical wires & fixtures", "Plumbing pipes & fixtures", "Civil products (All handy tools for civil works)", "Glass", "Doors & Windows", "Wood and Hardware", "Fabricators", "Waterproofing products", "Landscape products", "Lights", "Electrical", "Carpenter", "Flooring and Dado", "Wall papers", "False Ceiling", "Glass work", "Cleaning products", "Furniture", "Blinds and Curtains", "Acoustics" ]
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setFormData(prev => ({ ...prev, Category: category, Sub_Category: "" }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://backend-d6mx.vercel.app/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Vendor registered successfully');
        setFormData({
          Business_Name: "",
          Owner_name: "",
          Email_address: "",
          Phone_number: "",
          Business_address: "",
          Category: "",
          Sub_Category: "",
          Tax_ID: "",
          Password:""

        });
        setSelectedCategory("");
      } else {
        alert('Registration failed');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h2>Register as a Vendor</h2>
        <p className="text-muted">Join our marketplace as a service or product provider</p>
      </div>

      <form className="card p-4 shadow" onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Business Name</label>
            <input type="text" className="form-control" name="Business_Name" value={formData.Business_Name} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Owner Name</label>
            <input type="text" className="form-control" name="Owner_name" value={formData.Owner_name} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-control" name="Email_address" value={formData.Email_address} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone Number</label>
            <input type="text" className="form-control" name="Phone_number" value={formData.Phone_number} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Business Address</label>
            <input type="text" className="form-control" name="Business_address" value={formData.Business_address} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Tax ID</label>
            <input type="text" className="form-control" name="Tax_ID" value={formData.Tax_ID} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input type="text" className="form-control" name="Password" value={formData.Password} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Re-type Password</label>
            <input type="text" className="form-control" />
          </div>
        </div>

        <h4 className="mt-5 mb-4">Business Category</h4>
        <div className="row g-3 text-center">
          {["Technical", "Non-Technical", "Products"].map((category, idx) => (
            <div className="col-md-4" key={idx}>
              <button
                type="button"
                className={`btn w-100 ${category === "Technical" ? "btn-primary" : category === "Non-Technical" ? "btn-success" : "btn-warning"}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            </div>
          ))}
        </div>

        {selectedCategory && (
          <div className="mt-4">
            <label className="form-label">Specialization</label>
            <select className="form-select" name="Sub_Category" value={formData.Sub_Category} onChange={handleChange}>
              <option value="">Select...</option>
              {subCategories[selectedCategory].map((item, idx) => (
                <option key={idx} value={item}>{item}</option>
              ))}
            </select>
          </div>
        )}

        <div className="d-grid mt-5 mb-3">
          <button type="submit" className="btn btn-primary">
            Register Now
          </button>
        </div>
      </form>
    </div>
  );
}

export default Registration;
