import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Badge } from 'react-bootstrap';



function NavaPro() {
  return (
    <div>
      <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Apna Mestri</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav text-white">
            <Nav className="mx-auto text-white me-4">
              <Nav.Link href="#home" className="text-white">Home</Nav.Link>
              <Nav.Link href="#services" className="text-white">Category</Nav.Link>
              <Nav.Link href="#products" className="text-white">Products</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <Nav.Link href="#Product" className="text-white position-relative">
                <i className="bi bi-cart" style={{ fontSize: '1.2rem' }}></i>
                <Badge
                  pill
                  bg="danger"
                  className="position-absolute top-4 start-100 translate-middle"
                  style={{ fontSize: '0.6rem' }}
                >
                  1
                </Badge>
              </Nav.Link>
              <Nav.Link href="#Product" className="text-white">SignUp</Nav.Link>
              <Nav.Link href="#Product" className="text-white">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      
    </div>
  );
}

export default NavaPro;
