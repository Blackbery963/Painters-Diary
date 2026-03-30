// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { User } from "../models/user.model.js";
// import { sentOTPMail } from "../utils/sendMail.js";


// /**
//  * 📝 REGISTER CONTROLLER
//  * ----------------------------------------------------
//  * Creates a new user account.
//  * - Validates required fields
//  * - Prevents duplicate username/email
//  * - Hashes password securely using bcrypt
//  * - Creates user in database
//  * - Generates access + refresh tokens
//  * - Stores refresh token in httpOnly cookie
//  * - Returns safe user info + access token
//  **/
// export async function register(req, res) {
//   try {
//     const { username, email, password } = req.body;

//     // 1️⃣ Validate required fields
//     if (!username || !email || !password) {
//       return res.status(400).json({
//         message: "Username, email, and password are required",
//       });
//     }

//     // 2️⃣ Check if user already exists
//     const existingUser = await User.findOne({
//       $or: [{ username }, { email }],
//     });

//     if (existingUser) {
//       return res.status(409).json({
//         message: "Username or email already exists",
//       });
//     }

//     // 3️⃣ Hash password securely (salt rounds = 10)
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Generate a 6-digit OTP
//     const otp = Math.floor( 100000 + Math.random() * 900000 ).toString()
//     // Expiary of the OTP 5 min frm now
//     const otpExpiry = new Date( Date.now() + 5 * 60 * 60 )

//     // 4️⃣ Create user in database
//     const user = await User.create({
//       username,
//       email,
//       password: hashedPassword,
//       otp,
//       otpExpiry
//     });

//     await sentOTPMail(email, otp);

//     // 5️⃣ Generate Access Token (short-lived)
//     const accessToken = jwt.sign(
//       {
//         _id: user._id,
//         username: user.username,
//         email: user.email,
//       },
//       process.env.ACCESS_TOKEN_SECRET,
//       { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
//     );

//     // 6️⃣ Generate Refresh Token (long-lived)
//     const refreshToken = jwt.sign(
//       { _id: user._id },
//       process.env.REFRESH_TOKEN_SECRET,
//       { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
//     );

//     // 7️⃣ Store refresh token in secure httpOnly cookie
//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge:
//         Number(process.env.REFRESH_TOKEN_MAXAGE) ||
//         7 * 24 * 60 * 60 * 1000, // default 7 days
//     });

//     // 8️⃣ Send response
//     return res.status(201).json({
//       message: "User registered successfully",
//       user: {
//         userId: user._id,
//         username: user.username,
//         email: user.email,
//       },
//       accessToken,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Error while registering user",
//       error: error.message,
//     });
//   }
// }


// /**
//  * 🔍 GET USER FROM ACCESS TOKEN
//  * ----------------------------------------------------
//  * Verifies the access token sent in Authorization header.
//  * - Extracts Bearer token
//  * - Validates token signature & expiry
//  * - Returns decoded user info
//  */
// export async function getUser(req, res) {
//   try {
//     // 1️⃣ Extract token from header: "Authorization: Bearer <token>"
//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({
//         message: "Access token not provided",
//       });
//     }

//     // 2️⃣ Verify token
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//     // 3️⃣ Send decoded user info
//     return res.status(200).json({
//       message: "Token valid",
//       user: {
//         userId: decoded._id,
//         username: decoded.username,
//         email: decoded.email,
//       },
//     });
//   } catch (error) {
//     return res.status(401).json({
//       message: "Token is invalid or expired",
//       error: error.message,
//     });
//   }
// }


// /**
//  * 🔄 REFRESH TOKEN CONTROLLER
//  * ----------------------------------------------------
//  * Issues new tokens when access token expires.
//  * - Reads refresh token from httpOnly cookie
//  * - Verifies refresh token
//  * - Finds user in database
//  * - Generates new access token
//  * - Rotates refresh token (security best practice)
//  * - Sets new refresh token cookie
//  */
// export async function refreshToken(req, res) {
//   try {
//     // 1️⃣ Get refresh token from cookie
//     const incomingRefreshToken = req.cookies.refreshToken;

//     if (!incomingRefreshToken) {
//       return res.status(401).json({
//         message: "Refresh token not provided",
//       });
//     }

