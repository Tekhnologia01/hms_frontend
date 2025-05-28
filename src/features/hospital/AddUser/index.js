import { useEffect, useState } from "react";
import vijay from "../../../assets/images/avatars/vijay1.jpg";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../../components/common/table/CommonTable";
import NewCommonPagination from "../../../components/common/pagination/NewCommonPagination";
import axios from "axios";
import CommanButton from "../../../components/common/form/commonButtton";
import UpdateUser from "./UpdateUser";
import { useSelector } from "react-redux";
import UpdateDoctor from "./UpdateDoctor";
import { toast } from "react-toastify";

function AddUsers() {
    const navigate = useNavigate();
    const [selctedUser, setSelectedUser] = useState()
    const [currentPage, setCurrentPage] = useState(1);
    const [limitPerPage, setLimitPerPage] = useState(10);
    const [currentState, setCurrentState] = useState("add_doctor");
    const [users, setUsers] = useState({ data: [], pagination: {} });
    const [userCount, setUserCount] = useState({
        totalDoctors: 0,
        totalLabAssistance: 0,
        totalReceptionist: 0
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);




    const [showDoctorModal, setShowDoctorModal] = useState(false);
    const handleShowDoctorModal = () => setShowDoctorModal(true);
    const handleCloseDoctorModal = () => setShowDoctorModal(false);


    const token = useSelector((state) => state.auth.currentUserToken);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const endpoints = {
        add_doctor: "doctor/get",
        add_labassistant: "lab/get",
        add_receptionist: "receptionist/get",
        add_accountant: "accountant/get"

    };


    const tableColumns = {
        add_doctor: [
            { name: "Doctor Name", accessor: "Name", class: "py-3 px-4 text-left" },
            { name: "Joining Date", accessor: "joining_date", class: "text-center px-1" },
            { name: "Specialization", accessor: "specialization", class: "py-3 text-center px-1" },
            { name: "Mobile No", accessor: "mobile No", class: "py-3 text-center px-1" },
            { name: "Consultancy Fee", accessor: "consultancy_fee", class: "py-3 text-center px-1" },
            { name: "Actions", accessor: "actions", class: "py-3 text-center px-1" }
        ],

        add_labassistant: [
            { name: "Name", accessor: "Name", class: "py-3 px-4 text-left" },
            { name: "Joining Date", accessor: "joining_date", class: "text-center px-1" },
            { name: "Mobile No", accessor: "mobile No", class: "py-3 text-center px-1" },
            { name: "Qualification", accessor: "qualification", class: "py-3 text-center px-1" },
            { name: "Shift", accessor: "joining_date", class: "text-center px-1" },
            { name: "Actions", accessor: "actions", class: "py-3 text-center px-1" }
        ],

        add_receptionist: [
            { name: "Receptionist Name", accessor: "Name", class: "py-3 px-4 text-left" },
            { name: "Joining Date", accessor: "joining_date", class: "text-center px-1" },
            { name: "Mobile No", accessor: "mobile No", class: "py-3 text-center px-1" },
            // { name: "Department", accessor: "joining_date", class: "text-center px-1" },
            { name: "Shift", accessor: "shift", class: "py-3 text-center px-1" },
            { name: "Actions", accessor: "actions", class: "py-3 text-center px-1" }
        ],
        add_accountant: [
            { name: "Accountant Name", accessor: "Name", class: "py-3 px-4 text-left" },
            { name: "Joining Date", accessor: "joining_date", class: "text-center px-1" },
            { name: "Mobile No", accessor: "mobile No", class: "py-3 text-center px-1" },
            { name: "Shift", accessor: "shift", class: "py-3 text-center px-1" },
            { name: "Actions", accessor: "actions", class: "py-3 text-center px-1" }
        ]
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const endpoint = endpoints[currentState];
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/${endpoint}?page=${currentPage}&limit=${limitPerPage}`, config
            );
            setUsers(response?.data?.data || { data: [], pagination: {} });
        } catch (err) {
            toast.error("Error fetching data", "error");
            console.error("Error fetching data:", err);
            setUsers({ data: [], pagination: {} });
        } finally {
            setIsLoading(false);
        }
    };
    // Fetch user data
    useEffect(() => {
        fetchData();
    }, [currentState, currentPage, limitPerPage]);


    const fetchCount = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/count`, config);
            setUserCount({
                totalDoctors: response?.data?.data?.totalDoctors || 0,
                totalLabAssistance: response?.data?.data?.totalLabAssistance || 0,
                totalReceptionist: response?.data?.data?.totalReceptionist || 0,
                totalAccountant: response?.data?.data?.totalAccountant || 0,

            });
        } catch (err) {
            console.error("Error fetching user count:", err);
        }
    };


    // Fetch user counts
    useEffect(() => {
        fetchCount();
    }, []);

    // Card styles
    const cardStyle = {
        width: "225px",
        height: "120px",
        boxShadow: "0px 4px 4px 0px #00000040",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        backgroundColor: "#fff"
    };

    const headingStyle = {
        color: "#101828",
        fontSize: "20px",
        fontWeight: "500",
        lineHeight: "6px",
        marginTop: "35px"
    };

    const numberStyle = {
        color: "#1E959B",
        fontWeight: "500",
        fontSize: "35px",
    };


    const renderDoctorRow = (item) => (
        <tr key={item.id} className="border-bottom text-center">
            <td className="px-2 text-start lh-1">
                <div className="d-flex align-items-center">
                    <img
                        src={item.Photo ? `${process.env.REACT_APP_API_URL}/${item.Photo}` : vijay}
                        alt={item.Name}
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            objectFit: "cover",
                        }}
                        className="ms-3"
                    />
                    <div className="d-flex flex-column ms-2" style={{ height: "40px" }}>
                        <p className="fw-semibold">{item.Name}</p>
                        <p style={{ marginTop: "-10px", color: "#475467", fontSize: "14px" }}>
                            ID: {item.User_ID}
                        </p>
                    </div>
                </div>
            </td>
            <td className="py-3 px-2">{item?.joining_date || "-"}</td>
            <td className="py-3 px-2">{item.specialization || "-"}</td>
            <td className="py-3 px-2">{item.mobile || "-"}</td>
            <td className="py-3 px-2">{item.consultancy_fee ? `${item.consultancy_fee}` : "-"}</td>


            <td>
                <FiEdit2
                    style={{ height: "23px", width: "23px", cursor: "pointer" }}
                    onClick={async () => {
                        await setSelectedUser(item)
                        // handleShowModal()
                        handleShowDoctorModal()
                    }} />
                <span className="ps-3"></span>
                <RiDeleteBinLine
                    style={{ height: "25px", width: "25px", cursor: "pointer" }}
                    onClick={() => handleDelete(item.User_ID)}
                />
            </td>
        </tr>
    );

    const renderNurseRow = (item) => (
        <tr key={item.id} className="border-bottom text-center">
            <td className="px-2 text-start lh-1">
                <div className="d-flex align-items-center">
                    <img
                        src={item.Photo ? `${process.env.REACT_APP_API_URL}/${item.Photo}` : vijay}
                        alt={item.Name}
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            objectFit: "cover",
                        }}
                        className="ms-3"
                    />
                    <div className="d-flex flex-column ms-2" style={{ height: "40px" }}>
                        <p className="fw-semibold">{item.Name}</p>
                        <p style={{ marginTop: "-10px", color: "#475467", fontSize: "14px" }}>
                            ID: {item.User_ID}
                        </p>
                    </div>
                </div>
            </td>
            <td className="py-3 px-2">
                {item?.joining_date
                    ? new Date(item.joining_date * 1000).toLocaleDateString('en-GB')
                    : "-"}
            </td>            <td className="py-3 px-2">{item?.mobile || "-"}</td>

            <td className="py-3 px-2">{item.degree || "-"}</td>
            <td className="py-3 px-2">{item.shift_name || "-"}</td>


            <td>
                <FiEdit2
                    style={{ height: "23px", width: "23px", cursor: "pointer" }}
                    onClick={async () => {
                        await setSelectedUser(item)
                        handleShowModal()
                    }} />
                <span className="ps-3"></span>
                <RiDeleteBinLine
                    style={{ height: "25px", width: "25px", cursor: "pointer" }}
                    onClick={() => handleDelete(item.User_ID)}
                />
            </td>
        </tr>
    );

    const renderReceptionistRow = (item) => (
        <tr key={item.id} className="border-bottom text-center">
            <td className="px-2 text-start lh-1">
                <div className="d-flex align-items-center">
                    <img
                        src={item.Photo ? `${process.env.REACT_APP_API_URL}/${item.Photo}` : vijay}
                        alt={item.Name}
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            objectFit: "cover",
                        }}
                        className="ms-3"
                    />
                    <div className="d-flex flex-column ms-2" style={{ height: "40px" }}>
                        <p className="fw-semibold">{item.Name}</p>
                        <p style={{ marginTop: "-10px", color: "#475467", fontSize: "14px" }}>
                            ID: {item.User_ID}
                        </p>
                    </div>
                </div>
            </td>
            <td className="py-3 px-2">
                {item?.joining_date
                    ? new Date(item.joining_date * 1000).toLocaleDateString('en-GB')
                    : "-"}
            </td>            <td className="py-3 px-2">{item?.mobile || "-"}</td>

            {/* <td className="py-3 px-2">{item?.Department_name || "-"}</td> */}

            <td className="py-3 px-2">{item.shift_name || "-"}</td>
            <td>
                <FiEdit2
                    style={{ height: "23px", width: "23px", cursor: "pointer" }}
                    onClick={async () => {
                        await setSelectedUser(item)
                        handleShowModal()
                    }}
                />
                <span className="ps-3"></span>
                <RiDeleteBinLine
                    style={{ height: "25px", width: "25px", cursor: "pointer" }}
                    onClick={() => handleDelete(item.User_ID)}
                />
            </td>
        </tr>
    );


    const renderAccountantRow = (item) => (
        <tr key={item.id} className="border-bottom text-center">
            <td className="px-2 text-start lh-1">
                <div className="d-flex align-items-center">
                    <img
                        src={item.Photo ? `${process.env.REACT_APP_API_URL}/${item.Photo}` : vijay}
                        alt={item.Name}
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            objectFit: "cover",
                        }}
                        className="ms-3"
                    />
                    <div className="d-flex flex-column ms-2" style={{ height: "40px" }}>
                        <p className="fw-semibold">{item.Name}</p>
                        <p style={{ marginTop: "-10px", color: "#475467", fontSize: "14px" }}>
                            ID: {item.User_ID}
                        </p>
                    </div>
                </div>
            </td>
            <td className="py-3 px-2">{item?.joining_date || "-"}</td>
            <td className="py-3 px-2">{item?.mobile || "-"}</td>
            <td className="py-3 px-2">{item.shift_name || "-"}</td>
            <td>
                <FiEdit2
                    style={{ height: "23px", width: "23px", cursor: "pointer" }}
                    onClick={async () => {
                        await setSelectedUser(item)
                        handleShowModal()
                    }}
                />
                <span className="ps-3"></span>
                <RiDeleteBinLine
                    style={{ height: "25px", width: "25px", cursor: "pointer" }}
                    onClick={() => handleDelete(item?.User_ID)}
                />
            </td>
        </tr>
    );
    const getRenderFunction = () => {
        switch (currentState) {
            case "add_doctor":
                return renderDoctorRow;
            case "add_labassistant":
                return renderNurseRow;
            case "add_receptionist":
                return renderReceptionistRow;
            case "add_accountant":
                return renderAccountantRow;
            default:
                return renderDoctorRow;
        }
    };

    const handleEdit = async (data) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/receptionist/updateuser`, data, config);
            fetchData()
            toast.success("Updated successfully");

        } catch (error) {

        }
    };

    const handleDelete = async (id) => {
        try {

            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/doctor/delete/${id}`, config);
            fetchCount();
            fetchData()
            toast.success("Deleted successfully");

        } catch (err) {
            toast.error("Error deleting user");
            console.error("Error deleting user:", err);
        }
    };



    const handleEditDoctor = async (data) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/doctor/updatedoctor`, data, config);
            fetchData()
            toast.success("Doctor updated successfully");
        } catch (error) {
            toast.error(error)
        }
    };

    return (
        <div className="py-4">
            <div className="fw-semibold fs-5 px-3">Add Users</div>

            <div className="d-flex justify-content-end pe-2">
                <CommanButton
                    label={`+ Add ${currentState.replace("add_", "").charAt(0).toUpperCase() + currentState.replace("add_", "").slice(1)}`}
                    className="p-1 px-4 fw-semibold me-2"
                    style={{ borderRadius: "7px", fontSize: "14px", height: "40px" }}
                    onClick={() => navigate(currentState)}
                />
            </div>

            <div className="cards-container d-flex align-items-center justify-content-start mt-3 ms-3 gap-4 flex-wrap">
                {[
                    { state: "add_doctor", label: "Doctor", countKey: "totalDoctors" },
                    { state: "add_labassistant", label: "LabAssistant", countKey: "totalLabAssistance" },
                    { state: "add_receptionist", label: "Receptionist", countKey: "totalReceptionist" },
                    { state: "add_accountant", label: "Accountant", countKey: "totalAccountant" }
                ]?.map(({ state, label, countKey }) => (
                    <div
                        key={state}
                        style={{
                            ...cardStyle,
                            border: currentState === state ? "2px solid #1E959B" : "none"
                        }}
                        onClick={() => setCurrentState(state)}
                    >
                        <p style={headingStyle}>Add {label}</p>
                        <p style={numberStyle}>{userCount[countKey] || 0}</p>
                    </div>
                ))}
            </div>

            <div className="px-3 py-4">
                {isLoading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <>
                        {users?.data?.length > 0 ? (
                            <>
                                <CommonTable
                                    minimumWidth="700px"
                                    headers={tableColumns[currentState]}
                                    bodyData={users.data}
                                    renderRow={getRenderFunction()}
                                    title={`Recent ${currentState.replace("add_", "").charAt(0).toUpperCase() + currentState.replace("add_", "").slice(1)} List`}
                                />
                                <NewCommonPagination
                                    currentPage={currentPage}
                                    limitPerPage={limitPerPage}
                                    totalRecords={users.pagination?.TotalRecords || 0}
                                    setCurrentPage={setCurrentPage}
                                />
                            </>
                        ) : (
                            <div className="text-center py-5">
                                No {currentState.replace("add_", "")}s found
                            </div>
                        )}
                    </>
                )}
            </div>

            <UpdateUser
                status={currentState}
                show={showModal}
                handleClose={handleCloseModal}
                user={selctedUser}
                patientUpdate={handleEdit}
            />
            <UpdateDoctor
                status={currentState}
                show={showDoctorModal}
                handleClose={handleCloseDoctorModal}
                user={selctedUser}
                patientUpdate={handleEditDoctor}
            />
        </div>
    );
}

export default AddUsers;