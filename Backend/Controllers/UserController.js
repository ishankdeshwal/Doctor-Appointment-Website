import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../Models/UserModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../Models/DoctorModel.js";
import appointmentModel from "../Models/AppointmentModel.js";
import razorpay from "razorpay";

// API to register user

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Credentials Required" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Valid Email Required" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Strong Password Required" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      res.json({ success: false, message: "user Does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.json({ success: true, message: "Login Successfull", token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;
    const userId = req.userId;

    if (!name || !phone || !address || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    const updateData = {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    };

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      updateData.image = imageUpload.secure_url;
    }

    await userModel.findByIdAndUpdate(userId, updateData);
    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to book Appointment
const bookAppointment = async (req, res) => {
  try {
    const {
      doctorId,
      appointmentDate,
      appointmentTime,
      doctorName,
      doctorSpeciality,
      fees,
    } = req.body;
    const userId = req.userId; // This comes from the AuthUser middleware

    // Get doctor data
    const docData = await doctorModel.findById(doctorId).select("-password");
    if (!docData) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not Available" });
    }

    // Check if slot is available
    let slots_booked = docData.slots_booked;
    if (slots_booked[appointmentDate]) {
      if (slots_booked[appointmentDate].includes(appointmentTime)) {
        return res.json({ success: false, message: "Slot not Available" });
      } else {
        slots_booked[appointmentDate].push(appointmentTime);
      }
    } else {
      slots_booked[appointmentDate] = [];
      slots_booked[appointmentDate].push(appointmentTime);
    }

    // Get user data
    const userData = await userModel.findById(userId).select("-password");

    // Create appointment data
    const appointmentData = {
      userId,
      docId: doctorId,
      slotDate: appointmentDate,
      slotTime: appointmentTime,
      userData,
      docData: {
        name: docData.name,
        speciality: docData.speciality,
        image: docData.image,
        fee: docData.fee,
      },
      amount: docData.fee,
      date: Date.now(),
    };

    // Save appointment
    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // Update doctor's booked slots
    await doctorModel.findByIdAndUpdate(doctorId, { slots_booked });

    return res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
// API to get user appointments
const listAppointment = async (req, res) => {
  try {
   
    const userId = req.userId;

   

    if (!userId) {
      console.log("No userId found in request");
      return res
        .status(400)
        .json({ success: false, message: "User ID not found" });
    }

    // Find appointments for this user
    const appointments = await appointmentModel.find({ userId });
  

    return res.json({ success: true, appointments });
  } catch (error) {
    console.error("Error in listAppointment:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
// APi to cancel the appointment
const cancelAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData)
      return res.json({ success: false, message: "Appointment not found" });
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized" });
    }
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });
    //   releasing Doctor SLot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);
    let slots_booked = doctorData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// APi to make payment using razorpay
const razorpayinstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
const paymentRazorPay = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment Cancelled or  not found",
      });
    }
  

    // now payment krenge
    const options = {
      amount: Math.round(appointmentData.docData?.fee * 100),
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    };
    // order create kro through razorpay

    const order = await razorpayinstance.orders.create(options);
    console.log(order);
    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// API to veriify payment of razor pay
const verifyRazorPay=async(req,res)=>{
  try {
    const {razorpay_order_id}=req.body
    const orderInfo=await razorpayinstance.orders.fetch(razorpay_order_id)
    if(orderInfo.status==='paid'){
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
      res.json({success:true,message:"Payment Successfull"})
    }else{
      res.json({success:false,message:"Payment Failed"})
    }
  } catch (error) {
     console.log(error);
    res.json({ success: false, message: error.message });
  }
}
export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorPay,
  verifyRazorPay
};


