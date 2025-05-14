import React, { useState } from 'react';
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

const id=localStorage.getItem("vendorId")

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
      case 'day': return dataDay;
      case 'month': return dataMonth;
      default: return dataWeek;
    }
  };

  return (
    <div>
      <Navbar
  homeLabel="Home"
  homeUrl={`/Product/${id}`}
  jobsLabel="Products"
  jobsUrl={`/product/${id}/ViewProduct`}
  historyLabel="New Orders"
  historyUrl={`/product/${id}/order`}
  earningsLabel="Order History"
  earningsUrl={`/product/${id}/order/history`}
/>
      <div className="container my-4">
        <div className="row g-3">
          <div className="col-md-3">
            <div className="card text-white bg-primary h-100">
              <div className="card-body">
                <h6 className="card-title">Total Sales</h6>
                <h4 className="card-text">₹30,000</h4>
                <i className="bi bi-graph-up fs-3"></i>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-success h-100">
              <div className="card-body">
                <h6 className="card-title">New Orders</h6>
                <h4 className="card-text">30</h4>
                <i className="bi bi-bag fs-3"></i>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-warning h-100">
              <div className="card-body">
                <h6 className="card-title">Pending Shipments</h6>
                <h4 className="card-text">12</h4>
                <i className="bi bi-truck fs-3"></i>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-info h-100">
              <div className="card-body">
                <h6 className="card-title">Customer Rating</h6>
                <h5 className="card-text">4.0/5.0</h5>
                <small className="text-white-50">(142 Reviews)</small><br />
                <i className="bi bi-star-fill fs-3"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold">Overall Sales Analytics</h5>
          <div>
            <button onClick={() => setView('day')} className={`btn btn-sm ${view === 'day' ? 'btn-primary' : 'btn-outline-primary'} me-1`}>Day</button>
            <button onClick={() => setView('week')} className={`btn btn-sm ${view === 'week' ? 'btn-primary' : 'btn-outline-primary'} me-1`}>Week</button>
            <button onClick={() => setView('month')} className={`btn btn-sm ${view === 'month' ? 'btn-primary' : 'btn-outline-primary'}`}>Month</button>
          </div>
        </div>
        <div style={{ height: 350 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={getData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#007bff" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="container mb-5">
        <h5 className="fw-bold mb-3">Recent Orders</h5>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-light">
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
