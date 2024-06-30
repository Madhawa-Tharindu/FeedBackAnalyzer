import mongoose from "mongoose";

const userinfoSchema = new mongoose.Schema({
    userFirstName: {
        type: String,
        trim: true,
        require: true
    },
    userLastName: {
        type: String,
        trim: true,
        require: true
    },
    userAdress: {
        type: String,
        trim: true,
        require: true
    },
    userCity: {
        type: String,
        trim: true,
        require: true
    },
    userCountry: {
        type: String,
        trim: true,
        require: true
    },
    userOcupation: {
        type: String,
        trim: true,
        require: true
    },
    userEmail: {
        type: String,
        trim: true,
        require: true
    },
    userPhone: {
        type: String,
        trim: true,
        require: true
    },
    userAge: {
        type: String,
        trim: true,
        require: true
    },
    userGender: {
        type: String,
        trim: true,
        require: true
    },
    userUsername: {
        type: String,
        trim: true,
        require: true
    },
    userPassword: {
        type: String,
        trim: true,
        require: true
    },
    userCreatedDate: {
        type: String,
        trim: true,
        require: true
    },
    userEditedDate: {
        type: String,
        trim: true,
        require: true
    },
    userStatus: {
        type: Boolean,
        trim: true,
        require: true
    }
    },
    {
        timestamps: false,
        versionKey: false,
    }
)

export default mongoose.model.UserInfo_Details || mongoose.model('UserInfo_Details', userinfoSchema);