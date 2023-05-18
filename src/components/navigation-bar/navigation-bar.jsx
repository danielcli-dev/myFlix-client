import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar className="bg-primary text-white" expand="lg">
      <Container fluid className="px-3">
        <Navbar.Brand className="text-white" as={Link} to="/">
          myFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user ? (
              <>
                <Nav.Link className="text-white" as={Link} to={`/`}>
                  Home
                </Nav.Link>
                <Nav.Link className="text-white" as={Link} to={`/login`}>
                  Login
                </Nav.Link>
                <Nav.Link className="text-white" as={Link} to={`/signup`}>
                  Sign Up
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link className="text-white " as={Link} to={`/`}>
                  Home
                </Nav.Link>
                <Nav.Link className="text-white" as={Link} to={`/profile`}>
                  Profile
                </Nav.Link>
                <Nav.Link className="text-white" onClick={onLoggedOut}>
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
