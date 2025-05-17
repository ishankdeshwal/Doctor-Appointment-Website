// Common utility functions

// Format date from slot format (day_month_year) to readable format
export const slotDateFormat = (slotDate) => {
  const months = [" ", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dateArray = slotDate.split('_');
  return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
};

// Calculate age from date of birth
export const calculateAge = (dob) => {
  if (!dob) return "N/A";
  
  // If dob is a string in format YYYY-MM-DD
  const birthDate = new Date(dob);
  const today = new Date();
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

// Currency symbol for displaying prices
export const currencySymbol = "$";

// Assets object to store common image paths
export const assets = {
  cancel_icon: "/images/cancel_icon.svg",
  verified_icon: "/images/verified_icon.svg",
  info_icon: "/images/info_icon.svg",
  // Add more assets as needed
};