import mongoose, { Schema } from "mongoose";

const diaryCommentSchema = new Schema({
    commentText: {
        type: String,
        required: true,
        trim: true,
        maxLength: [1000, "Comment cannot exceed 1000 characters"]
    },
    // FIXED: Changed to 'diary' to correctly link to the Diary model
    diary: {
        type: Schema.Types.ObjectId,
        ref: "Diary",
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    // FIXED: Removed maxLength, updated ref to point to itself
    parentComment: {
        type: Schema.Types.ObjectId,
        ref: "DiaryComment", 
        default: null
    },
    likeCount: {
        type: Number,
        default: 0
    },
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

// ============ ADVANCED INDEXES ============

// 1. Load the main comment section:
// Finds top-level comments (parentComment: null) for a specific diary, sorted newest first
diaryCommentSchema.index(
    { diary: 1, parentComment: 1, createdAt: -1 },
    { partialFilterExpression: { isDeleted: false } }
);

// 2. Load the replies:
// Finds replies to a specific comment, sorted OLDEST first (chronological reading)
diaryCommentSchema.index(
    { parentComment: 1, createdAt: 1 },
    { partialFilterExpression: { isDeleted: false } }
);

// 3. User Activity Feed:
// Finds all comments a specific user has made across the platform
diaryCommentSchema.index(
    { author: 1, createdAt: -1 },
    { partialFilterExpression: { isDeleted: false } }
);


export const DiaryComment = mongoose.model("DiaryComment", diaryCommentSchema);