import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("vendor");
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [tech, setTech] = useState("");
  const [vendorId, setVendorId] = useState("");

  const sendOtp = async () => {
    try {
      const res = await axios.post("https://backend-d6mx.vercel.app/sendotp", { Email: username });
      console.log("OTP Sent", res.data);
      toast.success("OTP sent to your email");
      setOtpSent(true);
    } catch (err) {
      console.error(err);
      toast.error("Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post("https://backend-d6mx.vercel.app/verifyotp", {
        Email: username,
        otp: otp,
      });
      if (res.data.message === "OTP verified") {
        toast.success("OTP verified successfully");
        setOtpVerified(true);
      } else {
        toast.error("Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      toast.error("OTP verification failed");
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!otpVerified) {
      toast.error("Please verify OTP before login");
      return;
    }

    try {
      const values = { username, password };
      const res = await axios.post("https://backend-d6mx.vercel.app/postusername", values);

      if (res.data.message === "Success") {
        toast.success("Login successful");
        const id = res.data.vendorId;
        localStorage.setItem("vendorId", id);
        setVendorId(id);
      } else {
        toast.error("Login failed. Please check credentials.");
        navigate("/vendor/register");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Server error during login.");
    }
  };

  useEffect(() => {
    if (!vendorId) return;
    axios
      .get(`https://backend-d6mx.vercel.app/api/categories/${vendorId}`)
      .then((res) => {
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

  return (
    <div className="d-flex vh-100 flex-column flex-md-row">
      <ToastContainer />
      <div className="w-100 w-md-50 d-flex flex-column justify-content-center align-items-center p-4">
        <div className="d-flex mb-4">
          <button
            onClick={() => setActiveTab("vendor")}
            className={`btn ${activeTab === "vendor" ? "btn-warning text-white" : "btn-light text-secondary"} me-2`}
          >
            Professional
          </button>
          <button
            onClick={() => setActiveTab("product")}
            className={`btn ${activeTab === "product" ? "btn-warning text-white" : "btn-light text-secondary"}`}
          >
            Product
          </button>
        </div>

        <div className="w-100 px-3" style={{ maxWidth: "500px" }}>
          <h2 className="mb-4">{activeTab === "vendor" ? "Vendor Login" : "Product Login"}</h2>
          <form className="mb-3 w-100" onSubmit={handleLogin}>
            {/* Email and OTP */}
            <div className="mb-3 w-100">
              <label className="form-label">Email Address</label>
              <div className="d-flex">
                <input
                  type="email"
                  value={username}
                  className="form-control me-2"
                  placeholder="you@example.com"
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setOtp("");
                    setOtpSent(false);
                    setOtpVerified(false);
                  }}
                  required
                />
                {!otpSent ? (
                  <button type="button" className="btn btn-primary btn-sm" onClick={sendOtp}>
                    Send OTP
                  </button>
                ) : (
                  !otpVerified && (
                    <button type="button" className="btn btn-success btn-sm" onClick={verifyOtp}>
                      Verify OTP
                    </button>
                  )
                )}
              </div>
            </div>

            {/* OTP Field */}
            {otpSent && !otpVerified && (
              <div className="mb-3">
                <label>Enter OTP</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter OTP sent to your email"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            )}

            {/* OTP Verified Text */}
            {otpVerified && <div className="mb-2 text-success fw-bold">✅ OTP Verified</div>}

            {/* Password */}
            <div className="mb-3 w-100">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={password}
                className="form-control"
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="rememberMe" />
                <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
              </div>
              <a href="/" className="text-warning small">Forgot Password?</a>
            </div>

            <button type="submit" className="btn btn-warning w-100 text-white" disabled={!otpVerified}>
              Log In
            </button>
          </form>

          <div className="text-center mb-3">or</div>
          <p className="text-center mt-3 small">
  Don't have an account?{" "}
  <a
    href={activeTab === "product" ? "/signup?tab=product" : "/signup"}
    className="text-warning"
  >
    Create Account
  </a>
</p>

        </div>
      </div>

      <div className="w-50 d-none d-md-flex justify-content-center align-items-center bg-light">
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
