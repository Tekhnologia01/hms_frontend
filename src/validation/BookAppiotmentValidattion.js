export const validateAppointmentForm = (data) => {
    let errors = {};
  
    if (!data.patientId) {
      errors.patientId = "Patient ID is required";
    }
  
    if (!data.disease.trim()) {
      errors.disease = "Disease is required";
    }
  
    if (!data.departmentId) {
      errors.departmentId = "Department is required";
    }
  
    if (!data.doctorId) {
      errors.doctorId = "Doctor is required";
    }
  
    if (!data.slotId) {
      errors.slotId = "Slot is required";
    }
  
    if (!data.consultationReason.trim()) {
      errors.consultationReason = "Consultation reason is required";
    }
  
    if (!data.patientSource.trim()) {
      errors.patientSource = "Patient source is required";
    }
  
    if (!data.visitType) {
      errors.visitType = "Visit type is required";
    }
  
    return errors;
  };