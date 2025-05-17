import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userModel from './Models/UserModel.js';
import doctorModel from './Models/DoctorModel.js';
import appointmentModel from './Models/AppointmentModel.js';

// Load environment variables
dotenv.config();

async function testDatabase() {
  try {
    console.log('Testing database connection...');
    console.log('MongoDB URI:', process.env.MONGODB_URI ? 'URI exists' : 'URI is missing');
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Test user model
    const userCount = await userModel.countDocuments();
    console.log(`Users in database: ${userCount}`);
    
    // Test doctor model
    const doctorCount = await doctorModel.countDocuments();
    console.log(`Doctors in database: ${doctorCount}`);
    
    // Test appointment model
    const appointmentCount = await appointmentModel.countDocuments();
    console.log(`Appointments in database: ${appointmentCount}`);
    
    // Test creating a document
    const testUser = new userModel({
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'password123'
    });
    
    await testUser.save();
    console.log('Test user created successfully');
    
    // Disconnect
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Database test failed:', error);
  }
}

testDatabase();