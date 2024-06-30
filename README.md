# Advanced Text Sentiment Analyzer

This project is an advanced text sentiment analyzer implemented as a MERN stack web application. The backend for sentiment analysis is powered by Flask, a separate server and API written in Python.

## Prerequisites

Ensure you have the following software installed on your system:

- Node LTS (e.g., Node 20.10.0)
- Python 3.11.0

## Running the Project Locally

### 1. Node.js Backend

Navigate to the `back-end` folder and run the following commands:

````bash
cd back-end
npm install
npm start

### 2. Python Backend (Sentiment Analysis)

Navigate to the `back-end-python` folder and run the following commands:

````bash
cd back-end-python
pip install flask transformers flask-cors
python app.py

### 3. ReactJS Frontend

Navigate to the front-end folder and run the following commands:

````bash
cd front-end
npm install
npm run dev

After successfully running the frontend, you will see a localhost URL. Access the web app by using that URL (e.g., http://localhost:5173/).

## Additional Information

- The Node.js backend is responsible for general server operations.
- The Python backend handles text sentiment analysis using Flask.
- The ReactJS frontend provides the user interface for the sentiment analysis web app.
- Feel free to customize the project according to your requirements!

````
