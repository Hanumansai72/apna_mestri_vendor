import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobListings from './Componets/Vendor/accpet';
import JobHistory from './Componets/Vendor/jobhistory';
import NewHistory from './Componets/Vendor/neworder';
import JobInProgress from './Componets/Vendor/next_accpet';
import OrderHistory from './Componets/Vendor/orderhistory';
import OrderStatus from './Componets/Vendor/orderstatusproduct';
import JobPaymentSummary from './Componets/Vendor/payment_order_tech';
import JobProgress from './Componets/Vendor/payment_tech_non';
import Product from './Componets/Vendor/product._vendor';
import Registration from './Componets/Vendor/Registration';
import TechnicalNonDashboard from './Componets/Vendor/Technical_Non_Dashboard';
import VendorProfileSettings from './Componets/Vendor/vendor_profile_settings';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/vendor" element={<TechnicalNonDashboard></TechnicalNonDashboard>} />
          <Route path="/Product" element={<Product></Product>} />
          <Route path="/" element={<Registration></Registration>}/>
          <Route path="/vendor/user/profile" element={<VendorProfileSettings></VendorProfileSettings>}/>
          <Route path="/vendor/Job/Progress/reached" element={<JobProgress></JobProgress>}/>
          <Route path="/vendor/Jobs" element={<JobListings></JobListings>}/>
          <Route path="/Product/order" element={<NewHistory></NewHistory>}/>
          <Route path="/Product/order/history" element={<OrderHistory></OrderHistory>}/>
          <Route path="/vendor/Payment" element={<OrderStatus></OrderStatus>}/>
          <Route path="/vendor/Payment/sucess" element={<JobPaymentSummary></JobPaymentSummary>}/>
          <Route path="/vendor/Job/Progress" element={<JobInProgress></JobInProgress>}/>
          <Route path="/vendor/Job/history" element={<JobHistory></JobHistory>}/>

          










        </Routes>
      </Router>
    </div>
  );
}

export default App;
