import React, { useState, useEffect } from 'react';
import { Table, Badge, Button, Form, Row, Col, Pagination, Modal } from 'react-bootstrap';
import Navbar from './navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';

const id = localStorage.getItem("vendorId");

const StatusBadge = (status) => {
  switch (status) {
    case 'Delivered':
      return <Badge bg="success">Delivered</Badge>;
    case 'Processing':
      return <Badge bg="info">Processing</Badge>;
    case 'Pending':
      return <Badge bg="warning">Pending</Badge>;
    case 'Cancelled':
      return <Badge bg="danger">Cancelled</Badge>;
    default:
      return <Badge bg="secondary">{status}</Badge>;
  }
};

const NewHistory = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`https://backend-d6mx.vercel.app/pending-orders`);

        const allOrders = Array.isArray(res.data.orders)
          ? res.data.orders
          : Array.isArray(res.data)
          ? res.data
          : [];

        const pendingOrders = allOrders.filter(order =>
          order.paymentStatus === 'Pending'
        );

        setOrders(pendingOrders);
      } catch (err) {
        console.error("Error fetching new orders:", err);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

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
          <h4>New Orders</h4>
        </div>

        <Row className="mb-3">
          <Col md={3}><Form.Select><option>Last 30 days</option></Form.Select></Col>
          <Col md={3}><Form.Select><option>All statuses</option></Form.Select></Col>
          <Col md={3}><Form.Select><option>All clients</option></Form.Select></Col>
          <Col md={3}><Form.Control placeholder="Search orders..." /></Col>
        </Row>

        {orders.length === 0 ? (
          <div className="alert alert-info">No pending payment orders available.</div>
        ) : (
          <Table responsive bordered hover className="job-table">
            <thead className="table-light">
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Date</th>
                <th>Status</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order._id}</td>
                  <td>{order.customerName || 'N/A'}</td>
                  <td>{order.productName || 'N/A'}</td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>{StatusBadge(order.orderStatus)}</td>
                  <td>{order.quantity}</td>
                  <td>₹{(order.pricePerUnit * order.quantity).toLocaleString()}</td>
                  <td>
                    <Button variant="outline-secondary" size="sm" onClick={() => handleViewDetails(order)}>
                      📋 View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        <Pagination className="justify-content-end">
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item active>1</Pagination.Item>
          <Pagination.Item>2</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>

        {/* Modal */}
        <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedOrder && (
              <div className="p-3">
                <div className="mb-3 d-flex justify-content-between">
                  <div>
                    <strong>Order Placed On:</strong>
                    <div>{formatDate(selectedOrder.createdAt)}</div>
                  </div>
                  <div>
                    <strong>Expected Delivery:</strong>
                    <div>{selectedOrder.expectedDeliveryDate ? formatDate(selectedOrder.expectedDeliveryDate) : 'N/A'}</div>
                  </div>
                </div>

                <div className="border rounded p-3 mb-3">
                  <h6>📦 Product Details</h6>
                  <Row>
                    <Col md={6}><strong>Product Name:</strong><div>{selectedOrder.productName}</div></Col>
                    <Col md={6}><strong>Quantity:</strong><div>{selectedOrder.quantity} Units</div></Col>
                    <Col md={6} className="mt-2"><strong>Unit Price:</strong><div>₹{selectedOrder.pricePerUnit?.toFixed(2)}</div></Col>
                    <Col md={6} className="mt-2"><strong>Total:</strong><div>₹{(selectedOrder.pricePerUnit * selectedOrder.quantity).toLocaleString()}</div></Col>
                  </Row>
                </div>

                <div className="border rounded p-3 mb-3">
                  <h6>🏠 Delivery Details</h6>
                  <strong>Shipping Address:</strong>
                  <div>
                    {selectedOrder.shippingAddress
                      ? `${selectedOrder.shippingAddress.street}, ${selectedOrder.shippingAddress.city}, ${selectedOrder.shippingAddress.state}, ${selectedOrder.shippingAddress.pincode}, ${selectedOrder.shippingAddress.country}`
                      : 'N/A'}
                  </div>
                  <div className="mt-2">
                    <strong>Special Instructions:</strong>
                    <div>{selectedOrder.notes || 'None'}</div>
                  </div>
                </div>

                <div className="border rounded p-3">
                  <h6>👤 Customer Info</h6>
                  <Row>
                    <Col md={6}><strong>Name:</strong><div>{selectedOrder.customerName}</div></Col>
                    <Col md={6}><strong>Contact:</strong><div>{selectedOrder.contact || '--'}</div></Col>
                  </Row>
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleCloseModal}>Reject Order</Button>
            <Link to="/vendor/payment" className="Linkers">
              <Button variant="success" onClick={handleCloseModal}>Accept Order</Button>
            </Link>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default NewHistory;
