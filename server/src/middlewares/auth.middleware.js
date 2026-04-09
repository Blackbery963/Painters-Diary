// // import jwt from "jsonwebtoken";

// // const authMiddleware = (req, res, next) => {
// //   try {
// //     // 1. Get token
// //     const authHeader = req.headers.authorization;

// //     if (!authHeader || !authHeader.startsWith("Bearer ")) {
// //       return res.status(401).json({ message: "No token provided" });
// //     }

// //     const token = authHeader.split(" ")[1];

// //     // 2. Verify token
// //     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

// //     // 3. Attach user info
// //     req.user = decoded;

// //     // 4. Go to next controller
// //     next();

// //   } catch (err) {
// //     return res.status(401).json({ message: "Invalid token" });
// //   }
// // };

// // export default authMiddleware;

// import jwt from "jsonwebtoken";
// import { User } from "../models/user.model.js";

// const authMiddleware = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization || "";

//     if (!authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//     if (!decoded) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     // 🔥 optional but recommended
//     const user = await User.findById(decoded.userId);

//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     req.user = user;

//     next();

//   } catch (err) {
//     if (err.name === "TokenExpiredError") {
//       return res.status(401).json({ message: "Token expired" });
//     }

//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// export default authMiddleware;


// import jwt from "jsonwebtoken";
// import { User } from "../models/user.model.js";

// const authMiddleware = async (req, res, next) => {
//   try {
//     // ── 1. Extract token from Authorization header ──────────────────────
//     // The token comes from the frontend's axios header:
//     //   Authorization: `Bearer ${localStorage.getItem("accessToken")}`
//     // localStorage itself is never readable here — only the header value.
//     const authHeader = req.headers.authorization || "";

//     if (!authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     const token = authHeader.split(" ")[1];

//     // ── 2. Verify signature + expiry ────────────────────────────────────
//     // jwt.verify() throws on failure — it never returns null
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//     // ── 3. Attach user to request ───────────────────────────────────────

//     // OPTION A — lightweight (recommended for most routes)
//     // Trust the token payload. No DB call. Fast.
//     // req.user = decoded; // { _id, username, email, iat, exp }

//     // OPTION B — full DB lookup (use only when you need fresh user data,
//     // e.g. checking isVerified, twoFactorEnabled, or if account may be deleted)
//     //
//     const user = await User.findById(decoded._id)  // ← _id not userId
//       .select("-password -otp -otpExpiry -twoFactorSecret");
    
//     if (!user) {
//       return res.status(401).json({ message: "Account not found" });
//     }
    
//     req.user = user;

//     next();

//   } catch (err) {
//     if (err.name === "TokenExpiredError") {
//       return res.status(401).json({ message: "Token expired" });
//     }
//     if (err.name === "JsonWebTokenError") {
//       return res.status(401).json({ message: "Invalid token" });
//     }
//     return res.status(500).json({ message: "Auth error", error: err.message });
//   }
// };

// export default authMiddleware;



import jwt from "jsonwebtoken";

 const authMiddleware = (req, res, next) => {
  try {
    // 1. Get the token from the React frontend's request headers
    const authHeader = req.headers.authorization || req.headers.Authorization;
    
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Extract just the token string
    const token = authHeader.split(" ")[1]; 

    // 2. Verify the token using your secret key
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        // If expired, send 401. Your React Axios Interceptor will catch this
        // and automatically call the /refresh endpoint!
        return res.status(401).json({ message: "Unauthorized: Token expired" });
      }

      // 3. Success! Attach the user info to the request so controllers can use it
      req.user = decoded; 
      
      // Move on to the actual route controller
      next(); 
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default authMiddleware;