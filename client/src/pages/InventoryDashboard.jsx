import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_INVENTORY } from '../utils/queries'; // Updated to inventory

const InventoryDashboard = () => {
  const { loading, data } = useQuery(QUERY_INVENTORY); // Updated to inventory
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);

  // State variables for filters
  const [upcFilter, setUpcFilter] = useState('');
  const [productNameFilter, setProductNameFilter] = useState('');
  const [inStockFilter, setInStockFilter] = useState('');
  const [salePriceFilter, setSalePriceFilter] = useState('');

  // When data is fetched, set both inventory and filteredInventory
  useEffect(() => {
    if (data) {
      setInventory(data.inventory); // Updated to inventory
      setFilteredInventory(data.inventory);  // Initialize filtered inventory with all items
    }
  }, [data]);

  // Show loading state while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Function to filter the table based on input values
  const handleFilterChange = () => {
    let filtered = inventory; // Updated to inventory

    if (upcFilter) {
      filtered = filtered.filter(item =>
        item.upc.toLowerCase().includes(upcFilter.toLowerCase())
      );
    }

    if (productNameFilter) {
      filtered = filtered.filter(item =>
        item.productName.toLowerCase().includes(productNameFilter.toLowerCase())
      );
    }

    if (inStockFilter) {
      filtered = filtered.filter(item =>
        String(item.inStock).includes(inStockFilter)
      );
    }

    if (salePriceFilter) {
      filtered = filtered.filter(item =>
        String(item.salePrice).includes(salePriceFilter)
      );
    }

    setFilteredInventory(filtered);
  };

  return (
    <div>
      <h1>Inventory Dashboard</h1>

      <div>
        <h3>Filter Items</h3>
        <div>
          <label>UPC: </label>
          <input
            type="text"
            value={upcFilter}
            onChange={e => {
              setUpcFilter(e.target.value);
              handleFilterChange();  // Trigger filter update
            }}
            placeholder="Filter by UPC"
          />
        </div>
        <div>
          <label>Product Name: </label>
          <input
            type="text"
            value={productNameFilter}
            onChange={e => {
              setProductNameFilter(e.target.value);
              handleFilterChange();  // Trigger filter update
            }}
            placeholder="Filter by Product Name"
          />
        </div>
        <div>
          <label>In Stock: </label>
          <input
            type="text"
            value={inStockFilter}
            onChange={e => {
              setInStockFilter(e.target.value);
              handleFilterChange();  // Trigger filter update
            }}
            placeholder="Filter by In Stock"
          />
        </div>
        <div>
          <label>Sale Price: </label>
          <input
            type="text"
            value={salePriceFilter}
            onChange={e => {
              setSalePriceFilter(e.target.value);
              handleFilterChange();  // Trigger filter update
            }}
            placeholder="Filter by Sale Price"
          />
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>UPC</th>
            <th>Product Name</th>
            <th>In Stock</th>
            <th>Sale Price</th>
            <th>Vendor Price</th>
            <th>Company of Origin</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map(item => (
            <tr key={item._id}>
              <td>{item.upc}</td>
              <td>{item.productName}</td>
              <td>{item.inStock}</td>
              <td>{item.salePrice.toFixed(2)}</td> 
              <td>{item.vendorPrice.toFixed(2)}</td>
              <td>{item.companyOfOrigin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryDashboard;
