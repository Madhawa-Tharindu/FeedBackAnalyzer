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
export default function UserSignUpForm() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [occupation, setOccupation] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("0");
  const [userName, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const [passwordConfirmed, setPassWordConfirmed] = useState("");
  const [errorRegister, setErrorRegister] = useState("");
  const [usernameList, setUsernameList] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isRegistering, setisRegistering] = useState(false);

  const navigate = useNavigate();
  // Validation state variables
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [cityError, setCityError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [occupationError, setOccupationError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNoError, setPhoneNoError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [genderError, setGenderError] = useState("");
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
      setUserNameError("Username is already exists");
      setIsValid(false);
    } else {
      setUserNameError("");
    }
  }, [userName, usernameList]);

  const validateForm = () => {
    // Validate First Name
    let valid = true;
    if (!firstName) {
      setFirstNameError("First Name is required");
      valid = false;
    } else {
      setFirstNameError("");
    }

    // Validate Last Name
    if (!lastName) {
      setLastNameError("Last Name is required");
      valid = false;
    } else {
      setLastNameError("");
    }

    // Validate Address
    if (!address) {
      setAddressError("Address is required");
      valid = false;
    } else {
      setAddressError("");
    }

    // Validate City
    if (!city) {
      setCityError("City is required");
      valid = false;
    } else {
      setCityError("");
    }

    // Validate Country
    if (!country) {
      setCountryError("Country is required");
      valid = false;
    } else {
      setCountryError("");
    }

    // Validate Occupation
    if (!occupation) {
      setOccupationError("Occupation is required");
      valid = false;
    } else {
      setOccupationError("");
    }

    // Validate Email
    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else {
      setEmailError("");
    }

    // Validate Phone No
    if (!phoneNo) {
      setPhoneNoError("Phone No is required");
      valid = false;
    } else {
      setPhoneNoError("");
    }

    // Validate Age
    if (!age) {
      setAgeError("Age is required");
      valid = false;
    } else {
      setAgeError("");
    }

    // Validate Gender
    if (gender === "0") {
      setGenderError("Gender is required");
      valid = false;
    } else {
      setGenderError("");
    }

    // Validate Username
    if (!userName) {
      setUserNameError("Username is required");
      valid = false;
    } else {
      if (usernameList.includes(userName)) {
        setUserNameError("Username is already exists");
        valid = false;
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
      setisRegistering(true);
      axios
        .post(baseURL + "user/", {
          userFirstName: firstName,
          userLastName: lastName,
          userAdress: address,
          userCity: city,
          userCountry: country,
          userOcupation: occupation,
          userEmail: email,
          userPhone: phoneNo,
          userAge: age,
          userGender: gender,
          userUsername: userName,
          userPassword: passwordConfirmed,
        })
        .then((res) => {
          setisRegistering(false);
          // Handle response data and navigate accordingly
          window.location.href = "/signin";
          // navigate("/signin");
        })
        .catch((err) => {
          console.error("Error during login:", err.response.data.message);
          setisRegistering(false);
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
      <Row>
        <Col className="col-sm-6">
          <span className="text-danger">{firstNameError}</span>
          <Form.Control
            className={firstNameError ? "mb-4" : "mb-4 mt-4"}
            label="First Name"
            id="userFirstName"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
          />
        </Col>
        <Col className="col-sm-6">
          <span className="text-danger">{lastNameError}</span>
          <Form.Control
            className={lastNameError ? "mb-4" : "mb-4 mt-4"}
            label="Last Name"
            id="userLastName"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
          />
        </Col>
      </Row>
      <span className="text-danger">{addressError}</span>
      <Form.Control
        className={addressError ? "mb-4" : "mb-4 mt-4"}
        label="Adress"
        id="userAdress"
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />{" "}
      <Row>
        <Col className="col-sm-6">
          <span className="text-danger">{cityError}</span>
          <Form.Control
            className={cityError ? "mb-4" : "mb-4 mt-4"}
            label="City"
            id="userCity"
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Col>
        <Col className="col-sm-6">
          <span className="text-danger">{countryError}</span>
          <Form.Control
            className={countryError ? "mb-4" : "mb-4 mt-4"}
            label="Country"
            id="userCountry"
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Col>
      </Row>
      <span className="text-danger">{occupationError}</span>
      <Form.Control
        className={occupationError ? "mb-4" : "mb-4 mt-4"}
        label="Occupation"
        id="userOcupation"
        type="text"
        placeholder="Occupation"
        value={occupation}
        onChange={(e) => setOccupation(e.target.value)}
      />
      <Row>
        <Col className="col-sm-6">
          <span className="text-danger">{emailError}</span>
          <Form.Control
            className={emailError ? "mb-4" : "mb-4 mt-4"}
            label="Email"
            id="userEmail"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Col>
        <Col className="col-sm-6">
          <span className="text-danger">{phoneNoError}</span>
          <Form.Control
            className={phoneNoError ? "mb-4" : "mb-4 mt-4"}
            label="PhoneNo"
            id="userPhone"
            type="tel"
            placeholder="Phone No"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
        </Col>
      </Row>{" "}
      <Row>
        <Col className="col-sm-6">
          <span className="text-danger">{ageError}</span>
          <Form.Control
            className={ageError ? "mb-4" : "mb-4 mt-4"}
            label="Age"
            id="userAge"
            type="number"
            placeholder="Age"
            min="0"
            max="150"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </Col>
        <Col className="col-sm-6">
          <span className="text-danger">{genderError}</span>
          <Form.Group className={genderError ? "mb-3" : "mb-4 mt-4"}>
            <Form.Select
              id="userGender"
              placeholder="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="0">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Card className="mb-4">
        <Card.Title className="ms-3 mt-4">User Account Details</Card.Title>
        <Card.Body>
          <span className="text-danger">{userNameError}</span>
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
        {isRegistering ? (
          <Button className="btn-dark mb-4 w-100">Registering...</Button>
        ) : (
          <Button onClick={handleSignUp} className="mb-4 w-100">
            Sign Up
          </Button>
        )}
        {/* <a className="text-muted" href="#!">
          Forgot password?
        </a> */}
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
