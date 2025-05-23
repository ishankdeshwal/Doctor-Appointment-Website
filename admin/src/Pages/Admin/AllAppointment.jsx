import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../Contexts/AdminContext";
import { AppContext } from "../../Contexts/AppContext";
import { assets } from "../../assets/assets";

function AllAppointment() {
  const { aToken, appointment, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, currencySymbol } = useContext(AppContext);
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
  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, []);
  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid  grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b ">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {appointment.reverse().map((item, index) => (
          <div
            className="flex flex-wrap justify-between  max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 px-6 py-3 hover:bg-gray-50 "
            key={index}
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img className="w-8 rounded-full" src={item.userData.image} />
              <p>{item.userData.name}</p>
            </div>
            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
            <p>
              {slotDateFormat(item.slotDate)} | {item.slotTime}
            </p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full bg-gray-200"
                src={item.docData.image}
              />
              <p>{item.docData.name}</p>
            </div>
            <p>
              {currencySymbol} {item.docData.fee}
            </p>
            {item.cancelled ? (
              <p className="text-red-500 text-xs font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500 text-xs font-medium">Completed</p>
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
  );
}

export default AllAppointment;
