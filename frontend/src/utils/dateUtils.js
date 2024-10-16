// utils/dateUtils.js

/**
 * Generates an array of date strings in "YYYY-MM-DD" format.
 * @param {number} numDays - Number of days to generate.
 * @param {Date} startDate - The starting date.
 * @returns {string[]} - Array of date strings.
 */
export const generateDateRange = (numDays, startDate = new Date()) => {
    const dates = [];
    for (let i = 0; i < numDays; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      // Format date as "YYYY-MM-DD"
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const day = String(currentDate.getDate()).padStart(2, '0');
      dates.push(`${year}-${month}-${day}`);
    }
    return dates;
  };
  
  // utils/slotUtils.js

export const generateAllSlots = (startHour = 8, endHour = 20, interval = 1) => {
  const slots = [];
  for (let hour = startHour; hour < endHour; hour += interval) {
    const startTime = `${hour.toString().padStart(2, '0')}:00`;
    const endTime = `${(hour + interval).toString().padStart(2, '0')}:00`;
    slots.push({ startTime, endTime, booked: false });
  }
  return slots;
};
