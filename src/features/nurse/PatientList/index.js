import{ useState } from "react";
import vijay from "../../../assets/images/avatars/vijay1.jpg";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../../components/table/CommonTable";
import NewCommonPagination from "../../../components/pagination/NewCommonPagination";

function NursePatientList() {

    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [limitPerPage, setLimitPerPage] = useState(10);

    // Example data for the table
    const patients = [
        {
            id: 1,
            patientName: "John Doe",
            uhId: "UH12345",
            registerDate: "2024-12-01",
            sex: "Male",
            age: 35,
            disease: "Hypertension",
        },
        {
            id: 2,
            patientName: "Jane Smith",
            uhId: "UH67890",
            registerDate: "2024-12-02",
            sex: "Female",
            age: 29,
            disease: "Diabetes",
        },
        // Add more patient data as needed
    ];
    const totalRecords = 100;

    const columns = [
        { name: "Patient Name", accessor: "patientName", class: "py-3 w-25 text-left px-2" },
        { name: "UH ID", accessor: "uhId", class: "w-1/5 text-center px-1" },
        { name: "Register Date", accessor: "registerDate", class: "py-3 text-center px-1" },
        { name: "Sex", accessor: "sex", class: "py-3 text-center px-1" },
        { name: "Age", accessor: "age", class: "py-3 text-center px-1" },
        { name: "Disease", accessor: "disease", class: "py-3 text-center px-1" }
    ];

    const renderRow = (item, index) => (
        <tr key={item.id} className="border-bottom text-center">
            <td className=" px-2 text-start lh-1">
                <div className="d-flex align-items-center"
                    onClick={() => navigate(`${item.uhId}`)}
                >
                    <img
                        src={vijay}
                        alt={item.patientName}
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            objectFit: "cover",
                        }}
                    />
                    <div className="d-flex flex-column ms-2" style={{ height: "30px" }}>
                        <p className="fw-semibold">{item.patientName}</p>
                    </div>
                </div>
            </td>
            <td className="py-3 px-2">{item.uhId}</td>
            <td className="py-3 px-2">{item.registerDate}</td>
            <td className="py-3 px-2">{item.sex}</td>
            <td className="py-3 px-2">{item.age}</td>
            <td className="py-3 px-2">{item.disease}</td>
        </tr>
    );

    return (
        <>
            <div className="mx-lg-4 mt-4 m-3 pb-4">
                <CommonTable minimumWidth={"700px"} headers={columns} bodyData={patients} renderRow={renderRow} title={"Patients List"} />
            </div>

            {/* Pagination */}
            {
                patients.length > 0 &&
                <NewCommonPagination currentPage={currentPage} limitPerPage={limitPerPage} totalRecords={totalRecords} setCurrentPage={setCurrentPage} />
            }
        </>
    );
}

export default NursePatientList;
