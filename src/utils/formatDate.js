export function formatDate(timestamp) {
    // Convert number to string
    const strTimestamp = timestamp?.toString();

    // Extract year, month, and day
    const year = strTimestamp?.substring(0, 4);
    const month = strTimestamp?.substring(4, 6);
    const day = strTimestamp?.substring(6, 8);

    return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
}