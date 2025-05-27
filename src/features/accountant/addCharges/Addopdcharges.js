import { useEffect, useState } from "react";
import vijay from "../../../assets/images/avatars/vijay1.jpg";
import CommonTable from "../../../components/common/table/CommonTable";
import NewCommonPagination from "../../../components/common/pagination/NewCommonPagination";
import axios from "axios";
import { useSelector } from "react-redux";
import { MdOutlineBedroomChild } from "react-icons/md";
import Bill from "../../doctor/appointement/Billl"
import { useNavigate, useParams } from "react-router-dom";

function AddOpdCharges() {
    const token = useSelector((state) => state.auth.currentUserToken);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const limitPerPage = 10;
    const [patients, setPatients] = useState([]);
    const [showModalbill, setShowModalbill] = useState(false);
    const [appointmentData, setAppointmentData] = useState(null);

    const params = useParams()



    const navigate=useNavigate()

    const handleOpenModalbill = (patient) => {
        setAppointmentData(patient);
        setShowModalbill(true);
    };

    const handleCloseModalbill = () => {
        setShowModalbill(false);
        setAppointmentData(null);
    };

    async function getAppointementDetail() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/appointment/getAppointmentWiseDoctorpatientDetails?appo_id=${params.appointmentId}`, config);
            setAppointmentData(response?.data?.data);

        } catch (error) {
            console.error(error?.response?.message ? error.response?.message : "Error while getting data");
        }
    }

    async function getOPDPatients() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/patient/get_opd?page=${currentPage}&limit=${limitPerPage}`, config);
            setPatients(response?.data?.data);
            setTotalPages(response?.data?.data?.pagination?.TotalPages);
        } catch (err) {
            console.log("Error fetching departments:", err);
        }
    }

    useEffect(() => {
        getOPDPatients();
        getAppointementDetail();
    }, []);


    const ipdColumns = [
        { name: "Patient Name", accessor: "patientName", class: "py-3 px-5 text-left", width: "250px" },
        { name: "UH Id", accessor: "uhId", class: "text-center px-1" },
        { name: "Appo Date", accessor: "date", class: "text-center px-1" },
        { name: "Doctor name", accessor: "doctorName", class: "py-3 text-center px-1", },

        { name: "Sex", accessor: "sex", class: "py-3 text-center px-1" },
        { name: "Age", accessor: "age", class: "py-3 text-center px-1", width: "30px" },
        { name: "Time", accessor: "department", class: "py-3 text-center px-1" },
        { name: "Action", accessor: "action", class: " text-center" }

    ];
    const renderIPDRow = (item, index) => (
        <tr key={item.id} className="border-bottom text-center">
            <td className="px-2 text-start lh-1">

                <div className="d-flex align-items-center">

                    <img
                        src={item?.patient_image ? `${process.env.REACT_APP_API_URL}/${item?.patient_image}` : vijay}
                        alt={item?.patient_name}
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            objectFit: "cover",
                        }}
                        className="ms-3"
                    />
                    <div className="ms-2">
                        <p className="fw-semibold m-auto">{item?.patient_name}</p>
                    </div>
                </div>
            </td>
            <td className="py-3 px-2">{item?.uh_id}</td>
            <td className="py-3 px-2">{item?.appo_date} </td>
            <td className="py-3 px-2">{item?.user_name}</td>
            <td className="py-3 px-2">{item?.patient_sex}</td>
            <td className="py-3 px-2">{item?.patient_age}</td>
            <td className="py-3 px-2">{item?.appo_time}</td>
            {

                <td>
                    <MdOutlineBedroomChild
                        style={{ height: "23px", width: "23px", cursor: "pointer" }}
                        // onClick={() => handleOpenModalbill(item)}
                         onClick={() => navigate(`/reception/add_charges/opd/show/${item?.appo_id}`)}

                        
                    />





                </td>
            }
        </tr>
    );



    return (

        <div className="py-4 px-3 ">
            {/* 
            <div>
                <Row className="align-items-center m-0">
                    <Col md={6}>
                        <div className="fw-bold fs-3">Patient List</div>
                    </Col>
                </Row>
            </div> */}




            <div className="mt-3">
                <div>
                    <CommonTable minimumWidth={"1000px"} headers={ipdColumns} bodyData={patients?.data} renderRow={renderIPDRow} title={"Patients List"} />
                </div>

                {
                    totalPages > 1 &&
                    <NewCommonPagination currentPage={currentPage} limitPerPage={limitPerPage} totalRecords={patients?.pagination?.TotalRecords} setCurrentPage={setCurrentPage} />
                }
            </div>

            <Bill
                show={showModalbill}
                patientName={appointmentData?.patient_name}
                consultationFee={appointmentData?.consultancy_fee}
                handleClose={handleCloseModalbill}
            // callbackFun={handleBill}
            />



        </div>
    );
}

export default AddOpdCharges;
