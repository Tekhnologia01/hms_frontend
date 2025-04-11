export function getDateAndDay(timestamp) {
    const date = new Date(timestamp); // Convert to Date object

    // Extract YYYY-MM-DD format
    const formattedDate = date?.toISOString()?.split("T")[0]; 

    // Get day name
    const options = { weekday: "long" }; 
    const dayName = date.toLocaleDateString("en-US", options);

    return { date: formattedDate, day: dayName };
}   