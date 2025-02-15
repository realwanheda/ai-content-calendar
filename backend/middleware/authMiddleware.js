// // import jwt from "jsonwebtoken";

// // export const verifyJWT = async (req, res, next) => {
// //   try {
// //     console.log("Cookies:", req.cookies);

// //     // console.log(req);
// //     const token = req.cookies?.accessToken;
// //     //   || req.header("Authorization")?.replace("Bearer ", "");
// //     console.log(token);
// //     if (!token) {
// //       return res.json({ message: "Unaunthorized", Status: "401" });
// //     }

// //     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

// //     //This decoded token has the information declared in user.model.js in generateAccessToken method
// //     //in which we gave 4 parameters _id

// //     const user = await User.findById(decodedToken?._id).select(
// //       "-password -refreshToken"
// //     );

// //     if (!user) {
// //       return res.json({ message: "Invalid Acess Token", Status: "401" });
// //     }
// //     req.user = user;

// //     next();
// //   } catch (error) {
// //     return res.json({ message: error, Status: "401" });
// //   }
// // };
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// export const verifyJWT = async (req, res, next) => {
//   try {
//     console.log("Cookies Received:", req.cookies); // Debugging

//     const token =
//       req.cookies?.accessToken ||
//       req.header("Authorization")?.replace("Bearer ", ""); // Get token from cookies
//     console.log("Extracted Token:", token);

//     if (!token) {
//       return res
//         .status(401)
//         .json({ message: "Unauthorized: No Token", status: 401 });
//     }

//     // Verify Token
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded Token:", decodedToken);

//     // Fetch user details
//     const user = await User.findById(decodedToken.id).select(
//       "-password -refreshToken"
//     );

//     if (!user) {
//       return res
//         .status(401)
//         .json({ message: "Invalid Access Token", status: 401 });
//     }

//     req.user = user; // Attach user to request object
//     next();
//   } catch (error) {
//     console.error("JWT Verification Error:", error);
//     return res.status(401).json({ message: "Invalid Token", status: 401 });
//   }
// };
