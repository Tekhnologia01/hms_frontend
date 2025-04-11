// import React, { useEffect, useState } from "react";
// import { Col, Modal, Row } from "react-bootstrap";
// import { FaTimes } from "react-icons/fa";
// import InputBox from "../../../components/common/form/inputbox";

// import CommanButton from "../../../components/common/form/commonButtton";
// import axios from "axios";
// import SelectBox from "../../../components/common/form/selectBox/SelectBox";

// const EditClassModel = ({ show, handleClose, handleCallback, rowData }) => {
//     const closeIconStyle = {
//         position: "absolute",
//         top: "20px",
//         right: "30px",
//         fontSize: "20px",
//         cursor: "pointer",
//         color: "#999",
//         zIndex: 10, // Ensure it appears above content
//     };


//     const [formData, setFormData] = useState({
//         billing_and_charges_no: "",
//         class_name: "",
//         bed: "",
//         nursing: "",
//         doctor: "",
//         rmo: "",
//         bmw: "",
//         total: "",
//         deposit: ""
//     })

//     useEffect(() => {
//         setFormData({
//             billing_and_charges_no: rowData?.billing_and_charges_no || "",
//             class_name: rowData?.class_name || "",
//             bed: rowData?.bed || "",
//             nursing: rowData?.nursing || "",
//             doctor: rowData?.doctor || "",
//             rmo: rowData?.rmo || "",
//             bmw: rowData?.bmw || "",
//             total: rowData?.total || "",
//             deposit: rowData?.deposit || ""
//         })
//     }, [handleClose]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         console.log(name, value);

//         setFormData({
//             ...formData,
//             [name]: value,
//         });

//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         handleCallback(formData);
//     }


//     return (
//         <Modal
//             show={show}
//             onHide={handleClose}
//             size="lg"
//             dialogClassName="custom-modal"
//         >
//             <div className="pe-5 ps-4 pt-3 pb-0">
//                 <FaTimes style={closeIconStyle} onClick={handleClose} />
//                 <div className="fw-semibold fs-5">Billing & Charges</div>
//             </div>

//             <hr></hr>

//             <div className="pe-4 ps-4 pb-5 pt-3">
//                 {/* Close Button */}
//                 {/* <InputBox
//                     label={"Class Name"}
//                     placeholder="Class Name here..."
//                     isRequired={true}
//                     className='fs-5'
//                     value={formData?.class_name}
//                     onChange={handleChange}
//                     name="class_name"
//                 /> */}


// <label className="fw-semibold pb-1 pt-1">Room Type<span style={{ color: "red" }}> *</span></label>
//                         <SelectBox
//                             name="class_name"
//                             defaultValue="Select Class"
//                             value={formData.class_name}
//                             options={roomType.map((type) => ({
//                                 label: type.room_type,
//                                 option: type.room_type_id,
//                             }))}
//                             onChange={handleChange}
//                         />

                
//                 <Row className="mt-2 m-0">
//                     <Col lg={6}>
//                         <InputBox
//                             label={"Bed"}
//                             placeholder="Bed"
//                             className='fs-5'
//                             value={formData?.bed}
//                             onChange={handleChange}
//                             name="bed"
//                         />
//                     </Col>
//                     <Col lg={6}>
//                         <InputBox
//                             label={"Nursing"}
//                             placeholder="Nursing"
//                             className='fs-5'
//                             value={formData?.nursing}
//                             onChange={handleChange}
//                             name="nursing"
//                         />
//                     </Col>
//                 </Row>
//                 <Row className="mt-2 m-0">
//                     <Col lg={6}>
//                         <InputBox
//                             label={"Doctor"}
//                             placeholder="Select patient source"
//                             className='fs-5'
//                             value={formData?.doctor}
//                             onChange={handleChange}
//                             name="doctor"
//                         />
//                     </Col>
//                     <Col lg={6}>
//                         <InputBox
//                             label={"RMO"}
//                             placeholder="Select patient source"
//                             className='fs-5'
//                             value={formData?.rmo}
//                             onChange={handleChange}
//                             name="rmo"
//                         />
//                     </Col>
//                 </Row>
//                 <Row className="mt-2 m-0">
//                     <Col lg={6}>
//                         <InputBox
//                             label={"BMW"}
//                             placeholder="Select patient source"
//                             className='fs-5'
//                             value={formData?.bmw}
//                             onChange={handleChange}
//                             name="bmw"
//                         />
//                     </Col>
//                     <Col lg={6}>
//                         <InputBox
//                             label={"Total"}
//                             placeholder="Select patient source"
//                             className='fs-5'
//                             value={formData?.total}
//                             onChange={handleChange}
//                             name="total"
//                         />
//                     </Col>
//                 </Row>


