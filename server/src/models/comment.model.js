import mongoose, {Schema,} from "mongoose";

const commentSchema = new Schema ({
    commentText:{
        type: String,
        required: true,
        trim: true,
        maxLength: 1000
    },
    media:{
        type: Schema.Types.ObjectId,
        ref: "Media",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    parentComment:{
        type: Schema.Types.ObjectId,
        default: null,
        ref: "Comment",
        maxLength: 1000
    },
    likeCount: {
        type: Number,
        default: 0
    },
    replyCount: {
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

},
{
    timestamps: true
}
)

// =========== Optional Indexing ===========


// find the latest comment at the top
commentSchema.index( {media: 1, createdAt: -1 })

//findinng the first replies on the parent comment
commentSchema.index({ parentComment: 1, createdAt: -1 })

//find the latest user to comment on the parent commment
commentSchema.index({ user: 1, createdAt: -1 }) 


export const Comment = mongoose.model("Comment", commentSchema)