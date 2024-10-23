// client/src/pages/InventoryDashboard.jsx

import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_INVENTORY } from '../utils/queries';

const InventoryDashboard = () => {
  const { loading, data } = useQuery(QUERY_INVENTORY);
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    if (data) {
      setInventoryItems(data.inventory);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Inventory Dashboard</h1>
      <h2>Inventory Schema</h2>
      <table>
        <thead>
          <tr>
            <th>Field Name</th>
            <th>Data Type</th>  {/* Field data type (string, number, etc.) */}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>UPC</td>
            <td>String</td>  {}
          </tr>
          <tr>
            <td>Product Name</td>
            <td>String</td>  {}
          </tr>
          <tr>
            <td>In Stock</td>
            <td>Number</td>  {}
          </tr>
          <tr>
            <td>Sale Price</td>
            <td>Number</td>  {}
          </tr>
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            <th>UPC</th>
            <th>Product Name</th>
            <th>In Stock</th>
            <th>Sale Price</th>
          </tr>
        </thead>
        <tbody>
          {inventoryItems.map(item => (
            <tr key={item._id}>
              <td>{item.upc}</td>
              <td>{item.productName}</td>
              <td>{item.inStock}</td>
              <td>{item.salePrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryDashboard;
