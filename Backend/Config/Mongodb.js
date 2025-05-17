import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        // Remove deprecated options
        const options = {
            serverSelectionTimeoutMS: 10000, // Increase timeout to 10 seconds
            socketTimeoutMS: 45000,
            connectTimeoutMS: 30000, // Add connection timeout
            retryWrites: true,
            retryReads: true,
            maxPoolSize: 10 // Limit connection pool size
        };

        console.log("Connecting to MongoDB...");
        console.log(`Connection string: ${process.env.MONGODB_URI}/prescripto`);
        
        await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`, options);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
        console.error("Full error:", error);
        
        // Don't exit the process, just log the error
        // process.exit(1);
    }
}

export default connectDB
