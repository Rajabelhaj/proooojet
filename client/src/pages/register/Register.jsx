import React, { useState } from 'react';
import {Form, Button} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {register} from "../../JS/actions/auth.action";
import {Link, useNavigate} from 'react-router-dom';


const Register = () => {
  const [newUser, setNewUser]= useState({
    name:"", email:"", password:"", phone:""
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setNewUser({...newUser, [e.target.name]: e.target.value});
  };
 // console.log(newUser);
 const handleRegister = (e) => {
  e.preventDefault(); //arreter le comportement normal du chargement
   dispatch(register(newUser, navigate)); //essayer l'enregistrement
   //navigate('/profile')//lien vers la page profile


 };

  return (
    <div className="container">
      <h2>Register page</h2>
      <Form onSubmit={handleRegister}>
      <Form.Group className="mb-3" >
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text" placeholder="Enter your name" 
        name="name" value={newUser.name} onChange= {handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter your email"
         name="email" value={newUser.email} onChange={handleChange}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="text" placeholder="Password"
        name="password" value={newUser.password} onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Telehone</Form.Label>
        <Form.Control type="tel" placeholder="Phone"
        name="phone" value={newUser.phone} onChange={handleChange}/>
      </Form.Group>
      <p>si vous avez un compte vous pouvez connecter
      <span>   <Link to={"/login"}> Login</Link></span></p>
      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
    </div>
  );
};

export default Register;