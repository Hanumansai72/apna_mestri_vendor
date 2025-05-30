import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Registration() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get('tab') === 'product' ? 'Product' : 'Professional';

  const [activeTab, setActiveTab] = useState(initialTab);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [idType, setIdType] = useState('PAN');
  const [imageFile, setImageFile] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpMessage, setOtpMessage] = useState('');
  const [formData, setFormData] = useState({
    Business_Name: '',
    Owner_name: '',
    Phone_number: '',
    Email_address: '',
    Business_address: '',
    Category: 'Product',
    Sub_Category: [],
    Tax_ID: '',
    Password: '',
    Latitude: '',
    Longitude: '',
    ProductUrl: '',
    ID_Type: 'PAN',
  });

  const subCategories = {
    Technical: ['Architects', 'Civil Engineer', 'Site Supervisor'],
    'Non-Technical': ['Plumber', 'Electrician', 'Painter'],
  };

  useEffect(() => {
    const tabFromUrl = new URLSearchParams(location.search).get('tab');
    if (tabFromUrl && (tabFromUrl.toLowerCase() === 'product' || tabFromUrl.toLowerCase() === 'professional')) {
      setActiveTab(tabFromUrl.charAt(0).toUpperCase() + tabFromUrl.slice(1).toLowerCase());
    }
  }, [location.search]);

  // Sync Category to activeTab and vice versa
  useEffect(() => {
    setFormData((prev) => ({ ...prev, Category: activeTab }));
  }, [activeTab]);

  const handleCategoryClick = (category) => {
    setActiveTab(category);
    setFormData((prev) => ({ ...prev, Category: category, Sub_Category: [] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'Email_address') {
      setOtpSent(false);
      setOtpVerified(false);
      setOtp('');
      setOtpMessage('');
    }
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) return toast.error('Geolocation not supported');
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude, longitude } = coords;
        try {
          const res = await fetch(
            `https://us1.locationiq.com/v1/reverse?key=pk.b6ebdeccc1f35c3e45b72aba8fec713c&lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const address = data.display_name || '';
          const state = data.address?.state || '';
          const city = data.address?.city || data.address?.town || data.address?.village || '';
          const postcode = data.address?.postcode || '';
          setFormData((prev) => ({
            ...prev,
            Business_address: `${address}, ${city}, ${state} - ${postcode}`,
            Latitude: latitude.toString(),
            Longitude: longitude.toString(),
          }));
        } catch {
          toast.error('Location fetch failed');
        }
      },
      () => toast.error('Location access denied')
    );
  };

  const uploadImageToCloudinary = async () => {
    const data = new FormData();
    data.append('file', imageFile);
    data.append('upload_preset', 'myupload');
    data.append('cloud_name', 'dqxsgmf33');
    const res = await fetch('https://api.cloudinary.com/v1_1/dqxsgmf33/image/upload', {
      method: 'POST',
      body: data,
    });
    const cloudData = await res.json();
    return cloudData.secure_url;
  };

  const sendOtp = async () => {
    if (!formData.Email_address) return toast.warning('Please enter your email first.');
    try {
      await axios.post('https://backend-d6mx.vercel.app/sendotp', {
        Email: formData.Email_address,
      });
      toast.success('OTP sent to your email');
      setOtpSent(true);
      setOtpVerified(false);
      setOtp('');
      setOtpMessage('');
    } catch (error) {
      toast.error('Failed to send OTP.');
    }
  };

  const verifyOtp = async () => {
    if (!otp) return toast.warning('Please enter the OTP');
    try {
      await axios.post('https://backend-d6mx.vercel.app/verifyotp', {
        Email: formData.Email_address,
        otp: otp,
      });
      setOtpVerified(true);
      setOtpMessage('OTP verified!');
      toast.success('OTP verified!');
    } catch (error) {
      setOtpVerified(false);
      setOtpMessage('Invalid OTP');
      toast.error('Invalid OTP');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpVerified) return toast.error('Please verify OTP before registering.');
    if (formData.Password !== confirmPassword) return toast.error('Passwords do not match');

    let imageUrl = '';
    if (imageFile) {
      toast.info('Uploading ID image...');
      imageUrl = await uploadImageToCloudinary();
    }

    try {
      const res = await axios.post('https://backend-d6mx.vercel.app/register', {
        ...formData,
        ProductUrl: imageUrl,
        ID_Type: idType,
      });

      if (res.status === 200) {
        toast.success('Vendor registered successfully!');
        setFormData({
          Business_Name: '',
          Owner_name: '',
          Phone_number: '',
          Email_address: '',
          Business_address: '',
          Category: 'Product',
          Sub_Category: [],
          Tax_ID: '',
          Password: '',
          Latitude: '',
          Longitude: '',
          ProductUrl: '',
          ID_Type: 'PAN',
        });
        setConfirmPassword('');
        setImageFile(null);
        navigate('/login');
      } else {
        toast.error('Registration failed');
      }
    } catch (err) {
      toast.error('Error submitting form');
    }
  };

  return (
    <div className="container my-5">
      <ToastContainer />
      <h2 className="mb-4">Vendor Registration - {activeTab}</h2>

      {/* Tabs for switching */}
      <div className="mb-4">
        <button
          className={`btn me-2 ${activeTab === 'Product' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => handleCategoryClick('Product')}
          type="button"
        >
          Product
        </button>
        <button
          className={`btn ${activeTab === 'Professional' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => handleCategoryClick('Professional')}
          type="button"
        >
          Professional
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Business Name</label>
          <input
            type="text"
            className="form-control"
            name="Business_Name"
            value={formData.Business_Name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Owner Name</label>
          <input
            type="text"
            className="form-control"
            name="Owner_name"
            value={formData.Owner_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Email Address</label>
          <div className="d-flex">
            <input
              type="email"
              className="form-control me-2"
              name="Email_address"
              value={formData.Email_address}
              onChange={handleChange}
              required
            />
            <button type="button" className="btn btn-outline-primary me-2" onClick={sendOtp}>
              Send OTP
            </button>
            <button type="button" className="btn btn-outline-success" onClick={verifyOtp}>
              Verify OTP
            </button>
          </div>
          <small className={otpVerified ? 'text-success' : 'text-danger'}>{otpMessage}</small>
          <input
            type="text"
            className="form-control mt-2"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Phone Number</label>
          <input
            type="tel"
            className="form-control"
            name="Phone_number"
            value={formData.Phone_number}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Business Address</label>
          <textarea
            className="form-control"
            name="Business_address"
            value={formData.Business_address}
            onChange={handleChange}
          />
          <button type="button" className="btn btn-link" onClick={handleLocateMe}>
            Locate Me
          </button>
        </div>

        {/* Subcategory checkboxes for Professional category */}
        {formData.Category === 'Professional' && (
          <div className="mb-3">
            <label>Sub Category (Select all that apply)</label>

            <div>
              <strong>Technical</strong>
              {subCategories.Technical.map((subCat) => (
                <div className="form-check" key={subCat}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={subCat}
                    value={subCat}
                    checked={formData.Sub_Category.includes(subCat)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setFormData((prev) => {
                        let newSubCats = [...prev.Sub_Category];
                        if (checked) {
                          if (!newSubCats.includes(subCat)) newSubCats.push(subCat);
                        } else {
                          newSubCats = newSubCats.filter((sc) => sc !== subCat);
                        }
                        return { ...prev, Sub_Category: newSubCats };
                      });
                    }}
                  />
                  <label className="form-check-label" htmlFor={subCat}>
                    {subCat}
                  </label>
                </div>
              ))}
            </div>

            <div className="mt-2">
              <strong>Non-Technical</strong>
              {subCategories['Non-Technical'].map((subCat) => (
                <div className="form-check" key={subCat}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={subCat}
                    value={subCat}
                    checked={formData.Sub_Category.includes(subCat)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setFormData((prev) => {
                        let newSubCats = [...prev.Sub_Category];
                        if (checked) {
                          if (!newSubCats.includes(subCat)) newSubCats.push(subCat);
                        } else {
                          newSubCats = newSubCats.filter((sc) => sc !== subCat);
                        }
                        return { ...prev, Sub_Category: newSubCats };
                      });
                    }}
                  />
                  <label className="form-check-label" htmlFor={subCat}>
                    {subCat}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-3">
          <label>ID Type</label>
          <select
            className="form-select"
            value={idType}
            onChange={(e) => setIdType(e.target.value)}
          >
            <option value="PAN">PAN</option>
            <option value="Aadhar">Aadhar</option>
            <option value="Passport">Passport</option>
          </select>
        </div>

        <div className="mb-3">
          <label>ID Image Upload</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}

export default Registration;
