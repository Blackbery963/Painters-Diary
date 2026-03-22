import mongoose, {Schema} from "mongoose";

const likeSchema = new Schema ({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        // index: true
    },

    media:{
        type: Schema.Types.ObjectId,
        ref: "Media",
        required: true,
        // index: true
    }

},{
    timestamps: true
})

//=========== OPTIONAL INDEXING ============


// this will prevent from false liking 
likeSchema.index({user: 1, media: 1}, {unique: true})

// this will sort user by the newest 
likeSchema.index({ media: 1, createdAt: -1 })

likeSchema.index ({ user: 1})


export const Like = mongoose.model("Like", likeSchema)