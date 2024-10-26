import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client"; // Import useQuery only once
import { QUERY_INVENTORIES } from "../utils/queries"; // Assuming the correct path for the query
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import BackButton from "../components/BackButton"; // Assuming correct path for BackButton component
import '../index.css';

const InventoryDashboard = () => {
  // Fetching inventory data from GraphQL
  const { loading, data } = useQuery(QUERY_INVENTORIES);

  // State for inventory and filtered inventory
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);

  // State for filter inputs
  const [upcFilter, setUpcFilter] = useState("");
  const [productNameFilter, setProductNameFilter] = useState("");
  const [inStockFilter, setInStockFilter] = useState("");
  const [salePriceFilter, setSalePriceFilter] = useState("");

  useEffect(() => {
    if (data) {
      setInventory(data.getInventories); // Assuming the query returns getInventories
      setFilteredInventory(data.getInventories); // Initialize filteredInventory with all items
    }
  }, [data]);

  // Handle the filter changes
  const handleFilterChange = () => {
    let filtered = inventory;

    if (upcFilter) {
      filtered = filtered.filter((item) =>
        item.upc.toLowerCase().includes(upcFilter.toLowerCase())
      );
    }

    if (productNameFilter) {
      filtered = filtered.filter((item) =>
        item.productName.toLowerCase().includes(productNameFilter.toLowerCase())
      );
    }

    if (inStockFilter) {
      filtered = filtered.filter((item) =>
        String(item.inStock).includes(inStockFilter)
      );
    }

    if (salePriceFilter) {
      filtered = filtered.filter((item) =>
        String(item.salePrice).includes(salePriceFilter)
      );
    }

    setFilteredInventory(filtered);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Column definitions for Ag-Grid
  const columnDefs = [
    { headerName: "UPC", field: "upc", sortable: true, filter: true },
    {
      headerName: "Product Name",
      field: "productName",
      sortable: true,
      filter: true,
    },
    { headerName: "In Stock", field: "inStock", sortable: true, filter: true },
    {
      headerName: "Sale Price",
      field: "salePrice",
      sortable: true,
      filter: true,
    },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: "500px", width: "100%" }}>
      <h1>Inventory Dashboard</h1>

      {/* Filter Section */}
      <div>
        <h3>Filter Items</h3>
        <div>
          <label>UPC: </label>
          <input
            type="text"
            value={upcFilter}
            onChange={(e) => setUpcFilter(e.target.value)}
            placeholder="Filter by UPC"
          />
        </div>
        <div>
          <label>Product Name: </label>
          <input
            type="text"
            value={productNameFilter}
            onChange={(e) => setProductNameFilter(e.target.value)}
            placeholder="Filter by Product Name"
          />
        </div>
        <div>
          <label>In Stock: </label>
          <input
            type="text"
            value={inStockFilter}
            onChange={(e) => setInStockFilter(e.target.value)}
            placeholder="Filter by In Stock"
          />
        </div>
        <div>
          <label>Sale Price: </label>
          <input
            type="text"
            value={salePriceFilter}
            onChange={(e) => setSalePriceFilter(e.target.value)}
            placeholder="Filter by Sale Price"
          />
        </div>
        <button
          onClick={handleFilterChange}
          style={{ marginTop: "10px", padding: "10px", cursor: "pointer" }}
        >
          Apply Filters
        </button>
      </div>

      {/* Ag-Grid Table for displaying inventory */}
      <AgGridReact
        rowData={filteredInventory}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={20}
      />

      {/* Back Button */}
      <BackButton to="/enterprise" />
    </div>
  );
};

export default InventoryDashboard;
