import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Registration() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [idType, setIdType] = useState("PAN");
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
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
    Longitude: "",
    ProductUrl: "",
    ID_Type: "PAN"
  });

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
    setFormData(prev => ({ ...prev, Category: category, Sub_Category: [] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocateMe = () => {
  if (!navigator.geolocation) return toast.error("Geolocation not supported");

  navigator.geolocation.getCurrentPosition(async ({ coords }) => {
    const { latitude, longitude } = coords;

    try {
      const apiKey = 'pk.b6ebdeccc1f35c3e45b72aba8fec713c'; // Replace with your actual API key
      const res = await fetch(`https://us1.locationiq.com/v1/reverse?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json`);
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
    } catch (error) {
      toast.error("Location fetch failed");
      console.error(error);
    }
  }, () => toast.error("Location access denied"));
};

  const uploadImageToCloudinary = async () => {
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "myupload"); // Replace
    data.append("cloud_name", "dqxsgmf33");       // Replace

    const res = await fetch("https://api.cloudinary.com/v1_1/dqxsgmf33/image/upload", {
      method: "POST",
      body: data
    });
    const cloudData = await res.json();
    return cloudData.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.Password !== confirmPassword) return toast.error("Passwords do not match");

    try {
      let imageUrl = "";
      if (imageFile) {
        toast.info("Uploading image...");
        imageUrl = await uploadImageToCloudinary();
      }

      const res = await fetch('https://backend-d6mx.vercel.app/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, ProductUrl: imageUrl, ID_Type: idType }),
      });

      if (res.ok) {
        toast.success("Vendor registered successfully!");
        setFormData({ Business_Name: "", Owner_name: "", Email_address: "", Phone_number: "", Business_address: "", Category: "", Sub_Category: [], Tax_ID: "", Password: "", Latitude: "", Longitude: "", ProductUrl: "", ID_Type: "PAN" });
        setConfirmPassword("");
        setSelectedCategory("");
        setImageFile(null);
      } else {
        toast.error("Registration failed");
      }
    } catch (err) {
      toast.error("Error submitting form");
      console.error(err);
    }
  };

  return (
    <div className="container my-5">
      <ToastContainer />
      <button className="btn btn-secondary mb-3" onClick={() => navigate('/login')}>← Back to Login</button>
      <form className="card p-4 shadow" onSubmit={handleSubmit}>
        <div className="text-center mb-4">
          <h2>Register as a Vendor</h2>
        </div>

        <div className="row g-3">
          {/* Basic Info Fields */}
          <div className="col-md-6"><label>Business Name</label><input type="text" className="form-control" name="Business_Name" value={formData.Business_Name} onChange={handleChange} required /></div>
          <div className="col-md-6"><label>Owner Name</label><input type="text" className="form-control" name="Owner_name" value={formData.Owner_name} onChange={handleChange} required /></div>
          <div className="col-md-6"><label>Email</label><input type="email" className="form-control" name="Email_address" value={formData.Email_address} onChange={handleChange} required /></div>
          <div className="col-md-6"><label>Phone</label><input type="text" className="form-control" name="Phone_number" value={formData.Phone_number} onChange={handleChange} required /></div>
          <div className="col-md-12">
            <label>Business Address</label>
            <div className="input-group">
              <input type="text" className="form-control" name="Business_address" value={formData.Business_address} onChange={handleChange} />
              <button type="button" className="btn btn-outline-primary" onClick={handleLocateMe}>Locate Me</button>
            </div>
          </div>
          <div className="col-md-6"><label>Tax ID</label><input type="text" className="form-control" name="Tax_ID" value={formData.Tax_ID} onChange={handleChange} /></div>
          <div className="col-md-6"><label>Password</label><input type="password" className="form-control" name="Password" value={formData.Password} onChange={handleChange} required /></div>
          <div className="col-md-6"><label>Confirm Password</label><input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required /></div>

          {/* ID Type Dropdown */}
          <div className="col-md-6">
            <label>Select ID Type</label>
            <select className="form-select" value={idType} onChange={(e) => setIdType(e.target.value)}>
              <option value="PAN">PAN Card</option>
              <option value="AADHAR">Aadhar Card</option>
            </select>
          </div>

          {/* Image Upload */}
          <div className="col-md-12">
            <label>Upload ID Image</label>
            <input type="file" className="form-control" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
          </div>
        </div>

        {/* Category Buttons */}
        <h4 className="mt-4">Business Category</h4>
        <div className="row text-center">
          {["Technical", "Non-Technical", "Products"].map((cat, idx) => (
            <div className="col-md-4" key={idx}>
              <button type="button" className={`btn w-100 ${cat === "Technical" ? "btn-primary" : cat === "Non-Technical" ? "btn-success" : "btn-warning"}`} onClick={() => handleCategoryClick(cat)}>{cat}</button>
            </div>
          ))}
        </div>

        {/* Sub-category */}
        {selectedCategory && selectedCategory !== "Products" && (
          <div className="mt-4">
            <label>Specializations</label>
            <div className="row">
              {subCategories[selectedCategory].map((item, idx) => (
                <div className="col-md-6" key={idx}>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" checked={formData.Sub_Category.includes(item)} onChange={() => {
                      const updated = formData.Sub_Category.includes(item)
                        ? formData.Sub_Category.filter(i => i !== item)
                        : [...formData.Sub_Category, item];
                      setFormData(prev => ({ ...prev, Sub_Category: updated }));
                    }} />
                    <label className="form-check-label">{item}</label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="d-grid mt-4"><button type="submit" className="btn btn-primary">Register Now</button></div>
        <div className="text-center mt-3">Already have an account? <a href="/login">Login</a></div>
      </form>
    </div>
  );
}

export default Registration;
