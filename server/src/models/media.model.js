import mongoose, { Schema } from "mongoose";

const mediaFileSchema = new Schema({
    url: { type: String, required: true },
    fileKey: { type: String, required: true },
    type: { type: String, enum: ["image", "video"], required: true },
    thumbnail: { type: String }
}, { _id: false });


const mediaSchema = new Schema({
    artist: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        // Removed inline index here, moving to compound index at the bottom
    },

    mediaFiles: {
        type: [mediaFileSchema],
        validate: {
            validator: function(v){
                return v.length > 0 && v.length <= 10;
            },
            message: "Media must contain between 1 and 10 files"
        }
    },

    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, trim: true, maxlength: 2000, default: "" },

    categoryTags:[{
        type: String,
        lowercase: true,
        trim: true,
        undex:true
    }],
    styleTags:[{
        type: String,
        lowercase: true,
        trim: true,
        undex:true
    }],
    generalTags:[{
        type: String,
        lowercase: true,
        trim: true,
        undex:true
    }],

    visibility: { type: String, enum: ["public", "followers", "private"], default: "public" },
    status: { type: String, enum: ["draft", "published"], default: "published" },
    
    forSale: { type: Boolean, default: false },
    price: {
        type: Number,
        min: 0, //price can't be negative
        required: function() { return this.forSale === true; }
    },
    currency: { 
        type: String, 
        enum: ["USD", "INR", "EUR", "GBP"], // Added strict currency enforcement
        default: "INR" 
    },

    isAwarded: { type: Boolean, default: false },
    isFeatured:{ type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }, // Removed standalone index

    likesCount: { type: Number, default: 0 },
    viewsCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    sharesCount: { type: Number, default: 0 },
    downloadsCount: { type: Number, default: 0 }
}, { timestamps: true });


// ================= ADVANCED INDEXES =================

// 1. Search index (Weights prioritize title matches over tags/descriptions)
mediaSchema.index(
    { title: "text", description: "text", tags: "text" },
    { weights: { title: 5, tags: 3, description: 1 } }
);

// 2. Artist Gallery Loading (Partial Index - highly optimized for MongoDB Atlas)
// Only indexes artworks that are published and not deleted.
mediaSchema.index(
    { artist: 1, createdAt: -1 },
    { partialFilterExpression: { isDeleted: false, status: "published" } }
);

// 3. Global Feed / Popular Artworks (Partial Index)
mediaSchema.index(
    { likesCount: -1, viewsCount: -1 },
    { partialFilterExpression: { isDeleted: false, status: "published", visibility: "public" } }
);

// 4. Featured artworks (Partial Index)
mediaSchema.index(
    { isFeatured: 1, createdAt: -1 },
    { partialFilterExpression: { isDeleted: false, status: "published", visibility: "public" } }
);

// 5. Tag filtering
mediaSchema.index({ tags: 1 });

export const Media = mongoose.model("Media", mediaSchema);