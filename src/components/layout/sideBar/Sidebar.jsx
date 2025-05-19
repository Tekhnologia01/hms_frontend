import React, { useState, useEffect } from "react";
import { CgLoadbarSound } from "react-icons/cg";
import { FaCalendarPlus, FaMoneyBillWave, FaReceipt, FaUserMd, FaUserPlus } from "react-icons/fa";
import { TbUsers, TbUser } from "react-icons/tb";
import { FiTag } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdBedroomChild, MdOutlineLogin, MdOutlineSettings } from "react-icons/md";
import "./Sidebar.css";
import { useLocation, useNavigate } from "react-router-dom";
import logo from '../../../assets/images/Airavat.png';
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";
import { RiBillLine } from "react-icons/ri";
import { ImSection } from "react-icons/im";
import { AiOutlineBarChart } from "react-icons/ai";
import { GiPayMoney } from "react-icons/gi";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CommanButton from "../../common/form/commonButtton";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { FaTimes, FaBars } from "react-icons/fa"; // Import the icons
import { MdOutlineArrowRightAlt } from "react-icons/md";




function Sidebar({ isVisible, isCompact, role }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isExpanded, setIsExpanded] = useState(!isCompact);
  const [expandedLinks, setExpandedLinks] = useState({});
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [links, setLinks] = useState([]);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const sidebarLinks = {
    Admin: [
      { path: "/hospital", label: "Dashboard", icon: <CgLoadbarSound /> },
      { path: "/hospital/add_users", label: "Add Users", icon: <FaCalendarPlus /> },
      { path: "/hospital/doctor_list", label: "Doctor List", icon: <FaUserMd /> },
      { path: "/hospital/patient_list", label: "Patients List", icon: <TbUsers /> },
      { path: "/hospital/departments", label: "Department", icon: <ImSection /> },
      { path: "/hospital/room", label: "Bed Management", icon: <MdBedroomChild /> },
      {
        label: "Billing & Charges",
        icon: <FiTag />,
        subLinks: [
          { path: "/hospital/billing/ipd", label: "Room Charges", icon: <FaMoneyBillWave /> },
          { path: "/hospital/billing/opd", label: "Other Charges", icon: <RiBillLine /> },
        ],
      },
      {
        label: "Payment History",
        icon: <GiPayMoney />,
        subLinks: [
          { path: "/hospital/payment/ipd", label: "Ipd Payment", icon: <FaMoneyBillWave /> },
          { path: "/hospital/payment/opd", label: "Opd Payment", icon: <RiBillLine /> },
        ],
      },
      { path: "/hospital/account", label: "Account", icon: <TbUser /> },
      { path: "/hospital/settings", label: "Settings", icon: <IoSettingsOutline /> },
      { path: "/hospital/logout", label: "Logout", icon: <MdOutlineLogin /> },
    ],



    Doctor: [
      { path: "/doctor", label: "Dashboard", icon: <CgLoadbarSound /> },
      { path: "/doctor/appointments", label: "My Appointment", icon: <FaCalendarPlus /> },
      { path: "/doctor/patient_list", label: "Patients List", icon: <TbUsers /> },
      { path: "/doctor/add_patient", label: "Add Patient", icon: <TbUser /> },
      { path: "/doctor/account", label: "Account", icon: <TbUser /> },
      { path: "/doctor/settings", label: "Settings", icon: <IoSettingsOutline /> },
      { path: "/doctor/logout", label: "Logout", icon: <MdOutlineLogin /> },
    ],


    Lab: [
      { path: "/lab", label: "Dashboard", icon: <CgLoadbarSound /> },
      // { path: "/lab/lab_appointments", label: "Lab Appointment", icon: <FaCalendarPlus /> },
      // { path: "/lab/doctor_list", label: "Doctor List", icon: <FaCalendarPlus /> },
      {
        label: "Lab Appointments",
        icon: <FaCalendarPlus />,
        subLinks: [
          { path: "/lab/lab_appointments/ipd", label: "IPD ", icon: <TbUsers /> },
          { path: "/lab/lab_appointments/opd", label: "OPD ", icon: <TbUsers /> },
        ],
      },
      // { path: "/lab/patient_list", label: "Patients List", icon: <TbUsers /> },
      { path: "/lab/account", label: "Account", icon: <TbUser /> },
      { path: "/lab/settings", label: "Settings", icon: <IoSettingsOutline /> },
      { path: "/logout", label: "Logout", icon: <MdOutlineLogin /> },
    ],


    Reception: [
      { path: "/reception", label: "Dashboard", icon: <CgLoadbarSound /> },
      { path: "/reception/doctors_appointments", label: "Doctors Appointment", icon: <FaCalendarPlus /> },
      { path: "/reception/doctor_list", label: "Doctors List", icon: <FaUserMd /> },
      { path: "/reception/patient_list", label: "Patients List", icon: <TbUsers /> },
      { path: "/reception/add_patient", label: "Add Patient", icon: <FaUserPlus /> },
      { path: "/reception/room", label: "Bed Management", icon: <MdBedroomChild /> },
      {
        label: "Billing",
        icon: <FaMoneyBillWave />,
        subLinks: [
          { path: "/reception/billing/ipd", label: "IPD Billing", icon: <FaMoneyBillWave /> },
          { path: "/reception/billing/opd", label: "OPD Billing", icon: <RiBillLine /> },
        ],
      },
      { path: "/reception/discharge_summery", label: "Discharge Summery", icon: <TbUsers /> },
      { path: "/reception/account", label: "Account", icon: <TbUser /> },
      { path: "/reception/settings", label: "Settings", icon: <IoSettingsOutline /> },
      { path: "/logout", label: "Logout", icon: <MdOutlineLogin /> },
    ],


    Accountant: [
      { path: "/accountant", label: "Dashboard", icon: <CgLoadbarSound /> },
      { path: "/accountant/bill", label: "Billing", icon: <FaReceipt /> },
      { path: "/accountant/discharge_summery", label: "Discharge Summery", icon: <TbUsers /> },
      {
        path: "/accountant/payment", label: "Payment History", icon: <FaRegMoneyBill1 />
      },
      { path: "/accountant/report", label: "Report", icon: <AiOutlineBarChart /> },
      {
        label: "Billing & Charges",
        icon: <FiTag />,
        subLinks: [
          { path: "/accountant/billing/ipd", label: "Room Charges", icon: <FaMoneyBillWave /> },
          { path: "/accountant/billing/opd", label: "Other Charges", icon: <RiBillLine /> },
        ],
      },
      { path: "/accountant/account", label: "Account", icon: <TbUser /> },
      { path: "/accountant/settings", label: "Settings", icon: <IoSettingsOutline /> },
      { path: "/logout", label: "Logout", icon: <MdOutlineLogin /> },
    ],
  };

  useEffect(() => {
    if (role && sidebarLinks[role]) {
      setLinks(sidebarLinks[role]);
    }
  }, [role]);

  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    handleLogout();
  };

  const toggleSubLinks = (label) => {
    setExpandedLinks((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const sidebarClass = isVisible
    ? "sidebar-visible p-4"
    : isExpanded
      ? "sidebar-hover p-4"
      : "sidebar-compact";

  return (
    <>
      <div
        className={`border py-4 sidebar ${sidebarClass}`}
        onClick={() => {
          if (isCompact) {
            toggleSidebar();
          }
        }}
      >
        <div className="sidebar-header">
          {!isCompact && (
            <div className="image-container">
              <img src={logo} alt="hospital-image" style={{ height: '100px', width: '140px' }} />
            </div>
          )}
          {isCompact && (
            <div
              className="sidebar-toggle"
              onClick={toggleSidebar}
            >
              {isExpanded ? (
                <FaTimes className="toggle-icon" />
              ) : (
                  <MdOutlineArrowRightAlt className="toggle-icon" />
              )}
            </div>
          )}
        </div>

        <div className="sidebar-links">
          <ul>
            {links.map((link, index) => (
              <React.Fragment key={index}>
                <li
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the sidebar toggle when clicking on links
                    if (link.subLinks) {
                      toggleSubLinks(link.label);
                    } else if (link.label === "Logout") {
                      handleLogoutClick();
                    } else {
                      navigate(link.path);
                    }
                  }}
                  className={location.pathname === link.path ? "active-link text-dark" : ""}
                >
                  {link.icon}
                  <span
                    style={{
                      opacity: isExpanded ? 1 : 0,
                      transition: "opacity 0.1s ease-in-out",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {link.label}
                  </span>
                  {link.subLinks && (
                    <span style={{ marginLeft: "auto" }}>
                      {expandedLinks[link.label] ? "▲" : "▼"}
                    </span>
                  )}
                </li>
                {link.subLinks && expandedLinks[link.label] && (
                  <ul>
                    {link.subLinks.map((subLink, subIndex) => (
                      <li
                        key={subIndex}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(subLink.path);
                        }}
                        className={location.pathname === subLink.path ? "active-link text-dark" : ""}
                      >
                        {subLink.icon}
                        <span
                          style={{
                            opacity: isExpanded ? 1 : 0,
                            transition: "opacity 0.1s ease-in-out",
                            whiteSpace: "nowrap",
                            marginLeft: "20px",
                          }}
                        >
                          {subLink.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                {(index + 1) % 3 === 0 && <hr />}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>


      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button> */}
          {/* <Button variant="danger" onClick={handleConfirmLogout}>
            Logout
          </Button> */}


          <CommanButton
            label={`Cancel`}
            className="fw-bold fs-6 "
            style={{ borderRadius: "8px", background: "white", color: "#1D949A" }}
            type="submit"
            onClick={() => setShowLogoutModal(false)}
          />

          <CommanButton
            label={`Logout`}
            className="fw-bold fs-6 "
            style={{ borderRadius: "8px", }}
            type="submit"
            onClick={handleConfirmLogout}
          />
        </Modal.Footer>




      </Modal>
    </>
  );
}

export default Sidebar;