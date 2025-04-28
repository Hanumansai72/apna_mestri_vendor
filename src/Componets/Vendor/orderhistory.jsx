import React from 'react';
import { Table, Badge, Button, Form, Row, Col, Pagination } from 'react-bootstrap';
import Navbar from './navbar';

const civilProducts = [
  {
    id: 'ORD-001',
    productName: 'Red Bricks',
    customerName: 'Rajesh Construction',
    quantity: 5000,
    price: 25000,
    date: '2025-04-20',
    status: 'Delivered',
  },
  {
    id: 'ORD-002',
    productName: 'River Sand',
    customerName: 'BuildRight Co.',
    quantity: 10,
    price: 15000,
    date: '2025-04-18',
    status: 'In Transit',
  },
  {
    id: 'ORD-003',
    productName: 'Cement (50kg bags)',
    customerName: 'Skyline Infra',
    quantity: 100,
    price: 32000,
    date: '2025-04-16',
    status: 'Delivered',
  },
  {
    id: 'ORD-004',
    productName: 'Crushed Stone',
    customerName: 'Urban Builders',
    quantity: 8,
    price: 12000,
    date: '2025-04-22',
    status: 'Pending',
  },
  {
    id: 'ORD-005',
    productName: 'Steel Rods (TMT)',
    customerName: 'Future Homes',
    quantity: 200,
    price: 58000,
    date: '2025-04-21',
    status: 'Cancelled',
  },
  {
    id: 'ORD-006',
    productName: 'Concrete Blocks',
    customerName: 'Dream Projects Ltd.',
    quantity: 1500,
    price: 19500,
    date: '2025-04-23',
    status: 'Delivered',
  },
  {
    id: 'ORD-007',
    productName: 'Plaster Sand',
    customerName: 'Golden Heights',
    quantity: 6,
    price: 9000,
    date: '2025-04-19',
    status: 'In Transit',
  },
  {
    id: 'ORD-008',
    productName: 'Tiles (Ceramic)',
    customerName: 'Elegant Interiors',
    quantity: 300,
    price: 27000,
    date: '2025-04-15',
    status: 'Delivered',
  },
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

const OrderHistory = () => {
  return (
    <div>
<Navbar
        homeLabel="Home"
        homeUrl="/vendor/product/dashboard"
        jobsLabel="Products"
        jobsUrl="/vendor/neworder"    
        historyLabel="Orders History"
        historyUrl="/vendor/ordershistory" 
        earningsLabel="Earnings"
        earningsUrl="/vendor/earnings"   
      />      
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Order History</h4>
          <div>
            <Button variant="outline-secondary" className="me-2">📥 Export</Button>
          </div>
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
              <option>Rajesh Construction</option>
              <option>BuildRight Co.</option>
              {/* Add other customers as needed */}
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
            {civilProducts.map((job, index) => (
              <tr key={index}>
                <td><a href="/" className='ID_job'>{job.id}</a></td>
                <td>{job.customerName}</td>
                <td>{job.productName}</td>
                <td>{job.date}</td>
                <td>{StatusBadge(job.status)}</td>
                <td>{job.quantity}</td>
                <td>₹{job.price.toLocaleString()}</td>
                <td><Button variant="outline-secondary" size="sm">📋</Button></td>
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
          <Pagination.Item>4</Pagination.Item>
          <Pagination.Item>5</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>
    </div>
  );
};

export default OrderHistory;
