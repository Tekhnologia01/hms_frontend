import {  Navigate, Route, Routes } from "react-router-dom";
import DefaultLayout from "../components/layout/defaultLayout/DefaultLayout";
// Common pages
import Login from "../features/authentication/login/Login";
import Register from "../features/authentication/register/Register";
import CheckEmail from "../features/authentication/forgotPassword/CheckEmail";
import EnterEmail from "../features/authentication/forgotPassword/EnterEmail";
import PasswordReset from "../features/authentication/forgotPassword/PasswordReset";
import SetnewPassowrd from "../features/authentication/forgotPassword/SetnewPassword";
import AddUsers from "../features/hospital/AddUser/index";
import HospitalDoctorList from "../features/DoctorList";
import Departments from "../features/hospital/Departments";
import Department from "../features/hospital/Departments/Department";
import Charges from "../features/hospital/BillingAndCharges/Charges";
import Setting from "../features/setting";
import DoctorAppointment from "../features/doctor/appointement";
import PatientDetails from "../features/doctor/PatientList/PatientDetails";
import ViewPatient from "../features/doctor/appointement/ViewPaitent";
import AddPatient from "../features/commonfeature/AddPatient";
import PaymentHistory from "../features/doctor/paymentHistory";
import Account from "../features/commonfeature/Account";
import AppointmentDoctor from "../features/reception/receptionAppointment";
import PatientAppointmentList from "../features/reception/patientList";
import Nurse from '../features/nurse/index'
import LabAppointments from "../features/nurse/LabAppointments";
import LabAppointmentDetail from '../features/nurse/LabAppointments/labAppointment'
import NursePatientList from '../features/nurse/PatientList/index'
import LabPatientDetails from '../features/nurse/LabAppointments/patientDetails'
import ReceptionDashboard from "../features/reception";
import DoctorsAppointment from "../features/reception/receptionAppointment/DoctorsAppointment";
import HospitalDashboard from "../features/hospital";
import AddUserForm from "../features/addUser";
import DoctorDashboard from "../features/doctor/dashboard";
import Emergency from "../features/hospital/Emergency";
import AddEmergencyPatient from "../features/hospital/Emergency/AddEmergencyPatient";
import DoctorDetails from "../features/doctor/DoctorDetails";
import RoomInfo from "../features/commonfeature/RoomInfo";
import AddCharges from "../features/hospital/BillingAndCharges/AddCharges";
import ReceptionistBillList from "../features/reception/billling/ReceptionistBillList";
import BillDetails from "../features/reception/billling/BillDetails";
import AccountantDashboard from "../features/accountant/AccountantDashbord";
import AddAccCharges from "../features/accountant/addCharges/AddCharges";
import AddRecCharges from "../features/reception/billling/addRecCharges";
import ViewLabAppointment from "../features/nurse/LabAppointments/ViewLabAppointment";
import ViewIpdLabAppointment from "../features/nurse/LabAppointments/ViewIpdLabAppointment";
import DischargePatient from "../features/dischargePatient";
import AdmitedDepatientBillDetals from "../features/accountant/billAdmitedPatient.js/AdmitedDepatientBillDetals";
import Report from "../features/accountant/report/Report";
import AdmitedPatientDetails from "../features/hospital/admitedPatient/AdmitedPatientDetails";
import IpdBill from "../features/accountant/billAdmitedPatient.js/IpdBill";
import DepositeReceipt from "../features/accountant/billAdmitedPatient.js/DepositeReceipt";
import DischargeSummery from "../features/accountant/dischargeSummery/DischargeSummery";
import OpdReport from "../features/accountant/report/OpdReport";
import Payment from "../features/accountant/paymentHistory/index"
import AddOpdCharges from "../features/accountant/addCharges/Addopdcharges";
import Showopdcharges from "../features/accountant/addCharges/Showopdcharges";

