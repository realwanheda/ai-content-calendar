import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyJWT = async (req, res, next) => {
  console.log(req.cookies);
  try {
    const token = req.cookies?.accessToken;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized", Status: "401" });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decodedToken.id);
    const user = await User.findById(decodedToken?.id).select(
      "-password -refreshToken"
    );
    if (!user) {
      return res.json({ message: "Invalid Acess Token", Status: "401" });
    }
    req.user = user;

    next();
  } catch (error) {
    return res.json({ message: "Exception", error, Status: "401" });
  }
};
