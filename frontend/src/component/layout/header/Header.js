import React,{useState} from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

import {FiShoppingBag} from 'react-icons/fi';
import {CgProfile} from 'react-icons/cg';
import {FcSearch} from 'react-icons/fc';

const Header = () => {
  const [show, setShow] = useState(false);
const showDropdown = (e)=>{
    setShow(!show);
}
const hideDropdown = e => {
    setShow(false);
}

  return (
    <Navbar expand="lg" className='py-0'>
    <Container fluid >
      <Navbar.Brand to="#">IanSabi <sub>e-commerce</sub></Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="me-auto my-1 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll >
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <NavDropdown title="Products" id="navbarScrollingDropdown" show={show} onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
            <NavDropdown.Item as={Link} to="/products" className='dropdownitme'>Trending</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/products" className='dropdownitme'>Newly arrived</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/products" className='dropdownitme'>Diwali Special</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          <Nav.Link as={Link} to="/about">About</Nav.Link>
        </Nav>
        <Form className="d-flex">
          <Link as={Link} to="/search"  ><FcSearch size='2rem'/></Link>
          <Link as={Link} to="/cart"  ><FiShoppingBag size='2rem'/></Link>
          <Link as={Link} to="/login"  ><CgProfile size='2rem'/></Link>
        </Form>
      </Navbar.Collapse>
    </Container>
    </Navbar>
  )
}

export default Header