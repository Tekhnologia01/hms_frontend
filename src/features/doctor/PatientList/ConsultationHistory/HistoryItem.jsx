import { FaRegFileAlt } from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi2";

import "./ConsultationHistory.css";

function HistoryItem(props) {
    return (
        <>
            <div className="history-item-container">
                <div className="card-top">
                    <div className="profile">
                        <HiUserCircle className="icon" />
                        <p className="name">{props.data.doctorName}</p>
                    </div>
                    <div className="download">  
                        <FaRegFileAlt className="icon" />
                    </div>
                </div>
                <div className="specialty-container">
                    <p className="specialty">{props.data.specialty}</p>
                </div>
            </div>
        </>
    )
}

export default HistoryItem;