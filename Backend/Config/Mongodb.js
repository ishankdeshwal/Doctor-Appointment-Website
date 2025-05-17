import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        // Simplified options for Vercel environment
        const options = {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 30000,
            connectTimeoutMS: 10000,
            retryWrites: true,
            retryReads: true,
            maxPoolSize: 10, // Limit pool size for serverless environments
            minPoolSize: 1   // Ensure at least one connection is maintained
        };

        console.log("Connecting to MongoDB...");
        
        await mongoose.connect(process.env.MONGODB_URI, options);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
    }
}

export default connectDB



