import React, { useState } from "react";
import {
  Card,
  Button,
  Form,
  Row,
  Col,
  Badge,
  Modal,
} from "react-bootstrap";
import { FaEdit, FaEye } from "react-icons/fa";

const sampleProducts = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    subcategory: "Audio",
    price: 89.99,
    stock: 42,
    views: 128,
    availability: true,
    status: "Available",
  },
  {
    id: 2,
    name: "Premium Cotton T-Shirt",
    category: "Clothing",
    subcategory: "Men's Wear",
    price: 24.99,
    stock: 5,
    views: 87,
    availability: true,
    status: "Low Stock",
  },
  {
    id: 3,
    name: "Smart Home Speaker",
    category: "Electronics",
    subcategory: "Smart Home",
    price: 129.99,
    stock: 0,
    views: 215,
    availability: false,
    status: "Out of Stock",
  },
];

const ProductList = () => {
  const [products, setProducts] = useState(sampleProducts);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const handleToggle = (id) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, availability: !product.availability } : product
      )
    );
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditProduct(null);
  };

  const handleSaveChanges = () => {
    setProducts((prev) =>
      prev.map((p) => (p.id === editProduct.id ? editProduct : p))
    );
    handleModalClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mt-4">
      <h3>Your Products</h3>
      <p>Manage and update your product listings.</p>

      <Row className="mb-4">
        <Col md={4}>
          <Form.Control placeholder="Search products..." />
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

      {/* Product Cards */}
      <Row>
        {products.map((product) => (
          <Col md={4} className="mb-4" key={product.id}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src="https://via.placeholder.com/200x150"
                alt={product.name}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <h6>${product.price.toFixed(2)}</h6>
                <p className="text-muted">
                  {product.category} . {product.subcategory}
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
                  <FaEdit /> Edit
                </Button>
                <Form.Check
                  type="switch"
                  checked={product.availability}
                  onChange={() => handleToggle(product.id)}
                />
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
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
              <Form.Group className="mb-2">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={editProduct.status}
                  onChange={handleInputChange}
                >
                  <option>Available</option>
                  <option>Low Stock</option>
                  <option>Out of Stock</option>
                </Form.Select>
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
  );
};

export default ProductList;
