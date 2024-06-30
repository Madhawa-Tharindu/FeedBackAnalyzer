import React, { useEffect, useState } from "react";
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
import UserProfileImage from "../assets/images/user-profile.png";
import axios from "axios";
import baseURL from "../../config/axiosConfig";

export default function UserEditForm(props) {
  const [userIdEdit, setEdituserId] = useState(props.usereditdata._id);
  const [firstNameEdit, setEditfirstName] = useState(
    props.usereditdata.userFirstName
  );
  const [lastNameEdit, setEditlastName] = useState(
    props.usereditdata.userLastName
  );
  const [addressEdit, setEditAddress] = useState(props.usereditdata.userAdress);
  const [cityEdit, setEditCity] = useState(props.usereditdata.userCity);
  const [countryEdit, setEditCountry] = useState(
    props.usereditdata.userCountry
  );
  const [occupationEdit, setEditOccupation] = useState(
    props.usereditdata.userOcupation
  );
  const [emailEdit, setEditEmail] = useState(props.usereditdata.userEmail);
  const [phoneNoEdit, setEditPhoneNo] = useState(props.usereditdata.userPhone);
  const [ageEdit, setEditAge] = useState(props.usereditdata.userAge);
  const [genderEdit, setEditGender] = useState(props.usereditdata.userGender);
  const [userNameEdit, setEditUserName] = useState(
    props.usereditdata.userUsername
  );
  const [passwordEdit, setEditPassWord] = useState(
    props.usereditdata.userPassword
  );
  const [passwordConfirmedEdit, setEditPassWordConfirmed] = useState(
    props.usereditdata.userPassword
  );
  const [errorRegisterEdit, setEditErrorRegister] = useState("");
  const [usernameListEdit, setEditUsernameList] = useState({});
  const [isValidEdit, setEditIsValid] = useState(true);
  const [isRegisteringEdit, setEditisRegistering] = useState(false);

  const [passwordEditCompare, setEditPassWordCompare] = useState(
    props.usereditdata.userPassword
  );

  const navigate = useNavigate();
  // Validation state variables
  const [firstNameErrorEdit, setEditFirstNameError] = useState("");
  const [lastNameErrorEdit, setEditLastNameError] = useState("");
  const [addressErrorEdit, setEditAddressError] = useState("");
  const [cityErrorEdit, setEditCityError] = useState("");
  const [countryErrorEdit, setEditCountryError] = useState("");
  const [occupationErrorEdit, setEditOccupationError] = useState("");
  const [emailErrorEdit, setEditEmailError] = useState("");
  const [phoneNoErrorEdit, setEditPhoneNoError] = useState("");
  const [ageErrorEdit, setEditAgeError] = useState("");
  const [genderErrorEdit, setEditGenderError] = useState("");
  const [userNameErrorEdit, setEditUserNameError] = useState("");
  const [passwordErrorEdit, setEditPasswordError] = useState("");
  const [passwordConfirmedErrorEdit, setEditPasswordConfirmedError] =
    useState("");

  useEffect(() => {
    if (Object.keys(usernameListEdit).length === 0) {
      axios
        .get(baseURL + "auth/")
        .then((response) => {
          // Handle successful response
          setEditUsernameList(response.data);
        })
        .catch((error) => {
          // Handle error
          console.error("Error fetching data:", error);
        });
    }
    // Convert the usernameList to an array if it's an object
    const usernameArrayEdit = Array.isArray(usernameListEdit)
      ? usernameListEdit
      : Object.values(usernameListEdit);

    if (userNameEdit === props.usereditdata.userUsername) {
      // Username matches the original one
      setEditUserNameError("");
    } else if (usernameArrayEdit.includes(userNameEdit)) {
      // Username already exists
      setEditUserNameError("Username is already taken");
      setEditIsValid(false);
    } else {
      // Username is valid
      setEditUserNameError("");
    }
  }, [userNameEdit, usernameListEdit]);

  const validateEditForm = () => {
    // Validate First Name
    let valid = true;
    if (!firstNameEdit) {
      setEditFirstNameError("First Name is required");
      valid = false;
    } else {
      setEditFirstNameError("");
    }

    // Validate Last Name
    if (!lastNameEdit) {
      setEditLastNameError("Last Name is required");
      valid = false;
    } else {
      setEditLastNameError("");
    }

    // Validate Address
    if (!addressEdit) {
      setEditAddressError("Address is required");
      valid = false;
    } else {
      setEditAddressError("");
    }

    // Validate City
    if (!cityEdit) {
      setEditCityError("City is required");
      valid = false;
    } else {
      setEditCityError("");
    }

    // Validate Country
    if (!countryEdit) {
      setEditCountryError("Country is required");
      valid = false;
    } else {
      setEditCountryError("");
    }

    // Validate Occupation
    if (!occupationEdit) {
      setEditOccupationError("Occupation is required");
      valid = false;
    } else {
      setEditOccupationError("");
    }

    // Validate Email
    if (!emailEdit) {
      setEditEmailError("Email is required");
      valid = false;
    } else {
      setEditEmailError("");
    }

    // Validate Phone No
    if (!phoneNoEdit) {
      setEditPhoneNoError("Phone No is required");
      valid = false;
    } else {
      setEditPhoneNoError("");
    }

    // Validate Age
    if (!ageEdit) {
      setEditAgeError("Age is required");
      valid = false;
    } else {
      setEditAgeError("");
    }

    // Validate Gender
    if (genderEdit === "0") {
      setEditGenderError("Gender is required");
      valid = false;
    } else {
      setEditGenderError("");
    }

    // Validate Username
    if (!userNameEdit) {
      setEditUserNameError("Username is required");
      valid = false;
    } else {
      if (userNameEdit === props.usereditdata.userUsername) {
        // Username matches the original one
        setEditUserNameError("");
      } else if (usernameListEdit.includes(userNameEdit)) {
        // Username already exists
        setEditUserNameError("Username is already taken");
        valid = false;
      } else {
        // Username is valid
        setEditUserNameError("");
      }
    }

    // Validate Password
    if (!passwordEdit) {
      setEditPasswordError("Password is required");
      valid = false;
    } else {
      setEditPasswordError("");
    }

    // Validate Confirm Password
    if (passwordEdit !== passwordConfirmedEdit) {
      setEditPasswordConfirmedError("Passwords do not match");
      valid = false;
    } else {
      setEditPasswordConfirmedError("");
    }

    return valid;
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (validateEditForm()) {
      setEditisRegistering(true);

      let editData = {};
      if (passwordEdit === passwordEditCompare) {
        editData = {
          userFirstName: firstNameEdit,
          userLastName: lastNameEdit,
          userAdress: addressEdit,
          userCity: cityEdit,
          userCountry: countryEdit,
          userOcupation: occupationEdit,
          userEmail: emailEdit,
          userPhone: phoneNoEdit,
          userAge: ageEdit,
          userGender: genderEdit,
          userUsername: userNameEdit,
        };
      } else {
        editData = {
          userFirstName: firstNameEdit,
          userLastName: lastNameEdit,
          userAdress: addressEdit,
          userCity: cityEdit,
          userCountry: countryEdit,
          userOcupation: occupationEdit,
          userEmail: emailEdit,
          userPhone: phoneNoEdit,
          userAge: ageEdit,
          userGender: genderEdit,
          userUsername: userNameEdit,
          userPassword: passwordConfirmedEdit,
        };
      }
      axios
        .put(baseURL + "user/" + userIdEdit, editData)
        .then((res) => {
          setEditisRegistering(false);
          // Handle response data and navigate accordingly
          location.reload();
        })
        .catch((err) => {
          setEditisRegistering(false);
          valid = false;
          setEditErrorRegister(err.response.data.message);
        });
    } else {
      console.log("Form validation failed. Please check errors.");
    }
  };
  return (
    <div className="d-flex flex-column">
      <div className="text-center">
        <img src={UserProfileImage} style={{ width: "200px" }} alt="logo" />
        <h4 className="mt-1 mb-5 pb-1">
          {firstNameEdit} {lastNameEdit}
        </h4>
      </div>
      <Row>
        <Col className="col-sm-6">
          <span className="text-danger">{firstNameErrorEdit}</span>
          <Form.Control
            className={firstNameErrorEdit ? "mb-4" : "mb-4 mt-4"}
            label="First Name"
            id="userFirstNameEdit"
            type="text"
            placeholder="First Name"
            value={firstNameEdit}
            onChange={(e) => setEditfirstName(e.target.value)}
          />
        </Col>
        <Col className="col-sm-6">
          <span className="text-danger">{lastNameErrorEdit}</span>
          <Form.Control
            className={lastNameErrorEdit ? "mb-4" : "mb-4 mt-4"}
            label="Last Name"
            id="userLastNameEdit"
            type="text"
            placeholder="Last Name"
            value={lastNameEdit}
            onChange={(e) => setEditlastName(e.target.value)}
          />
        </Col>
      </Row>
      <span className="text-danger">{addressErrorEdit}</span>
      <Form.Control
        className={addressErrorEdit ? "mb-4" : "mb-4 mt-4"}
        label="Adress"
        id="userAdressEdit"
        type="text"
        placeholder="Address"
        value={addressEdit}
        onChange={(e) => setEditAddress(e.target.value)}
      />{" "}
      <Row>
        <Col className="col-sm-6">
          <span className="text-danger">{cityErrorEdit}</span>
          <Form.Control
            className={cityErrorEdit ? "mb-4" : "mb-4 mt-4"}
            label="City"
            id="userCityEdit"
            type="text"
            placeholder="City"
            value={cityEdit}
            onChange={(e) => setEditCity(e.target.value)}
          />
        </Col>
        <Col className="col-sm-6">
          <span className="text-danger">{countryErrorEdit}</span>
          <Form.Control
            className={countryErrorEdit ? "mb-4" : "mb-4 mt-4"}
            label="Country"
            id="userCountryEdit"
            type="text"
            placeholder="Country"
            value={countryEdit}
            onChange={(e) => setEditCountry(e.target.value)}
          />
        </Col>
      </Row>
      <span className="text-danger">{occupationErrorEdit}</span>
      <Form.Control
        className={occupationErrorEdit ? "mb-4" : "mb-4 mt-4"}
        label="Occupation"
        id="userOcupationEdit"
        type="text"
        placeholder="Occupation"
        value={occupationEdit}
        onChange={(e) => setEditOccupation(e.target.value)}
      />
      <Row>
        <Col className="col-sm-6">
          <span className="text-danger">{emailErrorEdit}</span>
          <Form.Control
            className={emailErrorEdit ? "mb-4" : "mb-4 mt-4"}
            label="Email"
            id="userEmailEdit"
            type="email"
            placeholder="Email"
            value={emailEdit}
            onChange={(e) => setEditEmail(e.target.value)}
          />
        </Col>
        <Col className="col-sm-6">
          <span className="text-danger">{phoneNoErrorEdit}</span>
          <Form.Control
            className={phoneNoErrorEdit ? "mb-4" : "mb-4 mt-4"}
            label="PhoneNo"
            id="userPhoneEdit"
            type="tel"
            placeholder="Phone No"
            value={phoneNoEdit}
            onChange={(e) => setEditPhoneNo(e.target.value)}
          />
        </Col>
      </Row>{" "}
      <Row>
        <Col className="col-sm-6">
          <span className="text-danger">{ageErrorEdit}</span>
          <Form.Control
            className={ageErrorEdit ? "mb-4" : "mb-4 mt-4"}
            label="Age"
            id="userAgeEdit"
            type="number"
            placeholder="Age"
            min="0"
            max="150"
            value={ageEdit}
            onChange={(e) => setEditAge(e.target.value)}
          />
        </Col>
        <Col className="col-sm-6">
          <span className="text-danger">{genderErrorEdit}</span>
          <Form.Group className={genderErrorEdit ? "mb-4" : "mb-4 mt-4"}>
            <Form.Select
              id="userGenderEdit"
              placeholder="Gender"
              value={genderEdit}
              onChange={(e) => setEditGender(e.target.value)}
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
          <span className="text-danger">{userNameErrorEdit}</span>
          <Form.Control
            className={userNameErrorEdit ? "mb-4" : "mb-4 mt-4"}
            label="Username"
            id="userUsernameEdit"
            type="text"
            placeholder="Username"
            value={userNameEdit}
            onChange={(e) => setEditUserName(e.target.value)}
          />
          <Row>
            <Col className="col-sm-6">
              <span className="text-danger">{passwordErrorEdit}</span>
              <Form.Control
                className={passwordErrorEdit ? "mb-4" : "mb-4 mt-4"}
                label="Password"
                id="userPasswordEdit"
                type="password"
                placeholder="Password"
                value={passwordEdit}
                onChange={(e) => setEditPassWord(e.target.value)}
              />
            </Col>
            <Col className="col-sm-6">
              <span className="text-danger">{passwordConfirmedErrorEdit}</span>
              <Form.Control
                className={passwordConfirmedErrorEdit ? "mb-4" : "mb-4 mt-4"}
                label="ConfirmPassword"
                id="ConfirmPasswordEdit"
                type="password"
                placeholder="Confirm Password"
                value={passwordConfirmedEdit}
                onChange={(e) => setEditPassWordConfirmed(e.target.value)}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {isRegisteringEdit ? (
        <Button className="btn-dark mb-4 w-100">Updating...</Button>
      ) : (
        <Row>
          <Col className="col-sm-6">
            <Button className="mb-2 w-100" onClick={handleUpdate}>
              Update
            </Button>
          </Col>
          <Col className="col-sm-6">
            <Button onClick={props.onHide} className="mb-3 btn-dark w-100">
              Close
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
}
