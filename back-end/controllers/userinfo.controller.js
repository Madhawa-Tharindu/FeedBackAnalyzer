import User from "../models/userinfo.model.js";
import bcrypt from 'bcrypt';

export async function addNewUser(req, res) {
    try {
        const {
            userFirstName,
            userLastName,
            userAdress,
            userCity,
            userCountry,
            userOcupation,
            userEmail,
            userPhone,
            userAge,
            userGender,
            userUsername,
            userPassword
        } = req.body;

      
    // validate input data
    if (
        !userFirstName ||
        !userLastName ||
        !userAdress ||
        !userCity ||
        !userCountry ||
        !userOcupation ||
        !userEmail ||
        !userPhone ||
        !userAge ||
        !userGender ||
        !userUsername ||
        !userPassword
    ) {        
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
        //Hash passwords
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(userPassword, salt);
      
        const newUser = new User({
            userFirstName: userFirstName,
            userLastName: userLastName,
            userAdress: userAdress,
            userCity: userCity,
            userCountry: userCountry,
            userOcupation: userOcupation,
            userEmail: userEmail,
            userPhone: userPhone,
            userAge: userAge,
            userGender: userGender,
            userUsername: userUsername,
            userPassword: hashPassword,
            userCreatedDate: formattedDateTime,
            userEditedDate: formattedDateTime,
            userStatus: true
        });

        const saveNewUser = await newUser.save();
        
        res.status(201).json(saveNewUser);


    } catch (error) {
        // handle errors
        console.error(error);
        res.status(500).json({ error: error });
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getUserById(req, res, next) {
  try {
    const userId = req.params.id;

    // validate input data
    if (!userId) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // sanitize input data
    const sanitizedUserId = userId.trim();

    // retrieve user from database
    const existingUser = await User.findById(sanitizedUserId);

    if (existingUser) {
      // send user data
      res.json(existingUser);
    } else {
      // user not found
      const error = new Error("User not found");
      res.status(404);
      next(error);
    }
  } catch (error) {
    // handle errors
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateUser(req, res) {
  try {
    const userId = req.params.id;

    // validate input data
    if (!userId) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const {
        userFirstName,
        userLastName,
        userAdress,
        userCity,
        userCountry,
        userOcupation,
        userEmail,
        userPhone,
        userAge,
        userGender,
        userUsername,
        userPassword
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

    let data = {};

    if (req.body.userPassword == undefined) {
      data = {
        userFirstName: userFirstName,
        userLastName: userLastName,
        userAdress: userAdress,
        userCity: userCity,
        userCountry: userCountry,
        userOcupation: userOcupation,
        userEmail: userEmail,
        userPhone: userPhone,
        userAge: userAge,
        userGender: userGender,
        userUsername: userUsername,
        userEditedDate: formattedUpdatedDateTime,
        userStatus: true
      };
    } else {
            //Hash passwords
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.userPassword, salt);
      data = {
        userFirstName: userFirstName,
        userLastName: userLastName,
        userAdress: userAdress,
        userCity: userCity,
        userCountry: userCountry,
        userOcupation: userOcupation,
        userEmail: userEmail,
        userPhone: userPhone,
        userAge: userAge,
        userGender: userGender,
        userUsername: userUsername,
        userPassword: hashPassword,
        userEditedDate: formattedUpdatedDateTime,
        userStatus: true
      };
    }
    // update appointment in database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      data,
      {
        new: true,
        runValidators: true,
      }
    );

    if (updatedUser) {
      // send updated appointment data
      res.json(updatedUser);
    } else {
      // appointment not found
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // handle errors
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await User.find();
  //res.status(200).json(movie);
    res.status(200).json(users);
  } catch (err) {
    res.json({ message: err });
  }
}

export async function deleteUserById(req, res) {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (deletedUser) {
      res.json({ message: "User removed" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // handle errors
    console.error(error);
    res.status(500).json({ error: error });
    res.status(500).json({ message: "Internal server error" });
  }
}