import React from 'react';
import LoginModal from './LoginModal';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div className="container">
      <h1>Welcome to the Home Page</h1>
      <p>Hello World!</p>
      <LoginModal />
    </div>
  );
};

export default Home;

