export const epochTimeToDate = (epochTime) => {
    try {
        if (epochTime) {
            const date = new Date(epochTime * 1000);
            const formattedDate = date.toLocaleDateString("en-GB"); // "en-GB" ensures dd/mm/yyyy format

            return formattedDate;
        }
    } catch (error) {
        console.error("Error converting epoch time:", error);
    }
    return null;
};

export const timeToEpoch = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":").map(Number);
    const now = new Date();
    now.setHours(hours, minutes, 0, 0); // Set selected time
    return Math.floor(now.getTime() / 1000);
};

export const epochToTime = (epoch) => {
    if (!epoch) return "";
    const date = new Date(epoch * 1000);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
};

export const convertDateTimeToEpoch = (date, time) => {

    try {
        if (date && time) {
            const admitDateTime = new Date(`${date}T${time}`);

            const epochTime = Math.floor(admitDateTime.getTime() / 1000);
            return epochTime;
        }
    } catch (error) {
        console.error("Error converting epoch time:", error);
    }
    return null;
};

export const convertEpochToDateTime = (epochTime) => {

    try {
        if (epochTime) {
            // Convert to JavaScript Date object
            const dateObject = new Date(epochTime * 1000); // Multiply by 1000 to convert seconds to milliseconds

            // Format Date & Time
            const formattedDate = dateObject.toLocaleDateString(); // e.g., "8/21/2024"
            const formattedTime = dateObject.toLocaleTimeString(); // e.g., "10:30:00 AM"
            return {date: formattedDate, time: formattedTime}
        }
    } catch (error) {
        console.error("Error converting epoch time:", error);
    }
    return null;
};