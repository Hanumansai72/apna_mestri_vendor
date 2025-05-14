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

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    const vendorId = localStorage.getItem("vendorId");

    axios
      .get(`https://backend-d6mx.vercel.app/viewproduct/${vendorId}`)
      .then((res) => {
        const mappedProducts = res.data.map((product) => ({
          id: product._id,
          name: product.ProductName,
          price: parseFloat(product.ProductPrice),
          stock: parseInt(product.ProductStock),
          category: product.ProductCategory,
          subcategory: product.ProductSubCategory,
          availability: true,
          status:
            parseInt(product.ProductStock) === 0
              ? "Out of Stock"
              : parseInt(product.ProductStock) < 10
              ? "Low Stock"
              : "Available",
          description: product.ProductDescripition,
        }));

        setProducts(mappedProducts);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

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

  // Filter products by search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h3>Your Products</h3>
      <p>Manage and update your product listings.</p>

      {/* Search and Filter Controls */}
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

      {/* Product Cards */}
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
                <h6>${product.price.toFixed(2)}</h6>
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

      {/* Pagination (Static Example) */}
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

      {/* Edit Modal */}
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
