import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { Container, Form, Button, ListGroup, InputGroup, Row, Col, Spinner, Modal } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaSave, FaBook } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CommanButton from '../../../components/common/form/commonButtton';

function CourseDetails() {
  const { user } = useSelector(state => state?.auth)
  const { admitedId } = useParams();
  const [courseDetails, setCourseDetails] = useState('');
  const [treatmentPoints, setTreatmentPoints] = useState([]);
  const [editingPoint, setEditingPoint] = useState(null);
  const [editText, setEditText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pointToDelete, setPointToDelete] = useState(null);
  const token = useSelector((state) => state?.auth?.currentUserToken);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchCourseData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/treatment/getcourse?admited_id=${admitedId}`, config);
      setCourseDetails(response?.data?.data?.course_details || '');
    } catch (error) {
      setSaveStatus({ variant: 'danger', message: error.message || 'Failed to load course' });
    } finally {
      setIsLoading(false);
    }
  }, [admitedId]);

  const fetchTreatmentPoints = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/treatment/gettreatmnts?admited_id=${admitedId}`, config);
      if (response.data?.data) {
        setTreatmentPoints(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch treatment points:", error);
      setSaveStatus({ variant: 'danger', message: 'Failed to load treatment points' });
    }
  }, [admitedId]);

  useEffect(() => {
    const loadData = async () => {
      await fetchCourseData();
      await fetchTreatmentPoints();
    };
    loadData();
  }, [fetchCourseData, fetchTreatmentPoints]);

  const addTreatmentPoint = async () => {
    if (!editText.trim()) {
      setSaveStatus({ variant: 'warning', message: 'Please enter treatment point text' });
      return;
    }

    try {
      setIsSaving(true);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/treatment/addtreatment`, {
        admited_id: admitedId,
        treatment_point: editText
      }, config);

      await fetchTreatmentPoints();
      setSaveStatus({ variant: 'success', message: 'Treatment point added successfully' });
    } catch (error) {
      setSaveStatus({ variant: 'danger', message: error.message || 'Failed to add treatment point' });
    } finally {
      setEditText('');
      setEditingPoint(null);
      setIsSaving(false);
    }
  };

  const startEditing = (point) => {
    setEditingPoint(point.id);
    setEditText(point.point_text || '');
  };

  const saveEdit = async () => {
    if (!editText.trim()) {
      setSaveStatus({ variant: 'warning', message: 'Please enter treatment point text' });
      return;
    }

    try {
      setIsSaving(true);
      await axios.put(`${process.env.REACT_APP_API_URL}/treatment/updatetreatment`, {
        treatment_id: editingPoint,
        treatment_point: editText
      }, config);

      setTreatmentPoints(prev =>
        prev?.map(point =>
          point?.id === editingPoint ? { ...point, point_text: editText } : point
        )
      );
      setEditingPoint(null);
      setSaveStatus({ variant: 'success', message: 'Treatment point updated successfully' });
    } catch (error) {
      setSaveStatus({ variant: 'danger', message: error.message || 'Failed to update treatment point' });
    } finally {
      setIsSaving(false);
    }
  };

  const cancelEdit = () => {
    setEditingPoint(null);
    setEditText('');
  };

  const deletePoint = async (id) => {
    setIsSaving(true);
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/treatment/deletetreatment?treatment_id=${id}`, config);
      setTreatmentPoints(prev => prev.filter(point => point.id !== id));
      setSaveStatus({ variant: 'success', message: 'Treatment point deleted successfully' });
    } catch (error) {
      setSaveStatus({ variant: 'danger', message: error.message || 'Failed to delete treatment point' });
    } finally {
      setIsSaving(false);
      setShowDeleteModal(false);
      setPointToDelete(null);
    }
  };

  const saveCourseData = async () => {
    if (!courseDetails.trim()) {
      setSaveStatus({ variant: 'danger', message: 'Please enter course details' });
      return;
    }

    try {
      setIsSaving(true);
      setSaveStatus(null);

      let response;
      if (courseDetails && courseDetails.length > 0) {
        response = await axios.put(
          `${process.env.REACT_APP_API_URL}/treatment/updatecourse?admited_id=${admitedId}`,
          { course_details: courseDetails, admited_id: admitedId },
          config
        );
      } else {
        response = await axios.post(
          `${process.env.REACT_APP_API_URL}/treatment/addcourse`,
          { course_details: courseDetails, admited_id: admitedId },
          config
        );
      }

      setSaveStatus({
        variant: 'success',
        message: 'Course updated successfully!'
      });
    } catch (error) {
      setSaveStatus({ variant: 'danger', message: error.message || 'Failed to save course' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading course data...</p>
      </Container>
    );
  }

  return (
    <div className="p-3">
      {user.RoleId === 4 || user.RoleId === 5 ? (
        null
      ) : (<>
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="fw-bold fs-5 col-md-6 mt-2 px-0">
                Course Details
              </h2>
              <Button
                // variant="success"
                onClick={saveCourseData}
                disabled={isSaving}
                className="d-flex align-items-center"
                style={{
                  backgroundColor: "#1D949A"
                }}
              >
                {isSaving ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" className="me-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave className="me-2" />
                    Save Course
                  </>
                )}
              </Button>
            </div >

            <Form.Group controlId="courseDetails">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Describe the course objectives, requirements, and other relevant details..."
                value={courseDetails}
                onChange={(e) => setCourseDetails(e.target.value)}
                className="border-2 shadow-sm"
              />
            </Form.Group>
          </Col >
        </Row >

        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="h4">Treatment Plan</h2>

              <CommanButton
                label="Add Point"
                variant="#7B3F0080"
                className="ps-3 pe-3 p-2 fw-semibold"
                style={{ borderRadius: "5px" }}
                onClick={() => {
                  setEditText('');
                  setEditingPoint('new');
                }}
                disabled={isSaving}
              />
            </div>

            {editingPoint === 'new' && (
              <div className="mb-3 p-3 bg-light rounded shadow-sm">
                <InputGroup>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    autoFocus
                    placeholder="Enter treatment point details..."
                    className="shadow-none"
                  />
                  <Button
                    variant="success"
                    size="sm"
                    onClick={addTreatmentPoint}
                    className="me-2"
                    disabled={isSaving || !editText.trim()}
                  >
                    {isSaving ? <Spinner size="sm" /> : <FaSave />}
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={cancelEdit}
                    disabled={isSaving}
                  >
                    <MdCancel />
                  </Button>
                </InputGroup>
              </div>
            )}

            {treatmentPoints.length === 0 ? (
              <div className="text-center py-4 bg-light rounded shadow-sm">
                <p className="text-muted">No treatment points added yet</p>
              </div>
            ) : (
              <ListGroup as="ol" numbered className="shadow-sm">
                {treatmentPoints?.map((point) => (
                  <ListGroup.Item
                    key={point.id}
                    className="py-3 pe-4"
                    variant={editingPoint === point.id ? 'light' : ''}
                  >
                    {editingPoint === point.id ? (
                      <InputGroup>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          autoFocus
                          placeholder="Enter treatment point details..."
                          className="shadow-none"
                        />
                        <Button
                          variant="success"
                          size="sm"
                          onClick={saveEdit}
                          className="me-2"
                          disabled={isSaving || !editText.trim()}
                        >
                          {isSaving ? <Spinner size="sm" /> : <FaSave />}
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={cancelEdit}
                          disabled={isSaving}
                        >
                          <MdCancel />
                        </Button>
                      </InputGroup>
                    ) : (
                      <div className="d-flex justify-content-between align-items-start">
                        <div className="me-3">
                          {point.point_text || <span className="text-muted fst-italic">Empty point</span>}
                        </div>
                        <div className="d-flex">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => startEditing(point)}
                            className="me-2"
                            disabled={isSaving}
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => {
                              setShowDeleteModal(true);
                              setPointToDelete(point.id);
                            }}
                            disabled={isSaving}
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </div>
                    )}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
        </Row>
      </>)
      }

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Treatment Point</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this treatment point?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowDeleteModal(false)} disabled={isSaving} style={{ backgroundColor: "white", color: 'black' }}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => deletePoint(pointToDelete)} disabled={isSaving}>
            {isSaving ? <Spinner size="sm" /> : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CourseDetails;