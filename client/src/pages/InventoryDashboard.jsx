import React, { useEffect, useState, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_INVENTORIES } from '../components/queries';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import BackButton from '../components/BackButton';

const InventoryDashboard = () => {
  const { loading, data } = useQuery(QUERY_INVENTORIES);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [upcFilter, setUpcFilter] = useState('');
  const [productNameFilter, setProductNameFilter] = useState('');
  const [inStockFilter, setInStockFilter] = useState('');
  const [salePriceFilter, setSalePriceFilter] = useState('');

  useEffect(() => {
    if (data && data.getInventories) {
      setItems(data.getInventories);
      setFilteredItems(data.getInventories);
    }
  }, [data]);

  const handleFilterChange = useCallback(() => {
    let filtered = items;

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

    setFilteredItems(filtered);
  }, [upcFilter, productNameFilter, inStockFilter, salePriceFilter, items]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const columnDefs = [
    { headerName: 'UPC', field: 'upc', sortable: true, filter: true },
    { headerName: 'Product Name', field: 'productName', sortable: true, filter: true },
    { headerName: 'In Stock', field: 'inStock', sortable: true, filter: true },
    { headerName: 'Sale Price', field: 'salePrice', sortable: true, filter: true },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
      <h1>Inventory Dashboard</h1>
      <div>
        <h3>Filter Items</h3>
        <div>
          <label>UPC: </label>
          <input
            type="text"
            value={upcFilter}
            onChange={e => setUpcFilter(e.target.value)}
            placeholder="Filter by UPC"
          />
        </div>
        <div>
          <label>Product Name: </label>
          <input
            type="text"
            value={productNameFilter}
            onChange={e => setProductNameFilter(e.target.value)}
            placeholder="Filter by Product Name"
          />
        </div>
        <div>
          <label>In Stock: </label>
          <input
            type="text"
            value={inStockFilter}
            onChange={e => setInStockFilter(e.target.value)}
            placeholder="Filter by In Stock"
          />
        </div>
        <div>
          <label>Sale Price: </label>
          <input
            type="text"
            value={salePriceFilter}
            onChange={e => setSalePriceFilter(e.target.value)}
            placeholder="Filter by Sale Price"
          />
        </div>
        <button onClick={handleFilterChange} style={{ marginTop: '10px', padding: '10px', cursor: 'pointer' }}>
          Apply Filters
        </button>
      </div>

      <AgGridReact
        rowData={filteredItems}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
      />
      <BackButton to="/enterprise" />
    </div>
  );
};

export default InventoryDashboard;
