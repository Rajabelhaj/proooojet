

import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { login } from '../../JS/actions/auth.action';
import { useNavigate } from 'react-router-dom';
import './login.css'; 

const Login = () => {
  const [userToConnect, setUserToConnect] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserToConnect({ ...userToConnect, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(userToConnect, navigate));
  };

  return (
    <div className="login-container">
      <Form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-title">Connexion</h2>

        <Form.Group className="mb-3">
          <Form.Label>Adresse Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="ex: nom@example.com"
            name="email"
            value={userToConnect.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Mot de passe"
            name="password"
            value={userToConnect.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Button className="login-btn" type="submit">
          🔐 Se connecter
        </Button>
      </Form>
    </div>
  );
};

export default Login;
