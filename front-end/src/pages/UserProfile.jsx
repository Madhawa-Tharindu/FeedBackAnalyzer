import React, { useEffect, useState } from "react";
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
import ProfileInfoCard from "../components/ProfileInfoCard";
import ProfileImgCard from "../components/ProfileImgCard";
import "../assets/appcss/userprofilecss.css";
import axios from "axios";
import baseURL from "../../config/axiosConfig";
import Cookies from "js-cookie";
import "../assets/appcss/analyzercss.css";

export default function UserProfile() {
  const [userData, setUserData] = useState({});
  const [loadStatus, setloadStatus] = useState(false);

  useEffect(() => {
    if (Object.keys(userData).length === 0) {
      setloadStatus(true);
      let encodedUserID = Cookies.get("userID");
      let decodedStringuserID = decodeURIComponent(encodedUserID).replace(
        /"/g,
        ""
      );
      axios
        .get(baseURL + "user/" + decodedStringuserID)
        .then((response) => {
          setloadStatus(false);
          // Handle successful response
          setUserData(response.data);
        })
        .catch((error) => {
          // Handle error
          console.error("Error fetching data:", error);
        });
    }
  }, []);

  return (
    <Row>
      {loadStatus ? (
        <div className="d-flex align-items-center justify-content-center mt-5">
          <h4>Loading</h4>
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <>
          <Col className="col-sm-4 justufy-content-center my-3">
            <ProfileImgCard userData={userData} />
          </Col>
          <Col className="col-sm-8 justufy-content-center my-3">
            <ProfileInfoCard userData={userData} />
          </Col>
        </>
      )}
    </Row>
  );
}
