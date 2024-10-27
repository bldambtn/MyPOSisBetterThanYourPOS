import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_INVENTORY } from "../utils/queries";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import BackButton from "../components/BackButton";
import AddItemForm from "../components/AddItemForm";

const InventoryDashboard = () => {
  const { loading, data } = useQuery(QUERY_INVENTORY);
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [upcFilter, setUpcFilter] = useState("");
  const [productNameFilter, setProductNameFilter] = useState("");
  const [inStockFilter, setInStockFilter] = useState("");
  const [salePriceFilter, setSalePriceFilter] = useState("");
  const [showAddItemForm, setShowAddItemForm] = useState(false);

  useEffect(() => {
    if (data) {
      setInventory(data.getInventory);
      setFilteredInventory(data.getInventory);
    }
  }, [data]);

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

  const handleAddItemClick = () => {
    setShowAddItemForm(true);
  };

  const handleAddItemSubmit = (newItem) => {
    // Adding the new item to the inventory
    setInventory([...inventory, newItem]);
    setFilteredInventory([...filteredInventory, newItem]);

    console.log("New item added:", newItem);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
    <div className="ag-theme-alpine inventory-dashboard">
      <div className="top-right-button">
        <button
          className="button-common add-item-btn"
          onClick={handleAddItemClick}
        >
          Add Item
        </button>
        <BackButton to="/enterprise"></BackButton>
      </div>
      <h1 className="merriweather-bold">Inventory Dashboard</h1>
      <h2 className="filter-inventory-title">Filter Inventory</h2>{" "}
      <div className="filter-inputs">
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
        <button onClick={handleFilterChange} className="apply-filters-btn">
          Apply Filters
        </button>
      </div>
      {showAddItemForm && (
        <AddItemForm
          onClose={() => setShowAddItemForm(false)}
          onSubmit={handleAddItemSubmit}
        />
      )}
      <AgGridReact
        rowData={filteredInventory}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={20}
      />
    </div>
  );
};

export default InventoryDashboard;