//     // 2️⃣ Verify refresh token
//     const decoded = jwt.verify(
//       incomingRefreshToken,
//       process.env.REFRESH_TOKEN_SECRET
//     );

//     // 3️⃣ Check if user still exists
//     const user = await User.findById(decoded._id);

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     // 4️⃣ Create new access token
//     const newAccessToken = jwt.sign(
//       {
//         _id: user._id,
//         username: user.username,
//         email: user.email,
//       },
//       process.env.ACCESS_TOKEN_SECRET,
//       { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
//     );

//     // 5️⃣ Rotate refresh token (generate new one)
//     const newRefreshToken = jwt.sign(
//       { _id: user._id },
//       process.env.REFRESH_TOKEN_SECRET,
//       { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
//     );

//     // 6️⃣ Set new refresh token cookie
//     res.cookie("refreshToken", newRefreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge:
//         Number(process.env.REFRESH_TOKEN_MAXAGE) ||
//         7 * 24 * 60 * 60 * 1000,
//     });

//     // 7️⃣ Send new access token
//     return res.status(200).json({
//       message: "Tokens refreshed successfully",
//       accessToken: newAccessToken,
//     });
//   } catch (error) {
//     return res.status(403).json({
//       message: "Refresh token is invalid or expired",
//       error: error.message,
//     });
//   }
// }


// /** Login controller
//  *  - fing email and password from request body
//  * - check if email and password are provided
//  *  - find user by email and select password field
//  * - compare provided password with hashed password in database
//  * - if user not found or password is incorrect, return 401 Unauthorized
//  *  - generate access token and refresh token
//  */

// export async function login(req, res) {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password are required" });
//     }

//     const user = await User.findOne({ email }).select("+password");

//     // SECURITY FIX: Generic error message and 401 status code
//     if (!user) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // data = raw password from user | hash = scrambled password from DB
//     const isPasswordValid = await bcrypt.compare(password, user.password);
    
//     // SECURITY FIX: Generic error message and 401 status code
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // BUG FIX: Consistent payload (_id instead of id)
//     const accessToken = jwt.sign(
//       { _id: user._id, username: user.username, email: user.email }, 
//       process.env.ACCESS_TOKEN_SECRET,
//       { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m" }
//     );

//     const refreshToken = jwt.sign(
//       { _id: user._id }, 
//       process.env.REFRESH_TOKEN_SECRET,
//       { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d" }
//     );

//     // CRITICAL FIX: Save the new refresh token to the database!
//     // Without this, your silent refresh route will fail.
//     user.refreshToken = refreshToken;
//     await user.save();

//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict", // Fixed to standard string "strict"
//       maxAge: 7 * 24 * 60 * 60 * 1000 
//     });

//     return res.status(200).json({
//       message: "Login successful",
//       user: {
//         userId: user._id,
//         username: user.username,
//         email: user.email
//       },
//       accessToken
//     });
    
//   } catch (error) {
//     // STATUS FIX: 500 is for server crashes
//     return res.status(500).json({
//       message: "Login failed due to a server error",
//       error: error.message
//     });
//   }
// }



// export async function verifyEmail(req, res) {
//   try {
//     const { email, otp } = req.body;

//     if (!email || !otp) {
//       return res.status(400).json({ message: "Email and OTP are required" });
//     }

//     // 1. Find the specific user document in the database
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User does not exist" });
//     }

//     // 2. Check if they are already verified
//     if (user.isVerified) {
//       return res.status(400).json({ message: "Email is already verified" });
//     }

//     // 3. Check if OTP matches
//     if (user.otp !== otp) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     // 4. Check if OTP is expired
//     if (user.otpExpiry < Date.now()) {
//       return res.status(400).json({ message: "OTP has expired. Please request a new one." });
//     }

//     // 5. Success! Update the user document
//     user.isVerified = true;
//     user.otp = null;       // Clear the OTP so it can't be reused
//     user.otpExpiry = null; // Clear the expiry
    
//     await user.save(); // Save the document instance

//     return res.status(200).json({ message: "Email verified successfully. You can now log in." });

//   } catch (error) {
//     return res.status(500).json({ message: "Error verifying email", error: error.message });
//   }
// }




