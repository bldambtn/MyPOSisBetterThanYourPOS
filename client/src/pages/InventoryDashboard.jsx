import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_INVENTORY } from "../utils/queries";
import { ADD_INVENTORY, UPDATE_INVENTORY, DELETE_INVENTORY } from "../utils/mutations";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import BackButton from "../components/BackButton";
import AddItemForm from "../components/AddItemForm";

const InventoryDashboard = () => {
  const { loading, data, error } = useQuery(QUERY_INVENTORY);
  const [addInventory] = useMutation(ADD_INVENTORY);
  const [updateInventory] = useMutation(UPDATE_INVENTORY);
  const [deleteInventory] = useMutation(DELETE_INVENTORY);
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [upcFilter, setUpcFilter] = useState("");
  const [pluFilter, setPluFilter] = useState("");
  const [productNameFilter, setProductNameFilter] = useState("");
  const [inStockFilter, setInStockFilter] = useState("");
  const [salePriceFilter, setSalePriceFilter] = useState("");
  console.log([data])
  useEffect(() => {
    if (loading) {
      console.log("Loading inventory data...");
    }

    if (error) {
      console.error("Error fetching inventory data:", error);
    }

    if (data && data.getInventory) {
      console.log("Fetched Inventory Data:", data.getInventory);
      setInventory(data.getInventory);
      setFilteredInventory(data.getInventory);
    }
  }, [data, loading, error]);

  const handleFilterChange = () => {
    let filtered = inventory;
    if (upcFilter) {
      filtered = filtered.filter((item) =>
        item.upc.toLowerCase().includes(upcFilter.toLowerCase())
      );
    }
    if (pluFilter) {
      filtered = filtered.filter((item) =>
        item.plu.toLowerCase().includes(pluFilter.toLowerCase())
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
    setEditingItem(null); // Clear edit mode for adding new item
    setShowAddItemForm(true);
  };

  const handleAddItemSubmit = async (newItem) => {
    try {
      const { data } = await addInventory({
        variables: newItem,
      });
      const addedItem = data.addInventory;
      setInventory([...inventory, addedItem]);
      setFilteredInventory([...filteredInventory, addedItem]);
      console.log("New item added to MongoDB:", addedItem);
      setShowAddItemForm(false);
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };

  const handleUpdateItemSubmit = async (updatedItem) => {
    try {
      const { data } = await updateInventory({
        variables: {
          id: editingItem._id, // Ensure id is explicitly provided
          plu: updatedItem.plu,
          productName: updatedItem.productName,
          inStock: updatedItem.inStock,
          salePrice: updatedItem.salePrice,
        },
      });
      const updatedInventory = data.updateInventory;
      setInventory((prev) =>
        prev.map((item) => (item._id === updatedInventory._id ? updatedInventory : item))
      );
      setFilteredInventory((prev) =>
        prev.map((item) => (item._id === updatedInventory._id ? updatedInventory : item))
      );
      setEditingItem(null);
    } catch (err) {
      console.error("Error updating item:", err);
    }
  };
  

  const handleDeleteItem = async (id) => {
    try {
      await deleteInventory({ variables: { id } });
      setInventory((prev) => prev.filter((item) => item._id !== id));
      setFilteredInventory((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const columnDefs = [
  { headerName: "UPC", field: "upc", sortable: true, filter: true },
  { headerName: "PLU", field: "plu", sortable: true, filter: true },
  { headerName: "Product Name", field: "productName", sortable: true, filter: true },
  { headerName: "In Stock", field: "inStock", sortable: true, filter: true },
  { headerName: "Sale Price", field: "salePrice", sortable: true, filter: true },
  {
    headerName: "Actions",
    field: "actions",
    cellRenderer: (params) => {
      // Check if data is available and render buttons if so
      return params.data ? (
        <div>
          <button onClick={() => setEditingItem(params.data)}>Edit</button>
          <button onClick={() => handleDeleteItem(params.data._id)}>Delete</button>
        </div>
      ) : null;
    },
  },
];

  return (
    <div className="ag-theme-alpine inventory-dashboard">
      <div className="top-right-button">
        <button className="button-common add-item-btn" onClick={handleAddItemClick}>
          Add Item
        </button>
        <BackButton to="/enterprise"></BackButton>
      </div>
      <h1 className="merriweather-bold">Inventory Dashboard</h1>
      <h2 className="filter-inventory-title">Filter Inventory</h2>
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
          <label>PLU: </label>
          <input
            type="text"
            value={pluFilter}
            onChange={(e) => setPluFilter(e.target.value)}
            placeholder="Filter by PLU"
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
      {editingItem && (
        <AddItemForm
          onClose={() => setEditingItem(null)}
          onSubmit={handleUpdateItemSubmit}
          initialData={editingItem}
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
