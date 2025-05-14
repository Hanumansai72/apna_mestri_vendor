import React, { useState } from 'react';
import { Table, Badge, Button, Form, Row, Col, Pagination, Modal } from 'react-bootstrap';
import Navbar from './navbar';
import { Link } from 'react-router-dom';


const id=localStorage.getItem("vendorId")
const civilProducts = [
  {
    id: 'NEW-ORD-001',
    productName: 'UltraTech Cement OPC 53 Grade',
    customerName: 'Sunrise Builders',
    quantity: 120,
    price: 48000,
    date: '28th April 2025',
    deliveryDate: '5th May 2025',
    address: 'Plot 45, Industrial Area, Delhi',
    instructions: 'Deliver between 9 AM - 12 PM'
  },
  {
    id: 'NEW-ORD-002',
    productName: 'Fine River Sand',
    customerName: 'Green Valley Infra',
    quantity: 50,
    price: 10000,
    date: '28th April 2025',
    deliveryDate: '6th May 2025',
    address: 'Sector 88, Noida, Uttar Pradesh',
    instructions: 'Call before delivery'
  },
  {
    id: 'NEW-ORD-003',
    productName: 'AAC Blocks (Lightweight Bricks)',
    customerName: 'Metro City Projects',
    quantity: 600,
    price: 90000,
    date: '28th April 2025',
    deliveryDate: '7th May 2025',
    address: 'Tower A, Business Bay, Mumbai',
    instructions: 'Use service lift'
  },
  {
    id: 'NEW-ORD-004',
    productName: 'TMT Steel Bars 12mm',
    customerName: 'Royal Estates',
    quantity: 300,
    price: 135000,
    date: '28th April 2025',
    deliveryDate: '8th May 2025',
    address: 'Plot 8, Hi-Tech City, Hyderabad',
    instructions: 'Unload at basement parking'
  },
  {
    id: 'NEW-ORD-005',
    productName: 'Crushed Aggregate (20mm)',
    customerName: 'Grand Buildcorp',
    quantity: 100,
    price: 15000,
    date: '28th April 2025',
    deliveryDate: '9th May 2025',
    address: 'Phase 3, Electronic City, Bangalore',
    instructions: 'Deliver at site gate'
  }
];

const StatusBadge = (status) => {
  switch (status) {
    case 'Delivered':
      return <Badge bg="success">Delivered</Badge>;
    case 'In Transit':
      return <Badge bg="info">In Transit</Badge>;
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

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
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
          <Col md={3}>
            <Form.Select>
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>This Year</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select>
              <option>All statuses</option>
              <option>Delivered</option>
              <option>In Transit</option>
              <option>Pending</option>
              <option>Cancelled</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select>
              <option>All clients</option>
              <option>Sunrise Builders</option>
              <option>Green Valley Infra</option>
              <option>Metro City Projects</option>
              <option>Royal Estates</option>
              <option>Grand Buildcorp</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Control placeholder="Search orders..." />
          </Col>
        </Row>

        <Table responsive bordered hover className="job-table">
          <thead className="table-light">
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Date</th>
              <th>Status</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {civilProducts.map((order, index) => (
              <tr key={index}>
                <td><a href="/" className='ID_job'>{order.id}</a></td>
                <td>{order.customerName}</td>
                <td>{order.productName}</td>
                <td>{order.date}</td>
                <td>{StatusBadge(order.status)}</td>
                <td>{order.quantity}</td>
                <td>₹{order.price.toLocaleString()}</td>
                <td>
                  <Button variant="outline-secondary" size="sm" onClick={() => handleViewDetails(order)}>
                    📋 View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Pagination className="justify-content-end">
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item active>1</Pagination.Item>
          <Pagination.Item>2</Pagination.Item>
          <Pagination.Item>3</Pagination.Item>
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

                {/* Order Dates */}
                <div className="mb-3 d-flex justify-content-between">
                  <div>
                    <strong>Order Placed On:</strong>
                    <div>{selectedOrder.date}</div>
                  </div>
                  <div>
                    <strong>Delivery Date:</strong>
                    <div>{selectedOrder.deliveryDate}</div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="border rounded p-3 mb-3">
                  <h6>📦 Product Details</h6>
                  <Row>
                    <Col md={6}>
                      <strong>Product Name:</strong>
                      <div>{selectedOrder.productName}</div>
                    </Col>
                    <Col md={6}>
                      <strong>Quantity Ordered:</strong>
                      <div>{selectedOrder.quantity} Units</div>
                    </Col>
                    <Col md={6} className="mt-2">
                      <strong>Unit Price:</strong>
                      <div>₹{(selectedOrder.price / selectedOrder.quantity).toFixed(2)}</div>
                    </Col>
                    <Col md={6} className="mt-2">
                      <strong>Estimated Price:</strong>
                      <div>₹{selectedOrder.price.toLocaleString()}</div>
                    </Col>
                  </Row>
                </div>

                {/* Delivery Details */}
                <div className="border rounded p-3 mb-3">
                  <h6>🏠 Delivery Details</h6>
                  <strong>Delivery Address:</strong>
                  <div>{selectedOrder.address}</div>
                  <div className="mt-2">
                    <strong>Special Instructions:</strong>
                    <div>{selectedOrder.instructions}</div>
                  </div>
                </div>

                {/* Customer Details */}
                <div className="border rounded p-3">
                  <h6>👤 Customer Details</h6>
                  <Row>
                    <Col md={6}>
                      <strong>Customer Name:</strong>
                      <div>{selectedOrder.customerName}</div>
                    </Col>
                    <Col md={6}>
                      <strong>Customer Contact:</strong>
                      <div>--</div> {/* You can update this */}
                    </Col>
                  </Row>
                </div>

              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleCloseModal}>
              Reject Order
            </Button>
            <Link to="/vendor/payment" className="Linkers">
            <Button variant="success" onClick={handleCloseModal}>
              Accept Order
            </Button></Link>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default NewHistory;
