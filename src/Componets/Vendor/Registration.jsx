import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Registration() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("");
  const [selectedServiceType, setSelectedServiceType] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [idType, setIdType] = useState("PAN");
  const [imageFile, setImageFile] = useState(null);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');

  const [formData, setFormData] = useState({
    Business_Name: "", Owner_name: "", Email_address: "", Phone_number: "",
    Business_address: "", Category: "", Sub_Category: [], Tax_ID: "",
    Password: "", Latitude: "", Longitude: "", ProductUrl: "", ID_Type: "PAN"
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

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    setSelectedServiceType("");
    setFormData(prev => ({ ...prev, Category: tab, Sub_Category: [] }));
  };

  const handleServiceTypeClick = (type) => {
    setSelectedServiceType(type);
    setFormData(prev => ({ ...prev, Category: type, Sub_Category: [] }));
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
        const apiKey = 'pk.b6ebdeccc1f35c3e45b72aba8fec713c';
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

  const handleSendOtp = async () => {
    const emailInput = document.getElementsByName("Email_address")[0];
  const email = emailInput?.value;
    console.log(email)
    

    try {
      const res = await fetch("https://backend-d6mx.vercel.app/sendotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email:email })
      });

      if (res.ok) {
        toast.success("OTP sent to your email!");
        setShowOtp(true);
      } else {
        const err = await res.json();
        toast.error(err.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error("Failed to send OTP");
      console.error(error);
    }
  };

  const handleOtpChange = (e) => setOtp(e.target.value);

  const uploadImageToCloudinary = async () => {
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "myupload");
    data.append("cloud_name", "dqxsgmf33");

    const res = await fetch("https://api.cloudinary.com/v1_1/dqxsgmf33/image/upload", {
      method: "POST",
      body: data
    });

    const cloudData = await res.json();
    return cloudData.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.Password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (!otp || otp.length !== 6) {
      return toast.error("Please enter the 6-digit OTP sent to your email");
    }

    try {
      const verifyRes = await fetch("https://backend-d6mx.vercel.app/verifyotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: formData.Email_address, otp })
      });

      if (!verifyRes.ok) {
        const errorData = await verifyRes.json();
        return toast.error(errorData.error || "OTP verification failed");
      }
    } catch (err) {
      toast.error("OTP verification request failed");
      return;
    }

    let imageUrl = "";
    if (imageFile) {
      try {
        imageUrl = await uploadImageToCloudinary();
      } catch (error) {
        toast.error("Image upload failed");
        return;
      }
    }

    try {
      const res = await fetch('https://backend-d6mx.vercel.app/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, ProductUrl: imageUrl, ID_Type: idType }),
      });

      if (res.ok) {
        toast.success("Vendor registered successfully!");
        setFormData({
          Business_Name: "", Owner_name: "", Email_address: "", Phone_number: "",
          Business_address: "", Category: "", Sub_Category: [], Tax_ID: "",
          Password: "", Latitude: "", Longitude: "", ProductUrl: "", ID_Type: "PAN"
        });
        setConfirmPassword("");
        setSelectedTab("");
        setSelectedServiceType("");
        setImageFile(null);
        setShowOtp(false);
        setOtp("");
      } else if (res.status === 400) {
        toast.error("Email already exists");
      } else {
        toast.error("Registration failed");
      }
    } catch (err) {
      toast.error("Error submitting form");
    }
  };

  return (
    <div className="container my-5">
      <ToastContainer />
      <button className="btn btn-secondary mb-3" onClick={() => navigate('/login')}>← Back to Login</button>
      <div className="row text-center mb-3">
            {["Service", "Product"].map((tab, idx) => (
              <div className="col-md-6" key={idx}>
                <button
                  type="button"
                  className={`btn w-100 ${selectedTab === tab ? "btn-dark" : "btn-outline-secondary"}`}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab}
                </button>
              </div>
            ))}
          </div>
      <form className="card p-4 shadow" onSubmit={handleSubmit}>
        
        <h2 className="text-center mb-4">Register as a Vendor</h2>

        <div className="row g-3">
          <div className="col-md-6">
            <label>Business Name</label>
            <input className="form-control" name="Business_Name" value={formData.Business_Name} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label>Owner Name</label>
            <input className="form-control" name="Owner_name" value={formData.Owner_name} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label>Email</label>
            <input className="form-control" type="email" name="Email_address" value={formData.Email_address} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <label>Phone</label>
            <input className="form-control" name="Phone_number" value={formData.Phone_number} onChange={handleChange} required />
          </div>
          <div className="col-md-3 d-flex align-items-end">
            <button type="button" className="btn btn-outline-primary w-100" onClick={handleSendOtp}>Send OTP</button>
          </div>
          {showOtp && (
            <div className="col-md-3">
              <label>Enter OTP</label>
              <input className="form-control" value={otp} onChange={handleOtpChange} maxLength={6} required />
            </div>
          )}
          <div className="col-md-9">
            <label>Business Address</label>
            <input className="form-control" name="Business_address" value={formData.Business_address} onChange={handleChange} required />
          </div>
          <div className="col-md-3 d-flex align-items-end">
            <button type="button" className="btn btn-outline-secondary w-100" onClick={handleLocateMe}>📍 Locate Me</button>
          </div>

          

          {/* Sub-Category Buttons for Service Tab */}
          {selectedTab === "Service" && (
            <div className="row text-center mb-3">
              {["Technical", "Non-Technical"].map((type, idx) => (
                <div className="col-md-6" key={idx}>
                  <button
                    type="button"
                    className={`btn w-100 ${selectedServiceType === type ? "btn-dark" : "btn-outline-secondary"}`}
                    onClick={() => handleServiceTypeClick(type)}
                  >
                    {type}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Sub-Categories */}
          {selectedTab === "Service" && selectedServiceType && (
            <div className="col-md-12">
              <label>Specializations</label>
              <div className="row">
                {subCategories[selectedServiceType]?.map((item, idx) => (
                  <div className="col-md-6" key={idx}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={formData.Sub_Category.includes(item)}
                        onChange={() => {
                          const updated = formData.Sub_Category.includes(item)
                            ? formData.Sub_Category.filter(i => i !== item)
                            : [...formData.Sub_Category, item];
                          setFormData(prev => ({ ...prev, Sub_Category: updated }));
                        }}
                      />
                      <label className="form-check-label">{item}</label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other Fields */}
          <div className="col-md-6">
            <label>Government ID Type</label>
            <select className="form-select" value={idType} onChange={(e) => setIdType(e.target.value)}>
              <option value="PAN">PAN</option>
              <option value="Aadhar">Aadhar</option>
            </select>
          </div>
          <div className="col-md-6">
            <label>ID Number</label>
            <input className="form-control" name="Tax_ID" value={formData.Tax_ID} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label>Password</label>
            <input className="form-control" type="password" name="Password" value={formData.Password} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label>Confirm Password</label>
            <input className="form-control" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <div className="col-md-12">
            <label>Upload ID/Business Image</label>
            <input className="form-control" type="file" onChange={(e) => setImageFile(e.target.files[0])} />
          </div>
        </div>

        <button type="submit" className="btn btn-success mt-4 w-100">Register</button>
      </form>
    </div>
  );
}

export default Registration;
