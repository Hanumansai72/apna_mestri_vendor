import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    subCategory: "",
    price: 0,
    stock: 0,
    location: "",
    tags: "",
    description: "",
    images: [],
    featured: false
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, images: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

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

      <div className="container mt-5">
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button className="nav-link active" aria-current="page">
              Single Product
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={() => navigate("/addproduct/BulkUpload")}> 
              Bulk Upload (CSV)
            </button>
          </li>
        </ul>

        <h3 className="mb-4">Add New Product</h3>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Product Name *</label>
              <input
                type="text"
                className="form-control"
                name="productName"
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-3 mb-3">
              <label>Category *</label>
              <select
                className="form-select"
                name="category"
                onChange={handleInputChange}
                required
              >
                <option value="">Select category</option>
                <option value="Tools">Tools</option>
                <option value="Materials">Materials</option>
              </select>
            </div>

            <div className="col-md-3 mb-3">
              <label>Sub-Category *</label>
              <select
                className="form-select"
                name="subCategory"
                onChange={handleInputChange}
                required
              >
                <option value="">Select sub-category</option>
                <option value="Electric">Electric</option>
                <option value="Plumbing">Plumbing</option>
              </select>
            </div>

            <div className="col-md-3 mb-3">
              <label>Price ($) *</label>
              <input
                type="number"
                className="form-control"
                name="price"
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-3 mb-3">
              <label>Stock Quantity *</label>
              <input
                type="number"
                className="form-control"
                name="stock"
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Location (optional)</label>
              <input
                type="text"
                className="form-control"
                name="location"
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-12 mb-3">
              <label>Tags (comma separated)</label>
              <input
                type="text"
                className="form-control"
                name="tags"
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-12 mb-3">
              <label>Product Images *</label>
              <input
                type="file"
                className="form-control"
                name="images"
                multiple
                accept=".jpg,.jpeg,.png"
                onChange={handleInputChange}
              />
              <small className="form-text text-muted">
                PNG, JPG up to 5MB (Max 5 images)
              </small>
            </div>

            <div className="col-md-12 mb-3">
              <label>Product Description *</label>
              <textarea
                className="form-control"
                name="description"
                rows="4"
                onChange={handleInputChange}
                required
              />
              <small className="form-text text-muted">
                Minimum 100 characters recommended
              </small>
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                name="featured"
                onChange={handleInputChange}
              />
              <label className="form-check-label">
                Feature this product on store homepage
              </label>
            </div>

            <div className="d-flex gap-2">
              <button type="reset" className="btn btn-secondary">
                Reset Form
              </button>
              <button type="button" className="btn btn-success">
                Save as Draft
              </button>
              <button type="submit" className="btn btn-primary">
                Publish Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
