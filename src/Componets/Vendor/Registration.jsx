import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    Password: "",
    Latitude: "",
    Longitude: ""
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const subCategories = {
    "Technical": [
      "Architects", "Civil Engineer", "Site Supervisor", "Survey Engineer", "MEP Consultant",
      "Structural Engineer", "Project Manager", "HVAC Engineer", "Safety Engineer", "Contractor",
      "Interior Designer", "WaterProofing Consultant", "Acoustic Consultants"
    ],
    "Non-Technical": [
      "EarthWork Labour", "Civil Mason", "Shuttering/Centring Labour", "Plumber",
      "Electrician", "Painter", "Carpenter", "Flooring Labour", "False Ceiling Worker"
    ]
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setFormData(prev => ({ ...prev, Category: category, Sub_Category: "" }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
        const data = await res.json();

        const address = data.display_name || "";
        const state = data.address?.state || "";
        const city = data.address?.city || data.address?.town || data.address?.village || "";
        const postcode = data.address?.postcode || "";

        setFormData(prev => ({
          ...prev,
          Business_address: `${address}, ${city}, ${state} - ${postcode}`,
          Latitude: latitude.toString(),
          Longitude: longitude.toString()
        }));
      } catch (err) {
        console.error("Error fetching location data", err);
        alert("Failed to get address from location");
      }
    }, (err) => {
      alert("Location access denied or unavailable");
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.Password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!formData.Business_Name || !formData.Owner_name || !formData.Email_address || !formData.Phone_number) {
      alert("Please fill in all required fields");
      return;
    }

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
          Sub_Category: [],
          Tax_ID: "",
          Password: "",
          Latitude: "",
          Longitude: ""
        });
        setConfirmPassword("");
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
      <div>
        <button className="btn btn-secondary mb-3" onClick={() => navigate('/login')}>
          ← Back to Login
        </button>
      </div>

      <div className="text-center mb-4">
        <h2>Register as a Vendor</h2>
        <p className="text-muted">Join our marketplace as a service or product provider</p>
      </div>

      <form className="card p-4 shadow" onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Business Name</label>
            <input type="text" className="form-control" name="Business_Name" value={formData.Business_Name} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Owner Name</label>
            <input type="text" className="form-control" name="Owner_name" value={formData.Owner_name} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-control" name="Email_address" value={formData.Email_address} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone Number</label>
            <input type="text" className="form-control" name="Phone_number" value={formData.Phone_number} onChange={handleChange} required />
          </div>
          <div className="col-md-12">
            <label className="form-label">Business Address</label>
            <div className="input-group">
              <input type="text" className="form-control" name="Business_address" value={formData.Business_address} onChange={handleChange} />
              <button type="button" className="btn btn-outline-primary" onClick={handleLocateMe}>Locate Me</button>
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label">Tax ID</label>
            <input type="text" className="form-control" name="Tax_ID" value={formData.Tax_ID} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name="Password" value={formData.Password} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Re-type Password</label>
            <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
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

        {selectedCategory && selectedCategory !== "Products" && (
  <div className="mt-4">
    <label className="form-label">Specializations (select one or more)</label>
    <div className="row">
      {subCategories[selectedCategory]?.map((item, idx) => (
        <div className="col-md-6" key={idx}>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={`subcat-${idx}`}
              checked={formData.Sub_Category.includes(item)}
              onChange={(e) => {
                const updated = formData.Sub_Category.includes(item)
                  ? formData.Sub_Category.filter(i => i !== item)
                  : [...formData.Sub_Category, item];
                setFormData(prev => ({ ...prev, Sub_Category: updated }));
              }}
            />
            <label className="form-check-label" htmlFor={`subcat-${idx}`}>
              {item}
            </label>
          </div>
        </div>
      ))}
    </div>
  </div>
)}


        <div className="d-grid mt-5 mb-3">
          <button type="submit" className="btn btn-primary">
            Register Now
          </button>
        </div>
        <div className="d-grid mt-3 text-center">
          <label>Already have an account?</label>
          <a href="/login">Login</a>
        </div>
      </form>
    </div>
  );
}

export default Registration;
