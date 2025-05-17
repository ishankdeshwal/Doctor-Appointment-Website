import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../Contexts/AdminContext";
import { assets } from "../../assets/assets";

function Dashboard() {
  const { dashData, aToken, dashboardData, cancelAppointment } =
    useContext(AdminContext);
  useEffect(() => {
    if (aToken) {
      dashboardData();
    }
  }, [aToken]);
  const months=[" ","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  const slotDateFormat=(slotDate)=>{
    const dateArray=slotDate.split('_')
    return `${dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2]}`
  }
  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3  items-center">
          <div className="flex items-center gap-2 bg-white p-4 px-6 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.doctor_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.doctors}
              </p>
              <p className="text-sm text-gray-400">Doctors</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-6 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.users}
              </p>
              <p className="text-sm text-gray-400">Patients</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-10" src={assets.appointment_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-sm text-gray-400">Appointments</p>
            </div>
          </div>
        </div>
        <div className="bg-white ">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
            <img src={assets.list_icon} alt="" />
            <p>Latest Appointments</p>
          </div>
          <div className="pt-4 border border-t-0 ">
            {dashData.latestAppointments.map((item, index) => (
              <div className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100" key={index}>
                <img className="w-10 rounded-full" src={item.docData.image} alt="" />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">{item.docData.name}</p>
                  <p className="text-gray-600">{slotDateFormat(item.slotDate)}</p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-500 text-xs font-medium">Cancelled</p>
                ) : (
                  <img
                    className="w-10 cursor-pointer"
                    onClick={() => cancelAppointment(item._id)}
                    src={assets.cancel_icon}
                    alt=""
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}

export default Dashboard;
