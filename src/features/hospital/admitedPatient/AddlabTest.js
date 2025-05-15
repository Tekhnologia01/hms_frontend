import axios from 'axios';
import { useState, useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CommanButton from '../../../components/common/form/commonButtton';
import InputBox from '../../../components/common/form/inputbox';
import MultiSelectWithDropdown from '../../../components/common/form/multiselect';
import { epochTimeToDate } from '../../../utils/epochToDate';
import CommonTable from '../../../components/table/CommonTable';
import { FaEye } from 'react-icons/fa';
import { toast } from 'react-toastify';

function AddLabTest() {
    const { admitedId } = useParams();
    const token = useSelector((state) => state.auth.currentUserToken);
    
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [formData, setFormData] = useState({
        labTestIds: [],
        recommendationDate: getCurrentDate(),
    });

    const [tests, setTests] = useState([]);
    const [admitedData, setAdmitedData] = useState([]);

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        getTest();
        getAppointmentDetails();
    }, []);

    const getTest = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/lab/gettest`, config);
            setTests(response?.data?.data || []);
        } catch (error) {
            console.error('Failed to fetch tests', error);
        }
    };

    const getAppointmentDetails = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/lab/getipdpatient?admitedId=${admitedId}`, config);
            setAdmitedData(response?.data?.data || []);
        } catch (error) {
            console.error('Failed to fetch appointment data', error);
        }
    };

    const handleTestChange = (selectedOptions) => {
        setFormData((prev) => ({
            ...prev,
            labTestIds: [...selectedOptions],
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleTestSubmit = async () => {
        try {
            const newData = {
                ...formData,
                labAdmitedId: +admitedId,
                labTestIds: formData.labTestIds.map((test) => test.value),
            };
            await axios.post(`${process.env.REACT_APP_API_URL}/lab/addipdlabtest`, newData, config);
            getAppointmentDetails();
            toast.success("Test Added Successfully!");
        } catch (error) {
            toast.error('Failed to add test', error);
        }
    };

    const columns = [
        { name: "Test Name", accessor: "uh_id", class: "text-center" },
        { name: "Date", accessor: "date", class: "text-center px-1" },
        { name: "Status", accessor: "status", class: "text-center py-2" },
        { name: "Report", accessor: "action", class: "py-3 text-center" },
    ];

    const renderRow = (item) => (
        <tr key={item.id} className="border-bottom text-center">
            <td className="py-3 px-2">{item?.test_name}</td>
            <td className="py-3 px-2">{epochTimeToDate(item?.recommendation_date)}</td>
            <td className="py-3 px-2">{item?.status}</td>
            <td className="py-3 px-2">
                {
                    item?.status == "Pending" ? <>
                        <FaEye style={{ height: "20px", width: "20px", opacity: "0.5" }} />
                    </> : <a
                        href={`${process.env.REACT_APP_API_URL}/${item.rep_ipd_photo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-decoration-underline"
                    >
                        <FaEye style={{ height: "20px", width: "20px" }} />
                    </a>
                }
            </td>
        </tr>
    );

    return (
        <div className="py-4">
            <Row className="mt-3 m-0">
                <Col lg={4}>
                    <Form.Label className="fw-semibold">Select Test</Form.Label>
                    <MultiSelectWithDropdown
                        selectedDays={formData.labTestIds}
                        options={tests.map((test) => ({
                            value: test.test_id,
                            label: test.test_name,
                        }))}
                        onDayChange={handleTestChange}
                    />
                </Col>

                <Col lg={4}>
                    <InputBox
                        type="date"
                        label="Recommendation Date"
                        value={formData.recommendationDate}
                        name="recommendationDate"
                        onChange={handleChange}
                    />
                </Col>

                <Col lg={4} style={{ paddingTop: "2rem" }}>
                    <CommanButton
                        label="Add Test"
                        variant="#7B3F0080"
                        className="ps-3 pe-3 p-2 fw-semibold"
                        style={{ borderRadius: "5px" }}
                        onClick={handleTestSubmit}
                    />
                </Col>
            </Row>

            {admitedData.length > 0 && (
                <div className="p-2">
                    <CommonTable
                        minimumWidth={"100%"}
                        headers={columns}
                        bodyData={admitedData}
                        renderRow={renderRow}
                        title={"Lab Test List"}
                    />
                </div>
            )}
        </div>
    );
}

export default AddLabTest;