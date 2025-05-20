import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("vendor");
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tech, setTech] = useState("");
  const [vendorId, setVendorId] = useState("");

  useEffect(() => {
    if (!vendorId) return;

    axios
      .get(`https://backend-d6mx.vercel.app/api/categories/${vendorId}`)
      .then((res) => {
        console.log("Category Data:", res.data);
        setTech(res.data.Category);
      })
      .catch((err) => {
        console.error("Category fetch error:", err);
      });
  }, [vendorId]);

  useEffect(() => {
    if (!vendorId || !tech) return;

    const techLower = tech.toLowerCase();

    if (techLower === "technical" || techLower === "non-technical") {
      navigate(`/vendor/${vendorId}`);
    } else {
      navigate(`/product/${vendorId}`);
    }
  }, [vendorId, tech, navigate]);

  const handleLogin = (event) => {
    event.preventDefault();

    const values = { username, password };

    axios
      .post("https://backend-d6mx.vercel.app/postusername", values)
      .then((res) => {
        console.log("Login response:", res.data);

        if (res.data.message === "Success") {
          alert("Login successful");
          const id = res.data.vendorId;
          localStorage.setItem("vendorId", id);
          setVendorId(id); // Triggers category fetch
        } else {
          alert("Login failed. Please check credentials.");
          navigate("/vendor/register");
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        alert("Server error during login.");
      });
  };

  return (
    <div className="d-flex vh-100">
      <div className="w-50 d-flex flex-column justify-content-center align-items-center p-4">
        {/* Tabs */}
        <div className="d-flex mb-4">
          <button
            onClick={() => setActiveTab("vendor")}
            className={`btn ${activeTab === "vendor" ? "btn-warning text-white" : "btn-light text-secondary"} me-2`}
          >
            Professional
          </button>
          <button
            onClick={() => setActiveTab("customer")}
            className={`btn ${activeTab === "customer" ? "btn-warning text-white" : "btn-light text-secondary"}`}
          >
            Product
          </button>
        </div>

        <div className="w-100" style={{ maxWidth: "400px" }}>
          <h2 className="mb-4">{activeTab === "vendor" ? "Vendor Login" : "Customer Login"}</h2>
          <form className="mb-3" onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                value={username}
                className="form-control"
                placeholder="you@example.com"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                
                value={password}
                className="form-control"
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="rememberMe" />
                <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
              </div>
              <a href="/" className="text-warning small">Forgot Password?</a>
            </div>
            <button type="submit" className="btn btn-warning w-100 text-white">
              Log In
            </button>
          </form>

          <div className="text-center mb-3">or</div>

          <button className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center">
            Continue with Google
          </button>

          <p className="text-center mt-3 small">
            Don't have an account? <a href="/signup" className="text-warning">Create Account</a>
          </p>
        </div>
      </div>

      {/* Right side illustration panel */}
      <div className="w-50 d-flex justify-content-center align-items-center bg-light d-none d-md-flex">
        <div className="text-center" style={{ maxWidth: "400px" }}>
          <img
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/c8dd26861f-39ad2f8afe79905fbe9e.png"
            alt="Illustration"
            className="img-fluid mb-4"
          />
          <h3 className="fw-bold mb-2">Grow Your Business</h3>
          <p className="text-muted">
            Join thousands of vendors who’ve increased their sales and expanded their customer base.
          </p>
        </div>
      </div>
    </div>
  );
}
