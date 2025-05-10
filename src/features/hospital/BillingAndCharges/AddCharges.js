import { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "axios";
import { useSelector } from "react-redux";
import NewCommonPagination from "../../../components/pagination/NewCommonPagination";
import CommanButton from "../../../components/common/form/commonButtton";
import AddChargesModal from "./AddChargesModal";
import CommonTable from "../../../components/table/CommonTable";
import { toast } from "react-toastify";

function AddCharges() {
    const user =useSelector(state => state?.auth?.user)    
    const [status, setStatus] = useState(1);
    const [chargesData, setChargesData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const userId = useSelector(state => state?.auth?.user?.userId);
    const [charges, setCharges] = useState(null);
    const token = useSelector((state) => state.auth.currentUserToken);
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    const columns = [
        { name: "Sr No.", accessor: "index", class: "text-center" },
        { name: "Name", accessor: "name", class: "text-center px-1" },
        { name: "Fees", accessor: "fees", class: "py-3 text-center px-1" },
  ...(user?.RoleId !== 5? 
        [{ name: "Actions", accessor: "actions", class: "py-3 text-center px-1" }]:[])
    ];

    const renderRow = (item, index) => (
        <tr key={index} className="border-bottom text-center">
            <td className="px-2 text-center lh-1">{index + 1}</td>
            <td className="py-3 px-2">{item?.fees_name}</td>
            <td className="py-3 px-2">{item.fees_amount ?? "0"}</td>

            {user.RoleId !== 5 &&
            <td>
                <FiEdit2 style={{ height: "23px", width: "23px", cursor: "pointer" }} onClick={() => {
                    setStatus(0);
                    setCharges(item);
                    handleShowModal();
                }} />
                <span className="ps-3"></span>
                <RiDeleteBinLine
                    style={{ height: "25px", width: "25px", cursor: "pointer" }}
                    onClick={() => handleDeleteCharges(item.fees_id)}
                />
            </td>

}
        </tr>
    );

    const fetchChargesData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/fees/getcharges`,config);

            setChargesData(response?.data?.data);
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        fetchChargesData();
    }, []);


    const handleAddCharges = async (chargeData) => {
        try {
            const data = {
                fees_name: chargeData.name,
                fees_amount: chargeData.fees,
                created_by: userId
            };
            await axios.post(`${process.env.REACT_APP_API_URL}/fees/addcharges`, data,config);
            fetchChargesData();
            handleCloseModal();
            toast.success("Added successfully");
        } catch (error) {
            console.error(error);
        }
    };

    const handleupdateCharges = async (chargeData) => {
        try {

           const data = {
                fees_id: charges.fees_id,
                fees_name: chargeData.name,
                fees_amount: chargeData.fees,
            };

            await axios.post(`${process.env.REACT_APP_API_URL}/fees/updatedcharges`, data,config);
            fetchChargesData();
            handleCloseModal();
            toast.success("Updated successfully");
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteCharges = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/fees/deletecharges/${id}`,config);
            fetchChargesData();
            toast.success("Deleted successfully");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="py-4">
                <div className="fw-semibold fs-5">
                    <span className="px-3">{user?.RoleId == 5 ? "Charges":"Add Charges"}</span>
                </div>
                <div className="d-flex justify-content-end gap-2">

                    {user.RoleId !== 5 &&
                    <CommanButton
                        label="+ Add Charges"
                        className="p-1 px-4 fw-semibold me-2"
                        style={{ borderRadius: "7px", fontSize: "14px", height: "40px" }}
                        onClick={() => {
                            setStatus(1);
                            setCharges(null);
                            handleShowModal();
                        }}
                    />
                }
                </div>
                <div className="px-3 py-4">
                    <div>
                        <CommonTable
                            minimumWidth={"700px"}
                            headers={columns}
                            bodyData={chargesData}
                            renderRow={renderRow}
                            title={"Charges Information"}
                        />
                    </div>
                    {chargesData.length > 0 && (
                        <NewCommonPagination
                            currentPage={1} // You need to manage this state
                            limitPerPage={10} // Set appropriate value
                            totalRecords={chargesData.length}
                            setCurrentPage={() => { }} // Update accordingly
                        />
                    )}
                </div>

                <AddChargesModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    handleBedSubmit={handleAddCharges}
                    charges={charges}
                    openStatus={status}
                    handleupdate={handleupdateCharges}
                />
            </div>
        </>
    );
}

export default AddCharges;
