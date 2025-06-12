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

// export const convertDateTimeToEpoch = (date, time) => {
//     try {
//         if (date && time) {
//             const admitDateTime = new Date(`${date}T${time}`);

//             const epochTime = Math.floor(admitDateTime.getTime() / 1000);
//             return epochTime;
//         }
//     } catch (error) {
//         console.error("Error converting epoch time:", error);
//     }
//     return null;
// };

export const convertDateTimeToEpoch = (date, time) => {
    try {
        if (date && time) {
            // Combine date and time into individual parts
            const [year, month, day] = date.split("-").map(Number); // format: YYYY-MM-DD
            const [hours, minutes] = time.split(":").map(Number);   // format: HH:mm

            // Create a local Date object (months are 0-based in JS)
            const localDate = new Date(year, month - 1, day, hours, minutes);

            const epochTime = Math.floor(localDate.getTime() / 1000);
            return epochTime;
        }
    } catch (error) {
        console.error("Error converting to epoch time:", error);
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

export const convertEpochToDateTimeq = (epochTime) => {
    try {
        if (epochTime) {
            const dateObject = new Date(epochTime * 1000); // Convert to milliseconds

            const optionsDate = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                timeZone: 'Asia/Kolkata'
            };

            const optionsTime = {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
                timeZone: 'Asia/Kolkata'
            };

            const formattedDate = dateObject.toLocaleDateString('en-IN', optionsDate); // e.g. "12/06/2025"
            const formattedTime = dateObject.toLocaleTimeString('en-IN', optionsTime); // e.g. "08:45 AM"

            // Replace slashes with dashes in the date
            const cleanDate = formattedDate.replace(/\//g, '-');

            return `${cleanDate} ${formattedTime}`;
        }
    } catch (error) {
        console.error("Error converting epoch time:", error);
    }
    return '';
};
