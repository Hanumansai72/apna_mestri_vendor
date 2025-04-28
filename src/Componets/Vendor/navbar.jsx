import React, { useState } from 'react';
import "./Navbar.css";
import { Link } from 'react-router-dom';

function Navbar({
    homeLabel = "Home",
    homeUrl = "/vendor",
    jobsLabel = "Job",
    jobsUrl = "/vendor/Jobs",
    historyLabel = "Job History",
    historyUrl = "/vendor/Job/history",
    earningsLabel = "",
    earningsUrl = "/vendor/earnings",
    locationName = ""
}) {
    const [isOnline, setIsOnline] = useState(false);

    const handleToggle = () => {
        setIsOnline(!isOnline);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Apna Mestri</a>
                    <span className="location-text ms-3">📍Location: {locationName}</span>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav justify-content-center mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={homeUrl} className="Linkers">{homeLabel}</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={jobsUrl} className="Linkers">{jobsLabel}</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={historyUrl} className="Linkers">{historyLabel}</Link>
                            </li>
                            {earningsLabel && (
                                <li className="nav-item">
                                    <Link to={earningsUrl} className="Linkers">{earningsLabel}</Link>
                                </li>
                            )}
                        </ul>

                        <div className="d-flex ms-auto align-items-center">
                            <div className="form-check form-switch ms-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="flexSwitchCheckOnline"
                                    checked={isOnline}
                                    onChange={handleToggle}
                                    style={{ width: '50px' }}
                                />
                                <label className="form-check-label" htmlFor="flexSwitchCheckOnline">
                                    {isOnline ? 'Online' : 'Offline'}
                                </label>
                            </div>

                            {/* Profile and Notification aligned to the right */}
                            <div className="profile-notifcation d-flex align-items-center ms-3">
                                <i className="bi bi-bell me-3"></i>
                                <div className="dropdown imag-dropdown">
                                    <button
                                        className="btn btn-secondary dropdown-toggle"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <img
                                            src="https://randomuser.me/api/portraits/men/34.jpg"
                                            alt="profile"
                                            className="rounded-circle"
                                            width="40"
                                            height="40"
                                        />
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><Link to="/vendor/user/profile" className="Linkers">My Profile</Link></li>
                                        <li><Link to="/" className="Linkers">Sign Out</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
