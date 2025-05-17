import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        // Simplified options for Vercel environment
        const options = {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 30000,
            connectTimeoutMS: 10000,
            retryWrites: true,
            retryReads: true
        };

        console.log("Connecting to MongoDB...");
        
        // Remove the /prescripto part if it's already in your MONGODB_URI
        await mongoose.connect(process.env.MONGODB_URI, options);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
        // Don't exit process on error - critical for serverless
    }
}

export default connectDB

