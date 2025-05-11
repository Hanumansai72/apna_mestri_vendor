import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // get the :id from the URL
  const [checking, setChecking] = useState(true);
  const vendorId = localStorage.getItem("vendorId");

  useEffect(() => {
    if (!vendorId) {
      navigate("/vendor/login");
    }
    else if (id && vendorId !== id) {
      navigate("/vendor/login");
    } else {
      setChecking(false); 
    }
  }, [vendorId, id, navigate]);

  if (checking) {
    return <div>Loading...</div>; 
  }

  return children;
};

export default ProtectedRoute;
