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
import UserLoginForm from "../components/UserLoginForm";
import UserSignUpForm from "../components/UserSignUpForm";

export default function AuthLayout(props) {
  return (
    <Container className="my-5">
      <Row>
        <Col md="6" className="mb-5">
          <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
            <div className="text-dark px-3 py-4 p-md-5 mx-md-4">
              <h2 className="mb-4">Understand the Sentiment Behind the Text</h2>
              <p>
                Sentex is a powerful sentiment analysis web application that
                helps you analyze the emotions expressed in any piece of text.
                Whether it's customer reviews, social media posts, or articles,
                Sentex provides real-time sentiment scores and visualizations.
              </p>
              <p>
                Explore the interactive features, track sentiment trends, and
                gain valuable insights into the emotional tone of your content.
              </p>
            </div>
          </div>
        </Col>
        <Col md="6" className="mb-5">
          {props.component}
        </Col>
      </Row>
    </Container>
  );
}
