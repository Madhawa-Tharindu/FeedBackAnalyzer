import User from "../models/userinfo.model.js";
import jwt, { decode } from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

export const verifyUser =  (req, res, next) => {
  const accessTocken = req.cookies.accessTocken;
  if (!accessTocken) {
    if (renewToken(req, res)) {
      next();
    }
  } else {
    jwt.verify(accessTocken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.json({valid: false, message :"Invalid Token"})
      } else {
        req.userUsername = decoded.userUsername;
        next();
      }
    })
  }
}

export const renewToken = (req, res, next) => {
  const refreshTocken = req.cookies.refreshToken; // Corrected the typo in refreshToken
  let exist = false;
  
  if (!refreshTocken) {
    return res.json({
      valid: false, message:"No Refresh Token"
    });
  } else {
    jwt.verify(refreshTocken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.json({valid: false, message: "Invalid Refresh Token"});
      } else {
        const accessTocken = jwt.sign({ userUsername: decoded.userUsername }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
        res.cookie('accessToken', accessTocken, { maxAge: 60000 });
        exist = true;
        next(); // Call next to continue with the next middleware or route handler
      }
    });
  }
  return exist;
};


export async function authenticateUser(req, res) {
  //Lets validate the data beofre we a user
  // const { error } = loginValidation(req.body);
  // // const errorMessage = res.json({ error_Message: error.details[0].message });
  // if (error)
  //   return res
  //     .status(400)
  //     .send(res.json({ error_Message: error.details[0].message }));

  const {
      userUsername,
      userPassword
  } = req.body;

  //Checking if the email exists
  const user = await User.findOne({ userUsername: userUsername });

  if (!user) {
    return res
      .status(400)
      .json({ error_Message: "Username is not found" });    
  }

  
  //Password is Correct
  const validPass = await bcrypt.compare(userPassword, user.userPassword);
  if (!validPass) {
    return res
      .status(400)
      .json({ error_Message: "Invalid Password" });    
  }else {
    if (!res.headersSent) {
      const accessTocken = jwt.sign({ userUsername: user.userUsername }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
      const refreshToken = jwt.sign({ userUsername: user.userUsername }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '2h' });
      res.cookie('userName', user.userUsername);
      res.cookie('userID', JSON.stringify(user._id));
      res.cookie('accessToken', accessTocken, { maxAge: 60000 });
      res.cookie('refreshToken', refreshToken, { maxAge: 300000, httpOnly:true, secure:true, sameSite:'strict' });
      res.status(201).json({ status: true, userID: user._id, userName:user.userUsername, accessToken:process.env.ACCESS_TOKEN_SECRET,refreshToken:process.env.REFRESH_TOKEN_SECRET});
      return;
    } else {
      console.log('Headers already sent. Avoiding additional response.');
    }

  }

  //Create and assing a token
  // const token = jwt.sign(
  //   { _id: user._id, name: user.name },
  //   process.env.TOKEN_SECRET
  // );
  // //   res.header("auth-token", token).send(token);
  // res.header("auth-token", token).send(res.json({ token: token, user: {name: user.name, email: user.email}, status_code : 200 }));
}

export async function getAllUsernames(req, res) {
  try {
    const users = await User.find();
    const userNames = users.map(user => user.userUsername);
  //res.status(200).json(movie);
    res.status(200).json(userNames);
  } catch (err) {
    res.json({ message: err });
  }
}