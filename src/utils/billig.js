function toNoonTimestamp(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);

    // Set time to current day's 12:00 PM
    date.setHours(12, 0, 0, 0);

    // Add 5 hours 30 minutes
    date.setTime(date.getTime() +(5 * 60 + 30) * 60 * 1000);

    return Math.floor(date.getTime() / 1000);
}
function toNoonTimestamp1(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);

    // Move to previous day and set time to 12:00 PM
    date.setDate(date.getDate() - 1);
    date.setHours(12, 0, 0, 0);

    // Add 5 hours 30 minutes
    date.setTime(date.getTime() - (5 * 60 + 30) * 60 * 1000);

    return Math.floor(date.getTime() / 1000);
}
function detectOverlaps(rooms) {





    for (let i = 0; i < rooms.length; i++) {
        const roomA = rooms[i];
        const startA = toNoonTimestamp1(roomA.end_date);
        const endA = toNoonTimestamp(roomA.end_date)


        console.log("startA", startA)

        console.log("endA", endA)




        for (let j = i + 1; j < rooms.length; j++) {
            const roomB = rooms[j];
            const startB = roomB.start_date;






            if (startB >= startA && startB < endA) {

                console.log("first")

                // if (roomA.room_type == roomB.room_type) {
                //     console.log("")

                // } else {

                const minTotal = Math.min(rooms[i].total, rooms[j].total);
                const roomWithLowerTotal = rooms[i].total === minTotal ? rooms[i] : rooms[j];



                console.log("roomWithLowerTotal", roomWithLowerTotal)
                if (roomWithLowerTotal.total === rooms[i].total) {
                    // If rooms[i] has the lower total, adjust end_date (subtract 1 min)

                    console.log("hello")
                    let time = toNoonTimestamp1(roomWithLowerTotal.end_date) - 60;
                    console.log("time", time)
                    roomWithLowerTotal.end_date = time // 60 seconds = 1 min
                } else {

                    let time1 = toNoonTimestamp(roomWithLowerTotal.start_date) + 60;
                    console.log("time1", time1)
                    // If rooms[j] has the lower total, adjust start_date (add 1 min)
                    roomWithLowerTotal.start_date = time1 // 60 seconds = 1 min
                }

                // }
            }


        }
    }
    return rooms
}
function processPatientRoomCycles(rooms) {
    // Sort rooms by start_date
    rooms.sort((a, b) => a.start_date - b.start_date);
 
    // Find the earliest start and latest end
    const minStart = Math.min(...rooms.map(r => r.start_date));
    const maxEnd = Math.max(...rooms.map(r => r.end_date || (Date.now() / 1000)));
 
    // Build noon-to-noon cycles
    let cycles = [];
    let cycleStart = new Date(minStart * 1000);
    cycleStart.setHours(12, 0, 0, 0);
    if (cycleStart.getTime() / 1000 > minStart) {
        // If first room starts before noon, move cycleStart back a day
        cycleStart.setDate(cycleStart.getDate() - 1);
    }
 
    let cycleEnd = new Date(cycleStart);
    cycleEnd.setDate(cycleEnd.getDate() + 1);
 
    while (cycleStart.getTime() / 1000 < maxEnd) {
        // Find all rooms overlapping this cycle
        const overlapping = rooms.filter(room =>
            room.start_date < cycleEnd.getTime() / 1000 &&
            (room.end_date || maxEnd) > cycleStart.getTime() / 1000
        );
        if (overlapping.length > 0) {
            // Pick the highest rate
            const maxRoom = overlapping.reduce((a, b) => (a.total > b.total ? a : b));
            cycles.push({
                start_date: Math.floor(cycleStart.getTime() / 1000),
                end_date: Math.floor(cycleEnd.getTime() / 1000),
                bed_id: maxRoom.bed_id,
                room_type: maxRoom.room_type,
                total: maxRoom.total,
                room_type_name:maxRoom.room_type_name || ""
            });
        }
        // Move to next cycle
        cycleStart.setDate(cycleStart.getDate() + 1);
        cycleEnd.setDate(cycleEnd.getDate() + 1);
    }
    return cycles;
}

// Usage in your processPatientData:
export function processPatientData(patients) {
    return patients.map(patient => {
        let totalAmount = 0;
        let totalDays = 0;
        let updatedRooms = processPatientRoomCycles(patient.room1 || []);
        updatedRooms.forEach(room => {
            totalAmount += room.total;
            totalDays += 1;
        });
        return {
            ...patient,
            room1: updatedRooms,

                total_amount: totalAmount,
                total_days: totalDays
           
        };
    });
}

