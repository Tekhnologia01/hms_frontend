// import React, { useState, useEffect } from "react";
// import { CgLoadbarSound } from "react-icons/cg";
// import { FaCalendarPlus } from "react-icons/fa";
// import { TbUsers, TbUser } from "react-icons/tb";
// import { FiTag } from "react-icons/fi";
// // import { BsFileEarmarkBarGraph } from "react-icons/bs";
// import { IoSettingsOutline } from "react-icons/io5";
// import { MdOutlineLogin } from "react-icons/md";

// import "./Sidebar.css";
// import { useLocation, useNavigate } from "react-router-dom";
// import logo from '../../../assets/images/Airavat.png'
// import { useDispatch } from "react-redux";
// import { logout } from "../../../redux/slices/authSlice";

// function Sidebar({ isVisible, isCompact, role }) {

//   const location = useLocation();

//   const sidebarLinks = {

//     Admin: [
//       { path: "/hospital", label: "Dashboard", icon: <CgLoadbarSound /> },
//       { path: "/hospital/add_users", label: "Add Users", icon: <FaCalendarPlus /> },
//       { path: "/hospital/doctor_list", label: "Doctor List", icon: <FaCalendarPlus /> },
//       { path: "/hospital/patient_list", label: "Patients List", icon: <TbUsers /> },
//       { path: "/hospital/departments", label: "Department", icon: <FiTag /> },
//       { path: "/hospital/emergency", label: "Emergency", icon: <FiTag /> },
//       { path: "/hospital/room", label: "Bed Management", icon: <IoSettingsOutline /> },
//       { path: "/hospital/billing_charges", label: "Billing & Charges", icon: <FiTag /> },
//       { path: "/hospital/account", label: "Account", icon: <TbUser /> },
//       { path: "/hospital/settings", label: "Settings", icon: <IoSettingsOutline /> },
//       { path: "/hospital/logout", label: "Logout", icon: <MdOutlineLogin /> }
//     ],
    
//     Doctor: [
//       { path: "/doctor", label: "Dashboard", icon: <CgLoadbarSound /> },
//       { path: "/doctor/appointments", label: "My Appointment", icon: <FaCalendarPlus /> },
//       { path: "/doctor/patient_list", label: "Patients List", icon: <TbUsers /> },
//       { path: "/doctor/add_patient", label: "Add Patient", icon: <TbUser /> },
//       { path: "/doctor/payment_history", label: "Payment History", icon: <TbUser /> },
//       { path: "/doctor/account", label: "Account", icon: <TbUser /> },
//       { path: "/doctor/settings", label: "Settings", icon: <IoSettingsOutline /> },
//       { path: "/doctor/logout", label: "Logout", icon: <MdOutlineLogin /> }
//     ],
//     Lab: [
//       { path: "/lab", label: "Dashboard", icon: <CgLoadbarSound /> },
//       { path: "/lab/lab_appointments", label: "Lab Appointment", icon: <FaCalendarPlus /> },
//       { path: "/lab/doctor_list", label: "Doctor List", icon: <FaCalendarPlus /> },
//       { path: "/lab/patient_list", label: "Patients List", icon: <TbUsers /> },
//       { path: "/lab/account", label: "Account", icon: <TbUser /> },
//       { path: "/lab/settings", label: "Settings", icon: <IoSettingsOutline /> },
//       { path: "/logout", label: "Logout", icon: <MdOutlineLogin /> }
//     ],

//     Reception: [
//       { path: "/reception", label: "Dashboard", icon: <CgLoadbarSound /> },
//       { path: "/reception/doctors_appointments", label: "Doctors Appointment", icon: <FaCalendarPlus /> },
//       { path: "/reception/doctor_list", label: "Doctors List", icon: <FaCalendarPlus /> },
//       { path: "/reception/patient_list", label: "Patients List", icon: <TbUsers /> },
//       { path: "/reception/add_patient", label: "Add Patient", icon: <TbUsers /> },
//       { path: "/reception/room", label: "Bed Management", icon: <IoSettingsOutline /> },
//       { path: "/billing", label: "Billing", icon: <TbUsers /> },
//       { path: "/reception/account", label: "Account", icon: <TbUser /> },
//       { path: "/reception/settings", label: "Settings", icon: <IoSettingsOutline /> },
//       { path: "/logout", label: "Logout", icon: <MdOutlineLogin /> }
//     ],
//   };

//   const [links, setLinks] = useState([]);

//   const navigate = useNavigate();

//   const [isHovered, setHovered] = useState(false);

//   const sidebarClass = isVisible
//     ? "sidebar-visible p-4"
//     : isCompact && isHovered
//       ? "sidebar-hover p-4"
//       : isCompact
//         ? "sidebar-compact"
//         : "sidebar-hidden";

//   // Effect to update links when the role changes
//   useEffect(() => {
//     if (role && sidebarLinks[role]) {
//       setLinks(sidebarLinks[role]);
//     }
//   }, [role]);

//   const dispatch = useDispatch();

//   const handleLogout = () => {
//     dispatch(logout());  // Dispatch the logout action
//     sessionStorage.removeItem("token");  // Clear session storage
//     navigate("/login"); // Redirect to the login page
//   };

