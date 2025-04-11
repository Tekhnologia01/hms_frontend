export const validateDoctorForm = (data) => {
    console.log('validateDoctorForm', data);
    let errors = {};

    if (!data.name.trim()) {
        errors.name = "Doctor name is required";
    }

    if (!data.phoneno.trim()) {
        errors.phoneno = "Phone number is required";
    } else if (!/^\d{10}$/.test(data.phoneno)) {
        errors.phoneno = "Invalid phone number (10 digits required)";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!data.email_id.trim()) {
        errors.email_id = "Email is required";
    } else if (!emailRegex.test(data.email_id)) {
        errors.email_id = "Invalid email address";
    }

    if (!data.sex.trim()) {
      errors.sex = "Gender is required";
    }

    if (!data.age.trim()) {
      errors.age = "Age is required";
    } else if (!/^\d+$/.test(data.age) || parseInt(data.age, 10) <= 0) {
      errors.age = "Enter a valid age";
    }

    if (!data.address.trim()) {
      errors.address = "Address is required";
    }

    if (!data.city.trim()) {
      errors.city = "City is required";
    }

    if (!data.department_id) {
        errors.department_id = "Department is required";
      }

    if (!data.id_proof.trim()) {
      errors.id_proof = "ID proof type is required";
    }

    if (!data.id_proof_image) {
      errors.id_proof_image = "ID proof image is required";
    }

    if (!data.user_photo) {
      errors.user_photo = "Doctor photo is required";
    }

    if (!data.degree.trim()) {
        errors.degree = "Degree is required";
    }

    if (!data.specialization.trim()) {
        errors.specialization = "Specialization is required";
    }

    if(data?.isPostGraduation){
        if(!data.post_degree.trim()){
            errors.post_degree = "Post graduation university is required";
        }

        if(!data.post_specialization.trim()){
            errors.post_specialization = "Post graduation specialization is required";
        }
    }

    if (!data.licene_number.trim()){
        errors.licene_number = "Medical license number is required";
    }

    if (!data.license_expiry_date.trim()){
        errors.license_expiry_date = "Medical license validity is required";
    }

    if (!data.issue_body.trim()) {
        errors.issue_body = "Issuing body is required";
    }

    if(data?.day_ids?.length === 0){
        errors.day_ids = "Select at least one day";
    }

    if (!data?.shift_id){
        errors.shift_id = "Select shift";
    }

    if (!data?.joining_date.trim()) {
        errors.joining_date = "Joining date is required";
    }

    if (!data?.consultancy_fee.trim()) {
        errors.consultancy_fee = "Consultancy fee is required";
    }

    if (!data?.username.trim()) {
        errors.username = "User id is required";
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!data?.password.trim()) {
        errors.password = "Password is required";
    }else if(!passwordRegex.test(data.password)){
        errors.password = "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character";
    }

    if (!data?.confirmPassword.trim()) {
        errors.confirmPassword = "Confirm password is required";
    } else if(data.password!== data.confirmPassword){
        errors.confirmPassword = "Passwords do not match";
    }
    return errors;
};

export const validateLabAssistantForm = (data) => {
    let errors = {};

    if (!data.name.trim()) {
        errors.name = "Assistant name is required";
    }

    if (!data.phoneno.trim()) {
        errors.phoneno = "Phone number is required";
    } else if (!/^\d{10}$/.test(data.phoneno)) {
        errors.phoneno = "Invalid phone number (10 digits required)";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!data.email_id.trim()) {
        errors.email_id = "Email is required";
    } else if (!emailRegex.test(data.email_id)) {
        errors.email_id = "Invalid email address";
    }

    if (!data.sex.trim()) {
      errors.sex = "Gender is required";
    }

    if (!data.age.trim()) {
      errors.age = "Age is required";
    } else if (!/^\d+$/.test(data.age) || parseInt(data.age, 10) <= 0) {
      errors.age = "Enter a valid age";
    }

    if (!data.address.trim()) {
      errors.address = "Address is required";
    }

    if (!data.city.trim()) {
      errors.city = "City is required";
    }

    if (!data.id_proof.trim()) {
      errors.id_proof = "ID proof type is required";
    }

    if (!data.id_proof_image) {
      errors.id_proof_image = "ID proof image is required";
    }

    if (!data.user_photo) {
      errors.user_photo = "Doctor photo is required";
    }

    if (!data.degree.trim()) {
        errors.degree = "Degree is required";
    }

    if (!data.specialization.trim()) {
        errors.specialization = "Specialization is required";
    }

    if (!data.licene_number.trim()){
        errors.licene_number = "Nursing license number is required";
    }

    if (!data.issue_body.trim()) {
        errors.issue_body = "Issuing body is required";
    }

    if(!data.institute_name.trim()) {
        errors.institute_name = "Institute name is required";
    }

    if(data?.day_ids?.length === 0){
        errors.day_ids = "Select at least one day";
    }

    if (!data?.shift_id){
        errors.shift_id = "Select shift";
    }

    if (!data?.joining_date.trim()) {
        errors.joining_date = "Joining date is required";
    }

    if (!data?.username.trim()) {
        errors.username = "User id is required";
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!data?.password.trim()) {
        errors.password = "Password is required";
    }else if(!passwordRegex.test(data.password)){
        errors.password = "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character";
    }

    if (!data?.confirmPassword.trim()) {
        errors.confirmPassword = "Confirm password is required";
    } else if(data.password!== data.confirmPassword){
        errors.confirmPassword = "Passwords do not match";
    }
    return errors;
};

