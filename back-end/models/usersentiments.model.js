import mongoose from "mongoose";

const usersentimentsSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      ref: "UserInfo_Details",
    },
    userSentimentText: {
      type: String,
      trim: true,
      require: true,
    },
    userSentimentCate: {
      type: String,
      trim: true,
      require: true,
    },
    userSentimentScore: {
      type: String,
      trim: true,
      require: true,
    },
    userSentimentCreatedDate: {
      type: String,
      trim: true,
      require: true,
    },
    userSentimentEditedDate: {
      type: String,
      trim: true,
      require: true,
    },
    userSentimentStatus: {
      type: Boolean,
      trim: true,
      require: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export default mongoose.model.User_Sentiments_Details ||
  mongoose.model("User_Sentiments_Details", usersentimentsSchema);
