import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useMutation } from "@apollo/client";
import { ADD_USER, LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const LoginSignupModal = () => {
  const [show, setShow] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    username: "",
    organization: ""
  });

  // Mutations
  const [addUser] = useMutation(ADD_USER);
  const [loginUser] = useMutation(LOGIN_USER);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleToggle = () => setIsLogin(!isLogin);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await addUser({
        variables: {
          email: formState.email,
          password: formState.password,
          firstName: formState.firstName,
          lastName: formState.lastName,
          username: formState.username,
          organization: formState.organization,
        },
      });
  
      const token = mutationResponse.data.addUser.token;
      const user = mutationResponse.data.addUser.user;
      
      console.log('Signup successful!', token, user); 
  
      alert(`Signup successful! Welcome, ${user.username}! Please log in now.`);
      setIsLogin(true); 
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };
  

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await loginUser({
        variables: {
          email: formState.email,
          password: formState.password,
        },
      });
      const token = mutationResponse.data.login.token;
      console.log('Login successful! Token:', token);
      Auth.login(token);
      handleClose(); 
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Login/Signup
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isLogin ? 'Login' : 'Sign Up'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={isLogin ? handleLogin : handleSignup}>
            {!isLogin && (
              <>
                <Form.Group controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    name="firstName"
                    value={formState.firstName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formLastName" className="mt-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    name="lastName"
                    value={formState.lastName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formUsername" className="mt-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    value={formState.username}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formOrganization" className="mt-3">
                  <Form.Label>Organization</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter organization"
                    name="organization"
                    value={formState.organization}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </>
            )}

            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={formState.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              {isLogin ? 'Login' : 'Sign Up'}
            </Button>
          </Form>

          <div className="mt-3">
            {isLogin ? (
              <p>
                Don't have an account?{' '}
                <Button variant="link" onClick={handleToggle}>
                  Sign Up
                </Button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <Button variant="link" onClick={handleToggle}>
                  Login
                </Button>
              </p>
            )}
          </div>
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

export default LoginSignupModal;
