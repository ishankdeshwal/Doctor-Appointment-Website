import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Doctors from "./Pages/Doctors";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Myprofile from "./Pages/Myprofile";
import Appointment from "./Pages/Appointment"
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Footer from "./Components/Footer";
import MyAppointments from "./Pages/MyAppointments";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/"  element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myprofile" element={<Myprofile />} />
        <Route path="/MyAppointments" element={<MyAppointments />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route 
          path="/admin" 
          element={<Navigate to="https://doctor-appointment-website-6tda.vercel.app" replace />} 
        />
        <Route path="/admin/src/Pages/Login.jsx" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;


