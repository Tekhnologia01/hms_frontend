import { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import CommonTable from "../../components/common/table/CommonTable";
import NewCommonPagination from "../../components/common/pagination/NewCommonPagination";
import axios from "axios";
import CommanButton from "../../components/common/form/commonButtton";
import AddRoom from "./AddRoom";
import AddBed from "./AddBed";
import { useSelector } from "react-redux";
import DeleteConfirmationModal from "../../components/common/DeleteModal";
import { toast } from "react-toastify";

function RoomInfo() {
    const [status, setStatus] = useState(1);
    const { role } = useSelector(state => state?.auth?.user)
    const [cardState, setCardState] = useState("Room");
    const [currentPage, setCurrentPage] = useState(1);
    const [limitPerPage] = useState(10);
    const [doctors, setDoctors] = useState([]);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState('');
    const [deleteItem, setDeleteItem] = useState();
    const [userCount, setUserCount] = useState({});
    const [showModalRoom, setShowModalRoom] = useState(false);
    const handleShowModalRoom = () => setShowModalRoom(true);
    const handleCloseModalRoom = () => setShowModalRoom(false);
    const [showModalBed, setShowModalBed] = useState(false);
    const handleShowModalBed = () => setShowModalBed(true);
    const handleCloseModalBed = () => setShowModalBed(false);
    const userId = useSelector(state => state?.auth?.user?.userId);
    const [bed, setBed] = useState(null)
    const [room, setRoom] = useState(null)

    const [pagination, setpagination] = useState()

    const token = useSelector((state) => state.auth.currentUserToken);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    ////////////////////////////////FetchData()///////////////////////////////
    const fetchdata = async () => {
        try {
            let endpoint = `${process.env.REACT_APP_API_URL}/roombed/getbedinfo?page=${currentPage}&limit=${limitPerPage}`;
            if (cardState === "Occupied") {
                endpoint = `${process.env.REACT_APP_API_URL}/roombed/getbedinfo?status=occupied`;
            } else if (cardState === "Available") {
                endpoint = `${process.env.REACT_APP_API_URL}/roombed/getbedinfo?status=available`;
            } else if (cardState === "Room") {
                endpoint = `${process.env.REACT_APP_API_URL}/roombed/getroom`;
            } else if (cardState === "Bed") {
                endpoint = `${process.env.REACT_APP_API_URL}/roombed/getbedinfo?page=${currentPage}&limit=${limitPerPage}`;
            }
            const response = await axios.get(endpoint, config);
            setpagination(response?.data)
            setDoctors(response?.data?.data || []);
        } catch (err) {
            toast.error("Error fetching data");
        }
    };

    useEffect(() => {
        fetchdata();
    }, [currentPage, cardState]);


    const fetchCount = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/roombed/getroombedcount`, config)
            setUserCount(response?.data?.data);
        } catch (err) {
            toast.error("Error fetching user count");
        }
    }

    ////////////////////////////////FetchCount///////////////////////////////
    useEffect(() => {
        fetchCount()
    }, [])

    ////////////////////////////////TableCss///////////////////////////////
    const cardStyle = {
        width: "225px",
        height: "120px",
        "box-shadow": "0px 4px 4px 0px #00000040",
        "border-radius": "12px",
        display: "flex",
        "flex-direction": "column",
        "align-items": "center",
        "justify-content": "center",
        cursor: "pointer"
    }

    const headingStyle = {
        color: "#101828",
        "font-size": "20px",
        "font-weight": "500",
        "line-height": "6px",
        "margin-top": "35px"
    }

    const numberStyle = {
        color: "#1E959B",
        "font-weight": "500",
        "font-size": "35px",
    }
    ////////////////////////////////TableData for Bed///////////////////////////////
    const columns = [
        { name: "Bed No.", accessor: "Name", class: "text-center" },
        { name: "Room No.", accessor: "joining_date", class: "text-center px-1" },
        { name: "Room Type", accessor: "degree", class: "py-3 text-center px-1" },
        { name: "Status", accessor: "consultancy_fee", class: "py-3 text-center px-1" },
        ...(role === "Admin"
            ? [{ name: "Actions", accessor: "actions", class: "py-3 text-center px-1" }]
            : [])
    ];

    const renderRow = (item, index) => (
        <tr key={item.index} className="border-bottom text-center">
            <td className="px-2 text-scenter lh-1">{item.bed_name}</td>
            <td className="py-3 px-2">{item?.room_name}</td>
            <td className="py-3 px-2">{item.room_type ?? "-"}</td>
            <td className="py-3 px-2">{item.bed_status ?? "-"}</td>
            {
                role == "Admin" &&

                <td>
                    <FiEdit2 style={{ height: "23px", width: "23px", cursor: 'pointer' }} onClick={() => {
                        setStatus(0)
                        setBed(item);
                        handleShowModalBed(true);

                    }} />
                    <span className="ps-3"></span>
                    <RiDeleteBinLine style={{ height: "25px", width: "25px", cursor: 'pointer' }} onClick={() => {
                        setDeleteItem(item);
                        setDeleteMessage('Do you really want to delete this bed?');
                        setShowDeleteConfirmation(true);
                    }} />
                </td>

            }
        </tr>
    );

    ////////////////////////////////TableData for Room///////////////////////////////

    const columnsRoom = [
        { name: "Sr.No.", accessor: "Name", class: " text-center " },
        { name: "Room Name", accessor: "room_name", class: "py-3 text-center px-1" },
        { name: "Room Type", accessor: "room_type", class: "py-3 text-center px-1" },
        { name: "Max Bed", accessor: "room_type", class: "py-3 text-center px-1" },

        ...(role === "Admin"
            ? [{ name: "Actions", accessor: "actions", class: "py-3 text-center px-1" }]
            : [])];

    const renderRowRoom = (item, index) => (
        <tr key={item.index} className="border-bottom text-center">
            <td className="px-2 text-scenter lh-1">{index + 1}</td>
            <td className="px-2 text-scenter lh-1">{item.room_name}</td>
            <td className="py-3 px-2">{item?.room_type}</td>
            <td className="py-3 px-2">{item.max_bed ?? "-"}</td>
            {
                role === "Admin" &&
                <td>
                    <FiEdit2 style={{ height: "23px", width: "23px", cursor: 'pointer' }} onClick={() => {
                        setStatus(0)
                        setRoom(item);
                        handleShowModalRoom(true);

                    }} />
                    <span className="ps-3"></span>
                    <RiDeleteBinLine style={{ height: "25px", width: "25px", cursor: 'pointer' }} onClick={() => {
                        setDeleteItem(item);
                        setDeleteMessage('Do you really want to delete this record?');
                        setShowDeleteConfirmation(true);
                    }} />
                </td>
            }
        </tr>
    );

    ////////////////////////////////TableData for Available///////////////////////////////

    const columnsAvailable = [
        { name: "Sr.No.", accessor: "Name", class: " text-center " },
        { name: "Bed Name", accessor: "bed_no", class: "text-center px-1" },
        { name: "Room Name", accessor: "room_Name", class: "py-3 text-center px-1" },
        { name: "Room Type", accessor: "room_type", class: "py-3 text-center px-1" },
        { name: "Bed Status", accessor: "room_type", class: "py-3 text-center px-1" },
    ];
    const renderRowAvailable = (item, index) => (
        <tr key={item.index} className="border-bottom text-center">
            <td className="px-2 text-scenter lh-1">{index + 1}</td>
            <td className="px-2 text-scenter lh-1">{item.bed_name}</td>
            <td className="py-3 px-2">{item?.room_name}</td>
            <td className="py-3 px-2">{item.room_type ?? "-"}</td>
            <td className="py-3 px-2">{item.bed_status ?? "-"}</td>
        </tr>
    );


    const data = doctors?.data?.filter((bed) => bed.bed_status == "available")
    const data1 = doctors?.data?.filter((bed) => bed.bed_status == "occupied")


    ////////////////////////////////Add For Bed///////////////////////////////
    const handleAddBed = async (bedData) => {
        try {
            const data = {
                "bed_name": bedData.bedName,
                "room_id": bedData.roomId
            }
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/roombed/addbed/${userId}`, data, config)
            if (response?.data?.status) {
                fetchdata();
                fetchCount();
                toast.success("Bed added successfull!");
                handleCloseModalBed()
            } else {
                toast.error("Error while adding bed!");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message ? error?.response?.data?.message : "Error while adding bed!");
        }
    }

    ////////////////////////////////Add For Room///////////////////////////////

    const handleAddRoom = async (RoomData) => {
        try {
            const data = {
                "room_type": RoomData.room_type_id,
                "room_name": RoomData.room_name,
                "max_bed": RoomData.max_bed
            }
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/roombed/addroom/${userId}`, data, config)
            if (response?.data?.status) {
                fetchdata();
                fetchCount();
                toast.success("Room added successfull!");
                handleCloseModalRoom()
            } else {
                toast.error("Error while adding room!");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message ? error?.response?.data?.message : "Error while adding room!");
        }
    }

    ////////////////////////////////Update For Bed///////////////////////////////

    const handleupdateBed = async (bedData) => {
        try {
            const data = {
                "bed_name": bedData.bedName,
                "bed_id": bedData.bedId,
                "room_id": bedData.roomId
            }
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/roombed/updatebed`, data, config)
            if (response?.data?.status) {
                fetchdata();
                fetchCount();
                toast.success("Bed updated successfull!");
                handleCloseModalBed()
            } else {
                toast.error("Error while updating bed!");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message ? error?.response?.data?.message : "Error while updating bed!");
        }
    }

    ////////////////////////////////Add For Room///////////////////////////////

    const handleupdateRoom = async (values) => {
        try {
            const data = {
                "room_id": room?.room_id,
                "room_type_id": values?.room_type_id,
                "room_name": values?.room_name,
                "max_bed": values?.max_bed
            }
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/roombed/updateroom/${room?.room_id}`, data, config)
            if (response.data?.status) {
                fetchdata();
                fetchCount();
                toast.success("Room updated successfull!");
                handleCloseModalRoom()
            } else {
                toast.error("Error while updating bed!");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message ? error?.response?.data?.message : "Error while updating room");
        }
    }

    ////////////////////////////////Delete Room///////////////////////////////
    const handleDeleteRoom = async () => {
        try {
            if (deleteItem) {
                const response = await axios.delete(`${process.env.REACT_APP_API_URL}/roombed/deleteroom/${deleteItem?.room_id}`, config)
                if (response.data?.status) {
                    fetchdata();
                    fetchCount();
                    toast.success("Room deleted successfully!");

                } else {
                    toast.error("Error while deleting room!");
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message ? error?.response?.data?.message : "Error while deleting room!");
        }
    }

    ////////////////////////////////Delete Bed///////////////////////////////

    const handleDeleteBed = async () => {
        try {
            if (deleteItem) {
                if (deleteItem?.bed_id) {
                    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/roombed/deletebed/${deleteItem?.bed_id}`, config)
                    if (response.data?.status) {
                        fetchdata();
                        fetchCount();
                        toast.success("Bed deleted successfully!");

                    } else {
                        toast.error("Error while deleting bed!");
                    }
                } else {
                    toast.error("Bed not found!");
                }

            }
        } catch (error) {
            toast.error(error?.response?.data?.message ? error?.response?.data?.message : "Error while deleting bed!");
        }
    }

    const handleDelete = async () => {
        if (cardState === "Room") {
            await handleDeleteRoom()
        } else if (cardState === "Bed") {
            await handleDeleteBed()
        }
        setShowDeleteConfirmation(false);
    }

    return (
        <>
            <div className="py-4">
                <div className="fw-semibold fs-5">
                    <span className="px-3">Add Room Bed</span>
                </div>
                {
                    role == "Admin" &&
                    <div className="d-flex justify-content-end gap-2">

                        {cardState === "Room" &&
                            <CommanButton
                                label="+ Add Room"
                                className="p-1 px-4 fw-semibold me-2"
                                style={{ borderRadius: "7px", fontSize: "14px", height: "40px" }}
                                onClick={() => {
                                    setStatus(1)
                                    handleShowModalRoom()
                                }}
                            />
                        }

                        {
                            cardState === "Bed" &&
                            <CommanButton
                                label=" + Add Bed"
                                className="p-1 px-4 fw-semibold me-2"
                                style={{ borderRadius: "7px", fontSize: "14px", height: "40px" }}
                                onClick={() => {
                                    setStatus(1)
                                    handleShowModalBed()
                                }
                                }
                            />
                        }
                    </div>

                }
                <div className="cards-container d-flex align-items-center justify-content-start mt-3 ms-3 gap-4 flex-wrap">
                    <div style={cardStyle} onClick={() => { setCardState("Room") }}  >
                        <p style={headingStyle}>Rooms</p>
                        <p style={numberStyle}>{userCount?.totalRooms ? userCount?.totalRooms : 0}</p>
                    </div>
                    <div style={cardStyle} onClick={() => { setCardState("Bed") }} >
                        <p style={headingStyle}>Beds</p>
                        <p style={numberStyle}>{userCount?.totalBeds ? userCount?.totalBeds : 0}</p>
                    </div>

                    <div style={cardStyle} onClick={() => { setCardState("Occupied") }}>
                        <p style={headingStyle}>Occupied Bed</p>
                        <p style={numberStyle}>{userCount?.occupiedBeds ? userCount?.occupiedBeds : 0}</p>
                    </div>
                    <div style={cardStyle} onClick={() => { setCardState("Available") }}  >
                        <p style={headingStyle}>Available Bed</p>
                        <p style={numberStyle}>{userCount?.availableBeds ? userCount?.availableBeds : 0}</p>
                    </div>
                </div>

                <div className="px-3 py-4">

                    {cardState === "Bed" &&
                        doctors?.data?.length > 0 && <div>
                            <CommonTable minimumWidth={"700px"} headers={columns} bodyData={doctors?.data} renderRow={renderRow} title={"Bed Information"} />
                            <NewCommonPagination currentPage={currentPage} limitPerPage={limitPerPage} totalRecords={doctors?.pagination[0]?.total_records} setCurrentPage={setCurrentPage} />
                        </div>
                    }
                    {
                        cardState === "Room" && doctors?.length > 0 && (

                            <div>
                                <CommonTable
                                    minimumWidth={"700px"}
                                    headers={columnsRoom}
                                    bodyData={doctors[0]}
                                    renderRow={renderRowRoom}
                                    title={"Room Information"}
                                />
                            </div>
                        )
                    }
                    {
                        cardState === "Available" && data?.length > 0 && (
                            <div>
                                <CommonTable
                                    minimumWidth={"700px"}
                                    headers={columnsAvailable}
                                    bodyData={data}
                                    renderRow={renderRowAvailable}
                                    title={"Available Information"}
                                />
                            </div>
                        )
                    }
                    {cardState === "Occupied" && data1?.length > 0 && (
                        <div>
                            <CommonTable
                                minimumWidth={"700px"}
                                headers={columnsAvailable}
                                bodyData={data1}
                                renderRow={renderRowAvailable}
                                title={"Occupied Information"}
                            />
                        </div>

                    )
                    }
                </div>
                <AddRoom show={showModalRoom} handleClose={handleCloseModalRoom} handleRoomSubmit={handleAddRoom} room={room} openStatus={status} handleupdateroom={handleupdateRoom} />
                <AddBed show={showModalBed} handleClose={handleCloseModalBed} handleBedSubmit={handleAddBed} bed={bed} openStatus={status} handleupdate={handleupdateBed} />
                <DeleteConfirmationModal
                    show={showDeleteConfirmation}
                    handleClose={() => setShowDeleteConfirmation(false)}
                    handleConfirm={handleDelete}
                    message={deleteMessage}
                />

            </div>
        </>
    )
}

export default RoomInfo;
