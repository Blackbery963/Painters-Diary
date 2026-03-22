import mongoose, {Schema} from "mongoose";

const shareSchema = new Schema ({
    

},
{
    timestamps: true,
}
)

export const Share = mongoose.model("Share", shareSchema)