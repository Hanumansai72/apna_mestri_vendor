import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './navbar';

const JobInProgress = () => {
  const address = "medipally";
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  const currentStep = 2;

  const isStepActive = (step) => step <= currentStep;

  const price = "$120.00";

  const [showModal, setShowModal] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const { id } = useParams(); // Get the dynamic ID from the URL
  const navigate = useNavigate(); // Navigation hook

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode === '1234') {
      setIsOtpVerified(true);
      alert('OTP Verified. Job marked as Reached.');
      setShowModal(false);
      navigate(`/vendor/${id}/Job/Progress/reached`);
    } else {
      alert('Invalid OTP, please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container my-4">
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">Job In Progress</div>
          <div className="card-body">

            {/* Progress Steps */}
            <div className="mb-4">
              <div className="d-flex justify-content-between text-center">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex-fill position-relative">
                    {step !== 1 && (
                      <div style={{
                        height: '2px',
                        background: isStepActive(step) ? '#0d6efd' : '#dee2e6',
                        top: '20px',
                        position: 'absolute',
                        left: 0,
                        right: 0
                      }}></div>
                    )}
                    <div
                      className={`rounded-circle mx-auto mb-2 ${isStepActive(step) ? 'bg-primary text-white' : 'bg-light text-muted'}`}
                      style={{ width: '40px', height: '40px', lineHeight: '40px' }}
                    >
                      {step}
                    </div>
                    <small className={isStepActive(step) ? 'text-primary' : 'text-muted'}>
                      {step === 1 ? 'Accepted' : step === 2 ? 'En Route' : 'Reached'}
                    </small>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Section */}
            <div className="mb-4">
              <div className="position-relative">
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b49dc69bc9-06f25dad2193d7eddaa0.png"
                  alt="Map"
                  className="img-fluid rounded"
                  style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                />
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <small className="text-muted">2.5 miles away</small>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary btn-sm"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>

            {/* Service Info */}
            <div className="mb-3">
              <h5>Service Location</h5>
              <p>{address}</p>
            </div>

            {/* Job Info */}
            <div className="mb-4">
              <h5>Job Details</h5>
              <ul className="list-group">
                <li className="list-group-item">
                  <strong>Customer:</strong> James Wilson <br />
                  <small>Contact: (999) 123-4562</small>
                </li>
                <li className="list-group-item"><strong>Service Type:</strong> Plumbing - Leak Repair</li>
                <li className="list-group-item"><strong>Scheduled Time:</strong> April 21, 2025 - 2:00 PM to 4:00 PM</li>
                <li className="list-group-item"><strong>Job ID:</strong> JOBID-2025-04189</li>
                <li className="list-group-item"><strong>Price:</strong> {price}</li>
              </ul>
            </div>

            <div className="alert alert-warning">
              Please park in the guest parking area. The building has a security gate - use code <strong>#49710</strong> to enter. The leak is under the kitchen sink and has been temporarily contained with a bucket.
            </div>

            <div className="alert alert-info">
              <strong>Current Status:</strong> En Route to Customer Location
            </div>

            <div className="text-center">
              <Button variant="warning" size="lg" onClick={handleShowModal}>
                Mark as Reached
              </Button>
            </div>
          </div>
        </div>

        {/* OTP Modal */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Verify OTP</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleOtpSubmit}>
              <Form.Group className="mb-3 text-center">
                <div className="d-flex justify-content-center">
                  {otp.map((digit, index) => (
                    <Form.Control
                      key={index}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(e, index)}
                      className="otp-input mx-2"
                      style={{ width: '50px', height: '50px', fontSize: '20px', textAlign: 'center' }}
                    />
                  ))}
                </div>
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Verify OTP
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default JobInProgress;
