

import { useState } from "react";
import "./PatientDetails.css";

import General from "./General/General";
import ConsultationHistory from "./ConsultationHistory/ConsultationHistory";

function PatientDetails() {
    const [activeButton, setActiveButton] = useState("General");

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    return (
        <>
            <div className="patient-list-container p-lg-5">
                <h2 className="pb-2">Patient List</h2>
                <p><span>Showing: </span>All Consultations of All Healthcare Providers</p>

                <div className="buttons">
                    <button 
                        className={activeButton === "General" ? "active" : ""} 
                        onClick={() => handleButtonClick("General")}
                    >
                        General
                    </button>
                    <button 
                        className={activeButton === "Consultation History" ? "active" : ""} 
                        onClick={() => handleButtonClick("Consultation History")}
                    >
                        Consultation History
                    </button>
                    <button 
                        className={activeButton === "Patient Documents" ? "active" : ""} 
                        onClick={() => handleButtonClick("Patient Documents")}
                    >
                        Patient Documents
                    </button>
                </div>

                <div className="inner">
                    {activeButton === "General" && <General />}
                    {activeButton === "Consultation History" && <ConsultationHistory />}
                    {activeButton === "Patient Documents" && (
                        <div>
                            <h3>Patient Documents</h3>
                            <p>This section will display patient documents.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default PatientDetails;
