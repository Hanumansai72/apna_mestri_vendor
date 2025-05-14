import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const id=localStorage.getItem("vendorId")

const categoryBrands = {
  // Civil Vendors
  Cement: { subCategories: ["UltraTech", "ACC", "Ambuja", "Dalmia", "Ramco"] },
  Steel: { subCategories: ["TATA Tiscon", "JSW Steel", "Jindal Panther", "SAIL"] },
  Plumbing: { subCategories: ["Ashirvad", "Astral", "Prince", "Supreme"] },
  Electrical: { subCategories: ["Havells", "Finolex", "Polycab", "RR Kabel"] },
  Paints: { subCategories: ["Asian Paints", "Berger", "Nerolac", "Indigo"] },
  Bricks: { subCategories: ["Wienerberger", "Porotherm", "Jindal Bricks"] },
  Sand: { subCategories: ["Robo Sand", "River Sand", "M-Sand"] },
  Aggregates: { subCategories: ["20mm Aggregate", "40mm Aggregate", "10mm Aggregate"] },
  Concrete: { subCategories: ["RMC India", "Ultratech RMC", "ACC Ready Mix"] },
  Tiles: { subCategories: ["Kajaria", "Somany", "Nitco", "Johnson"] },
  Glass: { subCategories: ["Saint-Gobain", "AIS Glass", "Modiguard"] },
  Doors: { subCategories: ["Greenply", "CenturyPly", "Kitply", "Fenesta"] },
  Windows: { subCategories: ["Fenesta", "UPVC India", "Windoor"] },
  Roofing: { subCategories: ["Tata Shaktee", "Everest", "JSW Colouron+"] },
  GroutsSealants: { subCategories: ["Dr. Fixit", "MYK LATICRETE", "Roff"] },

  // Interior Vendors
  Lighting: { subCategories: ["Philips", "Syska", "Wipro", "Halonix"] },
  Kitchen: { subCategories: ["Hettich", "Häfele", "Godrej Interio"] },
  Wardrobe: { subCategories: ["Godrej", "Durian", "Urban Ladder"] },
  Wallpaper: { subCategories: ["Nilaya", "Excel", "Marburg"] },
  Curtains: { subCategories: ["D'Decor", "Fabindia", "Spaces"] },
  Furniture: { subCategories: ["IKEA", "Urban Ladder", "Pepperfry"] },
  BathroomFittings: { subCategories: ["Jaquar", "Kohler", "Hindware"] },
  FalseCeiling: { subCategories: ["Gyproc", "Armstrong", "USG Boral"] },
  Flooring: { subCategories: ["Pergo", "Greenlam", "Squarefoot"] },
  ModularFurniture: { subCategories: ["Godrej Interio", "Featherlite", "Zuari"] },
  DecorativePanels: { subCategories: ["Merino", "Greenlam", "Century Laminates"] },
  SmartHome: { subCategories: ["Schneider", "Anchor", "Legrand"] },
};

const AddProductForm = () => {
  const vendorId = localStorage.getItem("vendorId");
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
        homeUrl={`/Product/${id}`}
        jobsLabel="Products"
        jobsUrl={`/product/${id}/ViewProduct"`}
        historyLabel="New Orders"
        historyUrl={`/product/${id}/order`}
        earningsLabel="Order History"
        earningsUrl={`/product/${id}/order/history`}
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
                onChange={(e) => {
                  handleInputChange(e);
                  setFormData({
                    ...formData,
                    category: e.target.value,
                    subCategory: "", // Reset subcategory when category changes
                  });
                }}
                required
              >
                <option value="">Select category</option>
                {Object.keys(categoryBrands).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
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
                {categoryBrands[formData.category]?.subCategories.map((brand, index) => (
                  <option key={index} value={brand}>
                    {brand}
                  </option>
                ))}
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
            <div className="col-md-12 mb-3">
  <label htmlFor="productImage">Add Product Image</label><br />
  <input 
    type="file" 
    className="form-control" 
    id="productImage" 
    name="productImage" 
    accept="image/*"
  />
</div>

            <div className="d-flex gap-2">
              <button type="reset" className="btn btn-secondary">
                Reset Form
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