//                 <Row className="mt-2 m-0">
//                     <Col lg={6}>
//                         <InputBox
//                             label={"Deposit"}
//                             placeholder="Select patient source"
//                             className='fs-5'
//                             value={formData?.deposit}
//                             onChange={handleChange}
//                             name="deposit"
//                         />
//                     </Col>
//                 </Row>


//                 <div className="d-flex justify-content-end pt-4">
//                     <CommanButton
//                         label="Save Changes"
//                         variant="#7B3F0080"
//                         className="px-4 p-2 fs-6 fw-semibold"
//                         style={{ borderRadius: "8px" }}
//                         onClick={handleSubmit} // Close modal when clicking the button
//                     />
//                 </div>
//             </div>
//         </Modal>
//     );
// };

// export default EditClassModel;

// import React, { useEffect, useState } from "react";
// import { Col, Modal, Row } from "react-bootstrap";
// import { FaTimes } from "react-icons/fa";
// import InputBox from "../../../components/common/form/inputbox";
// import CommanButton from "../../../components/common/form/commonButtton";
// import SelectBox from "../../../components/common/form/selectBox/SelectBox";

// const roomType = [
//   { room_type_id: 1, room_type: "General Ward" },
//   { room_type_id: 2, room_type: "Private Room" },
//   { room_type_id: 3, room_type: "ICU" },
//   { room_type_id: 4, room_type: "Deluxe Suite" },
// ];

// const EditClassModel = ({ show, handleClose, handleCallback, rowData }) => {
//   const closeIconStyle = {
//     position: "absolute",
//     top: "20px",
//     right: "30px",
//     fontSize: "20px",
//     cursor: "pointer",
//     color: "#999",
//     zIndex: 10,
//   };

//   const [formData, setFormData] = useState({
//     billing_and_charges_no: "",
//     class_name: "", // This will now store room_type_id
//     bed: "",
//     nursing: "",
//     doctor: "",
//     rmo: "",
//     bmw: "",
//     total: "",
//     deposit: "",
//   });

//   // Update formData when rowData changes
//   useEffect(() => {
//     if (rowData) {
//       // Find the room_type_id based on rowData.class_name
//       const selectedRoom = roomType.find(
//         (type) => type.room_type === rowData.class_name
//       );
//       setFormData({
//         billing_and_charges_no: rowData.billing_and_charges_no || "",
//         class_name: selectedRoom ? selectedRoom.room_type_id : "", // Store the ID
//         bed: rowData.bed || "",
//         nursing: rowData.nursing || "",
//         doctor: rowData.doctor || "",
//         rmo: rowData.rmo || "",
//         bmw: rowData.bmw || "",
//         total: rowData.total || "",
//         deposit: rowData.deposit || "",
//       });
//     }
//   }, [rowData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     console.log(name, value);
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Optionally, you can map the class_name (room_type_id) back to room_type for display purposes in the callback
//     const selectedRoom = roomType.find(
//       (type) => type.room_type_id === parseInt(formData.class_name)
//     );
//     const submitData = {
//       ...formData,
//       class_name_display: selectedRoom ? selectedRoom.room_type : "", // Optional: send display name
//     };


// console.log(submitData)
//     // handleCallback(submitData); // Pass updated formData with ID
//     // handleClose();
//   };

//   return (
//     <Modal show={show} onHide={handleClose} size="lg" dialogClassName="custom-modal">
//       <div className="pe-5 ps-4 pt-3 pb-0">
//         <FaTimes style={closeIconStyle} onClick={handleClose} />
//         <div className="fw-semibold fs-5">Billing & Charges</div>
//       </div>

