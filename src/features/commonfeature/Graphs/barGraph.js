import React from "react";
import { Col, Row } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarGraph({ data }) {
    const options = {
        responsive: true,
        maintainAspectRatio: false, // Allow the graph to stretch vertically
        plugins: {
            title: {
                display: true,
                // text: "Active Doctors",
                font: {
                    size: 18,
                    weight: "bold",
                },
                padding: {
                    top: 10,
                    bottom: 10,
                },
            },
            legend: {
                labels: {
                    font: {
                        weight: "bold",
                    },
                    padding: 10,
                },
            },
        },
        layout: {
            padding: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Month",
                    font: {
                        weight: "bold",
                    },
                    padding: 5,
                },
                ticks: {
                    font: {
                        weight: "bold",
                    },
                    padding: 5,
                },
                grid: {
                    display: false,
                },
            },
            y: {
                title: {
                    display: true,
                    // text: "Active Doctors",
                    font: {
                        weight: "bold",
                    },
                    padding: 5,
                },
                ticks: {
                    font: {
                        weight: "bold",
                    },
                    padding: 2,
                    stepSize: 200,
                },
                grid: {
                    drawBorder: false,
                    drawTicks: false,
                },
            },
        },
    };

    return (
        <div>
            <Row>
                <Col lg={12}>
                    <div className="pt-2">
                        <div className="d-flex justify-content-between">
                            <div className="ps-3 fw-semibold">Patient Appointment</div>
                            <div className="pe-3 fw-b">Month</div>
                        </div>
                        {/* Increased height here */}
                        <div style={{ height: "340px" }}> {/* Adjust container height */}
                            <Bar data={data} options={options} />
                        </div>
                    </div>
                </Col>
                <Col lg={5}></Col>
            </Row>
        </div>
    );
}

export default BarGraph;
