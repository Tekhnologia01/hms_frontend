
import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";
import CommanButton from "../../../components/common/form/commonButtton";
import InputBox from "../../../components/common/form/inputbox";
import SelectBox from "../../../components/common/form/selectBox/SelectBox";
import axios from "axios";
import { useSelector } from "react-redux";

const Showopdcharges = ({ patientName, consultationFee }) => {
  const [formData, setFormData] = useState({
    bill_total_amount: 0,
    chargesList: [],
    selectedCharge: "",
    quantity: "",
  });

  const [chargesData, setChargesData] = useState([]);
  const [chargesDataTable, setChargesDataTable] = useState([]);
  const [errors, setErrors] = useState({});

  const token = useSelector((state) => state.auth.currentUserToken);
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

     const fetchopdcharges= async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/fees/opdcharges?appo_id=`, config);
        setChargesData(response?.data?.data.data || []);
      } catch (error) {
        console.error("Error fetching charges:", error);
      }
    };



  useEffect(() => {
   
    fetchCharges();
  }, []);

  // Handle input changes for select and quantity
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear errors for the field being updated
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

  // Remove a charge from the table
  const removeCharge = (chargeId) => {
    // Find the charge to remove
    const chargeToRemove = chargesDataTable.find((charge) => charge.chargeId === chargeId);
    if (!chargeToRemove) return;

    // Update chargesDataTable and bill_total_amount
    setChargesDataTable((prev) => prev.filter((charge) => charge.chargeId !== chargeId));
    setFormData((prev) => ({
      ...prev,
      bill_total_amount: prev.bill_total_amount - chargeToRemove.total,
      chargesList: prev.chargesList.filter((charge) => charge.chargeId !== chargeId),
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Prepare data for submission
      const submissionData = {
        patientName: patientName,
        bill_total_amount: formData.bill_total_amount + parseFloat(consultationFee || 0),
        charges: [
          {
            chargeId: "consultation_fee",
            billingType: "Consultant Fees",
            quantity: 1,
            amount: parseFloat(consultationFee || 0),
            total: parseFloat(consultationFee || 0),
          },
          ...formData.chargesList.map((charge) => ({
            chargeId: charge.chargeId,
            billingType: charge.billingType,
            quantity: charge.quantity,
            amount: charge.amount,
            total: charge.total,
          })),
        ],
      };

      // Log the data for debugging (remove in production)
      console.log("Submission Data:", submissionData);

      // Example: Send data to an API endpoint
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/billing/submit`,
        submissionData,
        config
      );

      // Handle successful submission
      console.log("Billing submitted successfully:", response.data);

      // Optionally reset form after submission
      setFormData({
        bill_total_amount: 0,
        chargesList: [],
        selectedCharge: "",
        quantity: "",
      });
      setChargesDataTable([]);
      setErrors({});

      // Optionally show a success message to the user
      alert("Billing submitted successfully!");
    } catch (error) {
      console.error("Error submitting billing data:", error);
      setErrors({ submit: "Failed to submit billing data. Please try again." });
    }
  };

  return (
    <div className="p-4">
      <Row className="m-0">
        <Col>
          <InputBox
            label="Patient Name"
            placeholder="Enter name"
            isRequired
            value={patientName}
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

      <div className="d-flex justify-content-end pt-4">
        <CommanButton
          label="Submit"
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
              <td>{consultationFee || 0}</td>
              <td>{consultationFee || 0}</td>
              <td></td>
            </tr>
            {chargesDataTable.length > 0 ? (
              chargesDataTable.map((charge, index) => (
                <tr key={charge.chargeId}>
                  <td>{index + 2}</td>
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