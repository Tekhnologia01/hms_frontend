export const validatePatientForm = (data) => {
  let errors = {};

  if (!data.patient_name.trim()) {
    errors.patient_name = "Patient name is required";
  }

  if (!data.patient_phone_no.trim()) {
    errors.patient_phone_no = "Phone number is required";
  } else if (!/^\d{10}$/.test(data.patient_phone_no)) {
    errors.patient_phone_no = "Invalid phone number (10 digits required)";
  }

  if (!data.patient_age.trim()) {
    errors.patient_age = "Age is required";
  } else if (!/^\d+$/.test(data.patient_age) || parseInt(data.patient_age, 10) <= 0) {
    errors.patient_age = "Enter a valid age";
  }

  if (!data.patient_sex.trim()) {
    errors.patient_sex = "Gender is required";
  }

  if (!data.patient_address.trim()) {
    errors.patient_address = "Address is required";
  }

  if (!data.patient_city.trim()) {
    errors.patient_city = "City is required";
  }

  if (!data.patient_id_proof.trim()) {
    errors.patient_id_proof = "ID proof type is required";
  }
  if (!data.id_number) {
    errors.id_number = "ID Proof Number is required";
  }

  // if (!data.patient_proof_image) {
  //   errors.patient_proof_image = "ID proof image is required";
  // }

  // if (!data.patient_photo) {
  //   errors.patient_photo = "Patient photo is required";
  // }

  return errors;
};

export const validateAdmitForm = (data) => {
  let errors = {};

  if (!data.uh_id.trim()) {
    errors.uh_id = "Patient is required";
  }

  if (!data.mrd_no.trim()) {
    errors.mrd_no = "MRD No. is required";
  }

  if (!data.department_id) {
    errors.department_id = "Department is required";
  }

  if (!data.doctor_id) {
    errors.doctor_id = "Doctor is required";
  }

  if (!data.room_type) {
    errors.room_type = "Room type is required";
  }

  if (!data.bed_id) {
    errors.bed_id = "Bed is required";
  }

  if (!data.admit_date) {
    errors.admit_date = "Admission date is required";
  }

  if (!data.admit_time) {
    errors.admit_date = "Admission time is required";
  }

  if (data.discharge_date && !data.discharge_time) {
    errors.discharge_date = "Discharge time is required";
  }

  if (!data.relative_name.trim()) {
    errors.relative_name = "Name is required";
  }

  if (!data.relative_address.trim()) {
    errors.relative_address = "Address is required";
  }

  if (!data.relative_mobile.trim()) {
    errors.relative_mobile = "Phone number is required";
  } else if (!/^\d{10}$/.test(data.relative_mobile)) {
    errors.relative_mobile = "Invalid phone number (10 digits required)";
  }

  if (!data.relative_age) {
    errors.relative_age = "Age is required";
  }

  return errors;
};
