import React, { useState } from 'react';
import EntryField from './EntryField'; // Make sure to import your EntryField component
import Totals from './Totals'; // Make sure to import your Totals component

const ItemScreen = () => {
  const [products, setProducts] = useState([]);

  const handleProductFound = (foundProduct) => {
    // Add the found product to the array
    setProducts((prevProducts) => [...prevProducts, foundProduct]);
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
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="totals">
        <Totals onProductFound={handleProductFound} />
      </div>
      <div className="entry-field">
        <EntryField onProductFound={handleProductFound} />
      </div>
    </div>
  );
};

export default ItemScreen;