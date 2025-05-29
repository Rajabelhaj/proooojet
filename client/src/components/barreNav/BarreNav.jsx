
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../JS/actions/auth.action';
import './barreNav.css'; 


const BarreNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, user } = useSelector(state => state.authReducer);

  return (
    <Navbar expand="lg" className="barre-nav" variant="dark">
      <Container>
        <Navbar.Brand href="/">
         <h2>Bijor</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="/">Home</Nav.Link>
            {user?.isAdmin && <Nav.Link href="/admin">Dashboard</Nav.Link>}

            {isAuth ? (
              <>
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Nav.Link onClick={() => dispatch(logout(navigate))}>LogOut</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </>
            )}

            <Nav.Link href="/panier">
              <img
                src="https://images.emojiterra.com/twitter/v14.0/256px/1f6d2.png"
                alt="panier"
                width={30}
                height={30}
              />
            </Nav.Link>
            <Nav.Link href="/commandes">
              Mes commandes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BarreNav;
