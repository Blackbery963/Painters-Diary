import crypto from "crypto";
import { User } from "../models/user.model.js";

export async function register(req, res) {
    try {
        const { username, email, password } = req.body;

        const isAlreadyRegistered = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (isAlreadyRegistered) {
            return res.status(409).json({
                message: "Username or email already exists"
            });
        }

        const hashedPassword = crypto
            .createHash("sha256")
            .update(password)
            .digest("hex");

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "User registered successfully",
            userId: user._id,
            username: user.username,
        });

    } catch (error) {
        return res.status(400).json({
            message: "Error while registering user",
            error: error.message
        });
    }
}        