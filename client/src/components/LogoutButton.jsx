import React from 'react';
import { Button } from 'react-bootstrap';
import Auth from '../utils/auth';

const LogoutButton = () => {
  const handleLogout = () => {
    Auth.logout();
    localStorage.removeItem('userId'); // Remove the stored userId
    window.location.reload(); // Refresh the page or navigate as needed
  };

  return (
    <Button variant="danger" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