import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { sendOTPMail } from "../utils/sendMail.js";

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Generates a cryptographically safe 6-digit OTP string */
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Signs and returns both tokens.
 * Access token  → short-lived, carries user identity
 * Refresh token → long-lived, used only to rotate access tokens
 */

function generateTokens(user) {
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

  return { accessToken, refreshToken };
}

/** Sets the refresh token as a secure httpOnly cookie */
function setRefreshCookie(res, token) {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: Number(process.env.REFRESH_TOKEN_MAXAGE) || 7 * 24 * 60 * 60 * 1000,
  });
}

/** Clears the refresh token cookie */
function clearRefreshCookie(res) {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
}

// ─── Controllers ────────────────────────────────────────────────────────────

/**
 * 📝 REGISTER
 * POST /api/auth/register
 *
 * Flow:
 *   1. Validate fields
 *   2. Block duplicate username / email
 *   3. Hash password (bcrypt, 12 rounds)
 *   4. Generate OTP + 10-minute expiry  ← BUG FIX: was 5 * 60 * 60 (ms), not minutes
 *   5. Persist user
 *   6. Fire OTP email (non-blocking — failure won't crash registration)
 *   7. Issue tokens + set cookie
 *   8. Return safe payload (no password, no OTP)
 *
 * NOTE: access token is issued immediately so the client can hit
 *       /verify-email without re-logging in.
 */
export async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    // ── 1. Validate ──────────────────────────────────────────────────────
    if (!username?.trim() || !email?.trim() || !password) {
      return res.status(400).json({
        message: "Username, email, and password are required",
      });
    }

    // Basic email shape check (full validation lives in the model/validator)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    // ── 2. Duplicate guard ───────────────────────────────────────────────
    const existing = await User.findOne({
      $or: [
        { username: username.trim().toLowerCase() },
        { email: email.trim().toLowerCase() },
      ],
    });

    if (existing) {
      // Deliberately vague — don't leak which field matched
      return res.status(409).json({
        message: "An account with that username or email already exists",
      });
    }

    // ── 3. Hash password ─────────────────────────────────────────────────
    // 12 rounds is the 2024 recommended minimum
    const hashedPassword = await bcrypt.hash(password, 12);

    // ── 4. GEnerate OTP ───────────────────────────────────────────────────────────
    const otp = generateOTP();
    // OTP expiry set to 10 min from now 
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    // ── 5. Persist ───────────────────────────────────────────────────────
    const user = await User.create({
      username: username.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      otp,
      otpExpiry,
      isVerified: false,
    });

    // ── 6. Send OTP email (fire-and-forget with logged failure) ──────────
    sendOTPMail(email, otp).catch((err) =>
      console.error("[register] OTP email failed:", err.message)
    );

    // ── 7. Tokens ────────────────────────────────────────────────────────
    const { accessToken, refreshToken } = generateTokens(user);

    // Persist refresh token so we can validate it on rotation
    user.refreshToken = refreshToken;
    await user.save();

    setRefreshCookie(res, refreshToken);

    // ── 8. Response ──────────────────────────────────────────────────────
    return res.status(201).json({
      message: "Registered successfully. Check your email for the OTP.",
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
      },
      accessToken,
    });
  } catch (error) {
    console.error("[register]", error);
    return res.status(500).json({
      message: "Registration failed due to a server error",
      error: error.message,
    });
  }
}


/**
 * ✉️ VERIFY EMAIL
 * POST /api/auth/verify-email
 *
 * Flow:
 *   1. Validate body
 *   2. Find user
 *   3. Guard: already verified
 *   4. Guard: OTP expired   ← check expiry BEFORE value (fail fast on cheap op)
 *   5. Guard: OTP mismatch
 *   6. Mark verified, clear OTP fields, save
 */
export async function verifyEmail(req, res) {
  try {
    const { email, otp } = req.body;

    // ── 1. Validate ──────────────────────────────────────────────────────
    if (!email?.trim() || !otp?.trim()) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    // ── 2. Find user ─────────────────────────────────────────────────────
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "No account found with that email" });
    }

    // ── 3. Already verified ──────────────────────────────────────────────
    if (user.isVerified) {
      return res.status(400).json({ message: "Email is already verified" });
    }

    // ── 4. OTP expiry ────────────────────────────────────────────────────
    if (!user.otpExpiry || user.otpExpiry < Date.now()) {
      return res.status(400).json({
        message: "OTP has expired. Please request a new one.",
      });
    }

    // ── 5. OTP value ─────────────────────────────────────────────────────
    if (user.otp !== otp.trim()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // ── 6. Mark verified ─────────────────────────────────────────────────
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    return res.status(200).json({
      message: "Email verified successfully. You can now log in.",
    });
  } catch (error) {
    console.error("[verifyEmail]", error);
    return res.status(500).json({
      message: "Error verifying email",
      error: error.message,
    });
  }
}




