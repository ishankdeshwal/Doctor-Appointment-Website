import React, { useContext, useEffect } from 'react';
import Login from './Pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './Contexts/AdminContext';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Admin/Dashboard';
import AllAppointment from './Pages/Admin/AllAppointment';
import AddDoctor from './Pages/Admin/AddDoctor';
import DoctorList from './Pages/Admin/DoctorList';
import { DoctorContext } from './Contexts/DoctorContext';
import DoctorDashBoard from './Pages/Doctor/DoctorDashBoard';
import DoctorAppointment from './Pages/Doctor/DoctorAppointment';
import DoctorProfile from './Pages/Doctor/DoctorProfile';

function App() {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  
  // Determine if user is authenticated
  const isAuthenticated = Boolean(aToken || dToken);
  
  // Determine default route based on token type
  const getDefaultRoute = () => {
    if (aToken) return '/admin-dashboard';
    if (dToken) return '/doctor-dashboard';
    return '/';
  };
  
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      
      {isAuthenticated ? (
        <div className='bg-[#F8F9FD] min-h-screen'>
          <Navbar />
          <div className='flex items-start'>
            <Sidebar />
            <Routes>
              {/* Default route */}
              <Route path="/" element={<Navigate to={getDefaultRoute()} />} />
              
              {/* Admin Routes */}
              <Route path='/admin-dashboard' element={aToken ? <Dashboard /> : <Navigate to="/" />} />
              <Route path='/all-appointments' element={aToken ? <AllAppointment /> : <Navigate to="/" />} />
              <Route path='/add-doctor' element={aToken ? <AddDoctor /> : <Navigate to="/" />} />
              <Route path='/doctor-list' element={aToken ? <DoctorList /> : <Navigate to="/" />} />
              
              {/* Doctor Routes */}
              <Route path='/doctor-dashboard' element={dToken ? <DoctorDashBoard /> : <Navigate to="/" />} />
              <Route path='/doctor-appointments' element={dToken ? <DoctorAppointment /> : <Navigate to="/" />} />
              <Route path='/doctor-profile' element={dToken ? <DoctorProfile /> : <Navigate to="/" />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<Navigate to={getDefaultRoute()} />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      )}
    </>
  );
}

export default App;
