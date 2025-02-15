import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import mongoose from "mongoose";

// 🔹 Register User
const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists!" });
    }
    const newUser = await User.create({
      email,
      password,
    });
    return res.status(201).json({
      success: true,
      user: newUser,
      message: "User registered successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message,
    });
  }
};
const generateAccessAndRefreshToken = async (userId) => {
  try {
    console.log("User ID received:", userId);

    const user = await User.findById(userId);
    console.log(user, "this is user");

    if (!user) {
      console.error("User not found for ID:", userId);
      throw new Error("User not found");
    }

    if (!process.env.JWT_SECRET || !process.env.JWT_SECRET_REFRESH) {
      throw new Error("JWT secrets are missing in .env file!");
    }

    const accessToken = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const refreshToken = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_SECRET_REFRESH,
      {
        expiresIn: "7d",
      }
    );

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error generating tokens:", error.message);
    throw new Error("Error generating tokens: " + error.message);
  }
};

export default generateAccessAndRefreshToken;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist!" });
    }
    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Password incorrect!" });
    }
    // console.log(user._id.toString());
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id.toString()
    );
    console.log(accessToken, refreshToken);

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    const options = {
      httpOnly: true, // Prevent access via JavaScript
      secure: process.env.NODE_ENV === "production" ? true : false, // Secure only in production
      sameSite: "None", // Allow cross-site cookies
      path: "/", // Root path for cookie
    };

    res.cookie("accessToken", accessToken, options);
    res.cookie("refreshToken", refreshToken, options);

    return res
      .status(200)
      .json({ success: true, user, message: "User logged in" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error logging in user",
      error: error.message,
    });
  }
};
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res
//         .status(400)
//         .json({ success: false, message: "All fields are required!" });
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User does not exist!" });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     console.log(isPasswordValid);
//     if (!isPasswordValid) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Password incorrect!" });
//     }

//     const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
//       user._id.toString()
//     );
//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "None",
//       path: "/",
//     });

//     res.cookie("accessToken", accessToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "None",
//       path: "/",
//     });

//     const loggedInUser = await User.findById(user._id).select(
//       "-password -refreshToken"
//     );

//     return res.status(200).json({
//       success: true,
//       user: loggedInUser,
//       message: "User logged in successfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Error logging in user",
//       error: error.message,
//     });
//   }
// };

// 🔹 Get Current User
const getCurrentUser = async (req, res) => {
  try {
    if (req.user) {
      return res.status(200).json({
        success: true,
        user: req.user,
        message: "User found successfully!",
      });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "User Not Found" });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error getting user",
      error: error.message,
    });
  }
};

// 🔹 Logout User
const logoutUser = async (req, res) => {
  try {
    const { userId } = req.body;

    await User.findByIdAndUpdate(
      userId,
      { $unset: { refreshToken: "" } },
      { new: true }
    );

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      path: "/",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "You have been logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred during logout",
      error: error.message,
    });
  }
};

export { register, login, getCurrentUser, logoutUser };
