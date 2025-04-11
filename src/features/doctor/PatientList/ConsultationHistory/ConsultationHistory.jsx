import "./ConsultationHistory.css";
import HistoryItem from "./HistoryItem";

function ConsultationHistory() {

    const history = [
        {
            year: 2022,
            data: [
                {
                    doctorName: "Doctor Name",
                    specialty: "Specialty",
                },
                {
                    doctorName: "Doctor Name",
                    specialty: "Specialty",
                },
                {
                    doctorName: "Doctor Name",
                    specialty: "Specialty",
                },
                {
                    doctorName: "Doctor Name",
                    specialty: "Specialty",
                }
            ]
        },
        {
            year: 2023,
            data: [
                {
                    doctorName: "Doctor Name",
                    specialty: "Specialty",
                },
                {
                    doctorName: "Doctor Name",
                    specialty: "Specialty",
                }
            ]
        }
    ];

    return (
        <>
            <div className="consultation-history-container">
                <div className="history">
                    <h3>History</h3>
                    <div className="history-map">
                        {
                            history.map(
                                (y) => <div key={y.year} className="year-container">
                                    <p className="year">{y.year}</p>
                                    <div className="history-cards">
                                        {
                                            y.data.map(
                                                (data, index) => <HistoryItem key={index} data={data} />
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConsultationHistory;