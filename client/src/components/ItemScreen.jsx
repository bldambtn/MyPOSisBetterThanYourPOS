import React, { useState } from 'react';
import EntryField from './EntryField';

const ItemScreen = () => {
  const [products, setProducts] = useState([]);

  const handleProductFound = (foundProduct) => {
    setProducts((prevProducts) => {
      if (prevProducts.some(product => product.plu === foundProduct.plu)) {
        return prevProducts;
      }
      return [...prevProducts, foundProduct];
    });
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
                <h3>{product.productName}</h3>
                <p>Price: ${product.salePrice.toFixed(2)}</p>
                <p>PLU: {product.plu}</p>
                <p>Stock: {product.inStock}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ItemScreen;
