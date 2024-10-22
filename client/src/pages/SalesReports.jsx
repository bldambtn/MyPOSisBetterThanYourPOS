import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_SALES_REPORTS } from '../components/queries';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const SalesReports = () => {
  const [dateRange, setDateRange] = useState('');
  const [product, setProduct] = useState('');
  const [category, setCategory] = useState('');

  const { loading, error, data } = useQuery(GET_SALES_REPORTS, {
    variables: { dateRange, product, category },
  });

  useEffect(() => {
    if (data) {
      console.log("Fetched sales reports:", data.getSalesReports);
    }
  }, [data]);

  const columnDefs = [
    { headerName: 'Date', field: 'date', sortable: true, filter: true },
    { headerName: 'Product', field: 'product', sortable: true, filter: true },
    { headerName: 'Category', field: 'category', sortable: true, filter: true },
    { headerName: 'Quantity Sold', field: 'quantitySold', sortable: true, filter: true },
    {
      headerName: 'Total Revenue',
      field: 'totalRevenue',
      sortable: true,
      filter: true,
      valueFormatter: (params) => `$${params.value.toFixed(2)}`,
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mt-4">
      <h2>Sales Reports</h2>
      <div className="mb-3">
        <label>Date Range:</label>
        <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
          <option value="">All</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>

        <label>Product:</label>
        <input
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="Enter product name"
        />

        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter category"
        />
      </div>

      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          rowData={data?.getSalesReports || []}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={20}
          domLayout="autoHeight"
        />
      </div>
    </div>
  );
};

export default SalesReports;
