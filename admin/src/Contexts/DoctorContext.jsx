import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendurl = 'https://doctor-appointment-website-vf6c.onrender.com';
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [profileData, setProfileData] = useState(false);
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendurl + "/api/doctor/appointments",
        { headers: { dToken } }
      );
      if (data.success) {
        setAppointments(data.appointments);
        console.log(appointments);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const completeAppointment = async (appointmentId, docId) => {
    try {
      const { data } = await axios.post(
        backendurl + "/api/doctor/complete-appointment",
        { appointmentId, docId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
        dashboardData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const cancelAppointment = async (appointmentId, docId) => {
    try {
      const { data } = await axios.post(
        backendurl + "/api/doctor/cancel-appointment",
        { appointmentId, docId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
        dashboardData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const dashboardData = async () => {
    try {
      const { data } = await axios.get(backendurl + "/api/doctor/dashboard", {
        headers: { dToken },
      });
      if (data.success) {
        setDashData(data.dashData);
        getAppointments();
        console.log(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const getProfileData = async () => {
    try {
      const { data } = await axios.get(backendurl + "/api/doctor/profile", {
        headers: { dToken },
      });
      if (data.success) {
        setProfileData(data.profileData);
        console.log(data.profileData);
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  
  const months = [
    " ",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return `${
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }`;
  };
  const value = {
    backendurl,
    dToken,
    setDToken,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    dashboardData,
    dashData,
    setDashData,
    slotDateFormat,
    profileData,
    setProfileData,
    getProfileData,
  };
  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};
export default DoctorContextProvider;
