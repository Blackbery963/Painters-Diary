import mongoose, { Schema } from "mongoose";

const communitySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Community names (like Subreddits) should generally be unique
        maxLength: [100, "Community name cannot exceed 100 characters"],
        trim: true
    },
    description: {
        type: String, 
        required: true,
        maxLength: [1000, "Description cannot exceed 1000 characters"],
        trim: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    
    // Backblaze B2 Asset Management
    logo: {
        url: { type: String, required: true },
        fileKey: { type: String, required: true }
    },
    coverImage: {
        url: { type: String, default: "" },
        fileKey: { type: String, default: "" }
    },
    
    // Fixed Privacy Field
    privacyType: {
        type: String,
        enum: ["public", "private", "restricted"],
        default: "public",
    },

    // UI-Friendly Rules Array
    rules: [
        {
            title: { type: String, required: true, trim: true },
            description: { type: String, trim: true, default: "" }
        }
    ],

    // Discoverability
    tags: [
        {
            type: String,
            lowercase: true,
            trim: true
        }
    ],

    // Hybrid Approach Metrics
    membersCount: { 
        type: Number, 
        default: 1 // The creator is automatically the first member!
    },
    postsCount: { 
        type: Number, 
        default: 0 
    },

    // Soft Delete & Edit Flags
    isDeleted: {
        type: Boolean,
        default: false
    },
    isEdited: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// ================= ADVANCED INDEXES =================

// 1. Unified Search: Allows users to search for communities by name, tags, or description
communitySchema.index(
    { name: "text", description: "text", tags: "text" },
    { weights: { name: 5, tags: 3, description: 1 } }
);

// 2. Discover / Newest Communities: Finds the latest public communities
communitySchema.index(
    { createdAt: -1 },
    { partialFilterExpression: { isDeleted: false, privacyType: "public" } }
);

// 3. Popular Communities: Sorts public communities by most members
communitySchema.index(
    { membersCount: -1 },
    { partialFilterExpression: { isDeleted: false, privacyType: "public" } }
);

// 4. Creator's Dashboard: Quickly load all communities a specific user created
communitySchema.index(
    { creator: 1, createdAt: -1 },
    { partialFilterExpression: { isDeleted: false } }
);

export const Community = mongoose.model("Community", communitySchema);