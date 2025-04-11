import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ThreeLayeredChart = () => {
  // Total appointments
  const totalAppointments = 2350;

  const data = {
    labels: ["Incomplete", "InProgress", "Completed"],
    datasets: [
      // Inner layer: Incomplete
      {
        label: "Incomplete",
        data: [2000, 350], // Data: Incomplete + remaining
        backgroundColor: ["#1E959B", "#E0E0E0"], // Light blue and transparent
        borderWidth: 1,
        borderRadius: 10,
        cutout: "30%", // Inner radius
        rotation: 0, // Start at 12 o'clock
        circumference: 360,
      },
      // Middle layer: InProgress
      {
        label: "InProgress",
        data: [600, 200], // Data: InProgress + remaining
        backgroundColor: ["#1E959B99", "#E0E0E0"], // Light teal and transparent
        borderWidth: 1,
        borderRadius: 10,
        cutout: "30%", // Inner radius
        rotation: 0, // Start at 12 o'clock
        circumference: 360,
      },
      // Outer layer: Completed
      {
        label: "Completed",
        data: [1500, 650], // Data: Completed + remaining
        backgroundColor: ["#1E959B4D", "#E0E0E0"], // Light greenish blue and transparent
        borderWidth: 1,
        borderRadius: 10,
        cutout: "30%", // Inner radius
        rotation: 0, // Start at 12 o'clock
        circumference: 360,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // Hide the legend
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            const total = tooltipItem.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${tooltipItem.label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    rotation: -90, // Start from 12 o'clock
  };

  return (
    <div className="p-2" style={{ position: "relative", width: "300px", margin: "auto", textAlign: "center" }}>
      <p className="text-start fs-6 fw-semibold">Lab Appointment</p>
      {/* Centered Text */}
      <div
        style={{
          position: "absolute",
          top: "60%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "18px",
          textAlign: "center",
        }}
      >
        <div className="mt-4" style={{ fontWeight: "bold", fontSize: "24px" }}>{totalAppointments}</div>
      </div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default ThreeLayeredChart;