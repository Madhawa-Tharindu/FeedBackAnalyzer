const port = 4000;
import express from "express";
import  { exec } from "child_process";
import path from "path";
import cors from "cors";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";

//Import Routes
import userManagement from "./routes/userinfo.routes.js"
import sentimentTextManagement from "./routes/sentimenttext.routes.js"
import authManagement from "./routes/auth.routes.js"
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(cookieParser());

connectDB();


//Route Middlewares
app.use("/api/v1/user", userManagement);
app.use("/api/v1/text", sentimentTextManagement);
app.use("/api/v1/auth", authManagement);

app.post('/api/v1/analyzeSentiment', (req, res) => {
    const textToAnalyze = req.body.text;

    exec(`python sentiment_analysis.py "${textToAnalyze}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing sentiment analysis script: ${error}`);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const [sentimentLabel, sentimentScore] = stdout.trim().split(',');
      res.json({sentimentLabel, sentimentScore});
    });
});

const PORT = process.env.PORT || 4000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
