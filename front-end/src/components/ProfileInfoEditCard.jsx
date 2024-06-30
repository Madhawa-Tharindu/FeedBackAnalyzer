import {
  Card,
  Button,
  Row,
  Col,
  Image,
  ListGroup,
  Badge,
  Form,
} from "react-bootstrap";
import CardGroup from "react-bootstrap/CardGroup";
import UserProfileImage from "../assets/images/user-profile.png";
import "../assets/appcss/userprofilecss.css";

export default function ProfileInfoEditCard() {
  return (
    <Card>
      <Card.Body className="p-5">
        <Form>
          <Row>
            <Col className="col-sm-4 d-flex">
              <h6>Name</h6>
            </Col>
            <Col className="col-sm-8">
              <Form.Control type="text" placeholder="Madhawa Kumarathunga" />
            </Col>
          </Row>
          <hr />
          <Row className="mt-3">
            <Col className="col-sm-4 d-flex">
              <h6>Address</h6>
            </Col>
            <Col className="col-sm-8">
              <Form.Control
                type="text"
                placeholder="34/28 Dharmarathne Avenue, Rawathawatte, Moratuwa"
              />
            </Col>
          </Row>
          <hr />
          <Row className="mt-3">
            <Col className="col-sm-4 d-flex">
              <h6>Ocupation</h6>
            </Col>
            <Col className="col-sm-8">
              <Form.Control type="text" placeholder="Engineer" />
            </Col>
          </Row>
          <hr />
          <Row className="mt-3">
            <Col className="col-sm-4 d-flex">
              <h6>Email</h6>
            </Col>
            <Col className="col-sm-8">
              <Form.Control type="email" placeholder="name@example.com" />
            </Col>
          </Row>
          <hr />
          <Row className="mt-3">
            <Col className="col-sm-4 d-flex">
              <h6>Phone No</h6>
            </Col>
            <Col className="col-sm-8">
              <Form.Control type="tel" placeholder="+94 776 9999 35" />
            </Col>
          </Row>
          <hr />
          <Row className="mt-3">
            <Col className="col-sm-4 d-flex">
              <h6>Age</h6>
            </Col>
            <Col className="col-sm-8">
              <Form.Control type="number" placeholder="name@example.com" />
            </Col>
          </Row>
          <hr />
          <Row className="mt-3">
            <Col className="col-sm-4 d-flex">
              <h6>Gender</h6>
            </Col>
            <Col className="col-sm-8">
              <span>Male</span>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}
