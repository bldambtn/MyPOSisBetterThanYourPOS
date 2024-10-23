// client/src/components/BackButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ to }) => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(to)} style={{ margin: '20px', padding: '10px', cursor: 'pointer' }}>
      Back to Enterprise
    </button>
  );
};

export default BackButton;