//   return (
//     <div
//       className={`border py-4 sidebar ${sidebarClass}`}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       {!isCompact && (
//         <div className="image-container">
//           <img src={logo} alt="hospital-image" style={{ height: '100px', width: '140px' }} />
//         </div>
//       )}
//       <div className="sidebar-links">
//         <ul >
//           {links.map((link, index) => (
//             <React.Fragment key={index}>
//               <li
//                 key={index}
//                 onClick={link.label === "Logout" ? handleLogout : () => navigate(link.path)}
//                 className={location.pathname === link.path ? "active-link text-dark" : ""}
//               >
//                 {link.icon}
//                 <span style={{
//                   opacity: !isCompact || isHovered ? 1 : 0,
//                   transition: "opacity 0.1s ease-in-out",
//                   whiteSpace: "nowrap"
//                 }}>
//                   {link.label}
//                 </span>

//               </li>
//               {(index + 1) % 3 === 0 && <hr />}
//             </React.Fragment>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;


import React, { useState, useEffect } from "react";
import { CgLoadbarSound } from "react-icons/cg";
import { FaCalendarPlus } from "react-icons/fa";
import { TbUsers, TbUser } from "react-icons/tb";
import { FiTag } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLogin } from "react-icons/md";
import "./Sidebar.css";
import { useLocation, useNavigate } from "react-router-dom";
import logo from '../../../assets/images/Airavat.png';
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";

function Sidebar({ isVisible, isCompact, role }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Define isHovered state
  const [isHovered, setHovered] = useState(false);
  const [expandedLinks, setExpandedLinks] = useState({});

  const sidebarLinks = {
    Admin: [
      { path: "/hospital", label: "Dashboard", icon: <CgLoadbarSound /> },
      { path: "/hospital/add_users", label: "Add Users", icon: <FaCalendarPlus /> },
      { path: "/hospital/doctor_list", label: "Doctor List", icon: <FaCalendarPlus /> },
      { path: "/hospital/patient_list", label: "Patients List", icon: <TbUsers /> },
      { path: "/hospital/departments", label: "Department", icon: <FiTag /> },
      { path: "/hospital/room", label: "Bed Management", icon: <IoSettingsOutline /> },
      {
        label: "Billing & Charges",
        icon: <FiTag />,
        subLinks: [
          { path: "/hospital/billing/ipd", label: "Room Charges", icon: <FiTag /> },
          { path: "/hospital/billing/opd", label: "Other Charges", icon: <FiTag /> },
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
      // { path: "/doctor/payment_history", label: "Payment History", icon: <TbUser /> },
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
      { path: "/reception/doctor_list", label: "Doctors List", icon: <FaCalendarPlus /> },
      { path: "/reception/patient_list", label: "Patients List", icon: <TbUsers /> },
      { path: "/reception/add_patient", label: "Add Patient", icon: <TbUsers /> },
      // { path: "/reception/emergency", label: "Emergency", icon: <FiTag /> },
      { path: "/reception/room", label: "Bed Management", icon: <IoSettingsOutline /> },
      {
        label: "Billing",
        icon: <TbUsers />,
        subLinks: [
          { path: "/reception/billing/ipd", label: "IPD Billing", icon: <TbUsers /> },
          { path: "/reception/billing/opd", label: "OPD Billing", icon: <TbUsers /> },
        ],
      },
      { path: "/reception/account", label: "Account", icon: <TbUser /> },
      { path: "/reception/settings", label: "Settings", icon: <IoSettingsOutline /> },
      { path: "/logout", label: "Logout", icon: <MdOutlineLogin /> },
    ],


    Accountant: [
      { path: "/accountant", label: "Dashboard", icon: <CgLoadbarSound /> },
      { path: "/accountant/bill", label: "Billing", icon: <FaCalendarPlus /> },
      // { path: "/accountant/billing_history", label: "Bill History", icon: <TbUsers /> },
      { path: "/accountant/discharge_summery", label: "Discharge Summery", icon: <TbUsers /> },
      { path: "/accountant/report", label: "Report", icon: <FiTag /> },
      {
        label: "Billing & Charges",
        icon: <FiTag />,
        subLinks: [
          { path: "/accountant/billing/ipd", label: "Room Charges", icon: <FiTag /> },
          { path: "/accountant/billing/opd", label: "Other Charges", icon: <FiTag /> },
        ],
      },
      { path: "/accountant/account", label: "Account", icon: <TbUser /> },
      { path: "/accountant/settings", label: "Settings", icon: <IoSettingsOutline /> },
      { path: "/logout", label: "Logout", icon: <MdOutlineLogin /> },
    ],
  };
  const [links, setLinks] = useState([]);

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

  const toggleSubLinks = (label) => {
    setExpandedLinks((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const sidebarClass = isVisible
    ? "sidebar-visible p-4"
    : isCompact && isHovered
    ? "sidebar-hover p-4"
    : isCompact
    ? "sidebar-compact"
    : "sidebar-hidden";

  return (
    <div
      className={`border py-4 sidebar ${sidebarClass}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {!isCompact && (
        <div className="image-container">
          <img src={logo} alt="hospital-image" style={{ height: '100px', width: '140px' }} />
        </div>
      )}
      <div className="sidebar-links">
        <ul>
          {links.map((link, index) => (
            <React.Fragment key={index}>
              <li
                onClick={() => {
                  if (link.subLinks) {
                    toggleSubLinks(link.label);
                  } else if (link.label === "Logout") {
                    handleLogout();
                  } else {
                    navigate(link.path);
                  }
                }}
                className={location.pathname === link.path ? "active-link text-dark" : ""}
              >
                {link.icon}
                <span
                  style={{
                    opacity: !isCompact || isHovered ? 1 : 0,
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
                      onClick={() => navigate(subLink.path)}
                      className={location.pathname === subLink.path ? "active-link text-dark" : ""}
                    >
                      {subLink.icon}
                      <span
                        style={{
                          opacity: !isCompact || isHovered ? 1 : 0,
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
  );
}

export default Sidebar;