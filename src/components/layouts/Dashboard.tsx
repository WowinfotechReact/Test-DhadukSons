import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../Admin/SideBar/SideBar";
import { Dropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import "./DashboardLayout.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../../Context/Context";

const DashboardLayout: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const adminUser = localStorage.getItem("authUser");
  const location = useLocation();

  useEffect(() => {
    if (adminUser && !location.pathname.startsWith("/admin")) {
      navigate("/admin/dashboard");
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    setUser(null);
    navigate("/admin/login");
  };

  const handleProfile = () => {
    navigate("/admin/profile");
  };

  return (
    <div
      className={`dashboard-layout ${isOpen ? "expanded" : "collapsed"}`}
      style={{ display: "flex" }}
    >
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />

      {/* Right section */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* Navbar */}
        <nav
          className="navbar d-flex justify-content-end align-items-center px-3"
          style={{ backgroundColor: "#2e7d32", height: "60px" }}
        >
          <Dropdown align="end">
            <Dropdown.Toggle
              as="span"
              id="dropdown-basic"
              style={{ cursor: "pointer", color: "white" }}
            >
              <FaUserCircle size={22} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleProfile}>Profile</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </nav>

        {/* Content */}
        <main
          className="dashboard-content"
          style={{ flex: 1, padding: "15px" }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
