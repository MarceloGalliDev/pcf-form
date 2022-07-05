import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';



const Header: React.FC = () => {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
        <Navbar.Brand>PCF</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Item className="nav-link" as={Link} to="/taskshome">Início</Nav.Item>
            <Nav.Item className="nav-link" as={Link} to="/tasks">Tarefas</Nav.Item>
        </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default Header;