import speakeasy from "speakeasy";
import qrcode from "qrcode";
import { User } from "../models/user.model.js";

/**
 * 🔐 SETUP 2FA
 * POST /api/2fa/setup
 * Protected by authMiddleware
 *
 * Flow:
 *   1. Fetch full user from DB (never trust req.user alone for writes)
 *   2. Guard: already enabled — don't silently overwrite the secret
 *   3. Generate TOTP secret
 *   4. Persist secret (pending, not yet enabled — enabled only after verify)
 *   5. Return QR code as data URL
 *
 * BUG FIXES:
 *   - name: PaintersDiary  →  name: "Painters' Diary"  (unquoted = ReferenceError → 500)
 *   - dbUser.save() not awaited  →  await dbUser.save()
 *   - qrcode.toDataURL() not awaited  →  const qr = await qrcode.toDataURL(...)
 */

export async function setup2fa(req, res) {
  try {
    // ── 1. Fetch fresh user from DB ──────────────────────────────────────
    const dbUser = await User.findById(req.user._id);
    if (!dbUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // ── 2. Guard: already enabled ────────────────────────────────────────
    // Without this, a second call would generate a NEW secret and silently
    // break any authenticator app the user already set up.
    if (dbUser.twoFactorEnabled) {
      return res.status(400).json({
        message: "Two-factor authentication is already enabled on this account",
      });
    }

    // ── 3. Generate secret ───────────────────────────────────────────────
    // BUG FIX: name must be a string literal — unquoted PaintersDiary is
    // treated as a variable reference → ReferenceError → 500
    const secret = speakeasy.generateSecret({
      length: 20,
      name: `Painters' Diary (${dbUser.email})`, // includes email so QR is user-specific
    });

    // ── 4. Persist (pending confirmation) ───────────────────────────────
    // Store the secret but DON'T set twoFactorEnabled = true yet.
    // The user must call /verify to prove their authenticator app works first.
    // BUG FIX: missing await — secret might not save before QR is returned
    dbUser.twoFactorSecret = secret.base32;
    await dbUser.save();

    // ── 5. Return QR code ────────────────────────────────────────────────
    // BUG FIX: qrcode.toDataURL returns a Promise — must be awaited,
    // otherwise `qr` is a Promise object and the client gets garbled JSON
    const qr = await qrcode.toDataURL(secret.otpauth_url);

    return res.status(200).json({
      message: "Scan the QR code with your authenticator app, then call /verify to confirm",
      qr,
      // Expose the manual-entry key too, in case the user can't scan
      manualEntryKey: secret.base32,
    });
  } catch (error) {
    console.error("[setup2fa]", error);
    return res.status(500).json({
      message: "Failed to set up two-factor authentication",
      error: error.message,
    });
  }
}


/**
 * ✅ VERIFY 2FA (and activate it)
 * POST /api/2fa/verify
 * Protected by authMiddleware
 *
 * Flow:
 *   1. Validate OTP present
 *   2. Fetch user from DB
 *   3. Guard: already enabled
 *   4. Guard: setup not started (no secret stored)
 *   5. Verify TOTP against stored secret
 *   6. Mark 2FA as enabled
 *
 * BUG FIXES:
 *   - encoding: base32  →  encoding: "base32"  (unquoted = ReferenceError → 500)
 *   - Typo "facttor" fixed
 *   - Added already-enabled guard
 *   - Added no-secret guard (setup not called first)
 */
export async function verify2fa(req, res) {
  try {
    const { otp } = req.body;

    // ── 1. Validate ──────────────────────────────────────────────────────
    if (!otp?.trim()) {
      return res.status(400).json({ message: "OTP is required" });
    }

    // ── 2. Fetch user ────────────────────────────────────────────────────
    const dbUser = await User.findById(req.user._id);
    if (!dbUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // ── 3. Guard: already enabled ────────────────────────────────────────
    if (dbUser.twoFactorEnabled) {
      return res.status(400).json({
        message: "Two-factor authentication is already active",
      });
    }

    // ── 4. Guard: setup not started ──────────────────────────────────────
    if (!dbUser.twoFactorSecret) {
      return res.status(400).json({
        message: "Please call /setup first to generate a secret",
      });
    }

    // ── 5. Verify TOTP ───────────────────────────────────────────────────
    // BUG FIX: encoding: base32 (unquoted) → ReferenceError → 500
    // window: 1 allows 1 step (30s) of clock drift either side
    const isValid = speakeasy.totp.verify({
      secret: dbUser.twoFactorSecret,
      encoding: "base32",          // ← was: encoding: base32  (no quotes → crash)
      token: otp.trim(),
      window: 1,
    });

    if (!isValid) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // ── 6. Activate ──────────────────────────────────────────────────────
    dbUser.twoFactorEnabled = true;
    await dbUser.save();

    return res.status(200).json({
      message: "Two-factor authentication enabled successfully", // ← typo "facttor" fixed
    });
  } catch (error) {
    console.error("[verify2fa]", error);
    return res.status(500).json({
      message: "Failed to verify OTP",
      error: error.message,
    });
  }
}


/**
 * 🔒 VALIDATE 2FA ON LOGIN
 * POST /api/2fa/validate
 * Called AFTER successful password check — authMiddleware issues a short-lived
 * "pre-2fa" token; this endpoint exchanges it for a full access token.
 *
 * This is the missing piece in your login flow — see updated login() below.
 */


export async function validate2fa(req, res) {
  try {
    const { otp } = req.body;

    if (!otp?.trim()) {
      return res.status(400).json({ message: "OTP is required" });
    }

    const dbUser = await User.findById(req.user._id);
    if (!dbUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!dbUser.twoFactorEnabled || !dbUser.twoFactorSecret) {
      return res.status(400).json({ message: "2FA is not enabled on this account" });
    }

    const isValid = speakeasy.totp.verify({
      secret: dbUser.twoFactorSecret,
      encoding: "base32",
      token: otp.trim(),
      window: 1,
    });

    if (!isValid) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // At this point the user has passed both factors — issue full tokens
    // (import generateTokens and setRefreshCookie from your auth.controller)
    const { generateTokens, setRefreshCookie } = await import("./auth.controller.js");
    const { accessToken, refreshToken } = generateTokens(dbUser);

    dbUser.refreshToken = refreshToken;
    await dbUser.save();
    setRefreshCookie(res, refreshToken);

    return res.status(200).json({
      message: "2FA validated — login complete",
      accessToken,
    });
  } catch (error) {
    console.error("[validate2fa]", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}