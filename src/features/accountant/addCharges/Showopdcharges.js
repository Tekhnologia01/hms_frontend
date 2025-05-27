
import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";
import CommanButton from "../../../components/common/form/commonButtton";
import InputBox from "../../../components/common/form/inputbox";
import SelectBox from "../../../components/common/form/selectBox/SelectBox";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

const Showopdcharges = ({ patientName, consultationFee }) => {
  const { appo_id } = useParams();
  const [formData, setFormData] = useState({
    total_amount: 0,
    appo_id: appo_id,
    quantity: 1,
    selectedCharge: null,

  });

  const [chargesData, setChargesData] = useState([]);
  const [chargesDataTable, setChargesDataTable] = useState([]);
  const [opdChargesDataTable, setOpdChargesData] = useState([]);
  console.log(opdChargesDataTable, "opdChargesDataTable");
  const [errors, setErrors] = useState({});
  const token = useSelector((state) => state.auth.currentUserToken);
  const location = useLocation();
  const { appointmentData } = location.state || {};

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };


  const fetchCharges = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/fees/getcharges`, config);
      setChargesData(response?.data?.data.data || []);
    } catch (error) {
      console.error("Error fetching charges:", error);
    }
  };

  const fetchOpdCharges = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/fees/opdcharges?appo_id=${appo_id}`, config);
      setOpdChargesData(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching charges:", error);
    }
  };

  const removeCharge = async (id) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/fees/deleteopdcharges?opd_charge_id=${id}`, config);
      fetchOpdCharges();
      console.log("Charges deleted successfully:", response.data);
    } catch (error) {
      console.error("Error deleting charges:", error);
    }
  };

  useEffect(() => {
    fetchOpdCharges();
    fetchCharges();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Add a new charge to the table
  const addCharges = () => {
    // Validate inputs
    let newErrors = {};
    if (!formData.selectedCharge) {
      newErrors.selectedCharge = "Please select a billing item";
    }
    if (!formData.quantity || isNaN(formData.quantity) || formData.quantity <= 0) {
      newErrors.quantity = "Please enter a valid quantity";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Find the selected charge details
    const selectedCharge = chargesData.find((charge) => charge.fees_id === formData.selectedCharge);
    if (!selectedCharge) {
      setErrors((prev) => ({
        ...prev,
        selectedCharge: "Invalid billing item selected",
      }));
      return;
    }

    // Calculate total for the new charge
    const quantity = parseInt(formData.quantity);
    const amount = parseFloat(selectedCharge.fees_amount);
    const total = quantity * amount;

    // Create new charge object
    const newCharge = {
      chargeId: selectedCharge.fees_id,
      billingType: selectedCharge.fees_name,
      quantity: quantity,
      amount: amount,
      total: total,
    };

    // Update chargesDataTable and bill_total_amount
    setChargesDataTable((prev) => [...prev, newCharge]);
    setFormData((prev) => ({
      ...prev,
      bill_total_amount: prev.bill_total_amount + total,
      selectedCharge: "",
      quantity: "",
      chargesList: [...prev.chargesList, newCharge],
    }));

    // Clear errors
    setErrors({});
  };



  // Handle form submission
  const handleSubmit = async () => {

    try {
      let newErrors = {};
      if (!formData.selectedCharge) {
        newErrors.selectedCharge = "Please select a billing item";
      }
      if (!formData.quantity || isNaN(formData.quantity) || formData.quantity <= 0) {
        newErrors.quantity = "Please enter a valid quantity";
      }

      const selectedCharge = chargesData.find((charge) => charge.fees_id === formData.selectedCharge);
      if (!selectedCharge) {
        setErrors((prev) => ({
          ...prev,
          selectedCharge: "Invalid billing item selected",
        }));

      };

      let opdData = {
        appo_id: formData.appo_id,
        fees_id: formData.selectedCharge,
        quantity: formData.quantity,
        total_fee: (formData.quantity * selectedCharge?.fees_amount) || 0,
      };

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/fees/addopdchargesappoimnetwise`, opdData, config);
      console.log("Response from adding charges:", response.data);
      fetchOpdCharges();

    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors((prev) => ({
        ...prev,
        submit: "Failed to add charges. Please try again.",
      }));

    }
  }

  return (
    <div className="p-4">
      <Row className="m-0">
        <Col>
          <InputBox
            label="Patient Name"
            placeholder="Enter name"
            isRequired
            value={appointmentData?.patient_name || ""}
            name="patientName"
            disabled
          />
        </Col>
      </Row>

      <Row className="m-0 pt-2">
        <Col lg={6}>
          <label className="fw-semibold pt-2 pb-2">Select Billing Item</label>
          <SelectBox
            name="selectedCharge"
            value={formData.selectedCharge || ""}
            options={chargesData.map((charge) => ({
              label: charge.fees_name,
              option: charge.fees_id,
            }))}
            onChange={handleInputChange}
          />
          {errors.selectedCharge && <p className="text-danger">{errors.selectedCharge}</p>}
        </Col>

        <Col lg={5} className="pt-2">
          <InputBox
            label="Quantity"
            isRequired
            value={formData.quantity}
            name="quantity"
            onChange={handleInputChange}
          />
          {errors.quantity && <p className="text-danger">{errors.quantity}</p>}
        </Col>

        {/* <Col lg={1} className="pt-5">
          <FaPlus
            style={{
              fontSize: "20px",
              cursor: "pointer",
              color: "#1D949A",
              borderRadius: "5px",
            }}
            onClick={addCharges}
          />
        </Col> */}

      </Row>

      <div className="d-flex justify-content-end pt-4">
        <CommanButton
          label="Add"
          className="ps-3 pe-3 p-2 fw-semibold"
          style={{ borderRadius: "5px" }}
          onClick={handleSubmit}
        />
      </div>
      {errors.submit && <p className="text-danger text-center">{errors.submit}</p>}
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
              <td>1</td>
              <td>Consultant Fees</td>
              <td>1</td>
              <td>{appointmentData?.consultancy_fee || 0}</td>
              <td>{appointmentData?.consultancy_fee || 0}</td>
              <td></td>
            </tr>
            {opdChargesDataTable.length > 0 ? (
              opdChargesDataTable.map((charge, index) => (
                <tr key={charge?.opd_bill_fees_id}>
                  <td>{index + 2}</td>
                  <td>{charge?.fees_name}</td>
                  <td>{charge?.quantity}</td>
                  <td>{charge?.fees_amount}</td>
                  <td>{charge?.total_fee}</td>
                  <td>
                    <FaTrash
                      style={{ fontSize: "16px", cursor: "pointer", color: "red" }}
                      onClick={() => removeCharge(charge.opd_bill_fees_id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No additional billing items added
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Showopdcharges;