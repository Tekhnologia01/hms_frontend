import { useState } from "react";
import { Container, Table, Form, Button } from "react-bootstrap";

const GeneralExaminationTable = () => {
  const [formData, setFormData] = useState({
    pulseRate: "",
    bloodPressure: "",
    respiratoryRate: "",
    temperature: "",
    pallor: "",
    icterus: "",
    cyanosis: "",
    clubbing: "",
    lymphadenopathy: "",
    edema: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">General Examination</h2>
      <Form onSubmit={handleSubmit}>
        <Table bordered hover className="shadow">
          <thead className="table-dark">
            <tr>
              <th>Parameter</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Pulse Rate (60-100 bpm)</strong></td>
              <td>
                <Form.Control
                  type="number"
                  name="pulseRate"
                  value={formData.pulseRate}
                  onChange={handleChange}
                  placeholder="Enter Pulse Rate"
                />
              </td>
            </tr>
            <tr>
              <td><strong>Blood Pressure (BP) (e.g., 120/80 mmHg)</strong></td>
              <td>
                <Form.Control
                  type="text"
                  name="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={handleChange}
                  placeholder="Enter BP"
                />
              </td>
            </tr>
            <tr>
              <td><strong>Respiratory Rate (12-20 breaths/min)</strong></td>
              <td>
                <Form.Control
                  type="number"
                  name="respiratoryRate"
                  value={formData.respiratoryRate}
                  onChange={handleChange}
                  placeholder="Enter RR"
                />
              </td>
            </tr>
            <tr>
              <td><strong>Temperature (°F/°C)</strong></td>
              <td>
                <Form.Control
                  type="text"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleChange}
                  placeholder="Enter Temperature"
                />
              </td>
            </tr>
            <tr>
              <td><strong>Pallor</strong></td>
              <td>
                <Form.Check
                  inline
                  type="radio"
                  label="Present"
                  name="pallor"
                  value="Present"
                  checked={formData.pallor === "Present"}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Absent"
                  name="pallor"
                  value="Absent"
                  checked={formData.pallor === "Absent"}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td><strong>Icterus</strong></td>
              <td>
                <Form.Check
                  inline
                  type="radio"
                  label="Present"
                  name="icterus"
                  value="Present"
                  checked={formData.icterus === "Present"}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Absent"
                  name="icterus"
                  value="Absent"
                  checked={formData.icterus === "Absent"}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td><strong>Cyanosis</strong></td>
              <td>
                <Form.Check
                  inline
                  type="radio"
                  label="Present"
                  name="cyanosis"
                  value="Present"
                  checked={formData.cyanosis === "Present"}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Absent"
                  name="cyanosis"
                  value="Absent"
                  checked={formData.cyanosis === "Absent"}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td><strong>Clubbing</strong></td>
              <td>
                <Form.Check
                  inline
                  type="radio"
                  label="Present"
                  name="clubbing"
                  value="Present"
                  checked={formData.clubbing === "Present"}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Absent"
                  name="clubbing"
                  value="Absent"
                  checked={formData.clubbing === "Absent"}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td><strong>Lymphadenopathy</strong></td>
              <td>
                <Form.Check
                  inline
                  type="radio"
                  label="Present"
                  name="lymphadenopathy"
                  value="Present"
                  checked={formData.lymphadenopathy === "Present"}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Absent"
                  name="lymphadenopathy"
                  value="Absent"
                  checked={formData.lymphadenopathy === "Absent"}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td><strong>Edema</strong></td>
              <td>
                <Form.Check
                  inline
                  type="radio"
                  label="Present"
                  name="edema"
                  value="Present"
                  checked={formData.edema === "Present"}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Absent"
                  name="edema"
                  value="Absent"
                  checked={formData.edema === "Absent"}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </Table>

        <div className="text-center">
          <Button variant="primary" type="submit">
            Submit Examination
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default GeneralExaminationTable;