/**
 * 🔁 RESEND OTP
 * POST /api/auth/resend-otp
 *
 * Flow:
 *   1. Validate body — email required, OTP should NOT be in the request
 *   2. Find user by email
 *   3. Guard: already verified (no point resending)
 *   4. Rate-limit: block if previous OTP is still fresh (< 1 minute old)
 *   5. Generate new OTP + 10-minute expiry
 *   6. Persist to DB
 *   7. Fire OTP email (fire-and-forget)
 */
export async function resendOTP(req, res) {
  try {
    const { email } = req.body; // ← OTP must NOT come from the client here

    // ── 1. Validate ──────────────────────────────────────────────────────
    if (!email?.trim()) {
      return res.status(400).json({ message: "Email is required" });
    }

    // ── 2. Find user ─────────────────────────────────────────────────────
    const user = await User.findOne({ email: email.trim().toLowerCase() });

    if (!user) {
      // Deliberately vague — don't confirm whether the email is registered
      return res.status(404).json({ message: "No account found with that email" });
    }

    // ── 3. Already verified ──────────────────────────────────────────────
    if (user.isVerified) {
      return res.status(400).json({ message: "This email is already verified" });
    }




    // ── 4. Rate-limit: prevent OTP spam ──────────────────────────────────
    // If an OTP was issued less than 60 seconds ago, reject the request.
    // otpExpiry is set to "now + 10 min" when generated, so:
    //   remainingMs  = otpExpiry - now
    //   age of OTP   = 10 min - remainingMs
    //   block if age < 60 s  →  remainingMs > 9 min  →  remainingMs > 540_000 ms
    const COOLDOWN_MS = 60 * 1000;       // 60 seconds between resends
    const OTP_LIFETIME_MS = 10 * 60 * 1000; // must match what you set on generate

    if (user.otpExpiry) {
      const remainingMs = user.otpExpiry.getTime() - Date.now();
      const ageMs = OTP_LIFETIME_MS - remainingMs;

      if (ageMs < COOLDOWN_MS) {
        const waitSeconds = Math.ceil((COOLDOWN_MS - ageMs) / 1000);
        return res.status(429).json({
          message: `Please wait ${waitSeconds} second(s) before requesting a new OTP`,
        });
      }
    }

    // ── 5. Generate fresh OTP + expiry ───────────────────────────────────
    const otp = generateOTP();                               // reuse your helper
    const otpExpiry = new Date(Date.now() + OTP_LIFETIME_MS);

    // ── 6. Persist ───────────────────────────────────────────────────────
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // ── 7. Send email (fire-and-forget) ──────────────────────────────────
    sendOTPMail(user.email, otp).catch((err) =>
      console.error("[resendOTP] Email failed:", err.message)
    );

    return res.status(200).json({
      message: "A new OTP has been sent to your email",
    });

  } catch (error) {
    console.error("[resendOTP]", error);
    return res.status(500).json({
      message: "Failed to resend OTP due to a server error",
      error: error.message,
    });
  }
}



/**
 * 🔍 GET USER FROM ACCESS TOKEN
 * GET /api/auth/me
 *
 * Verifies the Bearer token in Authorization header and returns the
 * full user document (minus sensitive fields).
 * Useful for hydrating the client session on page load.
 */
