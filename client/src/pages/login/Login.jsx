import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useDispatch} from 'react-redux';
import { login} from '../../JS/actions/auth.action';
import { useNavigate} from 'react-router-dom';

const Login = () => {
  const [userToConnect, setUserToConnect] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleChange = (e) => {
    setUserToConnect({...userToConnect, [e.target.name]:e.target.value});
  };
    //console.log(userToConnect);
    const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(userToConnect, navigate));

    };
    
  return (
    <div className="container">
      <h2>Login page</h2>
      <Form onSubmit={handleLogin}>
     
      <Form.Group className="mb-3" >
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" 
        name="email" value= {userToConnect.email}
        onChange={handleChange}/>
        
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="text" placeholder="Password"
         name="password" value= {userToConnect.password}
         onChange={handleChange} />
      </Form.Group>
     
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
    </div>
  );
};

export default Login;