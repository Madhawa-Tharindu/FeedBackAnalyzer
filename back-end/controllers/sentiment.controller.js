import UserSentiment from "../models/usersentiments.model.js";
import User from "../models/userinfo.model.js";
import  { exec } from "child_process";

export async function SentimentAnalyzer(textToAnalyze) {

    exec(`python sentiment_analysis.py "${textToAnalyze}"`, (error, stdout, stderr) => {
        if (error) {
            return false;
        }
        const [sentimentLabel, sentimentScore] = stdout.trim().split(',');
        return [sentimentLabel, sentimentScore];
    });
  
}

export async function addNewSentimentText(req, res) {
    try {
        const {
            userID,
            userSentimentText,
            userSentimentCate,
            userSentimentScore
        } = req.body;

      
      // validate input data
        if (!userID || userSentimentText === undefined || userSentimentCate === undefined || userSentimentScore === undefined) {        
            return res.status(400).json({ message: "Invalid input data" });        
        }
        const currentDateAndTime = new Date();

        // Get individual components of the date and time
        const year = currentDateAndTime.getFullYear();
        const month = currentDateAndTime.getMonth() + 1; // Months are zero-based, so add 1
        const day = currentDateAndTime.getDate();
        const hours = currentDateAndTime.getHours();
        const minutes = currentDateAndTime.getMinutes();
        const seconds = currentDateAndTime.getSeconds();

        // Format the date and time
        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        const UserID = await User.findOne({ _id: userID });
      
      if (!UserID) {        
        return res.status(400).json({ message: "User ID Incorrect" });   
      } else {              
          const newSentiment = new UserSentiment({
                userID: UserID._id,
                userSentimentText: userSentimentText,
                userSentimentCate: userSentimentCate,
                userSentimentScore: userSentimentScore,
                userSentimentCreatedDate: formattedDateTime,
                userSentimentEditedDate: formattedDateTime,
                userSentimentStatus: true
            });

          const saveNewSentimentText = await newSentiment.save();
          
          res.status(201).json(saveNewSentimentText);
      }

      //Sentiment Analyzer ML model Execution
        // exec(`python sentiment_analysis.py "${userSentimentText}"`, async (error, stdout, stderr) => {
        //     if (error) {
        //       console.error(`Error executing sentiment analysis script: ${error}`);
        //       res.status(500).json({ error: 'Internal Server Error' });
        //       return;
        //     }
        //     const [sentimentLabel, sentimentScore] = stdout.trim().split(',');
    
        //     const newSentiment = new UserSentiment({
        //         userID: UserID._id,
        //         userSentimentText: userSentimentText,
        //         userSentimentCate: sentimentLabel,
        //         userSentimentScore: sentimentScore,
        //         userSentimentCreatedDate: formattedDateTime,
        //         userSentimentEditedDate: formattedDateTime,
        //         userSentimentStatus: true
        //     });

        //     const saveNewSentimentText = await newSentiment.save();
            
        //     res.status(201).json(saveNewSentimentText);
          
        // });


    } catch (error) {
        // handle errors
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getSentimentTextById(req, res, next) {
  try {
    const sentimentTextId = req.params.id;

    // validate input data
    if (!sentimentTextId) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // sanitize input data
    const sanitizedSentimentTextId = sentimentTextId.trim();

    // retrieve user from database
    const existingSentimentText = await UserSentiment.findById(sanitizedSentimentTextId).populate('userID');

    if (existingSentimentText) {
      // send user data
      res.json(existingSentimentText);
    } else {
      // user not found
      const error = new Error("Text not found");
      res.status(404);
      next(error);
    }
  } catch (error) {
    // handle errors
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateSentimentText(req, res) {
  try {
    const sentimentTextId = req.params.id;

    // validate input data
    if (!sentimentTextId) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const {
        userID,
        userSentimentText
    } = req.body;

    const currentDateAndTime = new Date();

    // Get individual components of the date and time
    const year = currentDateAndTime.getFullYear();
    const month = currentDateAndTime.getMonth() + 1; // Months are zero-based, so add 1
    const day = currentDateAndTime.getDate();
    const hours = currentDateAndTime.getHours();
    const minutes = currentDateAndTime.getMinutes();
    const seconds = currentDateAndTime.getSeconds();

    // Format the date and time
    const formattedUpdatedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    
    const [Category, Score] = SentimentAnalyzer(userSentimentText);
    
    const data = {
      userID: userID,
      userSentimentText: userSentimentText,
      userSentimentCate: Category,
      userSentimentScore: Score,
      userSentimentEditedDate: formattedUpdatedDateTime,
      userSentimentStatus: true
    };
    
    // update appointment in database
    const updatedSentimentText = await UserSentiment.findByIdAndUpdate(
      sentimentTextId,
      data,
      {
        new: true,
        runValidators: true,
      }
    );

    if (updatedSentimentText) {
      // send updated appointment data
      res.json(updatedSentimentText);
    } else {
      // appointment not found
      return res.status(404).json({ message: "Text not found" });
    }
  } catch (error) {
    // handle errors
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getAllSentimentText(req, res) {
  try {
    const SentimentTexts = await UserSentiment.find().populate('userID');
    res.status(200).json(SentimentTexts);
  } catch (err) {
    res.json({ message: err });
  }
}

export async function getPositiveSentimentTxtCount(req, res) {
  try {
    const count = await UserSentiment.countDocuments({"userSentimentCate": "POSITIVE"});
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getNegativeSentimentTxtCount(req, res) {
  try {
    const count = await UserSentiment.countDocuments({"userSentimentCate": "NEGATIVE"});
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getNeutralSentimentTxtCount(req, res) {
  try {
    const count = await UserSentiment.countDocuments({"userSentimentCate": "NEUTRAL"});
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getAllSentimentTxtCount(req, res) {
  try {
    const countPositive = await UserSentiment.countDocuments({"userSentimentCate": "POSITIVE"});
    const countNegative = await UserSentiment.countDocuments({"userSentimentCate": "NEGATIVE"});
    const countNeutral = await UserSentiment.countDocuments({"userSentimentCate": "NEUTRAL"});
    const countTotal = await UserSentiment.countDocuments();
    res.status(200).json({ countPositive:countPositive, countNegative:countNegative,countNeutral:countNeutral,countTotal:countTotal});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


export async function getTotalSentimentTxtCount(req, res) {
  try {
    const count = await UserSentiment.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getAllSentimentTextByUID(req, res) {
  try {
    console.log(req.params.id);
    const SentimentTexts = await UserSentiment.find({"userID" : req.params.id}).sort({ userSentimentCreatedDate: -1 }).populate('userID');
    if (Object.keys(SentimentTexts).length === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(SentimentTexts);
    }
  } catch (err) {
    res.json({ message: err });
  }
}


export async function deleteSentimentTextById(req, res) {
  try {
    const deletedSentimentText = await UserSentiment.findByIdAndDelete(req.params.id);

    if (deletedSentimentText) {
      res.json({ message: "Text removed" });
    } else {
      res.status(404).json({ message: "Text not found" });
    }
  } catch (error) {
    // handle errors
    console.error(error);
    res.status(500).json({ error: error });
    res.status(500).json({ message: "Internal server error" });
  }
}