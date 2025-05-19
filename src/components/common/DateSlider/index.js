import React, { useRef } from "react";
import { format, addDays, subDays, startOfMonth, endOfMonth } from "date-fns";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const DateSlider = ({currentDate, setCurrentDate}) => {
    const sliderRef = useRef(null);

    // Get all days of the current month
    const getMonthDates = (date) => {
        const start = startOfMonth(date);
        const end = endOfMonth(date);
        let dates = [];
        for (let day = start; day <= end; day = addDays(day, 1)) {
            dates.push(day);
        }
        return dates;
    };

    const monthDates = getMonthDates(currentDate);

    const handleDateChange = (date) => {
        setCurrentDate(date);
    };

    const handlePrevMonth = () => {
        setCurrentDate(subDays(currentDate, 30));
    };

    const handleNextMonth = () => {
        setCurrentDate(addDays(currentDate, 30));
    };

    const slideLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const slideRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    return (
        <div className="fw-semibold" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* Month Navigation */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <button
                    onClick={handlePrevMonth}
                    style={{
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                        color: "#007BFF",
                    }}
                >
                    <GrFormPrevious size={30} />
                </button>
                <div className="d-flex align-items-center justify-content-center" style={{ fontSize: "16px", margin: "0 20px", width: "120px" }}>
                    {format(currentDate, "MMMM yyyy")}
                </div>
                <button
                    onClick={handleNextMonth}
                    style={{
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                        color: "#007BFF",
                    }}
                >
                    <GrFormNext size={30} />
                </button>
            </div>

            {/* Date Slider */}
            <div
                style={{
                    display: "flex",
                    overflowX: "auto",
                    padding: "10px",
                    gap: "8px",
                    background: "linear-gradient(180deg, rgba(30, 149, 155, 0.315) 6%, rgba(30, 149, 155, 0) 100%)",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    width: "100%",
                }}
            >
                <div onClick={slideLeft} style={{ backgroundColor: "#1E959B", borderRadius: "50%", height: "28px", cursor: "pointer", width: "28px", margin: "auto" }}>
                    <GrFormPrevious color="#fff" size={28} />
                </div>
                <div ref={sliderRef} style={{
                    display: "flex",
                    overflowX: "auto",
                    gap: "8px",
                    width: "90%",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                }}>
                    {monthDates.map((date) => (
                        <div
                            key={date}
                            onClick={() => handleDateChange(date)}
                            style={{
                                flex: "0 0 auto",
                                width: "40px",
                                padding: "5px 0",
                                textAlign: "center",
                                cursor: "pointer",
                                backgroundColor: date.toDateString() === currentDate.toDateString() ? "#1E959B" : "transparent",
                                color: date.toDateString() === currentDate.toDateString() ? "#ffffff" : "#000000",
                                borderRadius: "5px",
                            }}
                        >
                            <div style={{ fontSize: "12px" }}>{format(date, "E").substring(0, 3)}</div>
                            <div style={{ fontSize: "14px" }}>{format(date, "d")}</div>
                        </div>
                    ))}
                </div>
                <div onClick={slideRight} style={{ backgroundColor: "#1E959B", borderRadius: "50%", height: "28px", cursor: "pointer", width: "28px", margin: "auto" }}>
                    <GrFormNext color="#fff" size={28} />
                </div>
            </div>
        </div>
    );
};

export default DateSlider;