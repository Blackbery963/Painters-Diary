import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema(
    {
        // Primary Account Information
        username: {
            type: String,
            required: [true, 'Username is required'], // Custom error messages
            unique: true,
            trim: true,
            lowercase: true,
            maxLength: [25, 'Username cannot exceed 30 characters']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'] // Regex validation
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            select: false // Hides from query results by default
        },

        refreshToken: {
            type: String,
            select: false
        },

        // Account Status
        isVerified: {
            type: Boolean,
            default: false
        },
        isActive: {
            type: Boolean,
            default: true
        },

        // Profile Information
        fullName: {
            type: String,
            lowercase: true,
            trim: true,
            index: true, // Keep if you plan to search users by name
            maxLength: [50, 'Full name cannot exceed 50 characters']
        },
        bio: {
            type: String,
            maxLength: [250, 'Bio cannot exceed 500 characters'],
            trim: true
        },
        avatar: {
            type: String, // Backblaze URL
            default: "" // Good practice to have a default empty string or default image URL
        },
        coverImage: {
            type: String, // Backblaze URL
            default: ""
        },
        profession: {
            type: String,
            enum: ['Hobbyist', 'Professional', 'Student', 'Other'], // Enforces strict categories (optional, remove enum if they can type anything)
            default: 'Other'
        },
        location: {
            type: String,
            trim: true
        },
        primaryStyle: {
            type: String,
            trim: true // e.g., Portrait, Landscape, Abstract
        },
        interests: [
            {
                type: Schema.Types.ObjectId,
                ref: "Interest"
            }
        ],

        // External Links Grouped Together
        portfolioSite: {
            type: String,
            trim: true
        },
        
        socials: {
            facebook: { type: String, trim: true, default: "" },
            instagram: { type: String, trim: true, default: "" },
            twitter: { type: String, trim: true, default: "" },
            linkedIn: { type: String, trim: true, default: "" } // Fixed typo
        }
    },
    {
        timestamps: true
    }
);



// ==========================================
// MIDDLEWARE & METHODS
// ==========================================

// 1. Hash password before saving
// userSchema.pre("save", async function (next) {
//     // Only hash the password if it has been modified (or is new)
//     if (!this.isModified("password")) return next();

//     try {
//         this.password = await bcrypt.hash(this.password, 10);
//         next();
//     } catch (error) {
//         return next(error);
//     }
// });

// 2. Compare incoming password with hashed password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// 3. Generate Access Token
userSchema.methods.generateAccessToken = function () {
 
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName 
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

// 4. Generate Refresh Token
userSchema.methods.generateRefreshToken = function () {

    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};

export const User = mongoose.model("User", userSchema);