import dotenv from "dotenv"
import connectDB from "./db/database.js"
import app from "./app.js"

dotenv.config({
    path:"./.env"
})

if (!process.env.MONGO_URI) {
    throw new Error(" MONGO URI is not present in enviroment vaiables ");
    
}

const PORT = process.env.PORT || 5000;

connectDB()
.then(() => {
    const server = app.listen(PORT, () => {
        console.log(`MongoDB connected successfully on port: ${PORT}`);
    });
})
.catch((error) => {
    console.log("MongoDB connection Failed ", error )
    throw error;
});