export const validateReceptionistForm = (data) => {
    let errors = {};

    if (!data.name.trim()) {
        errors.name = "Assistant name is required";
    }

    if (!data.phoneno.trim()) {
        errors.phoneno = "Phone number is required";
    } else if (!/^\d{10}$/.test(data.phoneno)) {
        errors.phoneno = "Invalid phone number (10 digits required)";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!data.email_id.trim()) {
        errors.email_id = "Email is required";
    } else if (!emailRegex.test(data.email_id)) {
        errors.email_id = "Invalid email address";
    }

    if (!data.sex.trim()) {
      errors.sex = "Gender is required";
    }

    if (!data.age.trim()) {
      errors.age = "Age is required";
    } else if (!/^\d+$/.test(data.age) || parseInt(data.age, 10) <= 0) {
      errors.age = "Enter a valid age";
    }

    if (!data.address.trim()) {
      errors.address = "Address is required";
    }

    if (!data.city.trim()) {
      errors.city = "City is required";
    }

    if (!data.id_proof.trim()) {
      errors.id_proof = "ID proof type is required";
    }

    if (!data.id_proof_image) {
      errors.id_proof_image = "ID proof image is required";
    }

    if (!data.user_photo) {
      errors.user_photo = "Doctor photo is required";
    }

    if (!data.highest_qualification.trim()) {
        errors.highest_qualification = "Highest qualification is required";
    }

    if (!data.field_of_study.trim()) {
        errors.field_of_study = "Field of study is required";
    }

    if (!data.licene_number.trim()){
        errors.licene_number = "Nursing license number is required";
    }

    if (!data.language_known.trim()) {
        errors.language_known = "Languages Known are required";
    }

    if(!data.institute_name.trim()) {
        errors.institute_name = "Institute name is required";
    }
    if(!data.computer_skills.trim()) {
        errors.computer_skills = "Computer skills are required";
    }

    if(data?.day_ids?.length === 0){
        errors.day_ids = "Select at least one day";
    }

    if (!data?.shift_id){
        errors.shift_id = "Select shift";
    }

    if (!data?.joining_date.trim()) {
        errors.joining_date = "Joining date is required";
    }

    if (!data?.username.trim()) {
        errors.username = "User id is required";
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!data?.password.trim()) {
        errors.password = "Password is required";
    }else if(!passwordRegex.test(data.password)){
        errors.password = "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character";
    }

    if (!data?.confirmPassword.trim()) {
        errors.confirmPassword = "Confirm password is required";
    } else if(data.password!== data.confirmPassword){
        errors.confirmPassword = "Passwords do not match";
    }
    return errors;
};

export const validateAccountantForm = (data) => {
    let errors = {};

    if (!data.name.trim()) {
        errors.name = "Accountant name is required";
    }

    if (!data.phoneno.trim()) {
        errors.phoneno = "Phone number is required";
    } else if (!/^\d{10}$/.test(data.phoneno)) {
        errors.phoneno = "Invalid phone number (10 digits required)";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!data.email_id.trim()) {
        errors.email_id = "Email is required";
    } else if (!emailRegex.test(data.email_id)) {
        errors.email_id = "Invalid email address";
    }

    if (!data.sex.trim()) {
      errors.sex = "Gender is required";
    }

    if (!data.age.trim()) {
      errors.age = "Age is required";
    } else if (!/^\d+$/.test(data.age) || parseInt(data.age, 10) <= 0) {
      errors.age = "Enter a valid age";
    }

    if (!data.address.trim()) {
      errors.address = "Address is required";
    }

    if (!data.city.trim()) {
      errors.city = "City is required";
    }

    if (!data.id_proof.trim()) {
      errors.id_proof = "ID proof type is required";
    }

    if (!data.id_proof_image) {
      errors.id_proof_image = "ID proof image is required";
    }

    if (!data.user_photo) {
      errors.user_photo = "Accountant photo is required";
    }

    if (!data.degree.trim()) {
        errors.degree = "Degree is required";
    }

    if(!data.institute_name.trim()) {
        errors.institute_name = "Institute name is required";
    }

    if (!data?.shift_id){
        errors.shift_id = "Select shift";
    }

    if (!data?.blood_group){
        errors.blood_group = "Select blood group";
    }

    if (!data?.joining_date.trim()) {
        errors.joining_date = "Joining date is required";
    }

    if (!data?.username.trim()) {
        errors.username = "User id is required";
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!data?.password.trim()) {
        errors.password = "Password is required";
    }else if(!passwordRegex.test(data.password)){
        errors.password = "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character";
    }

    if (!data?.confirmPassword.trim()) {
        errors.confirmPassword = "Confirm password is required";
    } else if(data.password!== data.confirmPassword){
        errors.confirmPassword = "Passwords do not match";
    }
    return errors;
};