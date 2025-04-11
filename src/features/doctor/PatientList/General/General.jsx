import "./General.css";

function General() {
    return (
        <>
            <div className="general-container">
                <div className="profile">
                    <div className="profile-img">
                        <img src="" alt="profile" />
                    </div>
                    <div className="details">
                        <p className="name">
                            Patient Name
                        </p>
                        <p>
                            UH i'd No.
                        </p>
                        <p>
                            Patient Category
                        </p>
                    </div>
                </div>
                <div className="personal-info">
                    <h3>Personal Information</h3>
                    <div className="info-container">
                        <div className="name">
                            <p className="label">Name</p>
                            <p>Name here</p>
                        </div>
                        <div className="date-of-joining">
                            <p className="label">
                                Date of joining
                            </p>
                            <p>XX/XX/XXXX</p>
                        </div>
                        <div className="age">
                            <p className="label">Age</p>
                            <p>XX</p>
                        </div>
                        <div className="phone-no">
                            <p className="label">Phone Number</p>
                            <p>Ph no here</p>
                        </div>
                        <div className="email">
                            <p className="label">Email Address</p>
                            <p>Mail i'd here</p>
                        </div>
                    </div>
                </div>
                <div className="diseases">
                    <h3>Pre-existing Diseases</h3>
                    <div className="diseases-container">
                        <p className="label">
                            Mentally
                        </p>
                        <p className="disease-item">
                            <span>Disease 1</span>
                            <span>Disease 2</span>
                        </p>
                        <p className="label">
                            Physical
                        </p>
                        <p className="disease-item">
                            <span>Disease 1</span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default General;