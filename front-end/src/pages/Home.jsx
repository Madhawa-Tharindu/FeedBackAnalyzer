import React, { useState, useEffect } from "react";
import {
  InputGroup,
  Col,
  Button,
  Row,
  Container,
  Card,
  Form,
  Image,
} from "react-bootstrap";
import Chart from "chart.js/auto";
import Welcome from "../assets/images/welcome.gif";
import DoughnutChart from "../components/DoughnutChart";
import axios from "axios";
import baseURL from "../../config/axiosConfig";
import Cookies from "js-cookie";

export default function Home() {
  const [positiveCount, setPositiveCount] = useState(0);
  const [negativeCount, setNegativeCount] = useState(0);
  const [neutralCount, setNeutralCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    axios
      .get(baseURL + "text/get-all-text")
      .then((response) => {
        // Handle successful response
        setPositiveCount(response.data.countPositive);
        setNegativeCount(response.data.countNegative);
        setNeutralCount(response.data.countNeutral);
        setTotalCount(response.data.countTotal);
      })
      .catch((error) => {
        // Handle error
        setlistStatus(false);
      });
  }, []);

  const sampleSentimentData = {
    textSentiment: {
      positiveCount: positiveCount,
      negativeCount: negativeCount,
      neutralCount: neutralCount,
    },
    scoreSentiment: {
      positiveCount: 80,
      negativeCount: 20,
      neutralCount: 15,
    },
    categorySentiment: {
      positiveCount: 90,
      negativeCount: 30,
      neutralCount: 25,
    },
  };
  return (
    <>
      <Row className="gx-2">
        <Col md={6} xs={12} className="p-3">
          <Card
            className="shadow rounded"
            style={{ backgroundColor: "#fffefe", border: "0px" }}
          >
            <Card.Body>
              <Row>
                <Col md={8} xs={12} className="text-center text-md-start">
                  <Card.Title className="text-primary mt-5">
                    Welcome, {Cookies.get("userName")} 🎉
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    SentiFY
                  </Card.Subtitle>
                  <Card.Text>You have logged into the SentiFY System</Card.Text>
                </Col>
                <Col
                  md={4}
                  xs={12}
                  className="d-flex justify-content-center justify-content-md-end mt-3 mt-md-0"
                >
                  <Image src={Welcome} style={{ width: "250px" }}></Image>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xs={12} className="p-3">
          <Card
            className="shadow rounded"
            style={{ backgroundColor: "#fffefe", border: "0px" }}
          >
            <Card.Body>
              <Row className="mt-4 mb-2">
                <Col md={4} xs={6} className="p-3">
                  <Card
                    className="text-white shadow rounded"
                    style={{ backgroundColor: "#1E1E2C", border: "0px" }}
                  >
                    <Card.Body>
                      <Card.Title className="text-center">Positive</Card.Title>
                      <Card.Text className="text-center">
                        <span className="fs-1 fw-bold">{positiveCount}</span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4} xs={6} className="p-3">
                  <Card
                    className="text-white text-center shadow rounded"
                    style={{ backgroundColor: "#ff6600", border: "0px" }}
                  >
                    <Card.Body>
                      <Card.Title>Negative</Card.Title>
                      <Card.Text>
                        <span className="fs-1 fw-bold">{negativeCount}</span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4} xs={6} className="p-3">
                  <Card
                    className="text-white text-center shadow rounded"
                    style={{ backgroundColor: "#A679FF", border: "0px" }}
                  >
                    <Card.Body>
                      <Card.Title>Total</Card.Title>
                      <Card.Text>
                        <span className="fs-1 fw-bold">{totalCount}</span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        {/* 
        <Col md={2} xs={6} className="p-3">
          <Card
            className="text-white shadow rounded"
            style={{ backgroundColor: "#1E1E2C", border: "0px" }}
          >
            <Card.Body>
              <Card.Title className="text-center">Positive</Card.Title>
              <Card.Text className="text-center">
                <span className="fs-1 fw-bold">23</span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={2} xs={6} className="p-3">
          <Card
            className="text-white text-center shadow rounded"
            style={{ backgroundColor: "#ff6600", border: "0px" }}
          >
            <Card.Body>
              <Card.Title>Negative</Card.Title>
              <Card.Text>
                <span className="fs-1 fw-bold">23</span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={2} xs={6} className="p-3">
          <Card
            className="text-white text-center shadow rounded"
            style={{ backgroundColor: "#3B8FF3", border: "0px" }}
          >
            <Card.Body>
              <Card.Title>Total</Card.Title>
              <Card.Text>
                <span className="fs-1 fw-bold">23</span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>
      <Row className="gx-2 p-3">
        <Card
          className="rounded shadow"
          style={{ backgroundColor: "white", color: "black", border: "0px" }}
        >
          <Card.Body>
            <Row>
              <Col md={8} xs={12} className="text-center text-md-start">
                <Card.Title className="text-primary mt-5 mb-3">
                  Sentimental Symphony 🎭
                </Card.Title>

                <Card.Text>
                  <span>
                    Feel the pulse of sentiment in a glance! This doughnut chart
                    encapsulates the essence of our texts—positivity,
                    negativity, and neutrality. Uncover the emotional landscape
                    in a single breath. 🌈
                  </span>
                </Card.Text>
              </Col>
              <Col
                md={4}
                xs={12}
                className="d-flex justify-content-center justify-content-md-end mt-3 mt-md-0"
              >
                <DoughnutChart
                  sentimentData={sampleSentimentData.textSentiment}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Row>
    </>
  );
}
