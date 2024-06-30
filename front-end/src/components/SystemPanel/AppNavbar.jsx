import { useState } from "react";
import {
  Row,
  Col,
  Offcanvas,
  NavDropdown,
  Navbar,
  Nav,
  Form,
  Button,
  Container,
  Image,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faGauge,
  faBolt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, Link } from "react-router-dom";
import "../../assets/appcss/navcss.css";
import MenuBar from "../../assets/images/menu-bar.png";
import SentifyLogoLG from "../../assets/images/SentifyLogoSM.png";
import UserProfileImageOff from "../../assets/images/user-profile-off.png";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function AppNavbar() {
  const targetExpand = "false"; // Set the breakpoint you want to use
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  const addAlert = () => {
    setShow(show ? false : true);
  };

  const handleSignOut = () => {
    // Remove cookies (replace 'accessToken' with the name of your cookie)
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("userID");
    Cookies.remove("userName");

    // Redirect to the sign-in page or any other desired route
    window.location.href = "/signin";
    // navigate("/signin");
  };
  return (
    <>
      <Navbar expand={targetExpand} className="mb-3 nav-color" sticky="top">
        <Container fluid>
          <Navbar.Brand className="text-dark ms-4">
            <img src={SentifyLogoLG} style={{ width: "140px" }} alt="logo" />
            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-${targetExpand}`}
              onClick={addAlert}
              className="ms-5"
            />
          </Navbar.Brand>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${targetExpand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${targetExpand}`}
            placement="start"
            backdrop={false}
            scroll={true}
            style={{
              border: "none",
              marginTop: "60px",
              maxWidth: "280px",
            }}
          >
            {/* <Offcanvas.Header>
              <Offcanvas.Title
                id={`offcanvasNavbarLabel-expand-${targetExpand}`}
              >
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header> */}
            <Offcanvas.Body>
              {/* <Nav className="justify-content-end flex-grow-1">
                <Form className="justify-content-center d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2 ms-5"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Nav> */}

              <Row className="bg-dark text-white rounded-pill mt-5">
                <Col className="col-sm-4">
                  <Image
                    variant="top"
                    className="py-2"
                    src={UserProfileImageOff}
                    alt="User Profile"
                  />
                </Col>
                <Col className="col-sm-8 d-flex align-items-center">
                  <NavDropdown
                    title={Cookies.get("userName")}
                    id={`offcanvasNavbarDropdown-expand-${targetExpand}`}
                  >
                    <NavDropdown.Item as={Link} to="/user-profile">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      as={Link}
                      to="/signin"
                      className="text-danger"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </NavDropdown.Item>
                  </NavDropdown>
                </Col>
              </Row>
              <Nav className="justify-content-center flex-grow-1 pe-5 h-75">
                <Link
                  to="/"
                  className="small-box-link align-items-center justify-content-start"
                >
                  {" "}
                  <span>
                    <FontAwesomeIcon icon={faHome} className="mx-3" />
                  </span>{" "}
                  <span>Home</span>
                </Link>
                <Link
                  to="/dashboard"
                  className="small-box-link align-items-center justify-content-start"
                >
                  <FontAwesomeIcon icon={faGauge} className="mx-3" />
                  History
                </Link>
                <Link
                  to="/analyzer"
                  className="small-box-link align-items-center justify-content-start"
                >
                  <FontAwesomeIcon icon={faBolt} className="mx-3" />
                  Analyzer
                </Link>
                <Link
                  to="/user-profile"
                  className="small-box-link align-items-center justify-content-start"
                >
                  <FontAwesomeIcon icon={faUser} className="mx-3" />
                  Profile
                </Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
