import React, { useState, useEffect } from 'react';
import EntryField from './EntryField';
import Totals from './Totals'; 

const ItemScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Retrieve products from local storage
    const storedProducts = localStorage.getItem('itemList');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const handleProductFound = (foundProduct) => {
    // Check if the product already exists in the array
    const existingProductIndex = products.findIndex(product => product.productName === foundProduct.productName);

    if (existingProductIndex !== -1) {
      // If it exists, update the quantity
      const updatedProducts = [...products];
      updatedProducts[existingProductIndex].quantity += foundProduct.quantity;
      setProducts(updatedProducts);
      // Update local storage
      localStorage.setItem('itemList', JSON.stringify(updatedProducts));
    } else {
      // If it doesn't exist, add the new product
      const newProducts = [...products, foundProduct];
      setProducts(newProducts);
      // Update local storage
      localStorage.setItem('itemList', JSON.stringify(newProducts));
    }
  };

  return (
    <div>
      {products.length > 0 && (
        <div>
          <h2>Items:</h2>
          <ul>
            {products.map((product, index) => (
              <li key={index}>
                <h3>{product.productName}</h3>
                <p>Price: ${product.salePrice}</p>
                <p>Quantity: {product.quantity}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="totals">
        <Totals products={products} />
      </div>
      <div className="entry-field">
        <EntryField onProductFound={handleProductFound} />
      </div>
    </div>
  );
};

export default ItemScreen;