//       <hr />

//       <div className="pe-4 ps-4 pb-5 pt-3">
//         <label className="fw-semibold pb-1 pt-1">
//           Room Type<span style={{ color: "red" }}> *</span>
//         </label>
//         <SelectBox
//           name="class_name"
//           defaultValue="Select Class"
//           value={formData.class_name} // This is now the room_type_id
//           options={roomType.map((type) => ({
//             label: type.room_type, // Display the room type name
//             option: type.room_type_id, // Use the ID as the value
//           }))}
//           onChange={handleChange}
//         />

//         <Row className="mt-2 m-0">
//           <Col lg={6}>
//             <InputBox
//               label={"Bed"}
//               placeholder="Bed"
//               className="fs-5"
//               value={formData.bed}
//               onChange={handleChange}
//               name="bed"
//             />
//           </Col>
//           <Col lg={6}>
//             <InputBox
//               label={"Nursing"}
//               placeholder="Nursing"
//               className="fs-5"
//               value={formData.nursing}
//               onChange={handleChange}
//               name="nursing"
//             />
//           </Col>
//         </Row>
//         <Row className="mt-2 m-0">
//           <Col lg={6}>
//             <InputBox
//               label={"Doctor"}
//               placeholder="Doctor"
//               className="fs-5"
//               value={formData.doctor}
//               onChange={handleChange}
//               name="doctor"
//             />
//           </Col>
//           <Col lg={6}>
//             <InputBox
//               label={"RMO"}
//               placeholder="RMO"
//               className="fs-5"
//               value={formData.rmo}
//               onChange={handleChange}
//               name="rmo"
//             />
//           </Col>
//         </Row>
//         <Row className="mt-2 m-0">
//           <Col lg={6}>
//             <InputBox
//               label={"BMW"}
//               placeholder="BMW"
//               className="fs-5"
//               value={formData.bmw}
//               onChange={handleChange}
//               name="bmw"
//             />
//           </Col>
//           <Col lg={6}>
//             <InputBox
//               label={"Total"}
//               placeholder="Total"
//               className="fs-5"
//               value={formData.total}
//               onChange={handleChange}
//               name="total"
//             />
//           </Col>
//         </Row>
//         <Row className="mt-2 m-0">
//           <Col lg={6}>
//             <InputBox
//               label={"Deposit"}
//               placeholder="Deposit"
//               className="fs-5"
//               value={formData.deposit}
//               onChange={handleChange}
//               name="deposit"
//             />
//           </Col>
//         </Row>

//         <div className="d-flex justify-content-end pt-4">
//           <CommanButton
//             label="Save Changes"
//             variant="#7B3F0080"
//             className="px-4 p-2 fs-6 fw-semibold"
//             style={{ borderRadius: "8px" }}
//             onClick={handleSubmit}
//           />
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default EditClassModel;



