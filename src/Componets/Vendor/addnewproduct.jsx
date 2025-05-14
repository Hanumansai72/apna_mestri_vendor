import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProductForm = () => {
  const vendorId=localStorage.getItem("vendorId")
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    subCategory: "",
    price: "",
    stock: "",
    location: "",
    tags: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting:", formData);

      await axios.post("https://backend-d6mx.vercel.app/addproduct", {
        Vendor: vendorId,
        ProductName: formData.productName,
        ProductPrice: formData.price,
        ProductStock: formData.stock,
        ProductDescription: formData.description,
        ProductTags: formData.tags,
        ProductCategory: formData.category,
        ProductSubCategory: formData.subCategory,
        ProductLocation: formData.location || "",
      });

      alert("Product submitted successfully!");
      navigate(`/vendor/${vendorId}/products`);
    } catch (error) {
      console.error("Error submitting product:", error);
      alert("Failed to submit product.");
    }
  };

  return (
    <div>
      <Navbar
        homeLabel="Home"
        homeUrl={`/Product/${vendorId}`}
        jobsLabel="Products"
        jobsUrl={`/vendor/${vendorId}/products`}
        historyLabel="Orders History"
        historyUrl={`/vendor/${vendorId}/orders/history`}
        earningsLabel="Earnings"
        earningsUrl={`/vendor/${vendorId}/earnings`}
      />

      <div className="container mt-5">
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button className="nav-link active">Single Product</button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link"
              onClick={() => navigate(`/vendor/${vendorId}/addproduct/BulkUpload`)}
            >
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
                value={formData.productName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-3 mb-3">
              <label>Category *</label>
              <select
                className="form-select"
                name="category"
                value={formData.category}
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
                value={formData.subCategory}
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
                value={formData.price}
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
                value={formData.stock}
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
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-12 mb-3">
              <label>Tags (comma separated)</label>
              <input
                type="text"
                className="form-control"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-12 mb-3">
              <label>Product Description *</label>
              <textarea
                className="form-control"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
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
