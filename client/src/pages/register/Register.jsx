
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { register } from '../../JS/actions/auth.action';
import { Link, useNavigate } from 'react-router-dom';
import './register.css'; // 👈 importe le style

const Register = () => {
  const [newUser, setNewUser] = useState({
    name: "", email: "", password: "", phone: ""
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register(newUser, navigate));
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Créer un compte</h2>
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3">
          <Form.Label>Nom</Form.Label>
          <Form.Control type="text" placeholder="Entrez votre nom"
            name="name" value={newUser.name} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Entrez votre email"
            name="email" value={newUser.email} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control type="password" placeholder="Mot de passe"
            name="password" value={newUser.password} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Téléphone</Form.Label>
          <Form.Control type="tel" placeholder="Téléphone"
            name="phone" value={newUser.phone} onChange={handleChange} />
        </Form.Group>

        <Button type="submit" className="btn-teal w-100">
  S'inscrire
</Button>


        <div className="register-link">
          <p>Vous avez déjà un compte ?
            <Link to="/login"> Connectez-vous</Link>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default Register;
