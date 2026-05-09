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

        // email verfication using otp
        otp:{
            type: String,
            default: null
        },
        otpExpiry:{
            type: Date,
            default: null
        },

        // 2FA enabled 

        twoFactorEnabled:{
            type: Boolean,
            default: false
        },

        twoFactorSecret:{
            type: String,
            default: null
        },
        

        // Profile Information
        nickname: {
            type: String,
            lowercase: true,
            trim: true,
            index: true, // Keep if you plan to search users by name
            maxLength: [50, 'Full name cannot exceed 50 characters'],
            default: "artist"
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
            default: 'Artist'
        },
        location: {
            type: String,
            trim: true
        },

        artStyle: {
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
        portfolio: {
            type: String,
            trim: true
        },
        
        website:{
            type: String,
            trim: true
        },
        
            facebook: { type: String, trim: true, default: "" },
            instagram: { type: String, trim: true, default: "" },
            twitter: { type: String, trim: true, default: "" },
            linkedin: { type: String, trim: true, default: "" }, // Fixed typo
            youtube:  {type: String, trim: true, default: ""}
    },
    {
        timestamps: true
    }
);


export const User = mongoose.model("User", userSchema);



// /**
//  * src/models/user.model.js
//  * FIXED User schema with proper field names and structure
//  */

// import mongoose, { Schema } from 'mongoose';

// const userSchema = new Schema(
//   {
//     // ════════════════════════════════════════════════════════════════
//     // PRIMARY ACCOUNT INFORMATION
//     // ════════════════════════════════════════════════════════════════
    
//     username: {
//       type: String,
//       required: [true, 'Username is required'],
//       unique: true,
//       trim: true,
//       lowercase: true,
//       maxLength: [25, 'Username cannot exceed 25 characters'],
//       index: true
//     },

//     email: {
//       type: String,
//       required: [true, 'Email is required'],
//       unique: true,
//       lowercase: true,
//       trim: true,
//       match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
//       index: true
//     },

//     password: {
//       type: String,
//       required: [true, 'Password is required'],
//       select: false,  // Don't include in queries by default
//       minLength: [6, 'Password must be at least 6 characters']
//     },

//     refreshToken: {
//       type: String,
//       select: false  // Don't include in queries by default
//     },

//     // ════════════════════════════════════════════════════════════════
//     // ACCOUNT STATUS
//     // ════════════════════════════════════════════════════════════════
    
//     isVerified: {
//       type: Boolean,
//       default: false
//     },

//     isActive: {
//       type: Boolean,
//       default: true
//     },

//     // Email verification OTP
//     otp: {
//       type: String,
//       default: null,
//       select: false
//     },

//     otpExpiry: {
//       type: Date,
//       default: null,
//       select: false
//     },

//     // Two-factor authentication
//     twoFactorEnabled: {
//       type: Boolean,
//       default: false
//     },

//     twoFactorSecret: {
//       type: String,
//       default: null,
//       select: false
//     },

//     // ════════════════════════════════════════════════════════════════
//     // PROFILE INFORMATION
//     // ════════════════════════════════════════════════════════════════
    
//     nickname: {
//       type: String,
//       lowercase: true,
//       trim: true,
//       index: true,
//       maxLength: [50, 'Nickname cannot exceed 50 characters'],
//       default: "artist"
//     },

//     bio: {
//       type: String,
//       maxLength: [250, 'Bio cannot exceed 250 characters'],
//       trim: true,
//       default: ""
//     },

//     // ✅ FIXED: Changed from 'avatar' to 'profileImage'
//     profileImage: {
//       type: String,  // Cloudinary URL
//       default: ""
//     },

//     coverImage: {
//       type: String,  // Cloudinary URL
//       default: ""
//     },

//     // profession: {
//     //   type: String,
//     //   enum: [
//     //     'Professional Artist',
//     //     'Hobbyist',
//     //     'Student',
//     //     'Instructor',
//     //     'Illustrator',
//     //     'Designer',
//     //     'Curator',
//     //     'Concept Artist'
//     //   ],
//     //   default: 'Hobbyist'
//     // },
//             artStyle: {
//             type: String,
//             trim: true // e.g., Portrait, Landscape, Abstract
//         },

//     location: {
//       type: String,
//       trim: true,
//       default: ""
//     },

//     artStyle: {
//       type: String,
//       enum: [
//         'Abstract',
//         'Realism',
//         'Impressionism',
//         'Surrealism',
//         'Minimalism',
//         'Pop Art',
//         'Digital',
//         'Cyberpunk',
//         'Traditional',
//         'Watercolor',
//         'Oil Paint'
//       ],
//       default: ""
//     },

//     // ✅ FIXED: Store interests as strings, not ObjectIds
//     interests: [
//       {
//         type: String,
//         trim: true
//       }
//     ],

//     // ════════════════════════════════════════════════════════════════
//     // EXTERNAL LINKS - FLAT STRUCTURE (NO NESTED OBJECT)
//     // ════════════════════════════════════════════════════════════════
    
//     // Websites
//     portfolio: {
//       type: String,
//       trim: true,
//       default: ""
//     },

//     website: {
//       type: String,
//       trim: true,
//       default: ""
//     },

//     // Social Media - ✅ FIXED: All fields are flat, consistent naming
//     twitter: {
//       type: String,
//       trim: true,
//       default: ""
//     },

//     instagram: {
//       type: String,
//       trim: true,
//       default: ""
//     },

//     linkedin: {  // ✅ FIXED: lowercase 'i'
//       type: String,
//       trim: true,
//       default: ""
//     },

//     youtube: {  // ✅ FIXED: lowercase, not 'youTube'
//       type: String,
//       trim: true,
//       default: ""
//     },

//     facebook: {
//       type: String,
//       trim: true,
//       default: ""
//     }
//   },
//   {
//     timestamps: true
//   }
// );

// // Index for faster queries
// userSchema.index({ email: 1, username: 1 });

// export const User = mongoose.model("User", userSchema);