import React, { useEffect, useState } from "react";
import Navbar from "../navBar/Navbar";
import Sidebar from "../sideBar/Sidebar";
import "./defaultLayout.css";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const DefaultLayout = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isSidebarCompact, setSidebarCompact] = useState(false);

  // const [role, setRole] = useState("HOSPITAL");

  const { role } = useSelector(state => state?.auth?.user)

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 450) {
        setSidebarVisible(false);
        setSidebarCompact(true);
      } else if (window.innerWidth >= 450 && window.innerWidth <= 768) {
        setSidebarVisible(false);
        setSidebarCompact(true);
      } else {
        setSidebarVisible(true);
        setSidebarCompact(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="dashboard-container">
        <Sidebar
          isVisible={isSidebarVisible}
          isCompact={isSidebarCompact}
          role={role}
        />
        <div>
          <div className="main-container">
            {/* <Dashboard /> */}
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
