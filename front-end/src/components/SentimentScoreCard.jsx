import React, { useState, useEffect } from "react";
import { Card, Row, Col, Image } from "react-bootstrap";
import Swal from "sweetalert2";
import Angry from "../assets/images/angry.png";
import Smile from "../assets/images/smile.png";
import Neutral from "../assets/images/neutral.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import baseURL from "../../config/axiosConfig";

export default function SentimentScoreCard(props) {
  const roundToThreeDecimalPlaces = (number) => {
    const convertedNumber = parseFloat(
      (Math.round(number * 100) / 100).toFixed(2)
    );
    return convertedNumber;
  };

  const deleteSentimentText = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(baseURL + "text/" + id)
          .then((res) => {
            location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <Card className="mt-4 shadow" id="analyzerCard">
      <Card.Body className="p-5">
        <Row>
          <Col className="col-4 d-flex align-items-center">
            <Card.Text>{props.SentimentTxt}</Card.Text>
          </Col>
          <Col className="col-4 d-flex justify-content-center align-items-center">
            <span
              style={{
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}
            >
              {roundToThreeDecimalPlaces(props.SentimentScore)}
            </span>
          </Col>
          <Col className="col-2 d-flex align-items-center justify-content-center">
            <Image
              src={
                props.SentimentEmoji === "NEGATIVE"
                  ? Angry
                  : props.SentimentEmoji === "POSITIVE"
                  ? Smile
                  : props.SentimentEmoji === "NEUTRAL"
                  ? Neutral
                  : Neutral
              }
              alt="Image Alt Text"
              fluid
              style={{ maxWidth: "100%", height: "auto", maxHeight: "60px" }}
            />
          </Col>
          <Col className="col-2 d-flex align-items-center justify-content-center">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="ms-5 btn btn-lg text-danger"
              onClick={() => deleteSentimentText(props.SentimentID)}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