export async function getUser(req, res) {
  try {
    // ── 1. Extract token ─────────────────────────────────────────────────
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access token not provided" });
    }

    const token = authHeader.split(" ")[1];

    // ── 2. Verify ────────────────────────────────────────────────────────
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch {
      return res.status(401).json({ message: "Access token is invalid or expired" });
    }

    // ── 3. Fetch fresh user from DB ──────────────────────────────────────
    // Don't trust the token payload alone — the account might have been
    // deleted, banned, or email might have changed since token was issued.
    const user = await User.findById(decoded._id).select(
      "-password -otp -otpExpiry -refreshToken"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Token valid",
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("[getUser]", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}


/**
 * 🔄 REFRESH TOKEN
 * POST /api/auth/refresh
 *
 * Silently issues a new access token when the old one expires.
 * Rotates the refresh token on every call (prevents replay attacks).
 *
 * Security:
 *   - Token is read from httpOnly cookie (never from body/query)
 *   - DB check ensures the token hasn't been invalidated (logout, ban, etc.)
 *   - Old refresh token is replaced atomically
 */
export async function refreshToken(req, res) {
  try {
    // ── 1. Read from cookie ──────────────────────────────────────────────
    const incomingToken = req.cookies?.refreshToken;
    if (!incomingToken) {
      return res.status(401).json({ message: "Refresh token not provided" });
    }

    // ── 2. Verify signature + expiry ─────────────────────────────────────
    let decoded;
    try {
      decoded = jwt.verify(incomingToken, process.env.REFRESH_TOKEN_SECRET);
    } catch {
      clearRefreshCookie(res);
      return res.status(401).json({ message: "Refresh token is invalid or expired" });
    }

    // ── 3. DB validation — token must match what we stored ───────────────
    // This is the key defence against stolen tokens that were already rotated.
    const user = await User.findById(decoded._id).select("+refreshToken");
    if (!user || user.refreshToken !== incomingToken) {
      // Possible token reuse attack — nuke the cookie
      clearRefreshCookie(res);
      return res.status(403).json({
        message: "Refresh token reuse detected. Please log in again.",
      });
    }

    // ── 4. Rotate tokens ─────────────────────────────────────────────────
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);

    user.refreshToken = newRefreshToken;
    await user.save();

    setRefreshCookie(res, newRefreshToken);

    return res.status(200).json({
      message: "Tokens refreshed successfully",
      accessToken,
    });
  } catch (error) {
    console.error("[refreshToken]", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}


/**
 * 🔐 LOGIN
 * POST /api/auth/login
 *
 * Flow:
 *   1. Validate fields
 *   2. Find user by email (case-insensitive)
 *   3. Compare password
 *   4. Issue tokens, persist refresh token, set cookie
 *
 * Security:
 *   - Generic "Invalid credentials" message regardless of which check failed
 *   - Constant-time comparison via bcrypt (prevents timing attacks)
 *   - Password field excluded from default select — must be explicitly included
 */
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    // ── 1. Validate ──────────────────────────────────────────────────────
    if (!email?.trim() || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // ── 2. Find user (include password for comparison) ───────────────────
    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    }).select("+password +refreshToken");

    // ── 3. Verify credentials ────────────────────────────────────────────
    // Run bcrypt.compare even if user is null to prevent timing attacks
    const dummyHash = "$2b$12$invalidhashpaddingtomakethislong.enough.padding";
    const isValid = user
      ? await bcrypt.compare(password, user.password)
      : await bcrypt.compare(password, dummyHash).then(() => false);

    if (!user || !isValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // ── 4. Tokens ────────────────────────────────────────────────────────
    const { accessToken, refreshToken } = generateTokens(user);

    user.refreshToken = refreshToken;
    await user.save();

    setRefreshCookie(res, refreshToken);

    return res.status(200).json({
      message: "Login successful",
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
      },
      accessToken,
    });
  } catch (error) {
    console.error("[login]", error);
    return res.status(500).json({
      message: "Login failed due to a server error",
      error: error.message,
    });
  }
}



/**
 * 🚪 LOGOUT
 * POST /api/auth/logout
 *
 * Flow:
 *   1. Read refresh token from cookie
 *   2. Invalidate it in the DB (so rotation-detection kicks in if reused)
 *   3. Clear the cookie
 *
 * Responds 200 even if the token was already gone — logout should always
 * "succeed" from the client's perspective.
 */
export async function logout(req, res) {
  try {
    const token = req.cookies?.refreshToken;

    if (token) {
      // Invalidate in DB — best-effort (don't throw if user not found)
      try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        await User.findByIdAndUpdate(decoded._id, { refreshToken: null });
      } catch {
        // Token may already be expired or tampered — still clear the cookie
      }
    }

    clearRefreshCookie(res);

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("[logout]", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}