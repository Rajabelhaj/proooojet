import React from 'react';
import {Navbar,Nav, Container} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../JS/actions/auth.action';

const BarreNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isAuth, user} = useSelector(state=>state.authReducer);
  return (
    <div>
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">
          <img src="https://plus.unsplash.com/premium_photo-1661645433820-24c8604e4db5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt ="logo" width={40} height={40}  style={{borderRadius:"20%"}}/>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            
            {user.isAdmin && <Nav.Link href="/admin">Dashboard</Nav.Link>}
            {isAuth ? (
              <>
            (<Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="#" onClick={() => dispatch(logout(navigate))}>
              LogOut</Nav.Link>)</>
              )  : (
              <>
            (<Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>)</>)}
            <Nav.Link href="/panier">
            <img src="https://images.emojiterra.com/twitter/v14.0/256px/1f6d2.png" alt="logo" width={40} height={40}/>
            
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default BarreNav;