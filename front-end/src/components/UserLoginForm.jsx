import React, { useState } from "react";
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
import Cookies from "js-cookie";

export default function UserLoginForm() {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!Username.trim() && !Password.trim()) {
      seterrorMessage("Username and Password required");
      return false;
    } else if (!Username.trim()) {
      seterrorMessage("Username is required");
      return false;
    } else if (!Password.trim()) {
      seterrorMessage("Password is required");
      return false;
    } else {
      return true;
    }
  };

  axios.defaults.withCredentials = true;
  const handleUserSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      setisLoading(true);
      axios
        .post(baseURL + "auth/", {
          userUsername: Username,
          userPassword: Password,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          setisLoading(false);
          // Handle response data and navigate accordingly
          if (res.data.status) {
            // Set a cookie named "accessToken" with value "your_token_value" that expires in 1 hour
            Cookies.set("accessToken", res.data.accessToken, {
              expires: 1 / 24,
            }); // 1 hour = 1/24 days
            Cookies.set("refreshToken", res.data.refreshToken, {
              expires: 1 / 24,
            }); // 1 hour = 1/24 days
            Cookies.set("userID", res.data.userID, {
              expires: 1 / 24,
            }); // 1 hour = 1/24 days
            Cookies.set("userName", res.data.userName, {
              expires: 1 / 24,
            }); // 1 hour = 1/24 days
            window.location.href = "/";
            // navigate("/home");
          }
        })
        .catch((err) => {
          setisLoading(false);
          seterrorMessage(err.response.data.error_Message);
        });
    }
  };

  return (
    <div className="d-flex flex-column m-5 ">
      <div className="text-center">
        <img src={SentifyLogoLG} style={{ width: "200px" }} alt="logo" />
        <h4 className="mt-1 mb-5 pb-1"> Decode Emotions, Unleash Insights</h4>
      </div>
      <Form.Control
        className="mb-4"
        label="userUsername"
        id="userUsername"
        type="text"
        placeholder="Username"
        value={Username}
        onChange={(e) => setUsername(e.target.value.trim())}
      />
      <Form.Control
        className="mb-4"
        label="userPassword"
        id="userPassword"
        type="password"
        placeholder="Password"
        value={Password}
        onChange={(e) => setPassword(e.target.value.trim())}
      />
      <span className="text-danger">{errorMessage}</span>
      <div className="text-center pt-1 mb-5 pb-1">
        {isLoading ? (
          <Button className="btn-dark mb-4 w-100">Authenticating...</Button>
        ) : (
          <Button onClick={handleUserSubmit} className="mb-4 w-100">
            Sign in
          </Button>
        )}
        {/* <a className="text-muted" href="/forgetpass">
          Forgot password?
        </a> */}
      </div>

      <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
        <p className="mb-0">
          Don't have an account?
          <Link to="/signup" className="mx-2 text-primary">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
