import React, { useState, useEffect } from "react";
import EntryField from "./EntryField";
import Totals from "./Totals";

const ItemScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem("itemList");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const handleProductFound = (foundProduct) => {
    const existingProductIndex = products.findIndex(
      (product) => product.productName === foundProduct.productName
    );

    if (existingProductIndex !== -1) {
      const updatedProducts = [...products];
      updatedProducts[existingProductIndex].quantity += foundProduct.quantity;
      setProducts(updatedProducts);
      localStorage.setItem("itemList", JSON.stringify(updatedProducts));
    } else {
      const newProducts = [...products, foundProduct];
      setProducts(newProducts);
      localStorage.setItem("itemList", JSON.stringify(newProducts));
    }
  };

  const handleRemoveLastItem = () => {
    setProducts((prevProducts) => {
      if (prevProducts.length > 0) {
        const updatedProducts = prevProducts.slice(0, -1);
        localStorage.setItem("itemList", JSON.stringify(updatedProducts));
        return updatedProducts;
      }
      return prevProducts;
    });
  };

  return (
    <div>
      {products.length > 0 && (
        <div>
          <ul>
            {products.map((product, index) => (
              <li key={index} className="product-item">
                <h5 className="product-details">
                  {product.productName}, {product.quantity}
                </h5>
                <h5 className="product-price">${product.salePrice}</h5>
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
