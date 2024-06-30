import {
  Card,
  Button,
  Row,
  Col,
  Image,
  ListGroup,
  Badge,
} from "react-bootstrap";
import CardGroup from "react-bootstrap/CardGroup";
import UserProfileImage from "../assets/images/user-profile.png";
import "../assets/appcss/userprofilecss.css";

export default function ProfileInfoCard(props) {
  return (
    <Card id="userprofileinfo" className="rounded shadow">
      <Card.Body className="p-5">
        <Row>
          <Col className="col-sm-4 d-flex">
            <h6>Name</h6>
          </Col>
          <Col className="col-sm-8">
            <span>
              {props.userData.userFirstName} {props.userData.userLastName}
            </span>
          </Col>
        </Row>
        <hr />
        <Row className="mt-3">
          <Col className="col-sm-4 d-flex">
            <h6>Address</h6>
          </Col>
          <Col className="col-sm-8">
            <span>{props.userData.userAdress}</span>
          </Col>
        </Row>
        <hr />
        <Row className="mt-3">
          <Col className="col-sm-4 d-flex">
            <h6>City</h6>
          </Col>
          <Col className="col-sm-8">
            <span>{props.userData.userCity}</span>
          </Col>
        </Row>
        <hr />
        <Row className="mt-3">
          <Col className="col-sm-4 d-flex">
            <h6>Country</h6>
          </Col>
          <Col className="col-sm-8">
            <span>{props.userData.userCountry}</span>
          </Col>
        </Row>
        <hr />
        <Row className="mt-3">
          <Col className="col-sm-4 d-flex">
            <h6>Ocupation</h6>
          </Col>
          <Col className="col-sm-8">
            <span>{props.userData.userOcupation}</span>
          </Col>
        </Row>
        <hr />
        <Row className="mt-3">
          <Col className="col-sm-4 d-flex">
            <h6>Email</h6>
          </Col>
          <Col className="col-sm-8">
            <span>{props.userData.userEmail}</span>
          </Col>
        </Row>
        <hr />
        <Row className="mt-3">
          <Col className="col-sm-4 d-flex">
            <h6>Phone No</h6>
          </Col>
          <Col className="col-sm-8">
            <span>{props.userData.userPhone}</span>
          </Col>
        </Row>
        <hr />
        <Row className="mt-3">
          <Col className="col-sm-4 d-flex">
            <h6>Age</h6>
          </Col>
          <Col className="col-sm-8">
            <span>{props.userData.userAge} Years</span>
          </Col>
        </Row>
        <hr />
        <Row className="mt-3">
          <Col className="col-sm-4 d-flex">
            <h6>Gender</h6>
          </Col>
          <Col className="col-sm-8">
            <span>
              {props.userData.userGender == "female" ? (
                <span>Female</span>
              ) : props.userData.userGender == "male" ? (
                <span>Male</span>
              ) : (
                <span>Other</span>
              )}
            </span>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
