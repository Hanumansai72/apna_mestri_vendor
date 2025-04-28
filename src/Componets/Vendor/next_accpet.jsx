import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const JobInProgress = () => {
  const address = "medipally";
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  const currentStep = 2; // 1 = Accepted, 2 = En Route, 3 = Reached

  const isStepActive = (step) => step <= currentStep;

  // Example price
  const price = "$120.00";

  return (
    <div className="container my-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          Job In Progress
        </div>
        <div className="card-body">

          {/* Steps Progress */}
          <div className="mb-4">
            <div className="d-flex justify-content-between text-center">
              <div className="flex-fill">
                <div 
                  className={`rounded-circle mx-auto mb-2 ${isStepActive(1) ? 'bg-primary text-white' : 'bg-light text-muted'}`} 
                  style={{ width: '40px', height: '40px', lineHeight: '40px' }}
                >
                  1
                </div>
                <small className={isStepActive(1) ? 'text-primary' : 'text-muted'}>Accepted</small>
              </div>

              <div className="flex-fill position-relative">
                <div style={{ height: '2px', background: isStepActive(2) ? '#0d6efd' : '#dee2e6', top: '20px', position: 'absolute', left: 0, right: 0 }}></div>
                <div 
                  className={`rounded-circle mx-auto mb-2 ${isStepActive(2) ? 'bg-primary text-white' : 'bg-light text-muted'}`} 
                  style={{ width: '40px', height: '40px', lineHeight: '40px' }}
                >
                  2
                </div>
                <small className={isStepActive(2) ? 'text-primary' : 'text-muted'}>En Route</small>
              </div>

              <div className="flex-fill">
                <div 
                  className={`rounded-circle mx-auto mb-2 ${isStepActive(3) ? 'bg-primary text-white' : 'bg-light text-muted'}`} 
                  style={{ width: '40px', height: '40px', lineHeight: '40px' }}
                >
                  3
                </div>
                <small className={isStepActive(3) ? 'text-primary' : 'text-muted'}>Reached</small>
              </div>
            </div>
          </div>

          {/* Map and Get Directions */}
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

          {/* Service Location */}
          <div className="mb-3">
            <h5>Service Location</h5>
            <p>{address}</p>
          </div>

          {/* Job Details */}
          <div className="mb-4">
            <h5>Job Details</h5>
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Customer:</strong> James Wilson <br />
                <small>Contact: (999) 123-4562</small>
              </li>
              <li className="list-group-item">
                <strong>Service Type:</strong> Plumbing - Leak Repair
              </li>
              <li className="list-group-item">
                <strong>Scheduled Time:</strong> April 21, 2025 - 2:00 PM to 4:00 PM
              </li>
              <li className="list-group-item">
                <strong>Job ID:</strong> JOBID-2025-04189
              </li>
              <li className="list-group-item">
                <strong>Price:</strong> {price}
              </li>
            </ul>
          </div>

          {/* Special Instructions */}
          <div className="alert alert-warning">
            Please park in the guest parking area. The building has a security gate - use code <strong>#49710</strong> to enter. The leak is under the kitchen sink and has been temporarily contained with a bucket.
          </div>

          {/* Current Status */}
          <div className="alert alert-info">
            <strong>Current Status:</strong> En Route to Customer Location
          </div>

          {/* Action Button */}
          <div className="text-center">
            <Link to="/vendor/Job/Progress/reached"><button className="btn btn-warning btn-lg">
              Mark as Reached
            </button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobInProgress;
