import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import generateTokenSetCookie from '../utils/generateToken.js';

export const signup = async (req, res) => {
  try {
    const {fullName, username, password, confirmPassword, gender} = req.body;

    if(password !== confirmPassword) {
      return res.status(400).json({error: "Password don't match"});
    }

    const user = await User.findOne({username});

    if (user) {
      return res.status(400).json({error: "Username already exists"});
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic
    });

    if (newUser) {
      // Generate JWT token here
      generateTokenSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        ProfilePic: newUser.ProfilePic
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
    
  } catch (err) {
    console.log("Error in signup controller" ,err.message)
    res.status(500).json({error: "Internal Server Error"})
  }
}

export const login = async (req, res) => {
  try {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    if(!user || !isPasswordCorrect) {
      return res.status(400).json({error: "invalid username or password"});
    }

    generateTokenSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic
    });

  } catch (err) {
    console.log("Error in login controller" ,err.message)
    res.status(500).json({error: "Internal Server Error"})
  }
}


export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {maxAge:0});
    res.status(200).json({message: "logged out successfully"});
  } catch (err) {
    console.log("Error in logout controller" ,err.message);
    res.status(500).json({error: "Internal Server Error"});
  }
}