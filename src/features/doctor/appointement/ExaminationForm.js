import { Form, Row, Col, Button, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Note from '../../../components/common/form/textarea';

const ExaminationForm = ({ formData, setFormData }) => {
    const user = useSelector(state => state?.auth?.user);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckboxChange = (event) => {
        const { checked, value } = event.target;
        setFormData((prevState) => {
            const selectedSigns = prevState.signs ? prevState.signs.split(", ") : [];

            if (checked) {
                selectedSigns.push(value); // Add checked value
            } else {
                // Remove unchecked value
                const index = selectedSigns.indexOf(value);
                if (index > -1) {
                    selectedSigns.splice(index, 1);
                }
            }

            return { ...prevState, signs: selectedSigns.join(", ") };
        });
    };
    return (
        <div className="p-4">
            <p className="mb-3 fw-semibold " style={{fontSize:"1.4rem"}}> Examination Form</p>
            <Form>
                <Row className="mb-4">
                    <Col md={6}>
                        <Form.Group controlId="gc">
                            <Form.Label className="fw-semibold">General Condition (GC)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter condition"
                                className="rounded-3"
                                value={formData?.general_condition}
                                name='general_condition'
                                onChange={handleChange}
                                disabled={user?.RoleId !== 2} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col md={3}>
                        <Form.Group controlId="pulse">
                            <Form.Label className="fw-semibold">Pulse (P)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter pulse"
                                className="rounded-3"
                                disabled={user?.RoleId !== 2}
                                name='pulse'
                                value={formData?.pulse}
                                onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="bp">
                            <Form.Label className="fw-semibold">Blood Pressure (BP)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter BP"
                                className="rounded-3"
                                disabled={user?.RoleId !== 2}
                                name='blood_pressure'
                                value={formData?.blood_pressure}
                                onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="rr">
                            <Form.Label className="fw-semibold">Respiratory Rate (RR)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter RR"
                                className="rounded-3"
                                disabled={user?.RoleId !== 2}
                                name='respiratory_rate'
                                value={formData?.respiratory_rate}
                                onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="spo2">
                            <Form.Label className="fw-semibold">Spo2</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Spo2"
                                className="rounded-3"
                                disabled={user?.RoleId !== 2}
                                name='spo2'
                                value={formData?.spo2}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Form.Label className="fw-semibold mb-2">Signs</Form.Label>

                    <Col md={2}>
                        <Form.Check
                            type="checkbox"
                            label="Pallor"
                            className="me-3"
                            value={"Pallor"}
                            disabled={user?.RoleId !== 2}
                            checked={formData?.signs?.includes("Pallor")}
                            onChange={handleCheckboxChange} />
                    </Col>
                    <Col md={2}>
                        <Form.Check
                            type="checkbox"
                            label="Cyanosis"
                            value={"Cyanosis"}
                            className="me-3"
                            disabled={user?.RoleId !== 2}
                            checked={formData?.signs?.includes("Cyanosis")}
                            onChange={handleCheckboxChange} />
                    </Col>

                    <Col md={2}>
                        <Form.Check
                            type="checkbox"
                            label="Clubbing"
                            value={"Clubbing"}
                            className="me-3"
                            disabled={user?.RoleId !== 2}
                            checked={formData?.signs?.includes("Clubbing")}
                            onChange={handleCheckboxChange}
                        />
                    </Col>

                    <Col md={2}>
                        <Form.Check
                            type="checkbox"
                            label="Icterus"
                            value={"Icterus"}
                            className="me-3"
                            disabled={user?.RoleId !== 2}
                            checked={formData?.signs?.includes("Icterus")}
                            onChange={handleCheckboxChange}
                        />
                    </Col>
                    <Col md={2}>
                        <Form.Check
                            type="checkbox"
                            label="Lymphadenopathy"
                            value={"Lymphadenopathy"}
                            disabled={user?.RoleId !== 2}
                            checked={formData?.signs?.includes("Lymphadenopathy")}
                            onChange={handleCheckboxChange} />
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col md={6}>
                        <Form.Group controlId="rs">
                            <div className="mt-2">
                                <Note
                                    disabled={user?.RoleId !== 2}
                                    placeholder="Respiratory System (RS)"
                                    label="Respiratory System (RS)"
                                    onChange={handleChange}
                                    name="respiratory_system"
                                    value={formData?.respiratory_system}
                                />
                            </div>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="cvs">
                            <div className="mt-2">
                                <Note
                                    disabled={user?.RoleId !== 2}
                                    placeholder="Cardiovascular System (CVS)"
                                    label="Cardiovascular System (CVS)"
                                    onChange={handleChange}
                                    name="cardiovascular_system"
                                    value={formData?.cardiovascular_system}
                                />
                            </div>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col md={6}>
                        <Form.Group controlId="cns">
                            <div className="mt-2">
                                <Note
                                    disabled={user?.RoleId !== 2}
                                    placeholder="Central Nervous System (CNS)"
                                    className=""
                                    label="Central Nervous System (CNS)"
                                    onChange={handleChange}
                                    name="central_nervous_system"
                                    value={formData?.central_nervous_system}
                                />
                            </div>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="pa">
                            <div className="mt-2">
                                <Note
                                    disabled={user?.RoleId !== 2}
                                    placeholder="Per Abdomen (P/A)"
                                    label="Per Abdomen (P/A)"
                                    onChange={handleChange}
                                    name="per_abdomen"
                                    value={formData?.per_abdomen}
                                />
                            </div>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default ExaminationForm;
