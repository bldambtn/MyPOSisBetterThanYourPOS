import React from 'react';

const Totals = ({ products }) => {
    const calculateTotals = () => {
        const subtotal = products.reduce((acc, product) => {
            return acc + (product.salePrice * product.quantity);
        }, 0);

        const taxRate = 0.0825; // 8.25%
        const tax = subtotal * taxRate;
        const total = subtotal + tax;

        return { subtotal, tax, total };
    };

    const { subtotal, tax, total } = calculateTotals();

    return (
        <div>
            <h2>Totals</h2>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Tax (8.25%): ${tax.toFixed(2)}</p>
            <p>Total: ${total.toFixed(2)}</p>
        </div>
    );
};

export default Totals;