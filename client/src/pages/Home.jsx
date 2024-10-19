import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      <h1>Welcome to the Home Page</h1>
      <p>Hello World!</p>
      <h1 className="title-banner">Welcome to Our Application</h1>
      <div className="button-container">
        <Link to="/enterprise">
          <button className="enterprise-button">Enterprise</button>
        </Link>
        <button className="marketplace-button" disabled>
          Marketplace (coming soon)
        </button>
        {/* Added the link to Inventory Dashboard */}
        <Link to="/inventory">
          <button className="inventory-button">Inventory Dashboard</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
