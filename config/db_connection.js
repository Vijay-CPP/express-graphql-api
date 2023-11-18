import mongoose from "mongoose";
import 'dotenv/config'

const MONGODB_URI = process.env.MONGODB_URI;

export async function connectDB() {
    await mongoose.connect(MONGODB_URI);
    console.log("Successfully connected to MongoDB!")
}

