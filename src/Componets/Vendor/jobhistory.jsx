import React, { useState } from 'react';
import { Table, Badge, Button, Form, Row, Col, Pagination } from 'react-bootstrap';
import Navbar from './navbar';
import './jobhistory.css';

const allJobs = [
  { id: '#JOB-2025-104', client: 'TechSolutions Inc.', initials: 'TS', service: 'Network Installation', date: '2025-04-15', status: 'Completed', rating: 5, earnings: 1250 },
  { id: '#JOB-2025-098', client: 'Global Innovations', initials: 'GI', service: 'Database Migration', date: '2025-04-10', status: 'In Progress', rating: null, earnings: 850 },
  { id: '#JOB-2025-087', client: 'Digital Pioneers', initials: 'DP', service: 'Cloud Infrastructure', date: '2025-04-05', status: 'Completed', rating: 4, earnings: 2100 },
  { id: '#JOB-2025-076', client: 'TechSolutions Inc.', initials: 'TS', service: 'Security Audit', date: '2025-03-28', status: 'Cancelled', rating: null, earnings: 0 },
  { id: '#JOB-2025-065', client: 'Global Innovations', initials: 'GI', service: 'DevOps Consulting', date: '2025-03-22', status: 'Completed', rating: 4.5, earnings: 1750 },
  { id: '#JOB-2025-055', client: 'Alpha Dynamics', initials: 'AD', service: 'Software Development', date: '2025-03-15', status: 'Completed', rating: 5, earnings: 3000 },
  { id: '#JOB-2025-044', client: 'Digital Pioneers', initials: 'DP', service: 'Mobile App Setup', date: '2025-02-25', status: 'In Progress', rating: null, earnings: 1200 },
  { id: '#JOB-2025-034', client: 'NextGen Tech', initials: 'NT', service: 'Web Hosting', date: '2025-02-20', status: 'Completed', rating: 4, earnings: 700 },
  { id: '#JOB-2025-023', client: 'TechSolutions Inc.', initials: 'TS', service: 'Server Setup', date: '2025-02-05', status: 'Completed', rating: 5, earnings: 1900 },
  { id: '#JOB-2025-012', client: 'Global Innovations', initials: 'GI', service: 'Backup Solutions', date: '2025-01-18', status: 'Cancelled', rating: null, earnings: 0 },
];

const getStatusBadge = (status) => {
  switch (status) {
    case 'Completed':
      return <Badge bg="success">Completed</Badge>;
    case 'In Progress':
      return <Badge bg="info">In Progress</Badge>;
    case 'Cancelled':
      return <Badge bg="danger">Cancelled</Badge>;
    default:
      return <Badge bg="secondary">{status}</Badge>;
  }
};

const getStars = (rating) => {
  if (rating == null) return <span className="text-muted">Pending</span>;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  return (
    <div className="rating">
      {Array.from({ length: fullStars }, (_, i) => (
        <span key={i}>⭐</span>
      ))}
      {halfStar && <span>⭐</span>}
      <span className="ms-2">{rating.toFixed(1)}</span>
    </div>
  );
};

const JobHistory = () => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [clientFilter, setClientFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('Last 30 days');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const jobsPerPage = 5;

  // Filtered Data
  const filteredJobs = allJobs.filter((job) => {
    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
    const matchesClient = clientFilter === 'All' || job.client === clientFilter;
    const matchesSearch = job.id.toLowerCase().includes(searchTerm.toLowerCase()) || job.client.toLowerCase().includes(searchTerm.toLowerCase());

    const jobDate = new Date(job.date);
    const now = new Date();
    let matchesDate = true;
    if (dateFilter === 'Last 30 days') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(now.getDate() - 30);
      matchesDate = jobDate >= thirtyDaysAgo;
    } else if (dateFilter === 'Last 7 days') {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(now.getDate() - 7);
      matchesDate = jobDate >= sevenDaysAgo;
    } else if (dateFilter === 'This Year') {
      matchesDate = jobDate.getFullYear() === now.getFullYear();
    }

    return matchesStatus && matchesClient && matchesDate && matchesSearch;
  });

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Job History</h4>
          <Button variant="outline-secondary">📥 Export</Button>
        </div>

        <Row className="mb-3">
          <Col md={3}>
            <Form.Select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>This Year</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option>All</option>
              <option>Completed</option>
              <option>In Progress</option>
              <option>Cancelled</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select value={clientFilter} onChange={(e) => setClientFilter(e.target.value)}>
              <option>All</option>
              <option>TechSolutions Inc.</option>
              <option>Global Innovations</option>
              <option>Digital Pioneers</option>
              <option>Alpha Dynamics</option>
              <option>NextGen Tech</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Control placeholder="Search jobs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </Col>
        </Row>

        <Table responsive bordered hover className="job-table">
          <thead className="table-light">
            <tr>
              <th>Job ID</th>
              <th>Client</th>
              <th>Service Type</th>
              <th>Date</th>
              <th>Status</th>
              <th>Rating</th>
              <th>Earnings</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentJobs.length > 0 ? currentJobs.map((job, index) => (
              <tr key={index}>
                <td><a href="/" className='ID_job'>{job.id}</a></td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="client-avatar me-2">{job.initials}</div>
                    {job.client}
                  </div>
                </td>
                <td>{job.service}</td>
                <td>{new Date(job.date).toLocaleDateString()}</td>
                <td>{getStatusBadge(job.status)}</td>
                <td>{getStars(job.rating)}</td>
                <td>${job.earnings.toLocaleString()}</td>
                <td><Button variant="outline-secondary" size="sm">📋</Button></td>
              </tr>
            )) : (
              <tr>
                <td colSpan="8" className="text-center">No jobs found</td>
              </tr>
            )}
          </tbody>
        </Table>

        <Pagination className="justify-content-end">
          <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
          {[...Array(totalPages).keys()].map((num) => (
            <Pagination.Item key={num} active={currentPage === num + 1} onClick={() => paginate(num + 1)}>
              {num + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>

      </div>
    </div>
  );
};

export default JobHistory;
