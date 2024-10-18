// src/components/SignupModal.jsx
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const SignupModal = () => {
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSignup = (event) => {
    event.preventDefault();
    // Add your signup logic here
    console.log('Signing up with:', { firstName, lastName, username, password, email, organization });
    handleClose();
  };

  return (
    <>
      {/* Button to trigger the modal */}
      <Button variant="primary" onClick={handleShow}>
        Sign Up
      </Button>

      {/* Bootstrap Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSignup}>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formLastName" className="mt-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formUsername" className="mt-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formOrganization" className="mt-3">
              <Form.Label>Organization</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Sign Up
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SignupModal;