import React, { useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import InputBox from "../../../components/common/form/inputbox";
import CommanButton from "../../../components/common/form/commonButtton";
import SelectBox from "../../../components/common/form/selectBox/SelectBox";
import axios from "axios";



const EditClassModel = ({ show, handleClose, handleCallback, rowData }) => {
  const closeIconStyle = {
    position: "absolute",
    top: "20px",
    right: "30px",
    fontSize: "20px",
    cursor: "pointer",
    color: "#999",
    zIndex: 10,
  };



  const [roomType,setRoomType]=useState([])
  const [formData, setFormData] = useState({
    billing_and_charges_no: "",
    class_name: "",
    bed: "",
    nursing: "",
    doctor: "",
    rmo: "",
    bmw: "",
    total: "",
    deposit: "",
  });

  // Update formData when rowData changes
  useEffect(() => {
    if (rowData) {
      const selectedRoom = roomType.find(
        (type) => type.room_type === rowData.class_name
      );
      setFormData({
        billing_and_charges_no: rowData.billing_and_charges_no || "",
        class_name: rowData?.class_name || "",
        bed: rowData.bed || "",
        nursing: rowData.nursing || "",
        doctor: rowData.doctor || "",
        rmo: rowData.rmo || "",
        bmw: rowData.bmw || "",
        total: rowData.total || "",
        deposit: rowData.deposit || "",
      });
    }
  }, [rowData]);

  useEffect(() => {
    const calculateTotal = () => {
      const fields = ["bed", "nursing", "doctor", "rmo", "bmw"];
      const total = fields.reduce((sum, field) => {
        const value = parseFloat(formData[field]) || 0; // Convert to number, default to 0 if NaN
        return sum + value;
      }, 0);
      setFormData((prev) => ({
        ...prev,
        total: total.toString(), // Convert back to string for input compatibility
      }));
    };
    calculateTotal();
  }, [formData.bed, formData.nursing, formData.doctor, formData.rmo, formData.bmw]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };



  useEffect(() => {
    const fetchRoomTypes = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/roombed/getroomtype`);
            setRoomType(response?.data?.data || []);
        } catch (err) {
            console.log(err);
        }
    };
    fetchRoomTypes();
}, []);


  
  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedRoom = roomType.find(
      (type) => type.room_type_id === parseInt(formData.class_name)
    );
    const submitData = {
      ...formData,
      class_name_display: selectedRoom ? selectedRoom.room_type : "",
    };


    console.log(submitData)
    handleCallback(submitData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" dialogClassName="custom-modal">
      <div className="pe-5 ps-4 pt-3 pb-0">
        <FaTimes style={closeIconStyle} onClick={handleClose} />
        <div className="fw-semibold fs-5">Billing & Charges</div>
      </div>

      <hr />

      <div className="pe-4 ps-4 pb-5 pt-3">
        <label className="fw-semibold pb-1 pt-1">
          Room Type<span style={{ color: "red" }}> *</span>
        </label>
        <SelectBox
          name="class_name"
          defaultValue="Select Class"
          value={formData.class_name}
          options={roomType.map((type) => ({
            label: type.room_type,
            option: type.room_type_id,
          }))}
          onChange={handleChange}
        />

        <Row className="mt-2 m-0">
          <Col lg={6}>
            <InputBox
              label={"Bed"}
              placeholder="Bed"
              className="fs-5"
              value={formData.bed}
              onChange={handleChange}
              name="bed"
              type="number" // Ensure numeric input
            />
          </Col>
          <Col lg={6}>
            <InputBox
              label={"Nursing"}
              placeholder="Nursing"
              className="fs-5"
              value={formData.nursing}
              onChange={handleChange}
              name="nursing"
              type="number"
            />
          </Col>
        </Row>
        <Row className="mt-2 m-0">
          <Col lg={6}>
            <InputBox
              label={"Doctor"}
              placeholder="Doctor"
              className="fs-5"
              value={formData.doctor}
              onChange={handleChange}
              name="doctor"
              type="number"
            />
          </Col>
          <Col lg={6}>
            <InputBox
              label={"RMO"}
              placeholder="RMO"
              className="fs-5"
              value={formData.rmo}
              onChange={handleChange}
              name="rmo"
              type="number"
            />
          </Col>
        </Row>
        <Row className="mt-2 m-0">
          <Col lg={6}>
            <InputBox
              label={"BMW"}
              placeholder="BMW"
              className="fs-5"
              value={formData.bmw}
              onChange={handleChange}
              name="bmw"
              type="number"
            />
          </Col>
          <Col lg={6}>
            <InputBox
              label={"Total"}
              placeholder="Total (Auto-calculated)"
              className="fs-5"
              value={formData.total}
              name="total"
              type="number"
              disabled // Make it read-only since it's calculated
            />
          </Col>
        </Row>
        <Row className="mt-2 m-0">
          <Col lg={6}>
            <InputBox
              label={"Deposit"}
              placeholder="Deposit"
              className="fs-5"
              value={formData.deposit}
              onChange={handleChange}
              name="deposit"
              type="number"
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-end pt-4">
          <CommanButton
            label="Save Changes"
            variant="#7B3F0080"
            className="px-4 p-2 fs-6 fw-semibold"
            style={{ borderRadius: "8px" }}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditClassModel;