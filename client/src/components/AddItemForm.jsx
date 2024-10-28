import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const AddItemForm = ({ onClose, onSubmit, initialData }) => {
  // Use initialData if provided (for editing), otherwise use default empty values for adding
  const [formState, setFormState] = useState({
    upc: "",
    plu: "",
    productName: "",
    inStock: "",
    salePrice: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  // Update formState if initialData changes (e.g., when entering edit mode)
  useEffect(() => {
    if (initialData) {
      setFormState({
        upc: initialData.upc || "",
        plu: initialData.plu || "",
        productName: initialData.productName || "",
        inStock: initialData.inStock ? String(initialData.inStock) : "",
        salePrice: initialData.salePrice ? String(initialData.salePrice) : "",
      });
    }
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formState.upc ||
      !formState.plu ||
      !formState.productName ||
      !formState.inStock ||
      !formState.salePrice
    ) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (isNaN(formState.inStock) || isNaN(formState.salePrice)) {
      setErrorMessage("In Stock and Sale Price must be numeric values.");
      return;
    }

    const numericFormState = {
      ...formState,
      inStock: parseInt(formState.inStock, 10),
      salePrice: parseFloat(formState.salePrice),
    };

    onSubmit(numericFormState);
    setFormState({
      upc: "",
      plu: "",
      productName: "",
      inStock: "",
      salePrice: "",
    });
    setErrorMessage("");
  };

  const handleDiscardChanges = () => {
    setFormState({
      upc: initialData ? initialData.upc : "",
      plu: initialData ? initialData.plu : "",
      productName: initialData ? initialData.productName : "",
      inStock: initialData ? String(initialData.inStock) : "",
      salePrice: initialData ? String(initialData.salePrice) : "",
    });
    setErrorMessage("");
  };

  return (
    <Modal show={true} onHide={onClose} className="add-item-form">
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? "Edit Item" : "Add Item"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUPC" className="mt-3">
            <Form.Label>UPC</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter UPC"
              name="upc"
              value={formState.upc}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPLU" className="mt-3">
            <Form.Label>PLU</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter PLU"
              name="plu"
              value={formState.plu}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formProductName" className="mt-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              name="productName"
              value={formState.productName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formInStock" className="mt-3">
            <Form.Label>In Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter stock quantity"
              name="inStock"
              value={formState.inStock}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formSalePrice" className="mt-3">
            <Form.Label>Sale Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter sale price"
              name="salePrice"
              value={formState.salePrice}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="discard-changes-btn" onClick={handleDiscardChanges}>
          Discard Changes
        </Button>
        <Button className="add-item-btn" onClick={handleSubmit}>
          {initialData ? "Update Item" : "Add Item"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddItemForm;
