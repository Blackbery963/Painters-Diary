import mongoose, { Schema} from "mongoose";

const commentLikeSchema = new Schema ({

    comment:{
        type: Schema.Types.ObjectId,
        ref: "Comment",
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },


},{
    timestamps: true
})


// ========== Optional Indexes =========


// this hlps to show the latest commenter furst 
commentLikeSchema.index({comment: 1, createdAt: -1})

//this helps to prevent the same somment twice 
commentLikeSchema.index({ user: 1, comment: 1}, {unique: true})


export const CommentLike = mongoose.model("CommentLike", commentLikeSchema)