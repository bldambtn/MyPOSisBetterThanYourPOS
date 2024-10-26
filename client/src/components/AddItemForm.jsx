import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const AddItemForm = ({ onClose, onSubmit }) => {
  const [formState, setFormState] = useState({
    upc: "",
    productName: "",
    inStock: "",
    salePrice: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic validation
    if (
      !formState.upc ||
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

    // If validation passes, submit the form
    onSubmit(formState);
    setFormState({
      upc: "",
      productName: "",
      inStock: "",
      salePrice: "",
    });
    setErrorMessage(""); // Clear any error messages
  };

  const handleDiscardChanges = () => {
    setFormState({
      upc: "",
      productName: "",
      inStock: "",
      salePrice: "",
    });
    setErrorMessage(""); // Clear any error messages
  };

  return (
    <Modal show={true} onHide={onClose} className="add-item-form">
      <Modal.Header closeButton>
        <Modal.Title>Add Item</Modal.Title>
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
          Add Item
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddItemForm;