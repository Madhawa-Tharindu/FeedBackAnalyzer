import React, { useState, useEffect } from "react";
import {
  InputGroup,
  Col,
  Button,
  Row,
  Container,
  Card,
  Form,
} from "react-bootstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import SentifyLogoLG from "../assets/images/SentifyLogoLG.png";
import axios from "axios";
import baseURL from "../../config/axiosConfig";

import "../assets/appcss/userprofilecss.css";
export default function UserForgetPasswordForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const [passwordConfirmed, setPassWordConfirmed] = useState("");
  const [errorRegister, setErrorRegister] = useState("");
  const [usernameList, setUsernameList] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isReseting, setisReseting] = useState(false);

  const navigate = useNavigate();
  // Validation state variables
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmedError, setPasswordConfirmedError] = useState("");

  useEffect(() => {
    if (Object.keys(usernameList).length === 0) {
      axios
        .get(baseURL + "auth/")
        .then((response) => {
          // Handle successful response
          setUsernameList(response.data);
        })
        .catch((error) => {
          // Handle error
          console.error("Error fetching data:", error);
        });
    }
    // Convert the usernameList to an array if it's an object
    const usernameArray = Array.isArray(usernameList)
      ? usernameList
      : Object.values(usernameList);

    if (usernameArray.includes(userName)) {
      setUserNameError("Username found. The Username set");
      setIsValid(false);
    } else {
      setUserNameError("");
    }
  }, [userName, usernameList]);

  const validateForm = () => {
    // Validate First Name
    let valid = true;
    // Validate Username
    if (!userName) {
      setUserNameError("Username is required");
      valid = false;
    } else {
      if (usernameList.includes(userName)) {
        setUserNameError("Username found. The Username set");
        valid = true;
      } else {
        setUserNameError("");
      }
    }

    // Validate Password
    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }

    // Validate Confirm Password
    if (password !== passwordConfirmed) {
      setPasswordConfirmedError("Passwords do not match");
      valid = false;
    } else {
      setPasswordConfirmedError("");
    }
    return valid;
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setisReseting(true);
      axios
        .put(baseURL + "user/", {
          userPassword: passwordConfirmed,
        })
        .then((res) => {
          setisReseting(false);
          // Handle response data and navigate accordingly
          window.location.href = "/signin";
          // navigate("/signin");
        })
        .catch((err) => {
          console.error("Error during login:", err.response.data.message);
          setisReseting(false);
          setErrorRegister(err.response.data.message);
        });
    } else {
      console.log("Form validation failed. Please check errors.");
    }
  };

  return (
    <div className="d-flex flex-column">
      <div className="text-center">
        <img src={SentifyLogoLG} style={{ width: "200px" }} alt="logo" />
        <h4 className="mt-1 mb-5 pb-1"> Decode Emotions, Unleash Insights</h4>
      </div>
      <Card className="mb-4">
        <Card.Title className="ms-3 mt-4">Reset User Account Password</Card.Title>
        <Card.Body>
          <span className="text-primary">{userNameError}</span>
          <Form.Control
            className={userNameError ? "mb-4" : "mb-4 mt-4"}
            label="Username"
            id="userUsername"
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Row>
            <Col className="col-sm-6">
              <span className="text-danger">{passwordError}</span>
              <Form.Control
                className={passwordError ? "mb-4" : "mb-4 mt-4"}
                label="Password"
                id="userPassword"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassWord(e.target.value)}
              />
            </Col>
            <Col className="col-sm-6">
              <span className="text-danger">{passwordConfirmedError}</span>
              <Form.Control
                className={passwordConfirmedError ? "mb-4" : "mb-4 mt-4"}
                label="ConfirmPassword"
                id="ConfirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={passwordConfirmed}
                onChange={(e) => setPassWordConfirmed(e.target.value)}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <div className="text-center pt-1 mb-5 pb-1">
        <span className="text-danger">{errorRegister}</span>
        {isReseting ? (
          <Button className="btn-dark mb-4 w-100">Resting...</Button>
        ) : (
          <Button onClick={handleSignUp} className="mb-4 w-100">
            Sign Up
          </Button>
        )}
      </div>
      <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
        <p className="mb-0">
          Already I have Account,
          <Link to="/signin" className="mx-2 text-success">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
