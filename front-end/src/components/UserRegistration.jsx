import React from "react";
import {
  InputGroup,
  Col,
  Button,
  Row,
  Container,
  Card,
  Form,
} from "react-bootstrap";

export default function UserRegistration() {
  return (
    <Container>
      <Row className="d-flex align-items-center">
        <Col md={10} lg={8} xs={12}>
          {/* Border */}
          <div className="border border-3 border-primary"></div>

          {/* Registration Card */}
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-4">
                {/* Brand Information */}
                <h2 className="fw-bold mb-2 text-uppercase">Brand</h2>
                <p className="mb-5">Please enter your details to join us!</p>

                {/* Registration Form */}
                <Form>
                  {/* Full Name and Phone Number */}
                  <Row className="mb-3">
                    <Form.Group
                      as={Col}
                      className="mb-3"
                      controlId="formFullName"
                    >
                      <Form.Label>Your full name</Form.Label>
                      <Form.Control type="text" placeholder="Enter name" />
                    </Form.Group>

                    <Form.Group
                      as={Col}
                      className="mb-3"
                      controlId="formPhoneNumber"
                    >
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter phone number"
                      />
                    </Form.Group>
                  </Row>

                  {/* Email and Password */}
                  <Row className="mb-3">
                    <Form.Group
                      as={Col}
                      className="mb-3"
                      controlId="formUsername"
                    >
                      <Form.Label>Email address</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="email"
                          placeholder="Enter username"
                        />
                        <InputGroup.Text className="text-primary">
                          @brand.com
                        </InputGroup.Text>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group
                      as={Col}
                      className="mb-3"
                      controlId="formBasicPassword"
                    >
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                  </Row>

                  {/* Submit Button */}
                  <div className="d-grid">
                    <Button variant="primary" type="submit">
                      Sign Up
                    </Button>
                  </div>
                </Form>

                {/* Sign In Link */}
                <div className="mt-3">
                  <p className="mb-0 text-center">
                    Already have an account?{" "}
                    <a href="#" className="text-primary fw-bold">
                      Sign In
                    </a>
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
