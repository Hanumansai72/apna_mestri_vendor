import React, { useState } from 'react';
import "./product_vendor.css";
import Navbar from './navbar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const dataDay = [
  { name: '12AM', sales: 200 },
  { name: '6AM', sales: 800 },
  { name: '12PM', sales: 1500 },
  { name: '6PM', sales: 1000 },
];

const dataWeek = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

const dataMonth = [
  { name: 'Week 1', sales: 12000 },
  { name: 'Week 2', sales: 15000 },
  { name: 'Week 3', sales: 10000 },
  { name: 'Week 4', sales: 18000 },
];

function Product() {
  const [view, setView] = useState('week');

  const getData = () => {
    switch (view) {
      case 'day':
        return dataDay;
      case 'month':
        return dataMonth;
      case 'week':
      default:
        return dataWeek;
    }
  };

  return (
    <div>
      <Navbar
        homeLabel="Home"
        homeUrl="/Product"
        jobsLabel="Products"
        jobsUrl="/Product/order"    
        historyLabel="Orders History"
        historyUrl="/Product/order/history" 
        earningsLabel="Earnings"
        earningsUrl="/vendor/earnings"   
      />


      <div className="product_Containers">
        {/* Product Cards */}
        <div className="prodcuts_cards">
          <span className="Product_Heading1">Total Sales</span>
          <h3 className="Product_Heading2">₹30,000</h3>
          <i className="bi bi-graph-up icon-top"></i>
        </div>
        <div className="prodcuts_cards">
          <span className="Product_Heading1">New Order</span>
          <h3 className="Product_Heading2">30</h3>
          <i className="bi bi-bag icon-top"></i>
        </div>
        <div className="prodcuts_cards">
          <span className="Product_Heading1">Pending Shipments</span>
          <h3 className="Product_Heading2">12</h3>
          <i className="bi bi-truck icon-top"></i>
        </div>
        <div className="prodcuts_cards">
          <span className="Product_Heading1">Customer Rating</span>
          <h3 className="Product_Heading2">
            4.0/5.0 <br />
            <span className="Customer_Reviews_product">(142 Reviews)</span>
          </h3>
          <i className="bi bi-star-fill icon-top"></i>
        </div>
      </div>

      {/* NEW Full Width Graph Section */}
      <div className="full_width_chart_container">
        <div className="chart_header">
          <span className="Product_Heading3">Overall Sales Analytics</span>
          <div>
            <button onClick={() => setView('day')} className={`btn btn-sm ${view === 'day' ? 'btn-primary' : 'btn-outline-primary'} me-1`}>Day</button>
            <button onClick={() => setView('week')} className={`btn btn-sm ${view === 'week' ? 'btn-primary' : 'btn-outline-primary'} me-1`}>Week</button>
            <button onClick={() => setView('month')} className={`btn btn-sm ${view === 'month' ? 'btn-primary' : 'btn-outline-primary'}`}>Month</button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={getData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#007bff" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Recent Orders Table */}
<div className="recent_orders_table_container">
  <h4 className="Product_Heading3">Recent Orders</h4>
  <div className="table-responsive">
    <table className="table table-striped table-bordered mt-3">
      <thead className="table">
        <tr>
          <th>Order ID</th>
          <th>Product Name</th>
          <th>Customer</th>
          <th>Date</th>
          <th>Status</th>
          <th>Amount</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>#1234</td>
          <td>Wireless Mouse</td>
          <td>John Doe</td>
          <td>Apr 22, 2025</td>
          <td><span className="badge bg-warning">Pending</span></td>
          <td>₹899</td>
          <td><a href="/">View Details</a></td>

        </tr>
        <tr>
          <td>#1235</td>
          <td>USB-C Charger</td>
          <td>Priya Sharma</td>
          <td>Apr 21, 2025</td>
          <td><span className="badge bg-success">Delivered</span></td>
          <td>₹1,299</td>
          <td><a href="/">View Details</a></td>


        </tr>
        <tr>
          <td>#1236</td>
          <td>Laptop Stand</td>
          <td>Ravi Kumar</td>
          <td>Apr 20, 2025</td>
          <td><span className="badge bg-danger">Cancelled</span></td>
          <td>₹749</td>
          <td><a href="/">View Details</a></td>

        </tr>
      </tbody>
    </table>
  </div>
</div>

    </div>
  );
}

export default Product;
