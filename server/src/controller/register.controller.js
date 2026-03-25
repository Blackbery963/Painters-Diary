import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";


/**
 * 📝 REGISTER CONTROLLER
 * ----------------------------------------------------
 * Creates a new user account.
 * - Validates required fields
 * - Prevents duplicate username/email
 * - Hashes password securely using bcrypt
 * - Creates user in database
 * - Generates access + refresh tokens
 * - Stores refresh token in httpOnly cookie
 * - Returns safe user info + access token
 **/
export async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    // 1️⃣ Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email, and password are required",
      });
    }

    // 2️⃣ Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Username or email already exists",
      });
    }

    // 3️⃣ Hash password securely (salt rounds = 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create user in database
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // 5️⃣ Generate Access Token (short-lived)
    const accessToken = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    // 6️⃣ Generate Refresh Token (long-lived)
    const refreshToken = jwt.sign(
      { _id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );

    // 7️⃣ Store refresh token in secure httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge:
        Number(process.env.REFRESH_TOKEN_MAXAGE) ||
        7 * 24 * 60 * 60 * 1000, // default 7 days
    });

    // 8️⃣ Send response
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,
      },
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while registering user",
      error: error.message,
    });
  }
}


/**
 * 🔍 GET USER FROM ACCESS TOKEN
 * ----------------------------------------------------
 * Verifies the access token sent in Authorization header.
 * - Extracts Bearer token
 * - Validates token signature & expiry
 * - Returns decoded user info
 */
export async function getUser(req, res) {
  try {
    // 1️⃣ Extract token from header: "Authorization: Bearer <token>"
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Access token not provided",
      });
    }

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // 3️⃣ Send decoded user info
    return res.status(200).json({
      message: "Token valid",
      user: {
        userId: decoded._id,
        username: decoded.username,
        email: decoded.email,
      },
    });
  } catch (error) {
    return res.status(401).json({
      message: "Token is invalid or expired",
      error: error.message,
    });
  }
}


/**
 * 🔄 REFRESH TOKEN CONTROLLER
 * ----------------------------------------------------
 * Issues new tokens when access token expires.
 * - Reads refresh token from httpOnly cookie
 * - Verifies refresh token
 * - Finds user in database
 * - Generates new access token
 * - Rotates refresh token (security best practice)
 * - Sets new refresh token cookie
 */
export async function refreshToken(req, res) {
  try {
    // 1️⃣ Get refresh token from cookie
    const incomingRefreshToken = req.cookies.refreshToken;

    if (!incomingRefreshToken) {
      return res.status(401).json({
        message: "Refresh token not provided",
      });
    }

    // 2️⃣ Verify refresh token
    const decoded = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // 3️⃣ Check if user still exists
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // 4️⃣ Create new access token
    const newAccessToken = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    // 5️⃣ Rotate refresh token (generate new one)
    const newRefreshToken = jwt.sign(
      { _id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );

    // 6️⃣ Set new refresh token cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge:
        Number(process.env.REFRESH_TOKEN_MAXAGE) ||
        7 * 24 * 60 * 60 * 1000,
    });

    // 7️⃣ Send new access token
    return res.status(200).json({
      message: "Tokens refreshed successfully",
      accessToken: newAccessToken,
    });
  } catch (error) {
    return res.status(403).json({
      message: "Refresh token is invalid or expired",
      error: error.message,
    });
  }
}


/** Login controller  */

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }


    const user = await User.findOne({ email }).select("+password");

    // SECURITY FIX: Generic error message and 401 status code
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // data = raw password from user | hash = scrambled password from DB
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    // SECURITY FIX: Generic error message and 401 status code
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // BUG FIX: Consistent payload (_id instead of id)
    const accessToken = jwt.sign(
      { _id: user._id, username: user.username, email: user.email }, 
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m" }
    );

    const refreshToken = jwt.sign(
      { _id: user._id }, 
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d" }
    );

    // CRITICAL FIX: Save the new refresh token to the database!
    // Without this, your silent refresh route will fail.
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // Fixed to standard string "strict"
      maxAge: 7 * 24 * 60 * 60 * 1000 
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        userId: user._id,
        username: user.username,
        email: user.email
      },
      accessToken
    });
    
  } catch (error) {
    // STATUS FIX: 500 is for server crashes
    return res.status(500).json({
      message: "Login failed due to a server error",
      error: error.message
    });
  }
}