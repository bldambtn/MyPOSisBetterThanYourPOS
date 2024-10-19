import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import SignupModal from "../components/SignUp";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      <p>Hello World!</p>
      <div className="button-container">
        <Link to="/enterprise">
          <button className="enterprise-button">Enterprise</button>
        </Link>
        <button className="marketplace-button" disabled>
          Marketplace (coming soon)
        </button>
      </div>
    </div>
  );
};




export default Home;

