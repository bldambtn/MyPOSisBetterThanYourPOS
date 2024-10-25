import React, { useState } from 'react';

const ActionButtons = () => {
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePayment = (method) => {
    setPaymentMethod(method);
    const isPaymentSuccessful = window.confirm(`Proceed to take payment via ${method}?`);

    if (isPaymentSuccessful) {
      alert(`Payment accepted via ${method}. Proceeding...`);
      
      // Remove only the 'itemList' from local storage
      localStorage.removeItem('itemList');
      
      // Refresh the page
      window.location.reload();
    } else {
      alert('Payment was not processed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Select Payment Method</h2>
      <button onClick={() => handlePayment('CASH')}>CASH</button>
      <button onClick={() => handlePayment('CARD')}>CARD</button>
    </div>
  );
};

export default ActionButtons;