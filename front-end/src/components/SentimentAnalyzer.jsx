import { useState } from "react";
import { Form, FormControl, InputGroup, Badge } from "react-bootstrap";
import { Card, Button, Row, Col, Image } from "react-bootstrap";
import CardGroup from "react-bootstrap/CardGroup";
import Analyze from "../assets/images/analyze.png";
import "../assets/appcss/analyzercss.css";
import SentimentScoreCard from "./SentimentScoreCard";
import axios from "axios";
import baseURL from "../../config/axiosConfig";
import backendURL from "../../config/backendConfig";
import Cookies from "js-cookie";

export default function SentimentAnalyzer() {
  const [sentiState, setsentiState] = useState(false);
  const [sentiText, setsentiText] = useState("");
  const [sentiTextError, setsentiTextError] = useState("");
  const [IsTextValid, setIsTextValid] = useState(false);
  const [sentimentData, setSentimentData] = useState({});

  const postSentimentScore = (text, userID, sentimentLable, sentimentScore) => {
    axios
      .post(baseURL + "text/", {
        userID: userID,
        userSentimentText: text,
        userSentimentCate: sentimentLable,
        userSentimentScore: sentimentScore,
      })
      .then((res) => {58-
        setsentiState(false);
        setSentimentData(res.data);
      })
      .catch((err) => {
        setsentiState(false);
        setsentiTextError(err.response.data.message);
      });
  };

  const analyzeText = (e) => {
    e.preventDefault();
    if (validateText()) {
      setsentiState(true);
      // setisRegistering(true);
      let encodedUserID = Cookies.get("userID");
      let decodedStringuserID = decodeURIComponent(encodedUserID).replace(
        /"/g,
        ""
      );

      axios
        .post(backendURL + "analyze-sentiment", {
          text: sentiText,
          userID: decodedStringuserID,
        })
        .then((res) => {
          postSentimentScore(
            sentiText,
            decodedStringuserID,
            res.data.sentiment_label,
            res.data.sentiment_score
          );
        })
        .catch((err) => {
          console.error("Error during sentiment analysis:", err);
          setsentiState(false);
          setsentiTextError(err.response?.data?.error || "An error occurred");
          return false;
        });
    } else {
      console.log("Form validation failed. Please check errors.");
    }
  };

  const stopanalyzeText = () => {
    setsentiState(false);
  };

  const validateText = () => {
    // Validate First Name
    let valid = true;
    if (!sentiText.trim()) {
      setsentiTextError("Text is required");
      setIsTextValid(false);
      valid = IsTextValid;
    } else {
      setsentiTextError("");
    }
    setIsTextValid(true);
    return valid;
  };
  return (
    <>
      {" "}
      <Card id="analyzer">
        <Card.Body>
          <Row>
            <Col className="col-sm-10 d-flex align-items-center">
              <Form.Control
                size="md"
                type="text"
                placeholder="Enter Your Thought..."
                id="analyzerinput"
                value={sentiText}
                onChange={(e) => setsentiText(e.target.value)}
              />
              {sentiTextError ? (
                <Badge bg="danger">{sentiTextError}</Badge>
              ) : (
                ""
              )}
            </Col>
            <Col className="col-sm-2 d-flex align-items-center justify-content-center">
              {sentiState ? (
                <div className="lds-ellipsis" onClick={stopanalyzeText}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                <Image
                  src={Analyze}
                  type="button"
                  alt="Image Alt Text"
                  fluid
                  className="searchbaricon"
                  onClick={analyzeText}
                />
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {sentiState ? (
        <div
          className="d-flex align-items-center justify-content-center mt-5"
          onClick={stopanalyzeText}
        >
          <h3>Analyzing the Text</h3>
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : Object.keys(sentimentData).length === 0 ? (
        ""
      ) : (
        <SentimentScoreCard
          SentimentTxt={sentimentData.userSentimentText}
          SentimentScore={sentimentData.userSentimentScore}
          SentimentEmoji={sentimentData.userSentimentCate}
          SentimentID={sentimentData._id}
        />
      )}
    </>
  );
}
