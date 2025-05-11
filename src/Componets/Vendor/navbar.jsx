import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

function Navbar({
    homeLabel = "Home",
    jobsLabel = "Job",
    historyLabel = "Job History",
    earningsLabel = "",
    locationName = ""
}) {
    const { id } = useParams(); 
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) navigate('/vendor/login');
    }, [id, navigate]);

    const vendorId = localStorage.getItem("vendorId");

    const homeUrl = `/vendor/${vendorId}`;
    const jobsUrl = `/vendor/${vendorId}/Jobs`;
    const historyUrl = `/vendor/${vendorId}/Job/history`;
    const earningsUrl = `/vendor/${id}/earnings`;
    const profileUrl = `/vendor/${id}/user/profile`;

    const [isOnline, setIsOnline] = useState(false);

    const handleToggle = () => setIsOnline(!isOnline);

    return (
        <>
            {/* Top Navbar - Desktop Only */}
            <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm d-none d-lg-flex">
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold" href="/">Apna Mestri</a>

                    <span className="text-muted ms-3">
                        📍 Location: <strong>{locationName || 'Fetching...'}</strong>
                    </span>

                    <div className="collapse navbar-collapse show" id="mainNavbar">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={homeUrl} className="nav-link">{homeLabel}</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={jobsUrl} className="nav-link">{jobsLabel}</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={historyUrl} className="nav-link">{historyLabel}</Link>
                            </li>
                            {earningsLabel && (
                                <li className="nav-item">
                                    <Link to={earningsUrl} className="nav-link">{earningsLabel}</Link>
                                </li>
                            )}
                        </ul>

                        <div className="d-flex align-items-center">
                            <div className="form-check form-switch me-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="onlineSwitch"
                                    checked={isOnline}
                                    onChange={handleToggle}
                                />
                                <label className="form-check-label" htmlFor="onlineSwitch">
                                    {isOnline ? "Online" : "Offline"}
                                </label>
                            </div>

                            <div className="dropdown">
                                <button
                                    className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                >
                                    <i className="bi bi-bell me-2"></i>
                                    <img
                                        src="https://randomuser.me/api/portraits/men/34.jpg"
                                        alt="profile"
                                        className="rounded-circle"
                                        width="40"
                                        height="40"
                                    />
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><Link to={profileUrl} className="dropdown-item">My Profile</Link></li>
                                    <li><Link to="/" className="dropdown-item">Sign Out</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <nav className="navbar navbar-light bg-light border-top d-flex d-lg-none fixed-bottom justify-content-around py-1">
                <Link to={homeUrl} className="text-center text-decoration-none text-dark">
                    <i className="bi bi-house fs-5"></i><br />
                    <small>{homeLabel}</small>
                </Link>
                <Link to={jobsUrl} className="text-center text-decoration-none text-dark">
                    <i className="bi bi-briefcase fs-5"></i><br />
                    <small>{jobsLabel}</small>
                </Link>
                <Link to={historyUrl} className="text-center text-decoration-none text-dark">
                    <i className="bi bi-clock-history fs-5"></i><br />
                    <small>{historyLabel}</small>
                </Link>
                {earningsLabel && (
                    <Link to={earningsUrl} className="text-center text-decoration-none text-dark">
                        <i className="bi bi-cash-stack fs-5"></i><br />
                        <small>{earningsLabel}</small>
                    </Link>
                )}
                <Link to={profileUrl} className="text-center text-decoration-none text-dark">
                    <i className="bi bi-person-circle fs-5"></i><br />
                    <small>Profile</small>
                </Link>
            </nav>
        </>
    );
}

export default Navbar;
