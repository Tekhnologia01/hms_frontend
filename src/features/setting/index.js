import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import ChangePassword from "./ChangePassword";
import DeletAccount from "./DeleteAccount";
import Notification from "./Notification";

function Setting() {
  const [activeTab, setActiveTab] = useState("Change Password");

  const tabItems = [
    { key: "Change Password", label: "Change Password" },
    { key: "Notification Settings", label: "Notification Settings" },
    { key: "Delete Account", label: "Delete Account" },
  ];

  //   const getTabStyle = (tabKey) => ({
  //     background: activeTab === tabKey ? '#98DBDE' : 'rgb(193, 236, 238)',
  //     borderRadius: tabKey === 'Change Password' ? '8px 0 0 8px' :
  //                  tabKey === 'Delete Account' ? '0 8px 8px 0' : '0',
  //   });

  const getTabStyle = (tabKey) => {
    // Check screen size for mobile (e.g., 768px or below)
    const isMobile = window.innerWidth <= 768;

    return {
      cursor: "pointer",
      background: activeTab === tabKey ? "#98DBDE" : "rgb(222, 239, 240)",
      borderRadius: isMobile
        ? "0" // Apply borderRadius as 0 for all tabs on mobile
        : tabKey === "Change Password"
        ? "8px 0 0 8px"
        : tabKey === "Delete Account"
        ? "0 8px 8px 0"
        : "0",
    };
  };

  return (
    <div className="m-3">
      <div className="fs-4 fw-bold pb-3">Security & Settings</div>
      <div className="pb-lg-3">
        <Row className="m-0">
          {tabItems.map((item) => (
            <Col
              key={item.key}
              lg={2}
              md={4}
              s={12}
              className="d-flex justify-content-center mb-2 mb-lg-0"
              style={getTabStyle(item.key)}
              onClick={() => setActiveTab(item.key)}
            >
              <div
                className="p-2 fw-semibold text-center"
                style={{ fontSize: "1rem" }}
              >
                {item.label}
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <div className="m-2">
        {/* Render components based on active tab */}
        {activeTab === "Change Password" && <ChangePassword />}
        {activeTab === "Notification Settings" && <Notification />}
        {activeTab === "Delete Account" && <DeletAccount />}
      </div>
    </div>
  );
}

export default Setting;
