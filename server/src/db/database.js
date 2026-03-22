import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";



//Connection with mongoDB database 

 const connectDB = async ()=> {
    try {
        const connectMongoDB = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`MongoDB connected successfully DB_HOST: ${connectMongoDB.connection.host}` );
        
    } catch (error) {
        console.log("Mongo DB connection error", error);
        throw error; 
        // process.exit(1)
        
    }
}

export default connectDB