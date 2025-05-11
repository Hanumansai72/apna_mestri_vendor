import React, { useState } from 'react';
import { Button, Form, Pagination, Row, Col, Badge, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';

const jobsData = [
  { id: 1, service: 'HVAC Installation', customer: 'Michael Johnson', location: 'Phoenix, AZ', date: 'Apr 25, 2025', time: '10:00 AM', duration: '3-4 hours', type: 'HVAC Installation', status: 'Pending' },
  { id: 2, service: 'Plumbing Repair', customer: 'Sarah Williams', location: 'Los Angeles, CA', date: 'Apr 22, 2025', time: '2:30 PM', duration: '1-2 hours', type: 'Leak Repair', status: 'Accepted' },
  { id: 3, service: 'Electrical Wiring', customer: 'Robert Davis', location: 'Chicago, IL', date: 'Apr 20, 2025', time: '9:00 AM', duration: '5-6 hours', type: 'Rewiring', status: 'In Progress' },
  { id: 4, service: 'Appliance Repair', customer: 'Jennifer Lopez', location: 'New York, NY', date: 'Apr 18, 2025', time: '1:00 PM', duration: '2 hours', type: 'Refrigerator Repair', status: 'Completed' },
  { id: 5, service: 'Roof Inspection', customer: 'Chris Brown', location: 'Phoenix, AZ', date: 'Apr 28, 2025', time: '11:00 AM', duration: '1-2 hours', type: 'Inspection', status: 'Pending' },
  { id: 6, service: 'Painting Service', customer: 'Emma Wilson', location: 'Chicago, IL', date: 'Apr 26, 2025', time: '1:30 PM', duration: '3-4 hours', type: 'Interior Painting', status: 'Accepted' },
  { id: 7, service: 'Carpet Cleaning', customer: 'Daniel Miller', location: 'Los Angeles, CA', date: 'Apr 27, 2025', time: '9:30 AM', duration: '2 hours', type: 'Deep Cleaning', status: 'In Progress' },
  { id: 8, service: 'Window Repair', customer: 'Sophia Garcia', location: 'New York, NY', date: 'Apr 29, 2025', time: '3:00 PM', duration: '1 hour', type: 'Glass Replacement', status: 'Completed' },
  { id: 9, service: 'Fence Installation', customer: 'David Lee', location: 'Phoenix, AZ', date: 'May 1, 2025', time: '10:30 AM', duration: '5 hours', type: 'Wooden Fence', status: 'Pending' },
  { id: 10, service: 'Flooring Service', customer: 'Olivia Martinez', location: 'Los Angeles, CA', date: 'May 2, 2025', time: '12:00 PM', duration: '6 hours', type: 'Tile Installation', status: 'Accepted' },
  { id: 11, service: 'Landscaping', customer: 'James Anderson', location: 'Chicago, IL', date: 'May 3, 2025', time: '8:00 AM', duration: '5 hours', type: 'Garden Landscaping', status: 'In Progress' },
  { id: 12, service: 'Pool Cleaning', customer: 'Isabella Taylor', location: 'New York, NY', date: 'May 5, 2025', time: '2:00 PM', duration: '2 hours', type: 'Water Cleaning', status: 'Completed' },
];

const statusVariant = {
  Pending: 'secondary',
  Accepted: 'success',
  'In Progress': 'warning',
  Completed: 'primary',
};

const actionButton = {
  Pending: { label: 'Accept Job', variant: 'warning' },
  Accepted: { label: 'Start Job', variant: 'primary' },
  'In Progress': { label: 'Complete Job', variant: 'success' },
  Completed: { label: 'Invoice', variant: 'dark' },
};

const JobListings = () => {
  const [jobs, setJobs] = useState(jobsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const navigate = useNavigate();
  const jobsPerPage = 4;

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter ? job.status === statusFilter : true;
    const matchesLocation = locationFilter ? job.location.includes(locationFilter) : true;

    return matchesSearch && matchesStatus && matchesLocation;
  });

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleApplyFilters = () => {
    setCurrentPage(1);
  };

  const handleActionClick = (jobId, currentStatus) => {
    let updatedJobs = [...jobs];

    if (currentStatus === 'Pending') {
      updatedJobs = updatedJobs.map(job =>
        job.id === jobId ? { ...job, status: 'Accepted' } : job
      );
    } else if (currentStatus === 'Accepted') {
      updatedJobs = updatedJobs.map(job =>
        job.id === jobId ? { ...job, status: 'In Progress' } : job
      );
      navigate(`/vendor/${jobId}/Job/Progress`);
    } else if (currentStatus === 'In Progress') {
      updatedJobs = updatedJobs.map(job =>
        job.id === jobId ? { ...job, status: 'Completed' } : job
      );
    }

    setJobs(updatedJobs);
  };

  return (
    <div>
      <Navbar />

      <div className="container my-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4>Job Listings</h4>
          <div>
            <Button variant="outline-secondary" className="me-2">Export</Button>
            <Button variant="warning">+ New Job</Button>
          </div>
        </div>

        <div className="d-flex gap-2 mb-3">
          <Form.Control
            placeholder="Search jobs by customer, location, or service type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </Form.Select>
          <Form.Select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
            <option value="">All Locations</option>
            <option value="Phoenix">Phoenix</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Chicago">Chicago</option>
            <option value="New York">New York</option>
          </Form.Select>
          <Button variant="primary" onClick={handleApplyFilters}>Apply Filters</Button>
        </div>

        {currentJobs.length > 0 ? currentJobs.map(job => (
          <Card key={job.id} className="mb-3 shadow-sm">
            <Card.Body>
              <Row>
                <Col md={8}>
                  <h5>{job.service}</h5>
                  <p className="text-muted mb-1">{job.customer} • {job.location}</p>
                  <Row>
                    <Col md={4}>
                      <strong>Service Type:</strong>
                      <div>{job.type}</div>
                    </Col>
                    <Col md={4}>
                      <strong>Scheduled Date & Time:</strong>
                      <div>{job.date} • {job.time}</div>
                    </Col>
                    <Col md={4}>
                      <strong>Estimated Duration:</strong>
                      <div>{job.duration}</div>
                    </Col>
                  </Row>
                </Col>

                <Col md={4} className="text-md-end mt-3 mt-md-0">
                  <Badge bg={statusVariant[job.status]} className="mb-3">{job.status}</Badge>
                  <div className="d-flex flex gap-2 justify-content-md-end">
                    <Button
                      variant={actionButton[job.status].variant}
                      onClick={() => handleActionClick(job.id, job.status)}
                    >
                      {actionButton[job.status].label}
                    </Button>
                    <Button variant="outline-secondary">Call</Button>
                    <Button variant="outline-secondary">View Details</Button>
                    <Button variant="outline-secondary">Email</Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )) : <p>No jobs found.</p>}

        {totalPages > 1 && (
          <div className="d-flex justify-content-between align-items-center mt-3">
            <small>Showing {indexOfFirstJob + 1}-{Math.min(indexOfLastJob, filteredJobs.length)} of {filteredJobs.length} jobs</small>
            <Pagination>
              <Pagination.First onClick={() => handlePageChange(1)} />
              <Pagination.Prev disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} />
              <Pagination.Last onClick={() => handlePageChange(totalPages)} />
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListings;
