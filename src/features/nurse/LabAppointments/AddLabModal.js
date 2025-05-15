import axios from "axios";
import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

function AddLabModal({ show, handleClose, fetchLabs }) {
    const { userId } = useSelector(state => state?.auth?.user);
    const [newLab, setNewLab] = useState({ labName: "", description: "", price: "", image: null });
    const [loading, setLoading] = useState(false);
    const token = useSelector((state) => state.auth.currentUserToken);
  const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    // Handle text input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLab({ ...newLab, [name]: value });
    };

    // Handle file input for image
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewLab({ ...newLab, image: file });
        }
    };

    // Submit data using FormData
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            if (newLab.labName && newLab.description && newLab.price && newLab.image) {
                const formData = new FormData();
                formData.append("testName", newLab.labName);
                formData.append("testDescription", newLab.description);
                formData.append("testFees", newLab.price);
                formData.append("testPhoto", newLab.image);


                const response = await axios.post(`${process.env.REACT_APP_API_URL}/lab/addtest/${userId}`, formData,config);
                fetchLabs();

                handleClose();
            } else {
                alert("Please fill all fields");
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={() => {
            handleClose();
            setNewLab({ labName: "", description: "", price: "", image: null })
        }} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add New Lab</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Lab Name</Form.Label>
                        <Form.Control type="text" name="labName" value={newLab.labName} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" name="description" value={newLab.description} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" name="price" value={newLab.price} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Lab Image</Form.Label>
                        <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                        <Button variant="primary" type="submit">{loading ? "Adding..." : "Add Lab"}</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AddLabModal;