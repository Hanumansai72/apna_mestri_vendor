import React, { useState } from 'react';
import { Alert, Card, Row, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const JobProgress = () => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  const handleUploadClick = () => {
    document.getElementById('fileUpload').click();
  };

  const handleMarkCompleted = () => {
    alert('Job marked as completed!');
    // You can add navigation or API calls here
  };

  return (
    <div className="container my-5" style={{ maxWidth: '700px' }}>
      {/* Arrival confirmation alert */}
      <Alert variant="success" className="text-center">
        You've reached the service location. Your arrival has been confirmed. You can now proceed with the service.
      </Alert>

      {/* Job Summary */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h5>Job Summary</h5>
          <hr />
          <Row className="mb-2">
            <Col sm={4}><strong>Service Type:</strong></Col>
            <Col sm={8}>Plumbing Repair</Col>
          </Row>
          <Row className="mb-2">
            <Col sm={4}><strong>Client:</strong></Col>
            <Col sm={8}>Sarah Johnson</Col>
          </Row>
          <Row className="mb-2">
            <Col sm={4}><strong>Address:</strong></Col>
            <Col sm={8}>123 Main Street, Apt 4B</Col>
          </Row>
          <Row className="mb-2">
            <Col sm={4}><strong>Scheduled Time:</strong></Col>
            <Col sm={8}>April 21, 2025 • 2:00 PM</Col>
          </Row>
          <Row className="mb-2">
            <Col sm={4}><strong>Estimated Duration:</strong></Col>
            <Col sm={8}>2 hours</Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Upload Work Image */}
      <Card className="mb-4 shadow-sm">
        <Card.Body className="text-center">
          <h5>Upload Work Image</h5>
          <p className="text-muted small">Please upload an image of the completed work before marking the job as completed.</p>

          <div 
            onClick={handleUploadClick} 
            style={{ 
              border: '2px dashed #ccc', 
              borderRadius: '8px', 
              padding: '30px', 
              cursor: 'pointer',
              backgroundColor: '#f9f9f9'
            }}
          >
            {uploadedImage ? (
              <div>
                <p><strong>Uploaded:</strong> {uploadedImage.name}</p>
              </div>
            ) : (
              <div>
                <i className="bi bi-cloud-upload" style={{ fontSize: '2rem', color: '#777' }}></i>
                <p className="mt-2">Drag and drop or click to upload</p>
                <small className="text-muted">Supports JPG, JPEG, PNG files</small>
              </div>
            )}
          </div>

          <Form.Control 
            type="file" 
            id="fileUpload" 
            style={{ display: 'none' }}
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleFileChange}
          />
        </Card.Body>
      </Card>

      <div className="text-center">
        <Link to="/vendor/Payment/sucess"><Button 
          variant="primary" 
          disabled={!uploadedImage}
          onClick={handleMarkCompleted}
        >
          Mark as Completed
        </Button></Link>
      </div>
    </div>
  );
};

export default JobProgress;
