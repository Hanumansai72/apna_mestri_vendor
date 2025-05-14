import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Form,
  Row,
  Col,
  Badge,
  Modal,
} from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import Navbar from "./navbar";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";

const id = localStorage.getItem("vendorId");

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`https://backend-d6mx.vercel.app/viewproduct/${id}`)
      .then((res) => {
        const mappedProducts = res.data.map((product) => ({
          id: product._id,
          name: product.ProductName,
          price: parseFloat(product.ProductPrice),
          stock: parseInt(product.ProductStock),
          category: product.ProductCategory,
          subcategory: product.ProductSubCategory,
          description: product.ProductDescripition,
          availability: true,
          status:
            parseInt(product.ProductStock) === 0
              ? "Out of Stock"
              : parseInt(product.ProductStock) < 10
              ? "Low Stock"
              : "Available",
        }));

        setProducts(mappedProducts);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleEditClick = (product) => {
    setEditProduct(product);
    setShowModal(true);
  };
  const handleDelete = (productId) => {
  if (window.confirm("Are you sure you want to delete this product?")) {
    axios
      .delete(`https://backend-d6mx.vercel.app/delete/${productId}`)
      .then(() => {
        setProducts((prev) => prev.filter((p) => p.id !== productId));
      })
      .catch((err) => {
        console.error("Error deleting product:", err);
        alert("Failed to delete product.");
      });
  }
};


  const handleModalClose = () => {
    setShowModal(false);
    setEditProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
  axios
    .put(` https://backend-d6mx.vercel.app/updatedetails/${editProduct.id}`, {
      ProductName: editProduct.name,
      ProductPrice: editProduct.price,
      ProductStock: editProduct.stock,
      ProductDescription: editProduct.description,
      ProductCategory: editProduct.category,
      ProductSubCategory: editProduct.subcategory,
      ProductTags: "", 
      ProductLocation: "",
    })
    .then((res) => {
      setProducts((prev) =>
        prev.map((p) => (p.id === editProduct.id ? { ...editProduct } : p))
      );
      handleModalClose();
    })
    .catch((err) => {
      console.error("Error updating product:", err);
      alert("Failed to update product.");
    });
};


  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar
        homeLabel="Home"
        homeUrl={`/Product/${id}`}
        jobsLabel="Products"
        jobsUrl={`/product/${id}/ViewProduct`}
        historyLabel="New Orders"
        historyUrl={`/product/${id}/order`}
        earningsLabel="Order History"
        earningsUrl={`/product/${id}/order/history`}
      />

      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h3>Your Products</h3>
            <p className="mb-0">Manage and update your product listings.</p>
          </div>
          <Link to={`/addproduct/${id}`} style={{ textDecoration: "none" }}>
            <Button variant="success" className="d-flex align-items-center">
              <BiPlus size={20} className="me-1" />
              Add Product
            </Button>
          </Link>
        </div>

        <Row className="mb-4">
          <Col md={4}>
            <Form.Control
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Form.Select>
              <option>Category: All</option>
              <option>Electronics</option>
              <option>Clothing</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select>
              <option>Availability: All</option>
              <option>Available</option>
              <option>Unavailable</option>
            </Form.Select>
          </Col>
          <Col md={2}>
            <Form.Select>
              <option>Sort by: Newest</option>
              <option>Price</option>
              <option>Name</option>
            </Form.Select>
          </Col>
        </Row>

        <Row>
          {filteredProducts.map((product) => (
            <Col md={4} className="mb-4" key={product.id}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src="https://via.placeholder.com/200x150"
                  alt={product.name}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <h6>{product.price}</h6>
                  <p className="text-muted">
                    {product.category} · {product.subcategory}
                  </p>
                  <p className="mb-1">
                    <strong>Stock:</strong> {product.stock}
                  </p>
                  <Badge
                    bg={
                      product.status === "Available"
                        ? "success"
                        : product.status === "Low Stock"
                        ? "warning"
                        : "danger"
                    }
                  >
                    {product.status}
                  </Badge>
                  
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-center">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleEditClick(product)}
                  >
                    <FaEdit />
                     Edit
                  </Button>
                  <Button variant="danger"  onClick={() => handleDelete(product.id)}>
              Delete
            </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="d-flex justify-content-end mt-4">
          <nav>
            <ul className="pagination">
              <li className="page-item active">
                <button className="page-link">1</button>
              </li>
              <li className="page-item">
                <button className="page-link">2</button>
              </li>
              <li className="page-item">
                <button className="page-link">3</button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Modal for Editing Product */}
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {editProduct && (
              <Form>
                <Form.Group className="mb-2">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={editProduct.name}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={editProduct.price}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    name="stock"
                    value={editProduct.stock}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    value={editProduct.description}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    name="category"
                    value={editProduct.category}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Subcategory</Form.Label>
                  <Form.Control
                    name="subcategory"
                    value={editProduct.subcategory}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ProductList;
