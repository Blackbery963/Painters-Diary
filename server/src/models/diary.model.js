import mongoose, { Schema } from "mongoose";

const diarySchema = new Schema(
    {
        diaryType: {
            type: String,
            enum: ["Travel_Log", "Creative_Blog"],
            required: true
        },
        title: {
            type: String,
            required: true,
            maxlength: [250, "Title cannot exceed 250 characters"],
            trim: true
        },
        description: {
            type: String,
            required: true,
            maxlength: [2500, "Description cannot exceed 2500 characters"],
            trim: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        // ===== Sketches with captions =====
        sketches: [
            {
                media: {
                    type: Schema.Types.ObjectId,
                    ref: "Media",
                    required: true
                },
                caption: {
                    type: String,
                    maxlength: 200,
                    trim: true
                }
            }
        ],

        vibe: {
            type: String,
            enum: ["Joyful", "Calm", "Inspired", "Grateful", "Reflective", "Adventurous", "Melancholic"]
        },
        tags: [
            {
                type: String,
                lowercase: true,
                trim: true
            }
        ],

        // ===== Travel specific =====
        location: {
            type: String,
            trim: true
        },
        weather: {
            type: String,
            enum: ["Sunny", "Cloudy", "Rainy", "Clear", "Windy", "Snow"],
            trim: true
        },
        travelDate: {
            type: Date, // Keep as Date for powerful querying
            required: function() {
                return this.diaryType === "Travel_Log"; // Fixed typo here
            }
        },
        season: {
            type: String,
            enum: ["Winter", "Spring", "Summer", "Monsoon", "Autumn"]
        },

        // ===== Engagement metrics =====
        likeCount: { type: Number, default: 0 },
        commentCount: { type: Number, default: 0 },
        viewCount: { type: Number, default: 0 },

        // ===== Publishing & Safety system =====
        status: {
            type: String,
            enum: ["draft", "published", "private"],
            default: "published"
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);


// ================= ADVANCED INDEXES =================

// 1. Full text search (Weights applied for relevance)
diarySchema.index(
    { title: "text", description: "text", tags: "text" },
    { weights: { title: 5, tags: 3, description: 1 } }
);

// 2. User profile diaries (Fast profile loading, ignores deleted or draft posts)
diarySchema.index(
    { author: 1, createdAt: -1 },
    { partialFilterExpression: { status: "published", isDeleted: false } }
);

// 3. Global Feed filtering (Travel vs Creative)
diarySchema.index(
    { diaryType: 1, createdAt: -1 },
    { partialFilterExpression: { status: "published", isDeleted: false } }
);

// 4. Location filtering for travel logs
diarySchema.index(
    { location: 1, createdAt: -1 },
    { partialFilterExpression: { diaryType: "Travel_Log", status: "published", isDeleted: false } }
);

// 5. Tag filtering
diarySchema.index(
    { tags: 1 },
    { partialFilterExpression: { status: "published", isDeleted: false } }
);


export const Diary = mongoose.model("Diary", diarySchema);