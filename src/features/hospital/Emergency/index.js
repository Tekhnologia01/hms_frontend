import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import vijay from "../../../assets/images/avatars/vijay1.jpg";
import CommanButton from "../../../components/common/form/commonButtton";
import CommonTable from "../../../components/common/table/CommonTable";
import NewCommonPagination from "../../../components/common/pagination/NewCommonPagination";

function Emergency() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [limitPerPage, setLimitPerPage] = useState(10);
    const totalRecords = 200;

    const data = {
        emergencyPatientList: [
            {
                id: 1,
                name: "John Doe",
                date: "2024-12-01",
                sex: "Male",
                age: 35,
                admitDate: "Date",
                wardNo: 2,
                doctorName: "Dr. Smith",
            },
            {
                id: 2,
                name: "Jane Smith",
                date: "2024-12-02",
                sex: "Female",
                age: 29,
                admitDate: "Date",
                wardNo: 2,
                doctorName: "Dr. Brown",
            },
        ]
    }

    const columns = [
        { name: "Patient Name", accessor: "name", class: "py-3 px-4 text-left", width: "20%" },
        { name: "Register Date", accessor: "date", class: "text-center px-1" },
        { name: "Sex", accessor: "sex", class: "text-center px-1", },
        { name: "Age", accessor: "age", class: "text-center px-1", },
        { name: "Admit Date", accessor: "admitDate", class: "text-center px-1" },
        { name: "Ward No", accessor: "wardNo", class: "text-center px-1", },
        { name: "Consulting Doctor", accessor: "doctorName", class: "text-center px-1" }
    ]

    const renderRow = (item, index) => (
        <tr key={item.id} className="border-bottom text-center">
            {columns.map(col => (
                <td key={col.accessor} className={`py-2 px-2 ${col.accessor === "name" ? "text-start lh-1" : ""}`}>
                    {col.accessor === "name" ? (
                        <div className="d-flex align-items-center">
                            <img
                                src={vijay} // Replace with the actual image URL
                                alt={item.name}
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                }}
                            />
                            <span className="ms-2">{item.name}</span>
                        </div>
                    ) : (
                        item[col.accessor]
                    )}
                </td>
            ))}
        </tr>
    );

    return (
        <>
            <div className="p-4">
                <div
                    className="fw-semibold fs-6 pb-3 mt-4"
                    style={{ color: "#1D949A" }}
                >
                    <FaArrowLeft />
                    <span className="pt-1 px-2" onClick={() => navigate("/hospital/departments")}>Department/Emergency</span>
                </div>
                <div className="fw-semibold fs-5 d-flex align-items-center justify-content-between">
                    <span className="px-2">Emergency Patient List</span>
                    <CommanButton
                        onClick={() => navigate("/reception/emergency/add_patient")}
                        label="Add Emergency Patient"
                        className="me-3 p-2 px-3 fw-semibold fs-6"
                        style={{ borderRadius: "5px" }}
                    />
                </div>

                <div className="mt-4">
                    <CommonTable minimumWidth={"900px"} headers={columns} renderRow={renderRow} bodyData={data.emergencyPatientList} title={`Emergency patient list`} />
                </div>

                {data.emergencyPatientList?.length > 0 && <NewCommonPagination currentPage={currentPage} limitPerPage={limitPerPage} totalRecords={totalRecords} setCurrentPage={setCurrentPage} />}

            </div>
        </>
    )

}

export default Emergency;