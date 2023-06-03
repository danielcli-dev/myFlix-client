import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";

export const NavigationBar = ({ user }) => {
  // const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
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
                <Nav.Link
                  className="text-white"
                  onClick={() => dispatch(setUser(""))}
                >
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
