import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
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
import LoginPage from './Componets/login';
import AddProductForm from './Componets/Vendor/addnewproduct';
import BulkProductUpload from './Componets/Vendor/Bulkupload';
import ProductList from './Componets/Vendor/viewproduct';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/vendor/login" element={<LoginPage />} />
        <Route path="/vendor/register" element={<Registration />} />

        {/* Protected / Vendor Routes */}
        <Route path="/vendor/:id" element={<TechnicalNonDashboard />} />
        <Route path="/vendor/:id/profile" element={<VendorProfileSettings />} />
        <Route path="/vendor/:id/Jobs" element={<JobListings />} />
        <Route path="/vendor/:id/Job/history" element={<JobHistory />} />
        <Route path="/vendor/:id/Job/Progress" element={<JobInProgress />} />
        <Route path="/vendor/:id/Job/Progress/reached" element={<JobProgress />} />
        <Route path="/vendor/:id/Payment" element={<OrderStatus />} />
        <Route path="/vendor/:id/Payment/success" element={<JobPaymentSummary />} />
        <Route path="/vendor/:id/ViewProduct" element={<ProductList />} />
        <Route path="/addproduct/:vendorId" element={<AddProductForm />} />
        <Route path="/addproduct/:vendorId/BulkUpload" element={<BulkProductUpload />} />

        {/* Product Routes */}
        <Route path="/Product/:id" element={<Product />} />
        <Route path="/Product/:id/order" element={<NewHistory />} />
        <Route path="/Product/:id/order/history" element={<OrderHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