function AppRoutes({ getDefaultRoute }) {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/checkemail" element={<CheckEmail />} />
      <Route path="/enteremail" element={<EnterEmail />} />
      <Route path="/passwordreset" element={<PasswordReset />} />
      <Route path="/setpassword" element={<SetnewPassowrd />} />
      <Route element={<DefaultLayout />}>
        {/* Hospital routes */}
        <Route path="/hospital" element={<HospitalDashboard />} />
        <Route path="/hospital/add_users" element={<AddUsers />} />
        <Route path="/hospital/add_users/add_doctor" element={<AddUserForm user={"Doctor"} />} />
        <Route path="/hospital/add_users/add_receptionist" element={<AddUserForm user={"Receptionist"} />} />
        <Route path="/hospital/add_users/add_accountant" element={<AddUserForm user={"Accountant"} />} />
        <Route path="/hospital/add_users/add_labassistant" element={<AddUserForm user={"Lab"} />} />
        <Route path="/hospital/doctor_list" element={<HospitalDoctorList />} />
        <Route path="/hospital/patient_list" element={<PatientAppointmentList />} />
        <Route path="/hospital/patient_list/:patientId" element={<ViewPatient />} />
        <Route path="/hospital/departments" element={<Departments />} />
        <Route path="/hospital/departments/:deptId" element={<Department />} />

        {/* <Route path="/hospital/emergency" element={<Emergency />} /> */}
        <Route path="/hospital/emergency/add_patient" element={<AddEmergencyPatient />} />
        <Route path="/hospital/billing/ipd" element={<Charges />} />
        <Route path="/hospital/billing/opd" element={<AddCharges />} />
        <Route path="/hospital/account" element={<Account />} />
        <Route path="/hospital/settings" element={<Setting />} />
        <Route path="/hospital/room" element={<RoomInfo/>} />
        <Route path="/hospital/payment/ipd" element={<Report/>} />
        <Route path="/hospital/payment/opd" element={<OpdReport/>} />



        {/* Lab routes */}
        <Route path="/lab" element={<Nurse />} />
        <Route path="/lab/lab_appointments" element={<LabAppointments />} />
        <Route path="/lab/lab_appointments/ipd" element={<LabAppointments />} />
        <Route path="/lab/lab_appointments/opd" element={<LabAppointments />} />
        <Route path="/lab/lab_appointments/opd/:labId" element={<LabAppointmentDetail appointmenttype={"Opd"} />} />
        <Route path="/lab/lab_appointments/ipd/:labId" element={<LabAppointmentDetail  appointmenttype={"Ipd"}/>} />
        <Route path="/lab/lab_appointments/ipd/:labId/:appointmentId/:IpdLabId/update" element={<ViewIpdLabAppointment type={"update"} />} />
        <Route path="/lab/lab_appointments/ipd/:labId/:appointmentId/:IpdLabId/add" element={<ViewIpdLabAppointment type={"create"} />} />
        <Route path="/lab/lab_appointments/opd/:labId/:appointmentId/:IpdLabId/update" element={<ViewLabAppointment type={"update"} />} />
        <Route path="/lab/lab_appointments/opd/:labId/:appointmentId/:IpdLabId/add" element={<ViewLabAppointment type={"create"} />} />
        <Route path="/lab/lab_appointments/opd/:labId/:appointmentId" element={<ViewLabAppointment />} />
        <Route path="/lab/doctor_list" element={<HospitalDoctorList />} />
        <Route path="/lab/patient_list" element={<NursePatientList />} />
        <Route path="/lab/patient_list/:patientId" element={<LabPatientDetails />} />
        <Route path="/lab/account" element={<Account />} />
        <Route path="/lab/settings" element={<Setting />} />

        
        {/* Reception routes 1 */}
        <Route path="/reception" element={<ReceptionDashboard />} />
        <Route path="/reception/doctors_appointments" element={<AppointmentDoctor />} />
        <Route path="/reception/doctors_appointments/doctor/:doctorId" element={<DoctorDetails />} />
        <Route path="/reception/doctors_appointments/:doctorId" element={<DoctorsAppointment />} />
        <Route path="/reception/doctors_appointments/:doctorId/:appointmentId" element={<ViewPatient />} />
        <Route path="/reception/doctor_list" element={<HospitalDoctorList />} />
        <Route path="/reception/patient_list" element={<PatientAppointmentList />} />
        <Route path="/reception/add_patient" element={<AddPatient />} />
        <Route path="/reception/room" element={<RoomInfo/>} />

        <Route path="/reception/add_charges/ipd" element={<AddRecCharges />} />
        {/* <Route path="/reception/add_charges/opd" element={<AddOpdCharges />} /> */}
        <Route path="/reception/add_charges/opd/show/:appo_id" element={<Showopdcharges />} />

        <Route path="/reception/billing/opd" element={<ReceptionistBillList/>} />
        <Route path="/reception/account" element={<Account />} />
        <Route path="/reception/settings" element={<Setting />} />
        <Route path="/reception/emergency" element={<Emergency />} />
        <Route path="/reception/emergency/add_patient" element={<AddEmergencyPatient />} />
        <Route path="/reception/billing/opd/:appointmentId" element={<BillDetails/>} />
        <Route path="/reception/billing/ipd" element={<AdmitedDepatientBillDetals/>} />
        <Route path="/receptionist/bill/ipd/:admitedId" element={<IpdBill/>} />
        <Route path="/receptionist/bill/ipd/deposite/:admitedId" element={<DepositeReceipt />} />
        <Route path="/reception/discharge_summery" element={<DischargeSummery/>} />

        
        {/* Doctor routes */}
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/doctor/appointments" element={<DoctorAppointment />} />
        <Route path="/doctor/appointments/:appointmentId" element={<ViewPatient />} />
        <Route path="/doctor/patient_list" element={<PatientAppointmentList />} />
        <Route path="/doctor/patient_list/ipd/:admitedId" element={<AdmitedPatientDetails />} />
        <Route path="/doctor/patient_list/:patientId" element={<PatientDetails />} />
        <Route path="/doctor/add_patient" element={<AddPatient />} />
        <Route path="/doctor/discharge_patient/:id" element={<DischargePatient />} />
        <Route path="/doctor/payment_history" element={<PaymentHistory />} />
        <Route path="/doctor/account" element={<Account />} />
        <Route path="/doctor/settings" element={<Setting />} />
        {/* doctor/patient_list */}

        

       {/* Accountant routes */}
       <Route path="/accountant" element={<AccountantDashboard />} />
        <Route path="/accountant/discharge_summery" element={<DischargeSummery />} />
        <Route path="/accountant/add_charges" element={<AddAccCharges />} />
        <Route path="/accountant/add_charges/ipd" element={<AddAccCharges />} />
        <Route path="/accountant/add_charges/opd" element={<AddAccCharges />} />
        <Route path="/accountant/bill" element={<AdmitedDepatientBillDetals />} />
        <Route path="/accountant/bill/ipd/deposite/:admitedId" element={<DepositeReceipt />} />
        <Route path="/accountant/bill/ipd/:admitedId" element={<IpdBill />} />
        <Route path="/accountant/add_patient" element={<AddPatient />} />
        <Route path="/accountant/report" element={<Report/>} />
        {/* <Route path="/accountant/billing_history" element={<BillingHistory />} /> */}
        <Route path="/accountant/account" element={<Account />} />
        <Route path="/accountant/settings" element={<Setting />} />
        <Route path="/accountant/billing/ipd" element={<Charges />} />
        <Route path="/accountant/billing/opd" element={<AddCharges />} />
        <Route path="/accountant/payment" element={<Payment />} />
      </Route>



      {/* Redirect to default route only for authenticated users */}
      <Route path="*" element={<Navigate to={getDefaultRoute()} replace />} />
    </Routes>
  );
}

export default AppRoutes;
