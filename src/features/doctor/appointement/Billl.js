import React, { useEffect, useState } from "react";
import { Col, Modal, Row, Table } from "react-bootstrap";
import { FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import CommanButton from "../../../components/common/form/commonButtton";
import InputBox from "../../../components/common/form/inputbox";
import SelectBox from "../../../components/common/form/selectBox/SelectBox";
import axios from "axios";
import { useSelector } from "react-redux";

const Bill = ({ show, handleClose, patientName, callbackFun, consultationFee }) => {
  const [formData, setFormData] = useState({
    bill_total_amount: 0,
    chargesList: [],
    selectedCharge: "",
    quantity: "",
  });

  const [chargesData, setChargesData] = useState([]);
  const [chargesDataTable, setChargesDataTable] = useState([]); const [errors, setErrors] = useState({});

  const token = useSelector((state) => state.auth.currentUserToken);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }


  useEffect(() => {
    const fetchCharges = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/fees/getcharges`,config);
        setChargesData(response?.data?.data.data || []);
      } catch (error) {
        console.error("Error fetching charges:", error);
      }
    };
    fetchCharges();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const addCharges = () => {
    const { selectedCharge, quantity, chargesList } = formData;

    if (!selectedCharge) {
      setErrors((prevErrors) => ({ ...prevErrors, selectedCharge: "Select a billing item" }));
      return;
    }
    if (!quantity || isNaN(quantity) || quantity <= 0) {
      setErrors((prevErrors) => ({ ...prevErrors, quantity: "Enter a valid quantity" }));
      return;
    }

    const selectedChargeData = chargesData.find((charge) => charge.fees_id === selectedCharge);

    if (selectedChargeData) {
      const isAlreadyAdded = chargesList.some((item) => item.chargeId === selectedCharge);

      if (!isAlreadyAdded) {
        const newCharge = {
          chargeId: selectedCharge,
          billingType: selectedChargeData.fees_name,
          amount: selectedChargeData.fees_amount,
          quantity: parseInt(quantity, 10),
          total: selectedChargeData.fees_amount * parseInt(quantity, 10),
        };

        setFormData((prevData) => ({
          ...prevData,
          chargesList: [...prevData.chargesList, newCharge],
          selectedCharge: "",
          quantity: "",
        }));

        setChargesDataTable((prevData) => [...prevData, newCharge]);
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, selectedCharge: "This charge is already added" }));
      }
    }

    setErrors({});
  };

  const removeCharge = (chargeId) => {
    setFormData((prevData) => ({
      ...prevData,
      chargesList: prevData.chargesList.filter((charge) => charge.chargeId !== chargeId),
    }));
    setChargesDataTable((prevData) => prevData.filter((charge) => charge.chargeId !== chargeId));
  };

  const handleSubmit = () => {
    if (!consultationFee) {
      setErrors({ chargesList: "Add at least one billing item" });
      return;
    }

    callbackFun(formData);
    handleClose();
    setFormData({ bill_total_amount: 0, chargesList: [], selectedCharge: "", quantity: "" });
    setChargesDataTable([]);
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        handleClose();
        setFormData({ bill_total_amount: 0, chargesList: [], selectedCharge: "", quantity: "" });
        setErrors({});
        setChargesDataTable([]);
      }}
      size="lg"
      dialogClassName="custom-modal"
    >
      <div className="ps-4 pt-3">
        <FaTimes style={{ position: "absolute", top: "20px", right: "30px", cursor: "pointer" }} onClick={handleClose} />
        <div className="fw-bold fs-5">Billing</div>
      </div>

      <hr />

      <div className="pe-5 ps-5 pb-5 pt-3">
        <Row className="m-0">
          <Col>
            <InputBox label="Patient Name" placeholder="Enter name" isRequired value={patientName} name="patientName" disabled />
          </Col>
        </Row>

        <Row className="m-0 pt-2">
          <Col lg={6}>
            <label className="fw-semibold pt-2 pb-2">
              Select Billing Item
            </label>
            <SelectBox
              name="selectedCharge"
              value={formData.selectedCharge || ""}
              options={chargesData.map((charge) => ({ label: charge.fees_name, option: charge.fees_id }))}
              onChange={handleInputChange}
            />
            {errors.selectedCharge && <p className="text-danger">{errors.selectedCharge}</p>}
          </Col>

          <Col lg={5} className="pt-2">
            <InputBox label="Quantity" isRequired value={formData.quantity} name="quantity" onChange={handleInputChange} />
            {errors.quantity && <p className="text-danger">{errors.quantity}</p>}
          </Col>

          <Col lg={1} className="pt-5">
            <FaPlus
              style={{
                fontSize: "20px",
                cursor: "pointer",
                color: "#1D949A",
                borderRadius: "5px",
              }}
              onClick={addCharges}
            />
          </Col>
        </Row>

        <div className="fw-semibold pt-3 ps-2 pb-3">Billing Items</div>

        <div className="pt-2 text-center ps-2" style={{ overflowX: "auto" }}>
          <Table responsive="sm" className="bordered">
            <thead style={{ backgroundColor: "red", color: "white" }}>
              <tr>
                <th>Sr.No</th>
                <th>Billing Type</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td>{1}</td>
                <td>Consultant Fees</td>
                <td>1</td>
                <td>{consultationFee}</td>
                <td>{consultationFee}</td>
                <td>
                  
                </td>
              </tr>
              {consultationFee ? (
                chargesDataTable.map((charge, index) => (
                  <tr key={charge.chargeId}>
                    <td>{index + 1}</td>
                    <td>{charge.billingType}</td>
                    <td>{charge.quantity}</td>
                    <td>{charge.amount}</td>
                    <td>{charge.total}</td>
                    <td>
                      <FaTrash
                        style={{ fontSize: "16px", cursor: "pointer", color: "red" }}
                        onClick={() => removeCharge(charge.chargeId)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted">No billing items added</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        <div className="d-flex justify-content-end pt-4">
          <CommanButton label="Submit" className="ps-3 pe-3 p-2 fw-semibold" style={{ borderRadius: "5px" }} onClick={handleSubmit} />
        </div>
      </div>
    </Modal>
  );
};

export default Bill;

