import React, { useState } from 'react';
import EntryField from './EntryField'; // Make sure to import your EntryField component

const ItemScreen = () => {
  const [products, setProducts] = useState([]);

  const handleProductFound = (foundProduct) => {
    // Add the found product to the array
    setProducts((prevProducts) => [...prevProducts, foundProduct]);
  };

  return (
    <div>
      <EntryField onProductFound={handleProductFound} />
      {products.length > 0 && (
        <div>
          <h2>Items for Sale:</h2>
          <ul>
            {products.map((product, index) => (
              <li key={index}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};